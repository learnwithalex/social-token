"use client";
import React, { useState, useEffect, useCallback } from "react";
import {
  Connection,
  Transaction,
  PublicKey,
  clusterApiUrl,
  TransactionInstruction,
} from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";

// Set up the connection to Solana Devnet
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
const programId = new PublicKey("CFv7S7oqqJNP24damGJA4XpHfSMJLzyhCSNjkRmXMjAe"); // Replace with your contract's Program ID

const Page = () => {
  const [signature, setSignature] = useState("");

  // Get the wallet object using useWallet hook
  const { publicKey, sendTransaction, connected } = useWallet();

  const toWallet = new PublicKey(
    "CFv7S7oqqJNP24damGJA4XpHfSMJLzyhCSNjkRmXMjAe",
  ); // The recipient's wallet (replace with actual)

  const createToken = useCallback(async () => {
    if (!publicKey) {
      alert("Please connect your wallet!");
      return;
    }

    // Create transaction instruction
    const instruction = new TransactionInstruction({
      keys: [
        { pubkey: publicKey, isSigner: true, isWritable: true }, // Use the connected wallet's public key
        { pubkey: toWallet, isSigner: false, isWritable: true },
      ],
      programId,
      data: Buffer.from([]), // Add any arguments required by your smart contract method
    });

    // Create the transaction
    const transaction = new Transaction().add(instruction);

    // Send the transaction using the connected wallet
    try {
      const txSignature = await sendTransaction(transaction, connection);
      setSignature(txSignature);
      console.log("Transaction sent with signature:", txSignature);
    } catch (error) {
      console.error("Transaction failed:", error);
    }
  }, [publicKey, sendTransaction, toWallet]);

  return (
    <div>
      <h1>Solana WalletConnect Example</h1>
      {connected && <button onClick={createToken}>Create Token</button>}
      {signature && <p>Transaction signature: {signature}</p>}
    </div>
  );
};

// Wrap the page with ConnectionProvider and WalletProvider
export default function WrappedPage() {
  return <Page />;
}
