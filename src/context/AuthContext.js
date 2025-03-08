import { createContext, useEffect, useState, useContext, useCallback } from "react";
import axios from "axios";
const AuthContext = createContext();

// Custom hook for easy access
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("accessToken"));
  const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem("refreshToken"));
  const [tokenExpiry, setTokenExpiry] = useState(localStorage.getItem("tokenExpiry"));
  const apiUrl = process.env.REACT_APP_AUTH_API_URL

  // Function to store tokens in session storage
  const storeTokens = (accessToken, expiresAt, refreshToken, user, rtExpireAt) => {
    localStorage.setItem('refreshTokenExpireAt', rtExpireAt);
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem("tokenExpiry", new Date(expiresAt).getTime()); // Convert to timestamp
    console.log('accessToken');
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    setIsAuthenticated(true);
  };



  // Function to refresh access token
  const refreshAccessToken = useCallback(async () => {
    let retryCount = 0;  // Track retry attempts

    while (retryCount < 3) {
      try {
        const response = await axios.post(`${apiUrl}/auth/refresh-tokens`, {
          refreshToken,
        });

        const { token, expires } = response.data.access;

        // Store new tokens
        setAccessToken(token);
        setTokenExpiry(new Date(expires).getTime());
        localStorage.setItem("accessToken", token);
        localStorage.setItem("tokenExpiry", new Date(expires).getTime());

        return token;  // Return the new token if the refresh is successful

      } catch (error) {
        retryCount++;  // Increment retry count
        console.error(`Token refresh failed. Attempt ${retryCount}:`, error);

        // If retry count reaches 3, return null
        if (retryCount === 3) {
          console.error("Failed to refresh token after 3 attempts.");
          localStorage.clear();
          window.location.href = "/login";  // Redirect to login if all attempts fail
          return null;
        }
      }
    }

    return null;  // Return null if all attempts fail
  }, [refreshToken, apiUrl]);

  // Schedule token refresh before it expires (1 minute before expiry)
  useEffect(() => {
    if (!tokenExpiry) {
      console.log(localStorage.getItem('lastLocation'));
      return
    };

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
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("tokenExpiry");
    localStorage.removeItem("user");
    localStorage.removeItem('lastLocation');
    localStorage.removeItem('refreshTokenExpireAt');
    localStorage.removeItem('currence');
    localStorage.removeItem('cart');
    localStorage.removeItem('total');
    localStorage.removeItem('storeID');
    localStorage.removeItem('orderReferance');
 
    setIsAuthenticated(false);
  };

  const checkTokenExpiration = () => {
    const expiresAt = localStorage.getItem("refreshTokenExpireAt");
    if (!expiresAt) return;

    const currentTime = new Date().getTime(); // Current time in milliseconds
    const expiryTime = new Date(expiresAt).getTime(); // Convert stored string to timestamp

    if (currentTime >= expiryTime) {
      console.log("Token expired. Logging out...");
      logout();
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, logout, accessToken, refreshAccessToken, storeTokens, checkTokenExpiration }}>
      {children}
    </AuthContext.Provider>
  );
};