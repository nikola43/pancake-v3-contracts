import { ethers, network } from "hardhat";

import fs from "fs";

import { parseEther } from "ethers/lib/utils";
const currentNetwork = network.name;

async function main() {
    // Remember to update the init code hash in SC for different chains before deploying
    const networkName = network.name
    /** SmartRouterHelper */
    console.log("Deploying SmartRouterHelper...");

    const SmartRouterHelperFactory = await ethers.getContractFactory("SmartRouterHelper");
    const smartRouterHelper = await SmartRouterHelperFactory.deploy();
    await smartRouterHelper.deployed();

    const PancakeStableSwapTwoPoolInfoFactory = await ethers.getContractFactory("PancakeStableSwapTwoPoolInfo");
    const sancakeStableSwapTwoPoolInfo = await PancakeStableSwapTwoPoolInfoFactory.deploy();
    await sancakeStableSwapTwoPoolInfo.deployed();

    const PancakeStableSwapFactoryFactory = await ethers.getContractFactory("PancakeStableSwapFactory");
    const pancakeStableSwapFactory = await PancakeStableSwapFactoryFactory.deploy();
    await pancakeStableSwapFactory.deployed();

    const contracts = {
        smartRouterHelper: smartRouterHelper.address,
        stableInfo: sancakeStableSwapTwoPoolInfo.address,
        stableFactory: pancakeStableSwapFactory.address,
    }

    console.log("SmartRouterHelper deployed to:", smartRouterHelper.address);
    fs.writeFileSync(`./deployments/${networkName}.json`, JSON.stringify(contracts, null, 2))
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });