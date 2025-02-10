import React, { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

import routes from '../constants/routes';
import { AuthLayout, HomeLayout } from '../layouts';
import PrivateRoute from './privateRoute';

const LoginPage = lazy(() => import('../pages/Login'));
const SignInPage = lazy(() => import('../pages/SignIn'));
const SignUpPage = lazy(() => import('../pages/SignUp'));
const WelcomeScreen = lazy(() => import('../pages/WelcomeScreen'));

const Routers = () => {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path={routes.loginPage} element={<LoginPage />} />
        <Route path={routes.loginPage} element={<AuthLayout />}>
          <Route path={routes.signInPage} element={<SignInPage />} />
          <Route path={routes.signUpPage} element={<SignUpPage />} />
        </Route>
      </Route>

      <Route path={routes.loginPage} element={<HomeLayout />}>
        <Route path={routes.welcomeScreenPage} element={<WelcomeScreen />} />
      </Route>
    </Routes>
  );
};

export default React.memo(Routers);
