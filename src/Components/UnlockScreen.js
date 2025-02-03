import React from "react";
import bgImage from '../utils/images/desktop-bg.png';

const UnlockScreen=()=>{
    return(
        <div className="w-full h-screen flex justify-center items-center"
            style={{ backgroundImage: `url(${bgImage})`,
            backgroundSize: "contain",}}>
                <img src="" alt="" />
            <h1 className="text-white">Door has been Unlocked!</h1>
       </div>
    );
}

export default UnlockScreen;