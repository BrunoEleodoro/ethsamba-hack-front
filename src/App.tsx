import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import { useIsConnected } from './hooks/useIsConnected';
import { useFuel } from './hooks/useFuel';

function App() {
  const [count, setCount] = useState(0);
  const [myAddress, setMyAddress] = useState('');
  const [fuel, setFuel] = useState();
  const [isConnected] = useIsConnected();
  const [assets, setAssets] = useState([]);

  // const currentAccount = fuel.currentAccount();
  // Fuel loaded handler
  const onFuelLoaded = () => {
    setFuel((window as any).fuel);
  };

  // If fuel is already loaded, call the handler
  useEffect(() => {
    if ((window as any).fuel) {
      onFuelLoaded();
    }
  }, []);

  useEffect(() => {
    async function fetchAccount() {
      if (fuel) {
        const currentAccount = await fuel.currentAccount();
        setMyAddress(currentAccount);
        const assets = await window.fuel.assets();
        setAssets(assets);
      }
    }
    fetchAccount();
  }, [fuel]);

  return (
    <div className="bg-black min-h-screen p-[16px]">
      <div className="flex flex-col text-white">
        <div className="flex flex-row justify-between">
          <div className="text-3xl p-3 mt-5">U$00,00</div>
          <div className="text-white">
            {isConnected ? (
              <>
                {/* <p>
                  {myAddress.substring(0, 6) +
                    '...' +
                    myAddress.substring(myAddress.length - 4, myAddress.length)}
                </p>
                <br /> */}
                <br />
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => {
                    (window as any).fuel?.disconnect();
                  }}
                >
                  {/* count is {count} */}
                  Disconnect
                </button>
              </>
            ) : (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => {
                  (window as any).fuel?.connect();
                }}
              >
                {/* count is {count} */}
                Connect Wallet
              </button>
            )}
          </div>
        </div>
        <div className="p-2">
          {/* two rows as cards with images of tokens USDC, USDT */}
          <div className="flex flex-col mt-20">
            {/* CARD */}
            <div className="w-full rounded-md bg-gray-800 p-4">
              <div className="flex flex-row justify-between">
                <div className="flex flex-col w-full">
                  <div className="text-2xl">USDC</div>
                  <div className="text-1xl mt-2">00,00</div>
                </div>
              </div>
            </div>
            <div className="w-full rounded-md bg-gray-800 p-4 mt-8">
              <div className="flex flex-row justify-between">
                <div className="flex flex-col">
                  <div className="text-2xl">$CPY</div>
                  <div className="text-1xl mt-2">00,00</div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="flex flex-row justify-between">
            <div className="flex flex-col">
              <div className="flex flex-row justify-between">
                <div className="text-2xl">USDC</div>
                <div className="text-2xl">U$00,00</div>
              </div>
              <div className="flex flex-row justify-between">
                <div className="text-2xl">USDT</div>
                <div className="text-2xl">U$00,00</div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default App;
