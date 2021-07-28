import { ethers } from 'hardhat';
import { ContractFactory } from '@ethersproject/contracts';
import { Signer } from '@ethersproject/abstract-signer';

import { Alpha__factory } from '../typechain';

type AsyncReturnType<T extends (...args: any) => any> = T extends (...args: any) => Promise<infer U>
    ? U
    : T extends (...args: any) => infer U
    ? U
    : any;

export type Contract<F extends ContractFactory> = AsyncReturnType<F['deploy']>;

export interface ContractBuilder<F extends ContractFactory> {
    contractName: string;
    deploy(...args: Parameters<F['deploy']>): Promise<Contract<F>>;
    attach(address: string, passedSigner?: Signer): Promise<Contract<F>>;
}

const deployOrAttach = <F extends ContractFactory>(contractName: string, passedSigner?: Signer): ContractBuilder<F> => {
    return {
        contractName,
        deploy: async (...args: Parameters<F['deploy']>): Promise<Contract<F>> => {
            let defaultSigner = passedSigner ? passedSigner : (await ethers.getSigners())[0];

            return (await ethers.getContractFactory(contractName, defaultSigner)).deploy(
                ...(args || [])
            ) as Contract<F>;
        },
        attach: attachOnly<F>(contractName).attach
    };
};

const attachOnly = <F extends ContractFactory>(contractName: string, passedSigner?: Signer) => {
    return {
        attach: async (address: string, signer?: Signer): Promise<Contract<F>> => {
            let defaultSigner = passedSigner ? passedSigner : (await ethers.getSigners())[0];
            return ethers.getContractAt(contractName, address, signer || defaultSigner) as Contract<F>;
        }
    };
};

const getContracts = (signer?: Signer) => ({
    connect: (signer: Signer) => getContracts(signer),

    Alpha: deployOrAttach<Alpha__factory>('Alpha', signer)
});

export default getContracts();
