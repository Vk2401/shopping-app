import React from "react";
import arrow from '../utils/images/arrow-circle-left_solid.png';
import FontAwosemUser from '../utils/images/FontAwosemUser.png';
import Userpic from '../utils/images/Userpic.png';

const SettingScreen=()=>{
    return(
        <div className="flex flex-col px-6 h-screen font-poppins">
          <div className="flex items-center justify-center relative py-8">
            <img src={arrow} alt="" className="absolute h-10 w-10 left-0"/>
             <strong className="font-bold text-2xl">Settings</strong>
          </div>

          <div className="flex flex-col justify-around h-full">
            <div className="flex flex-col">
                <div className="flex flex-col items-center justify-center gap-3 py-5 bg-ligghtGray rounded-md">
                        <img src={Userpic} alt="" className="rounded-full"/>
                        <strong className="text-2xl ">John smith</strong>
                </div>

                <div className="flex flex-col gap-5 mt-10">
                   <div className="flex items-center justify-start gap-5 py-3 border-b-2 border-gray-300">
                        <img src={FontAwosemUser} alt="" className="h-8 w-8 bg-ligghtGray rounded-full"/>
                        <h1 className="font-bold text-xl text-lightBlack">Profile</h1>
                    </div>

                    <div className="flex items-center justify-start gap-5 py-3 border-b-2 border-gray-300">
                        <img src={FontAwosemUser} alt="" className="h-8 w-8 bg-ligghtGray rounded-full"/>
                        <h1 className="font-bold text-xl text-lightBlack">History</h1>
                    </div>

                    <div className="flex items-center justify-start gap-5 py-3 border-b-2 border-gray-300">
                        <img src={FontAwosemUser} alt="" className="h-8 w-8 bg-ligghtGray rounded-full"/>
                        <h1 className="font-bold text-xl text-lightBlack">Call Store Support</h1>
                    </div>

                    <div className="flex items-center justify-start gap-5 py-3 border-b-2 border-gray-300">
                        <img src={FontAwosemUser} alt="" className="h-8 w-8 bg-ligghtGray rounded-full"/>
                        <h1 className="font-bold text-xl text-lightBlack">Help</h1>
                    </div>

                    <div className="flex items-center justify-start gap-5 py-3 border-b-2 border-gray-300">
                        <img src={FontAwosemUser} alt="" className="h-8 w-8 bg-ligghtGray rounded-full"/>
                        <h1 className="font-bold text-xl text-lightBlack">Bank ID</h1>
                    </div>
                </div>
            </div>
           
            <div className="flex items-center justify-center mt-10">
                <button className="bg-buttonColor text-white text-center rounded-full w-[250px] py-3">Log out</button>
            </div>
          </div>
        </div>
    );
}

export default SettingScreen;