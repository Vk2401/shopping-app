import React, { useEffect } from "react";
import LanguageSwitch from '../utils/images/LanguageSwitch.png';
import noLocation from '../utils/images/noLocation.png';

const NolocationScreen=()=>{
    useEffect(()=>{
        console.log('lok');
    },[]);
    return(
        <div className="flex flex-col justify-between h-screen font-poppins">
            <div className="bg-buttonColor py-10 relative px-6 flex flex-col items-center justify-center"
            style={{ borderBottomLeftRadius: '18%', borderBottomRightRadius: '18%' }}>
                {/* <img src={LanguageSwitch} alt="" className="w-10 h-10 absolute right-5"/> */}
            </div>

            <div className="flex flex-col h-full items-center justify-between px-6 pt-10">
                <div className="flex flex-col items-center h-1/2 py-10 pt-20 w-full gap-3">
                  <img src={noLocation} alt="" className="w-[280px] h-[350px]" />

                    <div className="flex flex-col items-center gap-3">
                        <h3 className="text-redColor font-bold text-2xl">No Access to Location</h3>
                        <h4 className="text-black text-lg font-semibold text-center text-wrap">
                        Please Enable location permission <br /> to unlock all the Awesome features <br /> of our App!
                        </h4>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center  h-1/2 w-full relative">
                 <button  className="bg-redColor text-white text-center rounded-full w-[250px] py-4 absolute bottom-24 font-bold">Enable Location</button>
                </div>
            </div>
        </div>
    );
}

export default NolocationScreen;