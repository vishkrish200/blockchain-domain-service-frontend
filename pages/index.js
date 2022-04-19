import { useState, useEffect } from "react";

export default function Home() {
  const [currentAccount, setCurrentAccount] = useState();

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask -> https://metamask.io/");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("please log in with metamask");
      return;
    } else {
      console.log("user is logged in", ethereum);
    }

    const accounts = await ethereum.request({ method: "eth_accounts" });

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account:", account);
      setCurrentAccount(account);
    } else {
      console.log("No authorized account found");
    }
  };

  const renderNotConnectedContainer = () => (
    <div className="flex flex-col justify-center items-center w-screen">
      <button
        onClick={connectWallet}
        className="cta-button connect-wallet-button"
      >
        Connect Wallet
      </button>
    </div>
  );

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);
  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen">
      <div className="text-xl font-extrabold">KRISHNAN NAME SERVICE</div>
      {renderNotConnectedContainer()}
    </div>
  );
}
