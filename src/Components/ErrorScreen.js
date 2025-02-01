import React from "react";

const ErrorScreen=()=>{
    return(
        <div className="flex flex-col">
            <div className="bg-buttonColor">
                <img src="" alt="" />
            </div>

            <div className="flex flex-col justify-center items-center">
                <img src="" alt="" />
                <h1 className="text-redColor">Something went Wrong!</h1>
                <h2 className="">We were not able verify your Bank ID Account. Please Try Again.</h2>
            </div>

            <button className="bg-redColor rounded-md text-center">Retry</button>
        </div>
    )
}

export default ErrorScreen;