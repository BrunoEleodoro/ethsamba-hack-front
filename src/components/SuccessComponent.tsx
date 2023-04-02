import * as React from 'react';

const SuccessComponent: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="text-2xl font-bold text-center">
        <span className="text-center">
          Pagamento realizado
          <br />
          com <span className="text-[#2962FF] text-center">sucesso.</span>
        </span>
      </div>
      <br />
      <div className="p-10 w-full">
        {/* Button continue */}
        <button className="bg-blue-500  w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Continuar
        </button>
      </div>
    </div>
  );
};

export default SuccessComponent;
