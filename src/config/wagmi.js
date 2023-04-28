import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient } from "wagmi";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { publicProvider } from "wagmi/providers/public";
import { injectedWallet, rainbowWallet, metaMaskWallet, walletConnectWallet } from '@rainbow-me/rainbowkit/wallets'

export const { chains, provider, webSocketProvider } = configureChains(
    [chain.mainnet, chain.goerli],
    [
        // alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID }),
        jsonRpcProvider({ rpc: (chain) => ({ http: chain.rpcUrls.default }) }),
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