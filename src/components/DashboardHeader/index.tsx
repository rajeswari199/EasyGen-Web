import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//Material
import { LogoutOutlined } from '@mui/icons-material';

//styles
import './style.scss';
import { UserState, logoutUser } from '../../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import routes from '../../constants/routes';

const DashboardHeader = () => {

  const dispatch = useDispatch();

  const { logoutSuccess } = useSelector(
    (state: UserState) => state?.userDetails
  );

  const navigate = useNavigate();

  useEffect(() => {
    if(logoutSuccess){
      navigate(routes.loginPage)
    }

  }, [logoutSuccess])

  return (
    <div className="dashboard-header bg-secondary d-flex justify-between align-center px-16">
      <div className="w-100 d-grid place-center">
        <h1>Easy Generator</h1>
      </div>
      <div>
        <LogoutOutlined className="small bordered cursor-pointer" onClick={() => dispatch(logoutUser())} />
      </div>
    </div>
  );
};

export default React.memo(DashboardHeader);
