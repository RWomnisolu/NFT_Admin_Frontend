import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient } from "wagmi";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { publicProvider } from "wagmi/providers/public";
import {infuraProvider} from 'wagmi/providers/infura';
import { injectedWallet, rainbowWallet, metaMaskWallet, walletConnectWallet } from '@rainbow-me/rainbowkit/wallets'

export const { chains, provider, webSocketProvider } = configureChains(
    [chain.mainnet, chain.goerli],
    [
        infuraProvider({ apiKey: "75380172c9e4497f9dcea1187985e92b"}),
        publicProvider(),
    ],
);

const needsInjectedWalletFallback =
    typeof window !== "undefined" &&
    window.ethereum &&
    !window.ethereum.isMetaMask &&
    !window.ethereum.isCoinbaseWallet;

const connectors = connectorsForWallets([
    {
        groupName: "Popular",
        wallets: [

        	injectedWallet({ chains }),
			metaMaskWallet({ chains }),
			rainbowWallet({ chains }),
			walletConnectWallet({ chains })
        ],
        
    }
]);

export const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
});