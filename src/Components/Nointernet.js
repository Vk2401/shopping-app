import react, { useState } from "react";
import noInternet from '../utils/images/No-Internet.png'

const Nointernet=()=>{
    const [isChecking, setIsChecking] = useState(false);

    const handleRetry =()=>{

        setIsChecking(true);
        setTimeout(() => {
          if (navigator.onLine) {
            window.location.reload(); // Refresh the app when online
          } else {
            setIsChecking(false); // Stay on screen if still offline
          }
        }, 1000);
    }
    return(
        <div className="font-poppins flex justify-center items-center inset-0 w-full h-screen bg-black bg-opacity-50 px-5">
            <div className="bg-white rounded-lg flex flex-col items-center gap-5 px-5 py-5 ">
                <img src={noInternet} alt="" className="h-24 w-24"/>

                <strong className="font-bold text-xl text-center text-black">Check your Network Connection</strong>
                <p className="text-center text-lightBlack text-lg font-semibold">Please make sure that you have enabled internet connection on your device</p>
                <button onClick={handleRetry} className="bg-redColor text-white rounded-full px-24 py-4 hover:bg-red-500">Retry</button>
            </div>
        </div>
    )
}

export default Nointernet;