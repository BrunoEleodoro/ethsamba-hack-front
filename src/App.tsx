import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import { useIsConnected } from './hooks/useIsConnected';
import { useFuel } from './hooks/useFuel';
import { Address } from 'fuels';
import { TokenContractAbi__factory } from './types';

function App() {
  const [count, setCount] = useState(0);
  const [myAddress, setMyAddress] = useState('');
  const [fuel, ,] = useFuel();
  const [isConnected] = useIsConnected();
  const [assets, setAssets] = useState<any>([]);
  const contractAddress =
    '0xa3cff3de3cf287c31854645a7c842598d992432ee24acc66d48fd9b011e8f85d';

  // React.useEffect(() => {}, []);

  async function addAsset() {
    await fuel.addAssets([
      {
        name: 'FuelBRL',
        symbol: 'fBRL',
        address: contractAddress,
        decimals: 6,
        logoURI:
          'https://s3.amazonaws.com/ebuploads2/uploads/1570210093993-brlc_512_512.png',
      },
    ]);
  }
  useEffect(() => {
    addAsset();
    // myAddress
    async function fetchAssets() {
      const myAddress = await fuel.currentAccount();
      const b256Address = Address.fromString(myAddress).toB256();
      const wallet = await fuel.getWallet(b256Address);
      TokenContractAbi__factory.connect(contractAddress, wallet)
        .functions.get_balance()
        .call();
    }
    fuel.assets().then((assets) => {
      console.log('assets', assets);
      setAssets(assets);
    });
    fetchAssets();
  }, []);
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
                    fuel.disconnect();
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
                  fuel.connect();
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
            {assets.map((asset) => {
              return (
                <div className="w-full rounded-md bg-gray-800 p-4 mt-4">
                  <div className="flex flex-row justify-between">
                    <div className="flex flex-col w-full">
                      <div className="text-2xl">{asset.symbol}</div>
                      <div className="text-1xl mt-2">00,00</div>
                    </div>
                  </div>
                </div>
              );
            })}
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
