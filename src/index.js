import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { useEffect, useState } from "react";
import { WagmiConfig } from "wagmi";
import '@rainbow-me/rainbowkit/styles.css'
import {
  apiProvider,
  configureChains,
  getDefaultWallets,
  RainbowKitProvider,
  lightTheme,
} from "@rainbow-me/rainbowkit";
import { chains, wagmiClient } from "./config/wagmi";



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
            <WagmiConfig client={wagmiClient}>
            <RainbowKitProvider chains={chains} 
							initialChain={chains.mainnet}
							showRecentTransactions={true}
							modalSize="compact">
            <App />
            </RainbowKitProvider>
        </WagmiConfig>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
