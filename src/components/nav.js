import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../img/Logo.png'
import { ConnectButton } from "@rainbow-me/rainbowkit";
//import LogoDesktop from '../img/logo-horizontal@3x.png'
import './nav.scss'
import { MdFiberManualRecord } from 'react-icons/md'
import Cookies from 'js-cookie'
import WalletConnectProvider from '@walletconnect/web3-provider'

import Tooltip from './tooltip/tooltip'
import eth from '../img/eth-icon.png'
const chainIds = [
    { id: 1, name: 'Ethereum' },
]

export default function Navigation({
    isMobile,
    isConnected,
    address,
    chain,
    provider,
    setAccounts,
    setChain,
    setIsConnected,
    setProvider
}) {
    const [isLogin, setIsLogin] = useState(Cookies.get('isLogin'))
    const [currPage, setCurrPage] = useState('/')


    const disconnectWallet = async () => {
        await provider.disconnect()
        Cookies.set('chain', '')
        Cookies.set('accounts', '')
        setAccounts('')
        setChain('')
    }

    const connectWallet = async () => {

        let newProvider = new WalletConnectProvider({
            infuraId: '0c25d41077e64c19b03c9d89d76ac4ea',
        })
        try{
            await newProvider.enable() 
            setProvider(newProvider)
            setChain(chainIds.filter((chain) => chain.id === provider.chainId)[0].name)
            setAccounts(newProvider.accounts)
            Cookies.set('accounts', newProvider.accounts)
            Cookies.set('chain', chainIds.filter((chain) => chain.id === provider.chainId)[0].name)
            setIsConnected(true)
        }catch(e){
            console.log(e)
        }
    }


    useEffect(() => {
        setCurrPage(document.URL)
    })

    return (
        <div className="nav_wrapper">

                    <div className="links">
                    <Link to="/" style={{width:"200px"}}>
                            <img src={Logo} className="left_logo" alt="logo" />
                    </Link>
                        {/* <Link
                            to="/manage"
                            className={
                                currPage.includes('manage') ||
                                currPage.charAt(currPage.length - 1) === '/'
                                    ? 'nav_option nav_selected'
                                    : 'nav_option'
                            }
                        >
                            {' '}
                            <label> Manage </label>{' '}
                        </Link> */}

                        <Link
                            to="/lend"
                            className={
                                currPage.includes('lend') || currPage.includes('createNewCard')
                                    ? 'nav_option nav_selected'
                                    : 'nav_option'
                            }
                        >
                            {' '}
                            <label> Lend </label>{' '}
                        </Link>
                       
                    </div>

                    <div className="left_nav ">
                                <ConnectButton
                                accountStatus={{
                                    smallScreen: 'avatar',
                                    largeScreen: 'full',
                                  }}
                                  showBalance={{
                                    smallScreen: false,
                                    largeScreen: true,
                                  }}
                                />
                    </div>
        </div>
    )
}
