import { ethers, network } from "hardhat";
const fs = require("fs");

async function main() {
    // Remember to update the init code hash in SC for different chains before deploying
    const networkName = network.name
    console.log(networkName)
    /** SmartRouterHelper */
    console.log("Deploying PancakeStableSwapLP...");

    const PancakeStableSwapLPFactory = await ethers.getContractFactory("contracts/PancakeStableSwapLP.sol:PancakeStableSwapLP");
    const pancakeStableSwapLP = await PancakeStableSwapLPFactory.deploy();
    await pancakeStableSwapLP.deployed();
    console.log("pancakeStableSwapLP deployed to:", pancakeStableSwapLP.address);

    const PancakeStableSwapLPFactoryFactory = await ethers.getContractFactory("contracts/PancakeStableSwapLPFactory.sol:PancakeStableSwapLPFactory");
    const pancakeStableSwapLPFactory = await PancakeStableSwapLPFactoryFactory.deploy();
    await pancakeStableSwapLPFactory.deployed();
    console.log("pancakeStableSwapLPFactory deployed to:", pancakeStableSwapLPFactory.address);

    const contracts = {
        pancakeStableSwapLP: pancakeStableSwapLP.address,
        pancakeStableSwapLPFactory: pancakeStableSwapLPFactory.address,
    }

    fs.writeFileSync(`./deployments/${networkName}.json`, JSON.stringify(contracts, null, 2))
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });