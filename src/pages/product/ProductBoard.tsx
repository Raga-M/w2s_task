import { useEffect, useState } from 'react';

import {
  DndContext,
  closestCorners,
  type DragEndEvent,
  DragOverlay,
} from '@dnd-kit/core';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';

import { createPortal } from 'react-dom';
import { useTodo } from '../../hooks/useTodo';
import Loader from '../../components/common/Loader';
import type { Todo } from '../../types/common';
import DraggableCard from '../../components/common/DraggableCard';

interface Columns {
  [key: string]: Todo[];
}

const columnTitles: Record<string, string> = {
  pending: 'Pending',
  inProgress: 'In Progress',
  completed: 'Completed',
};

const columnColors: Record<string, string> = {
  pending: 'bg-yellow-200',
  inProgress: 'bg-blue-200',
  completed: 'bg-green-200',
};

export default function ProductBoard() {
  const [columns, setColumns] = useState<Columns>({
    pending: [],
    inProgress: [],
    completed: [],
  });
  const [activeId, setActiveId] = useState<number | null>(null);

  const { data, isError, isLoading } = useTodo();
  const todos: Todo[] = data?.todos;
  console.log(data);
  useEffect(() => {
    if (todos?.length > 0)
      setColumns({
        pending: todos?.filter((task) => !task.completed).slice(0, 10),
        inProgress: todos?.filter((task) => !task.completed).slice(10, 20),
        completed: todos?.filter((task) => task.completed),
      });
  }, [todos]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDragStart = (event: any) => {
    setActiveId(event.active.id);
  };
    const findContainer = (id: number | string) => {
    if (id in columns) return id;
    return Object.keys(columns).find((key) =>
      columns[key].some((item) => item.id === id)
    );
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);
    const { active, over } = event;
    if (!over) return;

    const sourceCol = findContainer(active.id);
    const destCol = findContainer(over.id);

    if (!sourceCol || !destCol) return;

    if (sourceCol === destCol) {
      const oldIndex = columns[sourceCol].findIndex(
        (item) => item.id === active.id
      );
      const newIndex = columns[destCol].findIndex(
        (item) => item.id === over.id
      );

      setColumns((prev) => ({
        ...prev,
        [sourceCol]: arrayMove(prev[sourceCol], oldIndex, newIndex),
      }));
    } else {
      const sourceItems = [...columns[sourceCol]];
      const destItems = [...columns[destCol]];
      const movedItem = sourceItems.find((item) => item.id === active.id);
      if (!movedItem) return;

      const newSource = sourceItems.filter((item) => item.id !== active.id);

      const updatedItem = { ...movedItem };
      if (destCol === 'completed') {
        updatedItem.completed = true;
      } else {
        updatedItem.completed = false;
      }

      destItems.splice(
        columns[destCol].findIndex((item) => item.id === over.id),
        0,
        updatedItem
      );

      setColumns((prev) => ({
        ...prev,
        [sourceCol]: newSource,
        [destCol]: destItems,
      }));
    }
  };

  const activeTodo = Object.values(columns)
    .flat()
    .find((task) => task.id === activeId);

  if (isLoading) return <Loader />;
  if (isError) return <p>Error is fetch todo data</p>;
  return (
    <div className="m-5">
      <h2 className="font-semibold text-2xl">Product - Kanban Board</h2>
      <div className="flex gap-4 py-6 h-[80vh]">
        <DndContext
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          {Object.entries(columns).map(([colId, todos]) => (
            <div
              key={colId}
              className={`w-1/3 rounded-lg shadow p-4 flex flex-col ${columnColors[colId]}`}
            >
              <h2 className="text-lg font-bold capitalize mb-4">
                {columnTitles[colId]}
              </h2>
              <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
                <SortableContext items={todos.map((task) => task.id)}>
                  {todos.map((todo) => (
                    <DraggableCard key={todo.id} todo={todo} />
                  ))}
                </SortableContext>
              </div>
            </div>
          ))}

          {createPortal(
            <DragOverlay>
              {activeTodo ? (
                <div className="scale-105 rotate-3 shadow-2xl opacity-90">
                  <DraggableCard todo={activeTodo} />
                </div>
              ) : null}
            </DragOverlay>,
            document.body
          )}
        </DndContext>
      </div>
    </div>
  );
}
