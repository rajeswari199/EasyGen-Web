import React from 'react';

import { Close } from '@mui/icons-material';
import { IconButton } from '@mui/material';

import * as NotiStack from 'notistack';

interface Props {
  children: React.ReactNode;
}

export const NotiStackProvider = ({ children }: Props): JSX.Element => {
  const notiStackRef = React.createRef<NotiStack.SnackbarProvider>();

  const onCloseSneakBar =
    ({ key }: { key: NotiStack.SnackbarKey }) =>
    () => {
      notiStackRef.current?.closeSnackbar(key);
    };

  return (
    <NotiStack.SnackbarProvider
      ref={notiStackRef}
      action={(key: NotiStack.SnackbarKey) => (
        <IconButton color="inherit" onClick={onCloseSneakBar({ key })}>
          <Close />
        </IconButton>
      )}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      maxSnack={1}>
      {children}
    </NotiStack.SnackbarProvider>
  );
};
