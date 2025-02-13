import React from "react";
import closeicon from '../utils/images/WhiteClose.png';
import bannedUser from '../utils/images/ban-user.png';
import group from '../utils/images/Group.png';
import mail from '../utils/images/mail.png';
import phone from '../utils/images/phone.png';

const BannedScreen = () => {
    return (
        <div className="flex flex-col bg-redColor h-screen font-poppins px-6">
            <div className="flex items-center justify-end py-6">
                <img src={closeicon} alt="" className=" h-8 w-8 " />
            </div>

            <div className="flex flex-col text-white h-full">
                <div className="flex flex-col h-1/2 justify-end">
                    <div className="flex flex-col justify-center items-center gap-5">
                        <img src={bannedUser} alt="" className="w-[150px] h-[150px]" />
                        <h1>You have been Banned!</h1>
                        <p>You have been banned from entering <br /> StoreTech Stores</p>
                    </div>
                </div>

                <div className="flex flex-col  justify-end py-10 h-1/2">
                    <div className="flex flex-col justify-center items-center gap-5  bg-white rounded-lg relative py-8">
                        <img src={group} alt="" className="w-8 h-8 absolute -top-4" />
                        <strong className="text-black font-bold">For more information</strong>

                        <button className="bg-buttonColor text-white text-center rounded-full w-[250px] py-3 flex items-center justify-center gap-2">
                            <img src={phone} alt="Phone Icon" className="w-5 h-5" />
                            Call Support
                        </button>

                        <button className="bg-buttonColor text-white text-center rounded-full w-[250px] py-3 flex items-center justify-center gap-2">
                            <img src={mail} alt="Mail Icon" className="w-5 h-5" />
                            Mail Support
                        </button>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default BannedScreen;