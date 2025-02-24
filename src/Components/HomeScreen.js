import react from "react";
import userIcon from '../utils/images/FontAwosemUser.png';
import VM from '../utils/images/VM.png';
import StoresImage from '../utils/images/location.png';
import { useNavigate } from 'react-router-dom';

const HomeScreen=()=>{
    const navigate = useNavigate();
    return(
        <div className="h-screen w-full">
            <div className="flex items-center justify-center relative h-16 fixed top-0 w-full py-5 px-5">
              <h1 className="text-lightBlack font-bold text-xl">Shopping App</h1>
              <img onClick={() => navigate(`/settings`)} src={userIcon} alt="" className="absolute right-2 h-8 w-8" />
            </div>

            <div className="h-[93%] flex items-center justify-center gap-4">
                <img src={StoresImage} alt="" className="h-24 w-24"/>
                
                <img src={VM} alt="" className="h-24 w-24"/>
            </div>
        </div>
    )
}

export  default HomeScreen;