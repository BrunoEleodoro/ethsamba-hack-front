import * as React from 'react';
import { useIsConnected } from '../hooks/useIsConnected';
import { useFuel } from '../hooks/useFuel';
import { TokenContractAbi__factory } from '../types';
import { BigNumber, BigNumberish } from 'ethers';
import { Address, Bech32Address } from 'fuels';
import { mascaraMoeda } from '../utils/currency-format';
import { useNavigate } from 'react-router-dom';

const ReceiverReviewComponent: React.FC = () => {
  const [count, setCount] = React.useState(0);
  const [myAddress, setMyAddress] = React.useState('');
  const [funcionario, setFuncionario] = React.useState('');
  const [salario, setSalario] = React.useState(0);
  const [fuel, ,] = useFuel();
  const [isLoading, setIsLoading] = React.useState(false);

  const [isConnected] = useIsConnected();
  const [assets, setAssets] = React.useState([]);

  const contractAddress =
    '0xa3cff3de3cf287c31854645a7c842598d992432ee24acc66d48fd9b011e8f85d';

  // https://s3.amazonaws.com/ebuploads2/uploads/1570210093993-brlc_512_512.png
  const navigate = useNavigate();
  async function sendTransaction() {
    // myAddress
    const myAddress = await fuel.currentAccount();
    const b256Address = Address.fromString(myAddress).toB256();
    const funcionarioB256 = Address.fromString(funcionario).toB256();
    const wallet = await fuel.getWallet(b256Address);
    setIsLoading(true);
    await TokenContractAbi__factory.connect(contractAddress, wallet)
      .functions.mint(
        { value: funcionarioB256 },
        BigNumber.from(salario).toHexString()
      )
      .call();
    setIsLoading(false);
    navigate('/success');
  }

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
          <div className="flex flex-row justify-between mt-10 w-full text-center ">
            <div className="text-white w-full font-bold">Transferir</div>
          </div>
          {/* input borded  */}
          <div className="flex flex-row justify-between mt-5">
            <div className="flex flex-row justify-between w-full rounded-lg p-2">
              <div>Saldo em conta</div>
              <div className="text-right">FUSDC500.000,00</div>
              {/* <input
                className="w-full border-2 border-gray-300 p-2 rounded-lg"
                type="text"
                value="Saldo em conta"
                disabled
              /> */}
            </div>
          </div>
          {/* input borded  */}
          <div className="flex flex-row justify-between mt-5">
            <div className="flex flex-row justify-between w-full">
              <input
                className="w-full border-0 focus:border-0 p-2 text-center bg-transparent text-[#FFE500] text-3xl"
                type="text"
                onInput={(e) => mascaraMoeda(e)}
                defaultValue={'FUSDC 0,00'}
                onChange={(e) => {
                  const value = e.target.value
                    .replace('.', '')
                    .replace(',', '.')
                    .replace(/[^0-9.-]+/, '');
                  setSalario(parseFloat(value));
                }}
              />
            </div>
          </div>
          {/* divider */}
          <div className="h-[2px] my-5 bg-white w-full border-gray-300 mt-4"></div>

          <div className="flex flex-row justify-between mt-10">
            <div className="text-white font-bold">Chave do recebedor</div>
            <div className="text-[#FFE500]">Colar chave</div>
          </div>

          {/* input borded  */}
          <div className="flex flex-row justify-between mt-5">
            <div className="flex flex-row justify-between w-full">
              <input
                className="w-full border-2 border-gray-300 text-black p-2 rounded-lg"
                type="text"
                onChange={(e) => {
                  setFuncionario(e.target.value);
                }}
              />
            </div>
          </div>

          <br />
          {/* continuar big button rounded */}
          {isLoading ? (
            // loading spinner icon spinning
            <div className="flex justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v1a7 7 0 00-7 7h1zm3.293 5.707a1 1 0 001.414 0L12 13.414l2.293 2.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 000 1.414z"
                ></path>
              </svg>
            </div>
          ) : null}
          <button
            className="bg-[#FFE500] hover:bg-[#FFE700]  text-black font-bold py-2 px-4 rounded-full w-full mt-10"
            onClick={() => {
              sendTransaction();
            }}
          >
            DEPOSITAR
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReceiverReviewComponent;
