import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import successimage from '../assets/success.png';

const SuccessComponent: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#2D2d2d]">
      <div className="text-2xl font-bold text-center justify-center">
        <span className="text-center text-white">
          Pagamento realizado
          <br />
          com <span className="text-[#FAF00F] text-center">sucesso.</span>
        </span>
      </div>

      <br />
      <br />
      <img src={successimage} className="" />
      <br />
      <br />
      <div className="text-2xl font-bold text-center justify-center">
        <span className="text-center text-white">
          O seu pote de ouro foi transferido <br /> para o outro lado do{' '}
          <span className="text-[#FAF00F] text-center">arco-íris.</span>
        </span>
      </div>
      <br />
      <div className="p-10 w-full">
        {/* Button continue */}
        <button
          className="bg-[#FAF00F]  w-full hover:bg-[#FAF00F] text-black font-bold py-2 px-4 rounded"
          onClick={() => {
            navigate('/company');
          }}
        >
          Continuar
        </button>
      </div>
    </div>
  );
};

export default SuccessComponent;
