// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract BallotPortal {
    uint256 totalBallots;
    uint256 ballotsIds;

    event NewBallot(Ballot _ballot);

    struct Proposal {
      uint256 id;
      string text;
      uint256 votes;
    }

    struct Ballot {
        uint256 id;
        address author; 
        uint256 timestamp; 
        string title; 
        string description;
        Proposal[] proposals;
        bool disabled;
        bool deleted;
    }

    struct Vote {
        address voter; 
        uint256 timestamp; 
        uint proposalOption;
    }

    Ballot[] public ballots;

    constructor() {
        console.log("Ballot Smart Contract");
    }

    function createBallot(string memory _title, string memory _description, string[] memory _texts) public {
        totalBallots += 1;
        ballotsIds +=1;
        console.log("%s criou uma votacao com o titulo: %s", msg.sender, _title);

        Ballot storage newBallot = ballots.push();

        newBallot.id = ballotsIds - 1;
        newBallot.author = msg.sender;
        newBallot.timestamp = block.timestamp;
        newBallot.title = _title;
        newBallot.description = _description;
        newBallot.disabled = false;
        newBallot.deleted = false;

        for (uint256 i = 0; i < _texts.length; i++) {
            Proposal memory newProposal;
            newProposal.id = i;
            newProposal.text = _texts[i];
            newProposal.votes = 0;

            newBallot.proposals.push(newProposal);
        }
    }

    function disableBallot(uint256 index, bool newValue) public returns (Ballot memory) {
        Ballot storage selectedBallot = ballots[index];
        selectedBallot.disabled = newValue;

        return selectedBallot;
    }

    function deleteBallot(uint256 index, bool newValue) public returns (Ballot memory) {
        Ballot storage selectedBallot = ballots[index];
        selectedBallot.deleted = newValue;

        return selectedBallot;
    }

    function getAllBallots() public view returns (Ballot[] memory) {
        return ballots;
    }

    function getTotalBallots() public view returns (uint256) {
        console.log("Temos %d ballots no total!", totalBallots);
        return totalBallots;
    }

    function vote(uint256 ballotIndex, uint256 proposalIndex) public returns (Ballot memory) {
        Ballot storage selectedBallot = ballots[ballotIndex];
        Proposal storage selectedProposal = selectedBallot.proposals[proposalIndex];
        selectedProposal.votes++;

        return selectedBallot;
    }
}
