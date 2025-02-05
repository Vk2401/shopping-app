import React,{useContext} from "react";
import bgImage from '../utils/images/desktop-bg.png';

const Systemscreen = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center"
    style={{ backgroundImage: `url(${bgImage})`,
      backgroundSize: "contain",
    
     }}>
        <h1 className="text-white">Please Login using an Mobile Device to get access to our App</h1>
    </div>
  );
};

export default Systemscreen;
