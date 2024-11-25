"use client"
import React, { useState } from 'react';
import { Keypair, Transaction, PublicKey, Connection, clusterApiUrl, TransactionInstruction } from '@solana/web3.js';

const Page = () => {
  const [signature, setSignature] = useState('');

  // Set up the connection to Solana Devnet
  const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
  const fromWallet = Keypair.generate(); // Replace with real wallet if needed
  const toWallet = Keypair.generate();

  const programId = new PublicKey('CFv7S7oqqJNP24damGJA4XpHfSMJLzyhCSNjkRmXMjAe'); // Replace with your contract's Program ID

  const createToken = async () => {
    const userPublicKey = fromWallet.publicKey;

    const instruction = new TransactionInstruction({
      keys: [
        { pubkey: userPublicKey, isSigner: true, isWritable: true },
        { pubkey: toWallet.publicKey, isSigner: false, isWritable: true },
      ],
      programId,
      data: Buffer.from([]), // Add your contract's function parameters here
    });

    const transaction = new Transaction().add(instruction);
    const signature = await connection.sendTransaction(transaction, [fromWallet]);

    setSignature(signature);
  };

  return (
    <div>
      <button onClick={createToken}>Create Token</button>
      {signature && <p>Transaction signature: {signature}</p>}
    </div>
  );
};

export default Page;
