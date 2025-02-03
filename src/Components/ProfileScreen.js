import React from "react";
import arrow from '../utils/images/arrow-circle-left_solid.png';
import closeicon from '../utils/images/ios-close-circle.png';
import Userpic from '../utils/images/Userpic.png';
import editIcon from '../utils/images/editIcon.png';

const ProfileScreen=()=>{
    return(
        <div className="flex flex-col px-6 h-screen font-poppins">
          <div className="flex items-center justify-between py-8">
            <img src={arrow} alt="" className=" h-10 w-10 "/>
             <strong className="font-bold text-2xl">Profile</strong>
             <img src={closeicon} alt="" className=" h-10 w-10 "/>
          </div>

          <div className="flex flex-col justify-between h-full py-10">
            <div className="flex flex-col justify-between gap-14">
                <div className="flex items-center justify-center relative">
                    <img src={Userpic} alt="" className="rounded-full "/>
                    <img src={editIcon} alt="" className="h-10 w-10 absolute right-32 bottom-1"/>
                </div>

                <div className="flex flex-col gap-10">
                    <div className="flex justify-between gap-4">
                        <div className="flex flex-col w-1/2 items-start">
                            <span className="text-buttonColor text-2xl font-bold border-b-2 border-gray-300 text-start pb-3 w-full">First Name</span>
                            <strong className="text-3xl pt-3 w-full text-start">John</strong>
                        </div>

                       <div className="flex flex-col w-1/2 items-start">
                        <span className="text-buttonColor text-2xl font-bold border-b-2 border-gray-300 text-start pb-3 w-full">Last Name</span>
                        <strong className="text-3xl pb-3 w-full text-start">Doe</strong>
                       </div>
                    </div>

                    <div className="flex flex-col items-start gap-3">
                        <span className="text-buttonColor text-2xl font-bold border-b-2 border-gray-300 w-full text-start pb-3">Email Address</span>
                        <strong className="text-black text-3xl">Johndoe@email.com</strong>
                    </div>

                    <div className="flex flex-col items-start gap-3">
                        <span className="text-buttonColor text-2xl font-bold  border-b-2 border-gray-300 w-full text-start pb-3">Mobile Number</span>
                        <strong className="text-black text-3xl">83456 - XXXXX</strong>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-center mt-10">
                <button className="bg-buttonColor text-white text-center rounded-full w-[250px] py-3 text-xl">Save</button>
            </div>
          </div>
        </div>
    );
}

export default ProfileScreen;