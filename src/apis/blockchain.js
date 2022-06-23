import { ethers } from "ethers";
import MOKToken from "../artifacts/contracts/MOKToken.sol/MOKToken.json";
import Greeter from "../artifacts/contracts/Greeter.sol/Greeter.json";
import MOKLottery from "../artifacts/contracts/MOKLottery.sol/MOKLottery.json";

let greeterContractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // contract address
let MOKTokenContractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"; // contract address
let MOKLotteryContractAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"; // contract address
export const connectWallet = async () => {
  // connect to wallet
  try {
    const { ethereum } = window;

    if (!ethereum) {
      alert("Please install MetaMask!");
      return;
    }

    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });

    console.log("Connected", accounts[0]);
  } catch (error) {
    console.log(error);
  }
};

//function for user to approve the lottery contract to spend tokens
export const approve = async (amount) => {
  const { ethereum } = window;

  if (!ethereum) {
    alert("Please install MetaMask!");
    return;
  }

  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const mokTokenContract = new ethers.Contract(
    MOKTokenContractAddress,
    MOKToken.abi,
    provider
  );

  const approve = await mokTokenContract.populateTransaction.approve(
    MOKLotteryContractAddress,
    amount
  );

  const tx = await signer.sendTransaction(approve); // send transaction using the signer
  console.log(tx);
};

//function to join the lottery
export const joinLottery = async () => {
  const { ethereum } = window;

  if (!ethereum) {
    alert("Please install MetaMask!");
    return;
  }

  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const mokLotteryContract = new ethers.Contract(
    MOKLotteryContractAddress,
    MOKLottery.abi,
    provider
  );
  const join = await mokLotteryContract.populateTransaction.joinLottery();

  const joinLottery = await signer.sendTransaction(join); // send transaction using the signer
  console.log(joinLottery);
};

//function to get the ticket price
export const getTicketPrice = async () => {
  const { ethereum } = window;

  if (!ethereum) {
    alert("Please install MetaMask!");
    return;
  }

  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const mokLotteryContract = new ethers.Contract(
    MOKLotteryContractAddress,
    MOKLottery.abi,
    provider
  );

  const ticketPrice = await mokLotteryContract.getTicketPrice();
  return ticketPrice;
};

//function to get the current jackpot
export const getCurrentJackpot = async () => {
  const { ethereum } = window;

  if (!ethereum) {
    alert("Please install MetaMask!");
    return;
  }

  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const mokLotteryContract = new ethers.Contract(
    MOKLotteryContractAddress,
    MOKLottery.abi,
    provider
  );

  const currentJackpot = await mokLotteryContract.getJackpot();
  console.log(currentJackpot + " current jackpot");
  return currentJackpot;
};

//function to get the previous jackpot
export const getPreviousJackpot = async () => {
  const { ethereum } = window;

  if (!ethereum) {
    alert("Please install MetaMask!");
    return;
  }

  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const mokLotteryContract = new ethers.Contract(
    MOKLotteryContractAddress,
    MOKLottery.abi,
    provider
  );

  const previousJackpot = await mokLotteryContract.getPreviousJackpot();
  console.log(previousJackpot + " previous jackpot");
  return previousJackpot;
};

//function to get the winning ticket
export const getWinningTicket = async () => {
  const { ethereum } = window;

  if (!ethereum) {
    alert("Please install MetaMask!");
    return;
  }

  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const mokLotteryContract = new ethers.Contract(
    MOKLotteryContractAddress,
    MOKLottery.abi,
    provider
  );

  const winningTicket = await mokLotteryContract.getWinningNumber();
  console.log(winningTicket + " is the winning ticket");
  return winningTicket;
};

//function to roll the lottery
export const rollLottery = async () => {
  const { ethereum } = window;

  if (!ethereum) {
    alert("Please install MetaMask!");
    return;
  }

  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const mokLotteryContract = new ethers.Contract(
    MOKLotteryContractAddress,
    MOKLottery.abi,
    provider
  );

  const roll = await mokLotteryContract.populateTransaction.pickWinner();

  const rollLottery = await signer.sendTransaction(roll); // send transaction using the signer
  console.log(rollLottery);
};

// function to get the current fee pool
export const getFeePool = async () => {
  const { ethereum } = window;

  if (!ethereum) {
    alert("Please install MetaMask!");
    return;
  }

  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const mokLotteryContract = new ethers.Contract(
    MOKLotteryContractAddress,
    MOKLottery.abi,
    provider
  );

  const feePool = await mokLotteryContract.getFeePool();
  console.log(feePool + " is the fee pool");
  return feePool;
};

//function to withdraw the fee pool
export const withdrawFeePool = async () => {
  const { ethereum } = window;

  if (!ethereum) {
    alert("Please install MetaMask!");
    return;
  }

  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const mokLotteryContract = new ethers.Contract(
    MOKLotteryContractAddress,
    MOKLottery.abi,
    provider
  );

  const withdraw =
    await mokLotteryContract.populateTransaction.withdrawFeePool();

  const withdrawFeePool = await signer.sendTransaction(withdraw); // send transaction using the signer
  console.log(withdrawFeePool);
};

//function to set the ticket price
export const setTicketPrice = async (amount) => {
  const { ethereum } = window;

  if (!ethereum) {
    alert("Please install MetaMask!");
    return;
  }

  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const mokLotteryContract = new ethers.Contract(
    MOKLotteryContractAddress,
    MOKLottery.abi,
    provider
  );

  const setTicketPrice =
    await mokLotteryContract.populateTransaction.setTicketPrice(amount);

  const setTicketPriceTransaction = await signer.sendTransaction(
    setTicketPrice
  ); // send transaction using the signer
  console.log(setTicketPriceTransaction);
};

//function to get the locked until date
export const getLockedUntil = async () => {
  const { ethereum } = window;

  if (!ethereum) {
    alert("Please install MetaMask!");
    return;
  }

  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const mokLotteryContract = new ethers.Contract(
    MOKLotteryContractAddress,
    MOKLottery.abi,
    provider
  );

  const lockedUntil = await mokLotteryContract.getLockedUntil();
  console.log(lockedUntil + " is the locked until date");
  return lockedUntil;
};

//function to set the locked until date
export const setLockedUntil = async (date) => {
  const { ethereum } = window;

  if (!ethereum) {
    alert("Please install MetaMask!");
    return;
  }

  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const mokLotteryContract = new ethers.Contract(
    MOKLotteryContractAddress,
    MOKLottery.abi,
    provider
  );

  const setLockedUntil =
    await mokLotteryContract.populateTransaction.setLockedUntil(date);

  const setLockedUntilTransaction = await signer.sendTransaction(
    setLockedUntil
  ); // send transaction using the signer
  console.log(setLockedUntilTransaction);
};
