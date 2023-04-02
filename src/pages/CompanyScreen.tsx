import * as React from 'react';
import { useIsConnected } from '../hooks/useIsConnected';
import { useFuel } from '../hooks/useFuel';
import { TokenContractAbi__factory } from '../types';
import { BigNumber, BigNumberish } from 'ethers';
import { Address, Bech32Address } from 'fuels';
import ReceiverComponent from '../components/ReceiverComponent';

const CompanyScreen: React.FC = () => {
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

  return (
    <div className="bg-[#2D2D2D] min-h-screen p-[16px] text-white">
      <ReceiverComponent />
    </div>
  );
};

export default CompanyScreen;
