import React, { useState } from 'react';
import { Connection } from '@solana/web3.js';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';

const connection = new Connection('https://api.mainnet-beta.solana.com');
const wallet = new PhantomWalletAdapter();

const App = () => {
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState('');

  const connectWallet = async () => {
    try {
      await wallet.connect();
      setConnected(true);
      setAddress(wallet.publicKey?.toBase58() || '');
    } catch (error) {
      console.error(error);
    }
  };

  const disconnectWallet = async () => {
    try {
      await wallet.disconnect();
      setConnected(false);
      setAddress('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {connected ? (
        <div>
          <p>Connected Address: {address}</p>
          <button className='fixed top-0 right-0 p-4' onClick={disconnectWallet}>Disconnect</button>
        </div>
      ) : (
        <button onClick={connectWallet}>Connect</button>
      )}
    </div>
  );
};

export default App;
