import { useState } from 'react';
import { ethers } from 'ethers';
import Navbar from './components/Navbar';
import Signup from './pages/Signup';

function App() {
  const [account, setAccount] = useState([]);
  const [userBalance, setUserBalance] = useState();
  const [error, setError] = useState('');

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await provider.send('eth_requestAccounts', []);
        // const signer = provider.getSigner();
        setAccount(accounts[0]);
      } else {
        console.log("Ethereum object doesn't exist");
      }
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className='App'>
      <Navbar account={account} connectWallet={connectWallet} />
      <Signup />
    </div>
  );
}

export default App;
