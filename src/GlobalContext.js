import React, { createContext, useState } from "react";

// Create the context
export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  // Define a global state
  const [isLocationEnabled, setIsLocationEnabled] = useState(false);

  return (
    <GlobalContext.Provider value={{ isLocationEnabled, setIsLocationEnabled }}>
      {children}
    </GlobalContext.Provider>
  );
};
