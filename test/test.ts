import { ethers } from 'hardhat';

import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';

import Contracts from 'components/Contracts';
import { Alpha } from 'typechain';

let alpha: Alpha;

let deployer: SignerWithAddress;

describe('ReserveToken', () => {
    before(async () => {
        [deployer] = await ethers.getSigners();
    });

    beforeEach(async () => {});

    it('', async () => {
        alpha = await Contracts.Alpha.deploy();
    });
});
