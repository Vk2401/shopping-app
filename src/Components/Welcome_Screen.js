import React from "react";

const Welcome_Screen=()=>{
    return(
        <div className="flex flex-col">
            <div className="flex flex-col">
                <h2 className="text-white">Welcome !</h2>
                <img src="" alt="" />
            </div>

            <div>
                <img src="" alt="" />

                <div>
                    <button className="bg-buttonColor text-white">Sign in using Bank ID</button>
                    <p>By Signing In you accept our <span className="text-buttonColor">Terms of Services</span> and <span className="text-buttonColor">Privacy Policy</span></p>
                </div>
            </div>
        </div>
    );
}

export default Welcome_Screen;