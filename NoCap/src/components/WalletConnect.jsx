import React, { useState, useRef } from "react";
import { ethers } from "ethers";

const WalletConnect = ({ onSign }) => {
    const [account, setAccount] = useState("");
    const providerRef = useRef(null);

    const getProvider = () => {
        if (typeof window !== "undefined" && window.ethereum && !providerRef.current) {
            providerRef.current = new ethers.BrowserProvider(window.ethereum);
        }
        return providerRef.current;
    };

    const connectWallet = async () => {
        const provider = getProvider();
        if (!provider) {
            alert("Please install MetaMask!");
            return;
        }
        try {
            await window.ethereum.request({ method: "eth_requestAccounts" });
            const signer = await provider.getSigner();
            const address = await signer.getAddress();
            setAccount(address);
        } catch (error) {
            console.error("Error connecting wallet:", error);
        }
    };

    const signVerification = async () => {
        const provider = getProvider();
        if (!account || !provider) return;
        try {
            const signer = await provider.getSigner();
            const message = "I verify that I have checked this news content on NoCap Detector.";
            const signature = await signer.signMessage(message);
            console.log("Signature:", signature);
            if (onSign) onSign(signature);
            alert("Verification Signed! Hash: " + signature.slice(0, 10) + "...");
        } catch (error) {
            console.error("Error signing message:", error);
        }
    };

    return (
        <div className="flex items-center gap-4">
            {!account ? (
                <button
                    onClick={connectWallet}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-white font-medium transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 015.656 0l4 4a4 4 0 01-5.656 5.656l-1.102-1.101" />
                    </svg>
                    Connect Wallet
                </button>
            ) : (
                <div className="flex items-center gap-3">
                    <div className="flex flex-col">
                        <span className="text-xs text-gray-400">Connected:</span>
                        <span className="text-sm font-mono text-green-400">
                            {account.slice(0, 6)}...{account.slice(-4)}
                        </span>
                    </div>
                    <button
                        onClick={signVerification}
                        className="px-3 py-1 bg-purple-600 hover:bg-purple-500 rounded text-xs text-white font-bold tracking-wide transition-colors"
                    >
                        SIGN CHECK
                    </button>
                </div>
            )}
        </div>
    );
};

export default WalletConnect;
