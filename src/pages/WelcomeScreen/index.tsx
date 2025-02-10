import React from 'react';
import { useSelector } from 'react-redux';

import { AppLoader } from '../../components';
import { UserState } from '../../redux/userSlice';

function WelcomeScreen() {
  const { userDetails, isLoading }: UserState = useSelector(
    (state: UserState) => state?.userDetails
  );

  return (
    <>
      <div className="verify-page-inside d-flex flex-column align-center p-24">
        {!isLoading && (
          <>
            <div className="relative h-100 index-1">
              <div className="flex-1 d-flex flex-column justify-center h-100 relative index-1">
                <div className="flex-1 d-flex align-center h-100">
                  <div className="text-center">
                    <p className="f-48 mb-16">🎉</p>
                    <h1 className="f-28 f-w-700 l-h-normal txt-primary mb-20 px-32">
                      {userDetails?.firstName ? `${userDetails?.firstName}, ` : ''}
                      Welcome to Easy Generator!
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <AppLoader loading={isLoading} />
    </>
  );
}

export default WelcomeScreen;
