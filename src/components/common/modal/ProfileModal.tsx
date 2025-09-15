import { Button, Card } from 'antd';
import { X } from 'lucide-react';
import Modal from 'react-modal';
import InfoBox from '../InfoBox';

interface User {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  role: string;
  image: string;
  birthDate: string;
  bloodGroup: string;
  eyeColor: string;
  height: number;
  weight: number;
  hair: { color: string; type: string };
  address: {
    address: string;
    city: string;
    state: string;
    stateCode: string;
    postalCode: string;
    country: string;
  };
  company: {
    name: string;
    department: string;
    title: string;
  };
  university: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
}

const ProfileModal = ({ isOpen, onClose, user }: Props) => {
  if (!user) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      overlayClassName="fixed inset-0 bg-black/60 backdrop-blur-[2px] z-50 flex justify-center items-center"
      className="outline-none"
    >
      <Card className="relative shadow-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl">
        <div className="flex items-center gap-4 mb-6 sticky top-0 py-2 right-0 bg-white">
          <img
            src={user?.image}
            alt={user?.firstName}
            className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
          />
          <div>
            <h2 className="text-2xl font-semibold">
              {user?.firstName} {user?.lastName}
            </h2>
            <p className="text-gray-500 capitalize">{user?.role}</p>
          </div>
          <button
            onClick={onClose}
            className="absolute top-2 right-0 text-gray-500 hover:text-gray-700 cursor-pointer hover:scale-105 duration-300"
          >
            <X size={22} />
          </button>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-800  border-b border-gray-300 pb-2">
            Personal Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <InfoBox label="Email" value={user?.email} />
            <InfoBox label="Phone" value={user?.phone} />
            <InfoBox label="Gender" value={user?.gender} />
            <InfoBox label="Birth Date" value={user?.birthDate} />
            <InfoBox label="Blood Group" value={user?.bloodGroup} />
            <InfoBox label="Eye Color" value={user?.eyeColor} />
            <InfoBox label="Height" value={`${user?.height} cm`} />
            <InfoBox label="Weight" value={`${user?.weight} kg`} />
            <InfoBox
              label="Hair"
              value={`${user?.hair?.color}, ${user?.hair?.type}`}
            />
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-800  border-b border-gray-300 pb-2">
            Address
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <InfoBox label="Address" value={user?.address?.address} />
            <InfoBox
              label="State"
              value={`${user?.address?.city}, ${user?.address?.state}`}
            />
            <InfoBox
              label="Country"
              value={`${user?.address?.country}, ${user?.address?.postalCode}`}
            />
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-800  border-b border-gray-300 pb-2">
            Work Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoBox label="Company" value={user?.company?.name} />
            <InfoBox label="Position" value={user?.company?.title} />
            <InfoBox label="Department" value={user?.company?.department} />
            <InfoBox label="University" value={user?.university} />
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <Button type="primary" onClick={onClose}>
            Close
          </Button>
        </div>
      </Card>
    </Modal>
  );
};

export default ProfileModal;
