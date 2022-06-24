require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  networks: {
    hardhat: {
      chainId: 1337,
    },
    rinkeby: {
      url: "https://rinkeby.infura.io/v3/f3090b56e9514554883f3053772f2ddc",
      accounts: [
        "7bf1db35ebe04c62c31474a13d6e2c852eb8453c9c92f6d5421e614acca68bf9",
      ],
      gas: 60000000,
      gasPrice: 8000000000,
    },
  },
  paths: {
    artifacts: "./src/artifacts",
  },
};
