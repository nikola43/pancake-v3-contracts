import type { HardhatUserConfig, NetworkUserConfig } from 'hardhat/types'
import '@nomiclabs/hardhat-ethers'
import '@nomiclabs/hardhat-etherscan'
import '@nomiclabs/hardhat-waffle'
import '@typechain/hardhat'
import 'hardhat-watcher'
import 'dotenv/config'
import 'solidity-docgen'
require('dotenv').config({ path: require('find-config')('.env') })

const LOW_OPTIMIZER_COMPILER_SETTINGS = {
  version: '0.7.6',
  settings: {
    evmVersion: 'istanbul',
    optimizer: {
      enabled: true,
      runs: 2_000,
    },
    metadata: {
      bytecodeHash: 'none',
    },
  },
}

const LOWEST_OPTIMIZER_COMPILER_SETTINGS = {
  version: '0.7.6',
  settings: {
    evmVersion: 'istanbul',
    optimizer: {
      enabled: true,
      runs: 400,
    },
    metadata: {
      bytecodeHash: 'none',
    },
  },
}

const DEFAULT_COMPILER_SETTINGS = {
  version: '0.7.6',
  settings: {
    evmVersion: 'istanbul',
    optimizer: {
      enabled: true,
      runs: 1_000_000,
    },
    metadata: {
      bytecodeHash: 'none',
    },
  },
}

const bscTestnet: NetworkUserConfig = {
  url: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
  chainId: 97,
  accounts: [process.env.KEY_TESTNET!],
}

const bscMainnet: NetworkUserConfig = {
  url: 'https://bsc-dataseed.binance.org/',
  chainId: 56,
  accounts: [process.env.KEY_MAINNET!],
}

const goerli: NetworkUserConfig = {
  url: 'https://rpc.ankr.com/eth_goerli',
  chainId: 5,
  accounts: [process.env.KEY_GOERLI!],
}

const eth: NetworkUserConfig = {
  url: 'https://eth.llamarpc.com',
  chainId: 1,
  accounts: [process.env.KEY_ETH!],
}

const pulsechaintestnet: NetworkUserConfig = {
  url: 'https://scan.v4.testnet.pulsechain.com',
  chainId: 943,
  accounts: [process.env.KEY_TESTNET!],
}

export default {
  networks: {
    hardhat: {
      allowUnlimitedContractSize: true,
    },
    ...(process.env.KEY_TESTNET && { pulsechaintestnet }),
    ...(process.env.KEY_TESTNET && { bscTestnet }),
    ...(process.env.KEY_MAINNET && { bscMainnet }),
    ...(process.env.KEY_GOERLI && { goerli }),
    ...(process.env.KEY_ETH && { eth }),
    // mainnet: bscMainnet,

    pulsechainmainnet: {
      url: "https://rpc.pulsechain.com",
      accounts: [`${process.env.KEY_TESTNET}`],
      chainId: 0x171
    },
    pulsechaintestnet: {
      url: "https://rpc.v4.testnet.pulsechain.com",
      accounts: [`${process.env.KEY_TESTNET}`],
      chainId: 0x3AF
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY || '',

    customChains: [
      {
        network: 'pulsechaintestnet',
        chainId: 943,
        urls: {
          apiURL: 'https://api.scan.v4.testnet.pulsechain.com/api/v1',
          browserURL: 'https://scan.v4.testnet.pulsechain.com',
        },
      },
      {
        network: 'pulsechainmainnet',
        chainId: 369,
        urls: {
          apiURL: 'https://api.scan.pulsechain.com/api/v1',
          browserURL: 'https://scan.pulsechain.com',
        },
      },
    ],

    // pulsechainmainnet: 'pulsechainmainnet',
    // pulsechaintestnet: 'pulsechaintestnet',
  },
  solidity: {
    compilers: [DEFAULT_COMPILER_SETTINGS],
    overrides: {
      'contracts/PancakeV3Pool.sol': LOWEST_OPTIMIZER_COMPILER_SETTINGS,
      'contracts/PancakeV3PoolDeployer.sol': LOWEST_OPTIMIZER_COMPILER_SETTINGS,
      'contracts/test/OutputCodeHash.sol': LOWEST_OPTIMIZER_COMPILER_SETTINGS,
    },
  },
  watcher: {
    test: {
      tasks: [{ command: 'test', params: { testFiles: ['{path}'] } }],
      files: ['./test/**/*'],
      verbose: true,
    },
  },
  docgen: {
    pages: 'files',
  },
}
