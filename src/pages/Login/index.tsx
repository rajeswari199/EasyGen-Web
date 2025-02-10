import React from 'react';

import { useNavigate } from 'react-router-dom';
//Material Import
import { Button } from '@mui/material';

import routes from '../../constants/routes';

function LoginPage() {
  const navigate = useNavigate();

  const navigatePage = (pageUrl: string) => {
    navigate(pageUrl);
  };

  return (
    <div className="app-container">
      <div className="app-layout">
        <div className="login-page relative p-24">
          <div className="d-flex h-100 flex-column align-center relative index-1">
            <div className="flex-1 d-flex align-center">
              <h1>Easy Generator</h1>
            </div>
            <div className="w-50 text-center mb-24">
              <Button
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                onClick={() => navigatePage(routes.signInPage)}>
                Sign in
              </Button>
              <Button
                onClick={() => navigatePage(routes.signUpPage)}
                variant="contained"
                color="secondary"
                size="large"
                className="mt-16"
                fullWidth>
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
