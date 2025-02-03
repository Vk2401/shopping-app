import React from "react";
import arrow from '../utils/images/arrow-circle-left_solid.png';
import closeicon from '../utils/images/ios-close-circle.png';
import rightArrow from '../utils/images/rightArrow.png';

const History=()=>{
    return(
        <div className="flex flex-col px-6 h-screen font-poppins">
          <div className="flex items-center justify-between py-8">
            <img src={arrow} alt="" className=" h-10 w-10 "/>
             <strong className="font-bold text-2xl">History</strong>
             <img src={closeicon} alt="" className=" h-10 w-10 "/>
          </div>

          <div className="flex flex-col gap-6 f-full overflow-scroll"> 
            <div className="flex justify-between items-center bg-ligghtGray py-8 rounded-md px-5">
                <div className="flex flex-col items-start">
                    <strong className="font-bold text-2xl">Order Receipt <strong className="text-buttonColor"> #123455</strong></strong>
                    <span className="font-semibold text-xl text-lightBlack">Date:12-12-2024</span>
                </div>
                <img src={rightArrow} alt="" className="h-7 w-7"/>
            </div>

            <div className="flex justify-between items-center bg-ligghtGray py-8 rounded-md px-5">
                <div className="flex flex-col items-start">
                    <strong className="font-bold text-2xl">Order Receipt <strong className="text-buttonColor"> #123455</strong></strong>
                    <span className="font-semibold text-xl text-lightBlack">Date:12-12-2024</span>
                </div>
                <img src={rightArrow} alt="" className="h-7 w-7"/>
            </div>

            <div className="flex justify-between items-center bg-ligghtGray py-8 rounded-md px-5">
                <div className="flex flex-col items-start">
                    <strong className="font-bold text-2xl">Order Receipt <strong  className="text-buttonColor"> #123455</strong></strong>
                    <span className="font-semibold text-xl text-lightBlack">Date:12-12-2024</span>
                </div>
                <img src={rightArrow} alt="" className="h-7 w-7"/>
            </div>
          </div>
        </div>
    );
}

export default History;