import React from "react";

const BannedScreen=()=>{
    return(
        <div className="flex flex-col bg-redColor">
            <span className="bg-white text-redColor">X</span>
            <div className="flex flex-col">
                <img src="" alt="" />
                <h1>You have been Banned!</h1>
                <p>You have been banned from entering StoreTech Stores</p>
            </div>

            <div className="flex flex-col justify-center items-center gap-5 rounded-md">
                <span>For more information</span>
                <button className="flex justify-center items-center bg-buttonColor rounded-md">Call Support</button>
                <button className="flex justify-center items-center bg-buttonColor rounded-md">Mail Support</button>
            </div>
        </div>
    )
}

export default BannedScreen;