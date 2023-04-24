import logo from './logo.svg';
import './App.css';
import React, {  useState, useEffect } from "react";
import Cookies from 'js-cookie'
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Web3 from "web3";
import WalletConnectProvider from '@walletconnect/web3-provider';
import Navigation from './components/nav'
import LoginPage from "./pages/login";
import ManagePage from "./pages/manage";
import LendPage from "./pages/lend";

function App() {

  const [isConnected, setIsConnected] = useState(false)
  const [accounts, setAccounts] = useState(Cookies.get('accounts'))
  const [chain, setChain] = useState(Cookies.get('chain'))
  const [isMobile, setIsMobile] = useState(false)
  const [shouldForceModalOpen, setShouldForceModalOpen] = useState(false)
  const [WCprovider, setWCprovider] = useState(new WalletConnectProvider({
    infuraId: '0c25d41077e64c19b03c9d89d76ac4ea',
}))

 const chainIds = [
    { id: 1, name: 'Ethereum' },
    { id: 5, name: 'Goerli' },
]


    // Subscribe to accounts change
    WCprovider.on('accountsChanged', (accounts) => {
      Cookies.set('accounts', accounts)
      Cookies.set('chain', chainIds.filter((chain) => chain.id === WCprovider.chainId)[0].name)
      setIsConnected(true)
      setAccounts(accounts)
  })

  // Subscribe to chainId change
  WCprovider.on('chainChanged', (chainId) => {
      console.log('Chain ID: ', chainId)
      setChain(chainIds.filter((chain) => chain.id === chainId)[0].name)
  })

  // Subscribe to session disconnection
  WCprovider.on('disconnect', (code, reason) => {
      console.log(code, reason)
      setIsConnected(false)
  })


  useEffect(() => {
    const checkSession = async () => {
        if (WCprovider.connector._connected) {
            // Load account data and populate wallet/evm stores
            await WCprovider.enable()
        }
    }
    checkSession()
}, [])


  return (
    <Router>
      <div className="App">
      <Routes>
      <Route path={"/"} element={ 
        <>
        <LoginPage />
        </>}/>
      <Route path={"/login"} element={
        <>
          <LoginPage />
        </>
      }/>
        <Route path={"/manage"} element={
        <>
          <Navigation
              setAccounts={setAccounts}
              setChain={setChain}
              provider={WCprovider}
              isConnected={isConnected}
              chain={chain}
              address={accounts ? accounts[0] : null}
              isMobile={isMobile}
              setIsConnected={setIsConnected}
              setProvider={setWCprovider}
          />
          <ManagePage />
        </>
        
      }/>
        <Route path={"/lend"} element={
        <>
          <Navigation
              setAccounts={setAccounts}
              setChain={setChain}
              provider={WCprovider}
              isConnected={isConnected}
              chain={chain}
              address={accounts ? accounts[0] : null}
              isMobile={isMobile}
              setIsConnected={setIsConnected}
              setProvider={setWCprovider}
          />
          <LendPage />
        </>
        
      }/>
      </Routes>
      </div>
    </Router>

  );
}

export default App;
