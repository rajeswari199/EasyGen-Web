import React from 'react';

export const useLocalStorage = () => {
  const [token, setToken] = React.useState<string | null>('');

  const getUserToken = () => {
    const userToken = localStorage.getItem('usertk');
    const sessionToken = sessionStorage.getItem('usertk');
    if (!userToken) {
      setToken(sessionToken);
    } else if (!sessionToken) {
      setToken(userToken);
    } else {
      setToken(null);
    }
  };

  React.useEffect(() => {
    getUserToken();
  }, []);

  return token;
};
