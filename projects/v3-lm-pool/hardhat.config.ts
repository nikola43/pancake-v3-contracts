import { HardhatUserConfig } from 'hardhat/config'
import '@nomicfoundation/hardhat-toolbox'
import '@typechain/hardhat'
import 'dotenv/config'
import { NetworkUserConfig } from 'hardhat/types'
import 'solidity-docgen';
require('dotenv').config({ path: require('find-config')('.env') })

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


const config: HardhatUserConfig = {
  solidity: {
    version: '0.7.6',
  },
  networks: {
    hardhat: {},
    ...(process.env.KEY_TESTNET && { pulsechaintestnet }),
    ...(process.env.KEY_TESTNET && { bscTestnet }),
    ...(process.env.KEY_MAINNET && { bscMainnet }),
    ...(process.env.KEY_GOERLI && { goerli }),
    ...(process.env.KEY_ETH && { eth }),
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
  paths: {
    sources: './contracts/',
    tests: './test',
    cache: './cache',
    artifacts: './artifacts',
  },
}

export default config
