import React from "react";
import LanguageSwitch from '../utils/images/LanguageSwitch.png'
import location from '../utils/images/location.png'
import locationImage from '../utils/images/locatioImage.png'


const NotclosetoStore=()=>{
    return(
        <div className="flex flex-col justify-between h-screen w-full font-poppins">
            <div className="bg-buttonColor py-10 relative flex flex-col items-center justify-center"
            style={{ borderBottomLeftRadius: '38%', borderBottomRightRadius: '38%' }}>
                <img src={LanguageSwitch} alt="" className="w-10 h-10 absolute right-5"/>
            </div>

            <div className="flex flex-col items-center justify-around h-full py-10">
                <div className="flex flex-col gap-7">
                    <strong className="text-2xl font-bold text-black text-center">You are not close to <br /> our Store</strong>
                    <div className="flex flex-col items-center gap-5 bg-ligghtGray px-5 py-8 rounded-xl">
                        <img src={location} alt="" className="h-[110px] w-[110px]"/>
                        <p className="text-black text-wrap text-center font-xl font-semibold">Make sure you are within <br /> 50 meters of br the store to utilize <br /> our App's features</p>
                   </div>   
                </div>
            </div>

            <div className="flex flex-col gap-5 items-center px-11 h-2/3 py-10">
                <strong className="text-black">Nearby Store</strong>

                <div className="flex bg-ligghtGray justify-between items-center w-full py-2 px-2 rounded-md">
                    <div className="flex">
                        <img src={locationImage} alt="" className="h-10 w-10"/>
                        <div className="flex flex-col">
                                <span className="text-buttonColor text-left text-xl font-semibold ">Bäckefors</span>
                                <span className="text-left">Lasarettsvägen 1</span>
                        </div>
                    </div>

                    <strong className="text-black">200 m</strong>
                </div>

                <button className="bg-buttonColor text-white text-center text-lg font-semibold rounded-full w-[250px] py-3">Get Direction</button>
                <button className="bg-ligghtGray text-black text-center text-lg font-semibold rounded-full w-[250px] py-3">Find Other Stores</button>
            </div>
        </div>
    );
}

export default NotclosetoStore;