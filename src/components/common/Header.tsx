import { useState, useEffect, useRef } from 'react';
import { LogOut, User, User2 } from 'lucide-react';
import logo from '../../assets/logo.png';
import ConfirmModal from './modal/ConfirmModal';
import { userAuthStore } from '../../store/auth/authStore';
import { useNavigate } from 'react-router';
import { useProfile } from '../../hooks/useProfile';
import Loader from './Loader';
import ProfileModal from './modal/ProfileModal';
import { cn } from '../../utils';
import { useOutsideClick } from '../../hooks/useOutsideclick';

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const navigate = useNavigate();
  const logout = userAuthStore((state) => state.logout);
const profileRef= useRef(null)
useOutsideClick(profileRef,()=>setShowMenu(false))
  const { data: userProfileData, isLoading, isError } = useProfile();

  useEffect(() => {
    if (isError) {
      navigate('/login');
    }
  }, [isError, navigate]);

  const openModal = () => {
    setShowMenu(false);
    setIsOpen(true);
  };

  const openProfileModal = () => {
    setShowMenu(false);
    setIsProfileOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  const handleLogout = () => {
    closeModal();
    logout();
    navigate('/login');
  };


  if (isLoading) return <Loader />;

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
      <div className="text-xl font-bold text-primary cursor-pointer">
        <img src={logo} alt="logo" className="w-25 object-cover" />
      </div>

      <div className="relative" ref={profileRef}>
        <button
          onClick={() => setShowMenu((prev) => !prev)}
          className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-primary/30 duration-300 cursor-pointer"
        >
          <User className="w-6 h-6 text-primary" />
        </button>

        <div
          className={cn(
            `absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md py-2 z-50 transition-all duration-200 transform ${
              showMenu
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-95 pointer-events-none'
            }`
          )}
        >
          <div
            onClick={openProfileModal}
            className="w-full text-left px-4 py-2 hover:bg-primary/20 cursor-pointer border-b border-gray-300 flex gap-2 items-center"
          >
            <User2 size={15} /> <span>Profile</span>
          </div>
          <div
            onClick={openModal}
            className="w-full text-left px-4 py-2 hover:bg-primary/20 cursor-pointer flex gap-2 items-center"
          >
            <LogOut size={15} /> <span>Logout</span>
          </div>
        </div>
      </div>

      {/* Logout confirm Modal */}
      <ConfirmModal
        isOpen={isOpen}
        onClose={closeModal}
        onConfirm={handleLogout}
        title="Confirm Logout"
        message="Are you sure you want to log out?"
        confirmText="Logout"
        cancelText="Cancel"
      />

      {/* Profile Modal */}
      {userProfileData && (
        <ProfileModal
          isOpen={isProfileOpen}
          onClose={() => setIsProfileOpen(false)}
          user={userProfileData}
        />
      )}
    </div>
  );
};

export default Header;
