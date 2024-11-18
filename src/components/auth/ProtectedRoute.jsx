import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext' ;



export const ProtectedRoute = ({ children }) => {
  const { user, tokens, refreshToken } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  

  useEffect(() => {
    const checkAuth = async () => {
      if (!tokens) {
        window.location.href = '/login';
        return;
      }
  
      // If tokens exist, check expiration or refresh if needed
      try {
        const tokenData = JSON.parse(atob(tokens.access.split('.')[1]));
        const expirationTime = tokenData.exp * 1000; // Convert to milliseconds
  
        if (Date.now() >= expirationTime) {
          const refreshSuccess = await refreshToken();
          if (!refreshSuccess) {
            window.location.href = '/login';
            return;
          }
        }
      } catch (error) {
        console.error('Token validation error:', error);
        window.location.href = '/login';
        return;
      }
  
      setIsLoading(false); // Set loading to false once checks are done
    };
  
    checkAuth();
  }, [tokens, refreshToken]); // Dependencies list
  

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return children;
};
