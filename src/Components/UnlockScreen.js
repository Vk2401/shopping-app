import React from "react";
import bgImage from '../utils/images/desktop-bg.png';
import Door from '../utils/images/Door.png';


const UnlockScreen=()=>{
    return(
        <div className="w-full h-screen flex justify-center items-center "
            style={{ backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover",}}>
                <img src="" alt="" />
            <img src={Door} alt="" />
            <h1 className="text-white font-bold text-3xl">Door has been Unlocked!</h1>
       </div>
    );
}

export default UnlockScreen;