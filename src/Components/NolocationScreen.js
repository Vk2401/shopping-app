import React from "react";


const NolocationScreen=()=>{
    return(
        <div className="flex flex-col">
            <div className="bg-buttonColor">

            </div>

            <div>
                <img src="" alt="" />

                <div className="flex flex-col">
                    <h3 className="text-redColor">No Access to Location</h3>
                    <h4 className="text-black">
                    Please Enable location permission to unlock all the Awesome features of our App!
                    </h4>
                </div>

                <button className="bg-redColor text-white">Enable Location</button>
            </div>
        </div>
    );
}

export default NolocationScreen;