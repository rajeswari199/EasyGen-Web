import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';

//Material Design
import { Button, FormControl, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import { SignIn } from '../../common/interface/signIn.interface';
import { AppLoader, Input } from '../../components';
import routes from '../../constants/routes';
import { UserState, loginUser } from '../../redux/userSlice';

const SignInPage = () => {
  const [isVisibility, setIsVisibility] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<SignIn>({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { userDetails, isLoading, loginSuccess } = useSelector(
    (state: UserState) => state?.userDetails
  );

  const changeVisibility = () => setIsVisibility((prevState) => !prevState);

  useEffect(() => {
    if (loginSuccess) {
      navigate(routes.welcomeScreenPage);
    }
  }, [loginSuccess])

  const userLogin = async (credential: SignIn) => {
    const deviceId = localStorage.getItem('deviceId');
    const id = deviceId || uuid();
    dispatch(loginUser(credential, id));
  };

  return (
    <div className="signup-page-inside d-flex flex-column align-center p-24">
      <form
        className="w-50 flex-1 d-flex flex-column justify-center h-100 relative index-1"
        onSubmit={handleSubmit((data) => userLogin(data))}>
        <div className="flex-1 d-flex flex-column align-center h-100">
          <h1 className="flex-1 f-28 f-w-700 l-h-normal txt-primary mb-24">Sign in</h1>
          <Controller
            name="email"
            control={control}
            render={() => (
              <FormControl variant="outlined" fullWidth className="mb-16">
                <label className="form-label">Email</label>
                <Input
                  placeholder="example@gmail.com"
                  {...register('email', {
                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, message: 'Please enter a valid email' },//eslint-disable-line
                    required: 'Please enter you email'
                  })}
                />
                <p className="w-100 txt-error mt-10 f-w-600">{errors?.email?.message}</p>
              </FormControl>
            )}
          />
          <Controller
            name="password"
            control={control}
            render={() => (
              <FormControl variant="outlined" fullWidth>
                <label className="form-label">Password</label>
                <Input
                  placeholder="***********"
                  type={isVisibility ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton onClick={changeVisibility}>
                        {isVisibility ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                  {...register('password', {
                    required: 'Please enter a password',
                    pattern: {
                      value: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/,//eslint-disable-line
                      message: `Password must be \n o Minimum length of 8 characters. \n o At least one letter. \n  o At least one number. \n o At least one special character.`//eslint-disable-line
                    }
                  })}
                />
                <p className="w-100 txt-error mt-10 f-w-600 new-line">{errors?.password?.message}</p>
              </FormControl>
            )}
          />
        </div>
        <div className="flex-1 w-100 text-center relative index-1 mb-24">
          <Button type="submit" variant="contained" color="primary" size="large" fullWidth>
            Sign In
          </Button>
        </div>
      </form>
      <AppLoader loading={isLoading} />
    </div>
  );
};

export default React.memo(SignInPage);
