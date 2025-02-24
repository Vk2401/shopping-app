import { createContext, useEffect, useState, useContext,useCallback } from "react";
import axios from "axios";
const AuthContext = createContext();

// Custom hook for easy access
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("authToken"));
  const [accessToken, setAccessToken] = useState(sessionStorage.getItem("accessToken"));
  const [refreshToken, setRefreshToken] = useState(sessionStorage.getItem("refreshToken"));
  const [tokenExpiry, setTokenExpiry] = useState(sessionStorage.getItem("tokenExpiry"));
  const apiUrl = process.env.REACT_APP_AUTH_API_URL

    // Function to store tokens in session storage
    const storeTokens = (accessToken, expiresAt,refreshToken,user) => {
      sessionStorage.setItem("accessToken", accessToken);
      sessionStorage.setItem("refreshToken", refreshToken);
      sessionStorage.setItem('user',JSON.stringify(user));
      sessionStorage.setItem("tokenExpiry", new Date(expiresAt).getTime()); // Convert to timestamp
      
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      setIsAuthenticated(true);
    };

    // Function to refresh access token
    const refreshAccessToken = useCallback(async () => {
      try {
        const response = await axios.post(`${apiUrl}/auth/refresh-tokens`, {
          refreshToken,
        });
  
        const { token, expires } = response.data.access;
  
        // Store new tokens
        setAccessToken(token);
        setTokenExpiry(new Date(expires).getTime());
        sessionStorage.setItem("accessToken", token);
        sessionStorage.setItem("tokenExpiry", new Date(expires).getTime());
  
        return token;
      } catch (error) {
        console.error("Token refresh failed:", error);
        sessionStorage.clear();
        window.location.href = "/login"; // Redirect to login on failure
        return null;
      }
    }, []);

     // Schedule token refresh before it expires (1 minute before expiry)
     useEffect(() => {
      if (!tokenExpiry) return;
  
      const timeUntilRefresh = tokenExpiry - Date.now() - 60000; // Refresh 1 min before expiry
  
      if (timeUntilRefresh > 0) {
        const refreshTimer = setTimeout(() => {
          if (document.visibilityState === "visible") {
            refreshAccessToken();
          }
        }, timeUntilRefresh);
  
        return () => clearTimeout(refreshTimer);
      }
    }, [tokenExpiry, refreshAccessToken]);

  // Logout function
  const logout = () => {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
    sessionStorage.removeItem("tokenExpiry");
    sessionStorage.removeItem("user");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, logout, accessToken, refreshAccessToken, storeTokens }}>
      {children}
    </AuthContext.Provider>
  );
};