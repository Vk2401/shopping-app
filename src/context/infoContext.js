import  {React,createContext,useContext,useEffect,useState} from 'react';
import axios from 'axios';

const infoContext=createContext();

const InfoProvider=({children})=>{
    let apiUrl = process.env.REACT_APP_API_URL;
    let env=process.env.REACT_APP_ENVIRONMENT;
    
    const {storeID,setStoreID}=useState('');
    const apiBase=apiUrl;
    env='demo';


    const refreshTokenFunction = async () => {
        const refreshToken = sessionStorage.getItem('refreshToken');
        const maxAttempts = 3;  // Max number of retries
        let attempt = 0;

      
        while (attempt < maxAttempts) {
          try {
            const response = await axios.post(
              `${apiBase}/auth/refresh-tokens`, // Endpoint URL
              {
                refreshToken: refreshToken, // Pass the refresh token in the body
              },
              {
                headers: {
                  'accept': 'application/json', // Set 'accept' header to application/json
                  'Content-Type': 'application/json', // Specify that we're sending JSON data
                  'env': env, // Add any other headers you may need (like 'env')
                },
              }
            );
      
            // If status code is 200, break the loop and return the response
            if (response.status === 200) {
              sessionStorage.removeItem('accessToken');
              sessionStorage.removeItem('refreshToken');
        

              sessionStorage.setItem('accessToken',response.data.access.token);
              sessionStorage.setItem('refreshToken',response.data.refresh.token);
              return ;  // Optionally, return the data from the response
            }
      
            // If status code is not 200, increment attempt and retry
            attempt += 1;
            console.log(`Attempt ${attempt} failed, retrying...`);
          } catch (err) {
            attempt += 1;
            console.error(`Error on attempt ${attempt}:`, err);
            if (attempt >= maxAttempts) {
              console.error('Max attempts reached, giving up.');
              throw err;  // Throw the error if max retries are reached
            }
          }
        }
      };
      

    return(
        <infoContext.Provider value={{apiBase,env,refreshTokenFunction,storeID,setStoreID}}>
            {children} 
        </infoContext.Provider>
    )

}

export const useInfo=()=>useContext(infoContext);
export default InfoProvider;