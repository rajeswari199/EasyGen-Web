import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { routes } from '../constants/routes';
import { useLocalStorage } from '../hooks';

const PrivateRoute = () => {
  const { pathname } = useLocation();
  let userToken;
  const [isValidToken, setIsValidToken] = useState('')
  // const token = localStorage.getItem('usertk');
  useEffect(() => {
    // initial mount or route changed, check token
    const token = localStorage.getItem('usertk');
    // userToken = useLocalStorage();
    console.log('userToken in private route', pathname, token, localStorage.getItem('usertk'))
    setIsValidToken(token || '');
  }, [pathname]);

  if (isValidToken === undefined) {
    return null; // or loading indicator/spinner/etc
  }

  return !userToken ? (
    <>
      <Outlet />
    </>
  ) : (
    <Navigate to={routes.welcomeScreenPage} />
  );
};
export default PrivateRoute;
