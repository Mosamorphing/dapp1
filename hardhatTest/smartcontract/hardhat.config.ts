import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require('dotenv').config()

const { INFURA_SEPOLIA_API_KEY_URL, ACCOUNT_PRIVATE_KEY } = process.env;

const config: HardhatUserConfig = {
  solidity: "0.8.20",

  networks: {
    sepolia: {
      url: INFURA_SEPOLIA_API_KEY_URL,
      accounts: [`0x${ACCOUNT_PRIVATE_KEY}`]
    }
  },

};

export default config;
