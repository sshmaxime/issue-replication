import { HardhatUserConfig } from 'hardhat/config';

import 'tsconfig-paths/register';

import '@nomiclabs/hardhat-waffle';
import '@nomiclabs/hardhat-ethers';
import '@typechain/hardhat';
import 'hardhat-dependency-compiler';
import 'hardhat-deploy';

import 'solidity-coverage';
import '@nomiclabs/hardhat-etherscan';
import 'hardhat-contract-sizer';
import 'hardhat-abi-exporter';
import 'hardhat-gas-reporter';

const config: HardhatUserConfig = {
    networks: {
        hardhat: {
            gasPrice: 20000000000,
            gas: 9500000,
            accounts: {
                count: 10,
                accountsBalance: '10000000000000000000000000000'
            }
        }
    },

    solidity: {
        version: '0.7.6',
        settings: {
            optimizer: {
                enabled: true,
                runs: 200
            },
            metadata: {
                bytecodeHash: 'none'
            },
            outputSelection: {
                '*': {
                    '*': ['storageLayout'] // Enable slots, offsets and types of the contract's state variables
                }
            }
        }
    }
};

export default config;
