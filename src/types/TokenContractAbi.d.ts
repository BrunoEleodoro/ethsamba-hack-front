/* Autogenerated file. Do not edit manually. */

/* tslint:disable */
/* eslint-disable */

/*
  Fuels version: 0.37.1
  Forc version: 0.35.5
  Fuel-Core version: 0.17.3
*/

import type {
  BigNumberish,
  BN,
  BytesLike,
  Contract,
  DecodedValue,
  FunctionFragment,
  Interface,
  InvokeFunction,
} from 'fuels';

import type { Enum } from "./common";

export type ErrorInput = Enum<{ AddressAlreadyMint: [], CannotReinitialize: [], MintIsClosed: [], NotOwner: [] }>;
export type ErrorOutput = ErrorInput;

export type AddressInput = { value: string };
export type AddressOutput = AddressInput;
export type ContractIdInput = { value: string };
export type ContractIdOutput = ContractIdInput;

interface TokenContractAbiInterface extends Interface {
  functions: {
    burn_coins: FunctionFragment;
    get_balance: FunctionFragment;
    get_mint_amount: FunctionFragment;
    get_token_balance: FunctionFragment;
    mint: FunctionFragment;
    mint_coins: FunctionFragment;
    transfer_coins: FunctionFragment;
    transfer_token_to_output: FunctionFragment;
  };

  encodeFunctionData(functionFragment: 'burn_coins', values: [BigNumberish]): Uint8Array;
  encodeFunctionData(functionFragment: 'get_balance', values: []): Uint8Array;
  encodeFunctionData(functionFragment: 'get_mint_amount', values: []): Uint8Array;
  encodeFunctionData(functionFragment: 'get_token_balance', values: [ContractIdInput]): Uint8Array;
  encodeFunctionData(functionFragment: 'mint', values: [AddressInput, BigNumberish]): Uint8Array;
  encodeFunctionData(functionFragment: 'mint_coins', values: [BigNumberish]): Uint8Array;
  encodeFunctionData(functionFragment: 'transfer_coins', values: [BigNumberish, AddressInput]): Uint8Array;
  encodeFunctionData(functionFragment: 'transfer_token_to_output', values: [BigNumberish, ContractIdInput, AddressInput]): Uint8Array;

  decodeFunctionData(functionFragment: 'burn_coins', data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: 'get_balance', data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: 'get_mint_amount', data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: 'get_token_balance', data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: 'mint', data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: 'mint_coins', data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: 'transfer_coins', data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: 'transfer_token_to_output', data: BytesLike): DecodedValue;
}

export class TokenContractAbi extends Contract {
  interface: TokenContractAbiInterface;
  functions: {
    burn_coins: InvokeFunction<[burn_amount: BigNumberish], void>;
    get_balance: InvokeFunction<[], BN>;
    get_mint_amount: InvokeFunction<[], BN>;
    get_token_balance: InvokeFunction<[asset_id: ContractIdInput], BN>;
    mint: InvokeFunction<[address: AddressInput, amount: BigNumberish], void>;
    mint_coins: InvokeFunction<[mint_amount: BigNumberish], void>;
    transfer_coins: InvokeFunction<[coins: BigNumberish, address: AddressInput], void>;
    transfer_token_to_output: InvokeFunction<[coins: BigNumberish, asset_id: ContractIdInput, address: AddressInput], void>;
  };
}
