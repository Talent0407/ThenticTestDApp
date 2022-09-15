import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function Mint() {
  const netID = 0x61; // mainnet

  const [num, setNum] = useState(1);

  const [walletAddress, setWalletAddress] = useState("");
  const [connectStatus, setConnectStatus] = useState(false);
  const [correctNet, setCorrectNet] = useState(false);
  const [maxAmount, setMaxAmount] = useState(0);
  const [mintPrice, setMintPrice] = useState(0);
  const [isPublic, setIsPublic] = useState(false);
  const [isLaunch, setIsLaunch] = useState(true);
  const [balance, setBalance] = useState(0);

  const handleChange = (value) => {
    if (value > maxAmount) {
      setNum(maxAmount);
    } else if (value < 1) {
      setNum(1);
    } else {
      setNum(value);
    }
  };

  const connectWallet = async () => {
    if (!window.ethereum) {
      toast.error("Please install Metamask!");
    } else {
      try {
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        const chainId = await ethereum.request({ method: "eth_chainId" });
        setWalletAddress(accounts[0]);
        setConnectStatus(true);
        setCorrectNet(chainId == netID);

        toast.success("Wallet Connected Successfully!");

        window.ethereum.on("accountsChanged", (accounts) => {
          setWalletAddress(accounts[0]);
        });

        window.ethereum.on("chainChanged", async (chainId) => {
          setCorrectNet(chainId == netID);
        });
      } catch (e) {
        console.error(e);
        toast.error("User denied wallet connection!");
      }
    }
  };

  const switchNetwork = async () => {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x1" }],
      });
      setCorrectNet(true);
    } catch (e) {
      console.error(e);
      toast.error("User denied wallet connection!");
    }
  };

  const mint = async () => {
    console.log(`Justin Test`);
    const options = {
      method: "POST",
      url: "https://thentic.tech/api/nfts/mint",
      headers: {
        "content-type": "application/json",
      },
      data: '{"key":"o5iglzexdbCVyvaiNxxclXopBYQKK2S4","chain_id":97,"contract":"0x8aB9a741365Aa204144FBcBb0984cEFF39D471e0","nft_id":3,"nft_data":"https://cloudbunny.mypinata.cloud/ipfs/QmYmjkbWYTYnmipgcwkJeUT4956XFXAb3onpNjgyjmiyPW/3.json","to":"0x8aB9a741365Aa204144FBcBb0984cEFF39D471e0"}',
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  useEffect(() => {
    // updateState();
    const options = {
      method: 'GET',
      url: 'https://thentic.tech/api/nfts',
      params: {key: 'o5iglzexdbCVyvaiNxxclXopBYQKK2S4', chain_id: '97'}
    };
    
    axios.request(options).then(function (response) {
      console.log(response.data);
    }).catch(function (error) {
      console.error(error);
    });
  }, [correctNet, walletAddress]);

  useEffect(() => {
    const onLoad = async () => {
      await connectWallet();
    };

    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);
  return (
    <div className="absolute -translate-y-[140px] w-full font-lemon">
      <div className="flex justify-center overflow-hidden">
        <img
          src="/img/bg_mint.png"
          alt=""
          className="md:min-h-[900px] md:max-h-[900px] min-h-[570px] max-h-[570px] min-w-[1400px] w-[100%] max-w-[1920px]"
        />
      </div>
      <div className="absolute top-0 w-full md:mt-[200px] mt-[100px] z-30">
        <div
          id="mint"
          className="md:max-w-[1200px] max-w-[280px] w-[85%] flex md:flex-row flex-col bg-white rounded-3xl shadow-xl mx-auto md:h-[600px] h-[440px]"
        >
          <div className="md:w-[45%] md:p-0 p-[4px] md:h-full w-full h-[40%]">
            <img
              src="/img/mint.jpeg"
              className="object-cover w-full h-full rounded-3xl"
            />
          </div>
          <div className="md:w-[70%] h-full w-full flex flex-col md:m-0 mt-[10px] md:py-6 justify-center items-center">
            {isLaunch ? (
              <>
                {correctNet && (
                  <h1 className="md:text-[48px] text-[20px] text-[#415DA7] font-semibold mb-1 font-irish text-center uppercase">
                    {isPublic ? "PUBLIC MINT IS LIVE" : "TJNFT MINT IS LIVE"}
                  </h1>
                )}

                <span className="md:text-[24px] text-[15px] font-irish text-[#415DA7] mb-1 text-center ">
                  {walletAddress ? (
                    <>
                      My wallet <br />{" "}
                      {walletAddress.slice(0, 8) +
                        "........." +
                        walletAddress.slice(-8)}
                    </>
                  ) : (
                    <>
                      please <br /> connect wallet to mint
                    </>
                  )}
                </span>
                <div className="md:max-w-[70%] px-[15px] w-full flex items-center mx-auto md:mt-[29px] mt-[10px]">
                  {connectStatus && !correctNet && (
                    <button
                      className="bg-button bg-centershadow-xl bg-cover w-full text-white uppercase md:text-[36px] text-[17px] font-irish border-none rounded-full md:py-[30px] py-[15px] md:px-0 px-[88px]"
                      onClick={switchNetwork}
                    >
                      Switch Network
                    </button>
                  )}

                  {correctNet && (
                    <button
                      className="bg-button bg-centershadow-xl bg-cover w-full text-white uppercase md:text-[36px] text-[17px] font-irish border-none rounded-full md:py-[30px] py-[15px] md:px-0 px-[88px]"
                      onClick={mint}
                    >
                      Mint
                    </button>
                    
                  )}

                  {!connectStatus && (
                    <button
                      className="bg-button bg-centershadow-xl bg-cover w-full text-white uppercase md:text-[36px] text-[17px] font-irish border-none rounded-full md:py-[30px] py-[15px] md:px-0 "
                      onClick={connectWallet}
                    >
                      Connect Wallet
                    </button>
                  )}
                </div>
              </>
            ) : (
              <h1 className="md:text-[48px] text-[20px] text-[#ff3535] font-semibold mb-1 font-irish text-center uppercase">
                MINT WILL BE LIVE SOON
              </h1>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mint;
