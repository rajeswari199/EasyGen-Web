import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { AuthHeader } from '../../components';
import routes from '../../constants/routes';

const AuthLayout = () => {
  return (
    <div className="app-container">
      <div className="app-layout">
        <div className={'signup-page'}>
          <AuthHeader />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default React.memo(AuthLayout);
