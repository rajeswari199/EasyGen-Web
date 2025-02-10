import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { DashboardHeader } from '../../components';
import { fetchUserDetails } from '../../redux/userSlice';

const HomeLayout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserDetails());
  }, []);

  return (
    <div className='app-container'>
      <div className='app-layout'>
        <div className='verify-page'>
          <DashboardHeader />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default React.memo(HomeLayout);
