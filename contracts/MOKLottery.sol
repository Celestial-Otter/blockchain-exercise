// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract MOKLottery {
    address public owner;
    address[] public manager;
    address payable[] public players;

    constructor() {
        owner = msg.sender;
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
}
