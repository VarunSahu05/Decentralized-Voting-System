// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    struct Voter {
        string name;
        uint voterId;
        bool hasVoted;
    }

    struct Candidate {
        string name;
        uint id;
        uint voteCount;
    }

    address public owner;
    mapping(uint => Voter) public voters; // Maps voter ID to Voter struct
    mapping(uint => bool) public registeredVoterIds; // Track unique voter IDs
    Candidate[] public candidates; // Array of candidates

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }

    constructor() {
        owner = msg.sender;
        candidates.push(Candidate("BJP", 0, 0));
        candidates.push(Candidate("Congress", 1, 0));
        candidates.push(Candidate("AAP", 2, 0));
        candidates.push(Candidate("NOTA", 3, 0));
    }

    function registerVoter(string memory _name, uint _voterId) public {
        require(!registeredVoterIds[_voterId], "Voter already registered");
        require(bytes(_name).length > 0 && bytes(_name).length <= 20, "Invalid name length");
        require(_voterId >= 1 && _voterId <= 999, "Voter ID must be within range 1-999");

        voters[_voterId] = Voter(_name, _voterId, false);
        registeredVoterIds[_voterId] = true;
    }

    function vote(uint _voterId, uint _candidateId) public {
        Voter storage voter = voters[_voterId];
        require(registeredVoterIds[_voterId], "Voter not registered");
        require(!voter.hasVoted, "Voter has already voted");
        require(_candidateId < candidates.length, "Invalid candidate ID");

        voter.hasVoted = true;
        candidates[_candidateId].voteCount += 1;
    }

    function getVoteCount(uint _candidateId) public view returns (uint) {
        require(_candidateId < candidates.length, "Invalid candidate ID");
        return candidates[_candidateId].voteCount;
    }

    function getCandidates() public view returns (Candidate[] memory) {
        return candidates;
    }
}
