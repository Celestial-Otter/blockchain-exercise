// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract MOKLottery {
    address public owner;
    address MOKToken;
    address[] public manager;
    address[] public players;
    uint256 lotteryPrice;
    uint256 prizePool; //TODO: have money be split into this pool
    uint256 feePool; //TODO: have money be split into this pool

    constructor(address _token) {
        owner = msg.sender;
        MOKToken = _token;
        lotteryPrice = 20 * (10**18);
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

    //function to get balance of the contract
    function getBalance() public view returns (uint256) {
        return IERC20(MOKToken).balanceOf(address(this));
    }

    //function to get ticket price
    function getTicketPrice() public view returns (uint256) {
        return lotteryPrice;
    }

    //function to set ticet price
    function setTicketPrice(uint256 _price) public ownerOnly {
        lotteryPrice = _price;
    }
}
