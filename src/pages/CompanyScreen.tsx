import * as React from 'react';
import { useIsConnected } from '../hooks/useIsConnected';

const CompanyScreen: React.FC = () => {
  const [count, setCount] = React.useState(0);
  const [myAddress, setMyAddress] = React.useState('');
  const [fuel, setFuel] = React.useState();
  const [isConnected] = useIsConnected();
  const [assets, setAssets] = React.useState([]);

  const contractAddress =
    '0xa3cff3de3cf287c31854645a7c842598d992432ee24acc66d48fd9b011e8f85d';
  // const currentAccount = fuel.currentAccount();
  // Fuel loaded handler
  const onFuelLoaded = () => {
    setFuel((window as any).fuel);
  };

  // If fuel is already loaded, call the handler
  React.useEffect(() => {
    if ((window as any).fuel) {
      onFuelLoaded();
    }
  }, []);

  React.useEffect(() => {
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
          <div className="text-3xl p-3 mt-5"></div>
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
              <div className="flex flex-row justify-center w-full">
                <div className="flex flex-row w-full  justify-between items-center">
                  <div className="text-2xl">Salario em fBRL</div>
                  <div className="text-1xl mt-2">
                    <input
                      type="number"
                      //  input to type a number and the font size is big and the input style is transparent but there's a border on the bottom
                      className="text-2xl bg-transparent border-2 rounded-md border-gray-500 focus:outline-none focus:border-gray-500"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full rounded-md bg-gray-800 p-4 mt-8">
              <div className="flex flex-row justify-center w-full">
                <div className="flex flex-row w-full justify-between items-center">
                  <div className="text-2xl">Carteira do funcionario</div>
                  <div className="text-1xl mt-2">
                    <input
                      type="number"
                      //  input to type a number and the font size is big and the input style is transparent but there's a border on the bottom
                      className="text-2xl bg-transparent border-2 rounded-md border-gray-500 focus:outline-none focus:border-gray-500"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full">
              <button className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-8">
                ENVIAR
              </button>
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
};

export default CompanyScreen;
