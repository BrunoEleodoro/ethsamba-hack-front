import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type UserStore = {
  name: string;
  amount: string;
  funcionario: string;
  setAmount: (amount: string) => void;
  setName: (name: string) => void;
  setFuncionario: (funcionario: string) => void;
};

export const useUserStore = create(
  persist<UserStore>(
    (set) => ({
      name: '',
      amount: '',
      funcionario: '',
      setAmount: (amount) => set({ amount }),
      setName: (name) => set({ name }),
      setFuncionario: (funcionario) => set({ funcionario }),
    }),
    { name: 'user-crypto' }
  )
);
