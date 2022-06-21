// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract MOKLottery {
    address public owner;
    address MOKToken;
    address[] public manager;
    address[] public players;
    uint256 lotteryPrice;
    uint256 previousJackpot;
    uint256 winningNumber;
    uint256 prizePool; //TODO: have money be split into this pool
    uint256 feePool; //TODO: have money be split into this pool

    constructor(address _token) {
        owner = msg.sender;
        MOKToken = _token;
        lotteryPrice = 20 * (10**18);
        previousJackpot = 0;
        prizePool = 0;
        feePool = 0;
        winningNumber = 0;
    }

    //Modifier to restrict the function to the manager
    modifier ownerOnly() {
        require(msg.sender == owner);
        _;
    }

    //Modifier to restrict the function to the manager or the owner
    modifier managerOrOwner() {
        require(msg.sender == owner || msg.sender == manager[0]);
        _;
    }

    //function to add other accounts as managers
    function addManager(address newManager) public ownerOnly {
        manager.push(newManager);
    }

    //function for the player to join the lottery
    function joinLottery() public payable {
        require(
            IERC20(MOKToken).transferFrom(
                msg.sender,
                address(this),
                lotteryPrice
            )
        );
        players.push(msg.sender);
    }

    //function to roll a random number
    function roll() private view returns (uint256) {
        return
            uint256(
                keccak256(
                    abi.encodePacked(block.difficulty, block.timestamp, players)
                )
            );
    }

    //function to pick the winner
    function pickWinner() public managerOrOwner {
        uint256 index = roll() % players.length;
        IERC20(MOKToken).transfer(players[index], prizePool);
        winningNumber = index;
        players = new address[](0);
    }

    //function to get balance of the contract
    function getBalance() public view returns (uint256) {
        return IERC20(MOKToken).balanceOf(address(this));
    }

    //function to get ticket price
    function getTicketPrice() public view returns (uint256) {
        return lotteryPrice;
    }

    //function to set ticket price
    function setTicketPrice(uint256 _price) public ownerOnly {
        lotteryPrice = _price;
    }

    //function to get the current prize pool
    function getJackpot() public view returns (uint256) {
        return prizePool;
    }

    //function to get the previous jackpot
    function getPreviousJackpot() public view returns (uint256) {
        return previousJackpot;
    }
}
