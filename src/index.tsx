import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ethers } from 'ethers';

import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { NotiStackProvider } from './context';
import { store } from './store';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Suspense fallback={null}>
        <Provider store={store}>
            <NotiStackProvider>
              <App />
            </NotiStackProvider>
        </Provider>
    </Suspense>
  </React.StrictMode>
);

reportWebVitals();
