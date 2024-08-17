/** @type import('hardhat/config').HardhatUserConfig */
const { task } = require("hardhat/config");

require("@nomiclabs/hardhat-ethers");
require("@typechain/hardhat");
require("@nomiclabs/hardhat-ethers");

module.exports = {
  solidity: "0.8.25",
};