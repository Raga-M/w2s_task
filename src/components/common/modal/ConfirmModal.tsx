import { Button, Card } from 'antd';
import Modal from 'react-modal';

type ConfirmModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
};

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
}: ConfirmModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      overlayClassName="fixed inset-0 bg-black/60  backdrop-blur-[3px] z-50 flex justify-center items-center"
      className="outline-none"
    >
      <Card title={title} className='!min-w-md'>
        <p className="mb-6 text-lg ">{message}</p>

        <div className="flex justify-end gap-3">
          <Button variant="outlined" color="default" onClick={onClose}>
            {cancelText}
          </Button>

          <Button variant="solid" color="danger" onClick={onConfirm}>
            {confirmText}
          </Button>
        </div>
      </Card>
    </Modal>
  );
}
