import * as React from 'react';
import { useIsConnected } from '../hooks/useIsConnected';
import { useFuel } from '../hooks/useFuel';
import { TokenContractAbi__factory } from '../types';
import { BigNumber, BigNumberish } from 'ethers';
import { Address, Bech32Address } from 'fuels';
import { useNavigate } from 'react-router-dom';

const ReceiverComponent: React.FC = () => {
  const [count, setCount] = React.useState(0);
  const [myAddress, setMyAddress] = React.useState('');
  const [funcionario, setFuncionario] = React.useState('');
  const [salario, setSalario] = React.useState(0);
  const [fuel, ,] = useFuel();

  const [isConnected] = useIsConnected();
  const [assets, setAssets] = React.useState([]);

  const contractAddress =
    '0xa3cff3de3cf287c31854645a7c842598d992432ee24acc66d48fd9b011e8f85d';

  // https://s3.amazonaws.com/ebuploads2/uploads/1570210093993-brlc_512_512.png

  async function sendTransaction() {
    // myAddress
    const myAddress = await fuel.currentAccount();
    const b256Address = Address.fromString(myAddress).toB256();
    const funcionarioB256 = Address.fromString(funcionario).toB256();
    const wallet = await fuel.getWallet(b256Address);
    //TODO: isLoading
    TokenContractAbi__factory.connect(contractAddress, wallet)
      .functions.mint(
        { value: funcionarioB256 },
        BigNumber.from(salario).toHexString()
      )
      .call();
  }
  const navigate = useNavigate();
  return (
    <div className="bg-[#2D2D2D] min-h-screen p-[16px] text-white">
      <div className="flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <div className="text-3xl pl-3 flex items-center justify-center">
            <img
              src="data:image/jpeg;base64,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"
              className="w-12 h-12 rounded-full mt-3"
            />
          </div>
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

        {/* content */}
        <div className="p-6">
          {/* Formas de pagamento */}
          <div className="flex flex-col justify-center mt-10 text-center">
            <div>Saldo</div>
            <div className="text-2xl">FUSDC ******</div>
          </div>

          <div className="w-full flex flex-col justify-center items-center mb-5 mt-5">
            <div className="rounded-md w-[130px] h-[130px]  border-2 flex flex-col justify-center items-center">
              <svg
                className="h-10 w-10  "
                viewBox="0 0 24 24"
                fill="#FFE500"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M9.29289 1.29289C9.48043 1.10536 9.73478 1 10 1H18C19.6569 1 21 2.34315 21 4V20C21 21.6569 19.6569 23 18 23H6C4.34315 23 3 21.6569 3 20V8C3 7.73478 3.10536 7.48043 3.29289 7.29289L9.29289 1.29289ZM18 3H11V8C11 8.55228 10.5523 9 10 9H5V20C5 20.5523 5.44772 21 6 21H18C18.5523 21 19 20.5523 19 20V4C19 3.44772 18.5523 3 18 3ZM6.41421 7H9V4.41421L6.41421 7ZM7 13C7 12.4477 7.44772 12 8 12H16C16.5523 12 17 12.4477 17 13C17 13.5523 16.5523 14 16 14H8C7.44772 14 7 13.5523 7 13ZM7 17C7 16.4477 7.44772 16 8 16H16C16.5523 16 17 16.4477 17 17C17 17.5523 16.5523 18 16 18H8C7.44772 18 7 17.5523 7 17Z"
                  fill="#FFE500"
                />
              </svg>
              <div className=" text-center mt-4 font-thin">Extrato</div>
            </div>

            <div
              className="rounded-md w-[130px] h-[130px] mt-4  border-2 flex flex-col justify-center items-center cursor-pointer"
              onClick={() => {
                navigate('/company/2');
              }}
            >
              {/* qrcode svg icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10  "
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M2 2a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2H2zm0 2h12v12H2V4zm4 2a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H7a1 1 0 01-1-1V6z"
                  clipRule="evenodd"
                  fill="#FFE500"
                />
              </svg>

              <div className="text-center mt-4 font-thin">Transferir</div>

              {/* Favoritos */}
              {/* divider */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceiverComponent;
