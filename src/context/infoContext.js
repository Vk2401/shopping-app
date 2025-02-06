import  {React,createContext,useContext,useEffect,useState} from 'react';

const infoContext=createContext();

const InfoProvider=({children})=>{
    const apiBase='https://devapi-tanlux.storetech.ai';
    const env='demo';

    return(
        <infoContext.Provider value={{apiBase,env}}>
            {children}
        </infoContext.Provider>
    )

}

export const useInfo=()=>useContext(infoContext);
export default InfoProvider;