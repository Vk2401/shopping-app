import React, { useEffect, useState } from "react";
import Userpic from '../assets/images/Userpic.png';
import { ReactComponent as LeftArrow } from "../assets/images/arrow-circle-left_solid.svg"
import { ReactComponent as EditIcon } from '../assets/images/edit.svg';
import { useAuth } from "../context/AuthContext.js";
import { useNavigate } from "react-router-dom";

const ProfileScreen = () => {

  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  return (
    <div className="px-6 font-poppins h-screen">
      <div className="flex items-center justify-between h-16">
        <LeftArrow onClick={() => { navigate(`/settings`) }} className="h-8 w-8" />
        <h1 className="text-black font-bold text-xl">Profile</h1>
        <img src={''} alt="" />
      </div>

      <div className="flex flex-col items-center justify-between h-[83%] mt-10">
        <div className="flex flex-col items-center justify-center gap-3 py-5 w-full rounded-md">
          <div className="flex items-center justify-center relative">
            <img src={Userpic} alt="" className="rounded-full" />
            <EditIcon   className="h-9 w-9 absolute right-1 bottom-2" />
          </div>

          <div className="flex items-center justify-between w-full mt-6">
            <div className="flex flex-col w-1/2">
              <span className="text-buttonColor text-left py-1 border-b-2 border-gray-200 font-semibold">First Name</span>
              <strong className="w-1/2 text-left font-bold text-xl py-1">{user.name}</strong>
            </div>

            <div className="flex flex-col w-1/2">
              <span className="text-buttonColor text-left py-1 border-b-2 border-gray-200 font-semibold">Last Name</span>
              <strong className="w-1/2 text-left font-bold text-xl py-1">Doe</strong>
            </div>
          </div>

          <div className="flex flex-col w-full py-3">
            <span className="text-buttonColor text-left py-1 w-full border-b-2 border-gray-200 font-semibold">Email Address</span>
            <strong className="w-1/2 text-left font-bold text-xl py-1">{user.email}</strong>
          </div>

          <div className="flex flex-col w-full py-2">
            <span className="text-buttonColor w-full text-left py-1 border-b-2 border-gray-200 font-semibold">Mobile Number</span>
            <strong className="w-1/2 text-left font-bold text-xl py-1">{user.mobile_number}</strong>
          </div>
        </div>

        <div className="flex items-center justify-center w-full">
          <button className="bg-buttonColor w-72 h-12 font-semibold text-white text-center rounded-full">Save</button>
        </div>
      </div>
    </div>
  );
}

export default ProfileScreen;