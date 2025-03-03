import React, { useState, useEffect, useRef } from 'react';
import { useAuthStore } from "../store/useAuthStore";
import { MessageCircle, Bell, MessageSquare, User, Settings, LogOut, Menu, ChevronDown, ChevronUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
const Navbar = () => {
  const { authUser, logout} = useAuthStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); // Reference for dropdown menu
  const navigate = useNavigate();

  // Toggle mobile menu visibility
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Toggle dropdown menu visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false); // Close dropdown if clicked outside
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup the event listener when component is unmounted
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleProfileClick = (e) => {
    e.stopPropagation();
    console.log("click profile");
    navigate('/profile');
  };
  const handleHome = (e) => {
    e.stopPropagation();
    console.log("click profile");
    navigate('/');
  };
  // Handle the logout button click
  const handleLogoutClick = (e) => {
    e.stopPropagation(); // Prevent dropdown toggle when clicking logout button
    logout()
  };
  return (
    <header className="bg-white text-blue-950 shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2" onClick={handleHome}>
          <div className="text-2xl font-bold flex justify-center items-center gap-2 cursor-pointer">
            <MessageSquare className="size-8 " />
            <span className='text-[#FF9F43]'>
               Let&apos;s Chat
            </span>
          </div>
        </div>

        {/* Desktop Menu Items */}
        <div className="hidden md:flex items-center space-x-6">
          <div className="flex items-center bg-gray-100 space-x-2 p-2  rounded-md shadow-2xs cursor-pointer hover:text-[#FF9F43]" onClick={handleHome}>
            <MessageCircle size={20} />
            <span>Chats</span>
          </div>
          <div className="flex items-center bg-gray-100 space-x-2 p-2 rounded-md shadow-2xs cursor-pointer hover:text-[#FF9F43]">
            <Bell size={20} />
            {/* <span>Notifications</span> */}
          </div>
          <Link
              to={"/settings"}
            >
          <div className="flex items-center bg-gray-100 space-x-2 p-2 rounded-md shadow-2xs cursor-pointer hover:text-[#FF9F43]">
            <Settings size={20} />
            {/* <span>Settings</span> */}
          </div>
          </Link>
          {/* User Profile with Image and Dropdown */}
          <div className="relative flex items-center cursor-pointer" onClick={toggleDropdown}>
            {/* User Image */}
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <img src={authUser.profilePic} alt="User" className="w-full h-full object-cover" />
            </div>
            <span className="ml-2">{authUser?.fullName}</span>
            {isDropdownOpen ? (
              <ChevronUp size={16} className="ml-2" />
            ) : (
              <ChevronDown size={16} className="ml-2" />
            )}

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div
                ref={dropdownRef}
                className="absolute right-0 mt-2 top-[30px] bg-white text-gray-700 shadow-lg rounded-md min-w-32 p-2 z-50"
              >
                <div className="flex flex-col space-y-2">
                  <button
                    onClick={handleProfileClick} // Profile click handler
                    className="flex items-center space-x-2 cursor-pointer hover:text-gray-400"
                  >
                    <User size={16} />
                    <span>Profile</span>
                  </button>
                  <button
                    onClick={handleLogoutClick} // Logout click handler
                    className="flex items-center space-x-2 cursor-pointer hover:text-red-400"
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Icon */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden p-2 rounded focus:outline-none"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-700 text-white py-4 px-6">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-2 cursor-pointer hover:text-gray-400" onClick={handleHome}>
              <MessageCircle size={20} />
              <span>Chats</span>
            </div>
            <div className="flex items-center space-x-2 cursor-pointer hover:text-gray-400">
              <Bell size={20} />
              <span>Notifications</span>
            </div>
            <div className="flex items-center space-x-2 cursor-pointer hover:text-gray-400" onClick={handleProfileClick}>
            <User size={16} />
              <span>Profile</span>
            </div>
            <div className="flex items-center space-x-2 cursor-pointer hover:text-gray-400" onClick={handleLogoutClick}>
              <LogOut size={20} />
              <span>Logout</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
