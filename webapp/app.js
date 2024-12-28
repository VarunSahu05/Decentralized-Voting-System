let web3;
let account;
let contract;

const contractABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "candidates",
    "outputs": [
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "voteCount",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "registeredVoterIds",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "voters",
    "outputs": [
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "voterId",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "hasVoted",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_voterId",
        "type": "uint256"
      }
    ],
    "name": "registerVoter",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_voterId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_candidateId",
        "type": "uint256"
      }
    ],
    "name": "vote",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_candidateId",
        "type": "uint256"
      }
    ],
    "name": "getVoteCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "getCandidates",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "voteCount",
            "type": "uint256"
          }
        ],
        "internalType": "struct Voting.Candidate[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  }
];
const contractAddress = "0xf3b809E9Bc80097cB7623BC7A367bBa36FA87b35";
const registeredVoters = {};

async function connectWallet() {
  if (typeof window.ethereum !== "undefined") {
    web3 = new Web3(window.ethereum);
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const accounts = await web3.eth.getAccounts();
      account = accounts[0];
      document.getElementById("walletStatus").textContent = `Wallet Connected: ${account}`;
      document.getElementById('registerButton').disabled = false;

      contract = new web3.eth.Contract(contractABI, contractAddress);
      loadCandidates();
      syncWithBlockchain(); // Synchronize local data with blockchain
    } catch (error) {
      console.error("Connection failed", error);
      document.getElementById("walletStatus").textContent = "Failed to connect wallet.";
    }
  } else {
    document.getElementById("walletStatus").textContent = "Please install MetaMask!";
  }
}

async function loadCandidates() {
  try {
    const candidates = await contract.methods.getCandidates().call();
    const resultsTable = document.querySelector("#resultsTable tbody");
    resultsTable.innerHTML = "";

    candidates.forEach((candidate) => {
      const row = resultsTable.insertRow();
      row.insertCell(0).textContent = candidate.name;
      row.insertCell(1).textContent = candidate.id;
      row.insertCell(2).textContent = candidate.voteCount;
    });
  } catch (error) {
    console.error("Error loading candidates:", error.message);
  }
}

async function syncWithBlockchain() {
  try {
    for (let voterId = 1; voterId <= 999; voterId++) {
      const voter = await contract.methods.voters(voterId).call();
      if (voter.name) {
        registeredVoters[voterId] = {
          name: voter.name,
          hasVoted: voter.hasVoted,
        };
      }
    }
    localStorage.setItem("registeredVoters", JSON.stringify(registeredVoters));
  } catch (error) {
    console.error("Error syncing with blockchain:", error.message);
  }
}

async function registerVoter(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const voterId = parseInt(document.getElementById("voterId").value);

  if (registeredVoters[voterId]) {
    alert("This voter ID is already registered!");
    return;
  }

  try {
    await contract.methods.registerVoter(name, voterId).send({ from: account });
    registeredVoters[voterId] = { name, hasVoted: false };
    localStorage.setItem("registeredVoters", JSON.stringify(registeredVoters));

    document.getElementById("message").textContent = "Registration successful!";
    loadCandidates();
  } catch (error) {
    console.error("Registration failed:", error);
    document.getElementById("message").textContent = "Registration failed!";
  }
}

async function vote(event) {
  event.preventDefault();

  const voterId = parseInt(document.getElementById("voterId").value);
  const candidateId = parseInt(document.getElementById("candidate").value);

  if (!registeredVoters[voterId]) {
    alert("Voter is not registered!");
    return;
  }

  if (registeredVoters[voterId].hasVoted) {
    alert("You have already voted!");
    return;
  }

  try {
    await contract.methods.vote(voterId, candidateId).send({ from: account });
    registeredVoters[voterId].hasVoted = true;
    localStorage.setItem("registeredVoters", JSON.stringify(registeredVoters));

    document.getElementById("voteMessage").textContent = "Successfully voted!";
    loadCandidates();
  } catch (error) {
    console.error("Voting failed:", error);
    document.getElementById("voteMessage").textContent = "Voting failed!";
  }
}

document.getElementById("connectButton").addEventListener("click", connectWallet);
document.getElementById("registerButton").addEventListener("click", registerVoter);
document.getElementById("voteButton").addEventListener("click", vote);
