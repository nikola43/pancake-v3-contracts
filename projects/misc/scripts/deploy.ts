import { ethers, network } from 'hardhat'
import config from '../config'
const fs = require('fs')

import { parseEther } from 'ethers/lib/utils'
const currentNetwork = network.name

async function main() {
  // Remember to update the init code hash in SC for different chains before deploying
  const networkName = network.name
  /** SmartRouterHelper */
  console.log('Deploying SmartRouterHelper...')

  const stable = {
    pancakeStableSwapLP: '0x309A5747a33272535B9136cC5d3688dCe7feD830',
    pancakeStableSwapLPFactory: '0x67AA61d780917eEEE4b96E38a5A6b0539E2d5CdB',
  }

  const SmartRouterHelperFactory = await ethers.getContractFactory('contracts/SmartRouterHelper.sol:SmartRouterHelper')
  const smartRouterHelper = await SmartRouterHelperFactory.deploy()
  await smartRouterHelper.deployed()
  console.log('smartRouterHelper deployed to:', smartRouterHelper.address)

  const PancakeStableSwapTwoPoolInfoFactory = await ethers.getContractFactory(
    'contracts/PancakeStableSwapTwoPoolInfo.sol:PancakeStableSwapTwoPoolInfo'
  )
  const pancakeStableSwapTwoPoolInfo = await PancakeStableSwapTwoPoolInfoFactory.deploy()
  await pancakeStableSwapTwoPoolInfo.deployed()
  console.log('pancakeStableSwapTwoPoolInfo deployed to:', pancakeStableSwapTwoPoolInfo.address)

  const PancakeStableSwapTwoPoolDeployerFactory = await ethers.getContractFactory(
    'contracts/PancakeStableSwapTwoPoolDeployer.sol:PancakeStableSwapTwoPoolDeployer'
  )
  const pancakeStableSwapTwoPoolDeployer = await PancakeStableSwapTwoPoolDeployerFactory.deploy()
  await pancakeStableSwapTwoPoolDeployer.deployed()
  console.log('pancakeStableSwapTwoPoolDeployer deployed to:', pancakeStableSwapTwoPoolDeployer.address)

  const PancakeStableSwapThreePoolDeployerFactory = await ethers.getContractFactory(
    'PancakeStableSwapThreePoolDeployer'
  )
  const pancakeStableSwapThreePoolDeployer = await PancakeStableSwapThreePoolDeployerFactory.deploy()
  await pancakeStableSwapThreePoolDeployer.deployed()
  console.log('pancakeStableSwapThreePoolDeployer deployed to:', pancakeStableSwapThreePoolDeployer.address)

  const PancakeStableSwapFactoryFactory = await ethers.getContractFactory(
    'contracts/PancakeStableSwapFactory.sol:PancakeStableSwapFactory'
  )
  const pancakeStableSwapFactory = await PancakeStableSwapFactoryFactory.deploy(
    stable.pancakeStableSwapLPFactory,
    pancakeStableSwapTwoPoolDeployer.address,
    pancakeStableSwapThreePoolDeployer.address
  )
  await pancakeStableSwapFactory.deployed()
  console.log('pancakeStableSwapFactory deployed to:', pancakeStableSwapFactory.address)

  const contracts = {
    smartRouterHelper: smartRouterHelper.address,
    stableInfo: pancakeStableSwapTwoPoolInfo.address,
    stableFactory: pancakeStableSwapFactory.address,
    pancakeStableSwapTwoPoolDeployer: pancakeStableSwapTwoPoolDeployer.address,
    pancakeStableSwapThreePoolDeployer: pancakeStableSwapThreePoolDeployer.address,
  }

  console.log('SmartRouterHelper deployed to:', smartRouterHelper.address)
  fs.writeFileSync(`./deployments/${networkName}.json`, JSON.stringify(contracts, null, 2))
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
