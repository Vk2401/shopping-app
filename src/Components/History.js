import React ,{useEffect}from "react";
import arrow from '../utils/images/arrow-circle-left_solid.png';
import closeicon from '../utils/images/ios-close-circle.png';
import rightArrow from '../utils/images/rightArrow.png';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.js";

const History=()=>{
    const { isAuthenticated, logout } = useAuth();
    const navigate=useNavigate();

    useEffect(()=>{
        if(!isAuthenticated){
            navigate('/');
        }
    },[])
    
    return(
        <div className="flex flex-col px-6 h-screen font-poppins">
          <div className="flex items-center justify-between py-8">
            <img src={arrow} alt="" className=" h-10 w-10" onClick={()=>{navigate('/settings')}}/>
             <strong className="font-bold text-2xl">History</strong>
             <img src={closeicon} alt="" className=" h-9 w-9" onClick={()=>{navigate('/products')}}/>
          </div>

          <div className="flex flex-col gap-3 f-full overflow-scroll"> 
            <div className="flex justify-between items-center bg-ligghtGray py-5 rounded-lg px-5">
                <div className="flex flex-col items-start gap-1 tracking-wider">
                    <strong className="font-bold text-xl">Order Receipt <strong className="text-buttonColor"> #123455</strong></strong>
                    <span className="font-semibold text-lg text-lightBlack">Date:12-12-2024</span>
                </div>
                <img src={rightArrow} alt="" className="h-7 w-7"  />
            </div>

            <div className="flex justify-between items-center bg-ligghtGray py-5 rounded-lg px-5">
                <div className="flex flex-col items-start gap-1 tracking-wider">
                    <strong className="font-bold text-xl">Order Receipt <strong className="text-buttonColor"> #123455</strong></strong>
                    <span className="font-semibold text-lg text-lightBlack">Date:12-12-2024</span>
                </div>
                <img src={rightArrow} alt="" className="h-7 w-7"  />
            </div>

            <div className="flex justify-between items-center bg-ligghtGray py-5 rounded-lg px-5">
                <div className="flex flex-col items-start gap-1 tracking-wider">
                    <strong className="font-bold text-xl">Order Receipt <strong className="text-buttonColor"> #123455</strong></strong>
                    <span className="font-semibold text-lg text-lightBlack">Date:12-12-2024</span>
                </div>
                <img src={rightArrow} alt="" className="h-7 w-7"  />
            </div>
          </div>
        </div>
    );
}

export default History;