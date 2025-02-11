import React from "react";
import thankyou from '../utils/images/Thankyouforshopping.png';
import success from '../utils/images/checklist.png';
import reciptIcon from '../utils/images/reciptIcon.png';
import { useNavigate } from "react-router-dom";
const PaymentSuccess=()=>{
    const navigate=useNavigate();
    return(
        <div className="flex flex-col px-6 h-screen">
            <div className="h-1/2 flex flex-col items-center justify-center mb-10">
              <img src={success} alt="" className="h-20 w-20"/>
              <strong>Payment Successful!</strong>
            </div>

            <div className="h-1/2 flex flex-col gap-5 items-center mb-20">
                <img src={thankyou} alt="" className="w-[300px] h-[250px]"/>

                <div className="flex flex-col gap-5 items-center">
                    <button className="bg-ligghtGray text-black text-center rounded-full w-[250px] py-3 flex items-center justify-center gap-3"><img src={reciptIcon} alt="" className="h-7 w-7"/>  Receipt</button>
                    <button onClick={()=>{navigate('/products')}} className="bg-buttonColor text-lightWhite text-center rounded-full w-[250px] py-3">Done</button>
                </div>
            </div>
        </div>
    );
}
export default PaymentSuccess;