import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { Todo } from '../../types/common';
import { cn } from '../../utils';
const DraggableCard = ({ todo }: { todo: Todo }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: todo?.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || 'transform 0.25s ease',
    opacity: isDragging ? 0.5 : 1,
  };

  const status = todo?.completed ? 'Completed' : 'Yet to Complete';

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white p-3 mb-3 rounded shadow cursor-grab active:cursor-grabbing hover:shadow-lg transition-transform"
    >
      <p className="font-medium">{todo.todo}</p>
      <p className="text-sm text-gray-500">ID: {todo.id}</p>
      <p className="text-sm text-gray-500">User: {todo.userId}</p>
      <span
        className={cn(
          `inline-block mt-2 px-2 py-1 text-xs rounded-full ${
            todo.completed
              ? 'bg-green-200 text-green-800'
              : 'bg-yellow-200 text-yellow-800'
          }`
        )}
      >
        {status}
      </span>
    </div>
  );
};

export default DraggableCard;
