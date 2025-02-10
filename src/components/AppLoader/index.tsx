import React from 'react';
import { CircularProgress, Dialog, DialogContent, styled } from '@mui/material';

import './style.scss';

interface IState {
  loading: boolean;
}

const LoadingDialog = styled(Dialog)(({ theme }) => ({
  background: '#00000038',
  '& .MuiDialog-container': {
    background: '#0000001a !important'
  },
  '& .MuiDialog-paper': {
    background: 'none !important'
  }
}));

const AppLoader = ({ loading }: IState) => {
  return (
    <LoadingDialog open={loading}>
      <DialogContent sx={{ background: 'none' }}>
        <div className="">
          <CircularProgress />
        </div>
      </DialogContent>
    </LoadingDialog>
  );
};

export default React.memo(AppLoader);
