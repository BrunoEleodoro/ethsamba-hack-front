import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import { useIsConnected } from './hooks/useIsConnected';
import { useFuel } from './hooks/useFuel';
import { Address, BN } from 'fuels';
import { TokenContractAbi__factory } from './types';
import { useNavigate } from 'react-router-dom';
import { currencyFormat } from './utils/currency-format';

function App() {
  const [count, setCount] = useState(0);
  const [myAddress, setMyAddress] = useState('');
  const [fuel, ,] = useFuel();
  const [isConnected] = useIsConnected();
  const [assets, setAssets] = useState<any>([]);
  const [balance, setBalance] = useState<BN>(new BN(0));
  const contractAddress =
    '0xa3cff3de3cf287c31854645a7c842598d992432ee24acc66d48fd9b011e8f85d';

  // React.useEffect(() => {}, []);

  async function addAsset() {
    await fuel.addAssets([
      {
        name: 'FuelUSDC',
        symbol: 'fUSDC',
        address: contractAddress,
        decimals: 6,
        logoURI:
          'https://s3.amazonaws.com/ebuploads2/uploads/1570210093993-brlc_512_512.png',
      },
    ]);
  }

  const navigate = useNavigate();

  useEffect(() => {
    addAsset();
    // myAddress
    async function fetchAssets() {
      const myAddress = await fuel.currentAccount();
      const b256Address = Address.fromString(myAddress).toB256();
      const wallet = await fuel.getWallet(b256Address);
      const balance = await wallet.getBalance(contractAddress);

      setBalance(balance);
    }

    fuel.assets().then((assets) => {
      console.log('assets', assets);
      setAssets(assets);
    });
    fetchAssets();
  }, [fuel]);

  return (
    <div className="bg-[#2D2d2d] min-h-screen p-[16px]">
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
          <div
            className="text-[#FAF00F] cursor-pointer"
            onClick={() => {
              navigate('/company');
            }}
          >
            Saldo total da conta
          </div>
          <div className="text-3xl mt-5">
            FUSD {currencyFormat(parseFloat(balance.toString()))}
          </div>

          <div className="w-full flex flex-col justify-center gap-2 items-center mb-5 mt-[70px]">
            <div
              className="rounded-md w-[130px] h-[130px] border-2 flex flex-col justify-center items-center cursor-pointer"
              onClick={() => navigate('/extrato')}
            >
              {/* qrcode svg icon */}
              {/* <img
                src="data:image/png;base64,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"
                className="w-10 h-10 text-[#FFE500]"
              /> */}

              {/* SVG icon for Document */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 "
                viewBox="0 0 20 20"
                fill="#FAF00F"
              >
                <path
                  fillRule="evenodd"
                  d="M2 2a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2H2zm0 2h12v12H2V4zm4 2a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H7a1 1 0 01-1-1V6z"
                  clipRule="evenodd"
                />
              </svg>

              <div className="text-center mt-4 font-thin">Extrato</div>
            </div>

            <div className="rounded-md w-[130px] h-[130px] border-2 flex flex-col justify-center items-center">
              {/* money logo svg */}
              <svg
                fill="#FAF00F"
                className="h-10 w-10  "
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 490.2 490.2"
              >
                <g>
                  <g>
                    <path
                      d="M368.4,245.1c0,12.9-10.5,23.4-23.4,23.4s-23.4-10.5-23.4-23.4s10.5-23.4,23.4-23.4S368.4,232.2,368.4,245.1z M76.1,245.1
			c0,12.9,10.5,23.4,23.4,23.4s23.4-10.5,23.4-23.4s-10.5-23.4-23.4-23.4S76.1,232.2,76.1,245.1z M38.5,382.7h268v-32.9H78.1
			c0.4-2.3,0.7-4.7,0.7-7.2c0-21.5-17.5-39-39-39c-2.3,0-4.6,0.2-6.8,0.6V185.9c2.2,0.4,4.5,0.6,6.8,0.6c21.5,0,39-17.5,39-39
			c0-2.5-0.2-4.8-0.7-7.2h286.1c-0.8,3-1.2,6.2-1.2,9.5c0,21.5,17.5,39,39,39c3.3,0,6.6-0.4,9.6-1.2v79.9h32.9V146
			c0-21.2-17.3-38.5-38.5-38.5H38.5C17.3,107.5,0,124.8,0,146v198.2C0,365.4,17.3,382.7,38.5,382.7z M321.6,355.1
			c-2.7,0-4.9,2.2-4.9,4.9v17.8c0,2.7,2.2,4.9,4.9,4.9h118c2.7,0,4.9-2.2,4.9-4.9V360c0-2.7-2.2-4.9-4.9-4.9H321.6z M467.4,339.1
			v-17.8c0-2.7-2.2-4.9-4.9-4.9h-118c-2.7,0-4.9,2.2-4.9,4.9v17.8c0,2.7,2.2,4.9,4.9,4.9h118C465.2,344,467.4,341.8,467.4,339.1z
			 M485.3,277.7h-118c-2.7,0-4.9,2.2-4.9,4.9v17.8c0,2.7,2.2,4.9,4.9,4.9h118c2.7,0,4.9-2.2,4.9-4.9v-17.8
			C490.2,279.9,488,277.7,485.3,277.7z M222.3,160.7c46.6,0,84.4,37.8,84.4,84.4s-37.8,84.4-84.4,84.4s-84.4-37.8-84.4-84.4
			S175.6,160.7,222.3,160.7z M229.7,182.4h-9.6c-1.5,0-2.6,1.2-2.6,2.6v11.5c-7.3,1.1-13.3,3.7-17.8,8.1c-5,4.8-7.5,10.9-7.5,18.4
			c0,8.2,2.4,14.5,7.1,18.7c4.7,4.2,12.3,8.4,22.6,12.6c4.3,1.8,7.2,3.7,8.9,5.6c1.7,1.9,2.5,4.6,2.5,8.1c0,3-0.8,5.4-2.4,7.3
			c-1.6,1.8-4,2.8-7.2,2.8c-3.8,0-6.9-1.2-9.2-3.6c-1.9-2-3.1-5-3.4-9c-0.1-1.6-1.5-2.8-3.1-2.7l-15.8,0.3c-1.7,0-3.1,1.5-3.1,3.2
			c0.4,8.4,3.1,14.8,8.1,19.4c5.4,4.9,12.2,7.9,20.3,8.8v10.8c0,1.5,1.2,2.6,2.6,2.6h9.6c1.5,0,2.6-1.2,2.6-2.6v-11.2
			c6.5-1.2,11.8-3.8,15.9-7.7c4.8-4.7,7.2-10.8,7.2-18.5c0-8-2.4-14.2-7.2-18.6c-4.8-4.3-12.3-8.7-22.5-13c-4.4-1.9-7.4-3.8-9-5.7
			s-2.4-4.4-2.4-7.4s0.7-5.4,2.2-7.4c1.5-1.9,3.8-2.9,6.9-2.9c3.1,0,5.5,1.2,7.4,3.5c1.5,1.9,2.4,4.5,2.7,8c0.1,1.6,1.6,2.7,3.1,2.7
			l15.8-0.2c1.7,0,3.2-1.5,3.1-3.2c-0.4-6.9-2.6-12.7-6.7-17.4c-4.2-4.9-9.7-8-16.6-9.4V185C232.3,183.5,231.1,182.4,229.7,182.4z"
                    />
                  </g>
                </g>
              </svg>

              <div className="text-center mt-4 font-thin">Sacar</div>
            </div>
          </div>
          {/* two rows as cards with images of tokens USDC, USDT */}
          {/* <div className="flex flex-col mt-20">
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
          </div> */}
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
