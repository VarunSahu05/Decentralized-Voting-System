# Blockchain-Based Voting System

## **Project Overview**

The Blockchain-Based Voting System is a decentralized application (DApp) that uses blockchain technology to ensure secure, transparent, and tamper-proof voting. The application eliminates issues like duplicate registrations and multiple votes, ensuring each voter can vote only once.

### **Key Features**

- **No Duplicate Registrations**: Voters can register only once.
- **No Duplicate Votes**: A voter can cast only one vote.
- **Transparent Election Results**: Election results are publicly visible on the blockchain.
- **Data Storage**: All voting data is stored securely in both smart contract storage and local storage for redundancy and transparency.

## **Technologies Used**

- **Blockchain**: Ethereum-based smart contracts to manage votes.
- **MetaMask**: Used for secure interaction with the blockchain.
- **Ganache (v7.9.1)**: A personal blockchain for testing the DApp.
- **Solidity - 0.8.0 (solc-js)**: Smart contract programming language for Ethereum blockchain.
- **Truffle (v5.11.5)**: Development framework for Ethereum, used to compile, test, and deploy smart contracts.
- **Node.js (v18.20.4)**: Server-side scripting and interaction with the blockchain.
- **Web3.js (v1.10.0)**: Ethereum JavaScript library to interact with the blockchain.

## **Project Workflow**

1. **Voter Registration**: Voters submit their information via a secure online platform. Their identity is verified using blockchain.
2. **Identity Verification**: A trusted identity verifier ensures that only authorized individuals can participate in the election.
3. **Vote Request**: After verification, voters are granted access to the voting options (candidates or choices).
4. **Voting**: Voters select their choice and submit their vote to the blockchain-based system (the smart contract) for secure, transparent recording.
5. **Vote Verification**: Voters can confirm that their vote has been successfully recorded and stored in the blockchain.

## **Installations and Setup**

### **Prerequisites**

- **MetaMask**: Install the MetaMask browser extension to interact with the Ethereum blockchain.
- **Ganache**: Download and install Ganache, which provides a personal Ethereum blockchain for testing.
- **Node.js**: Make sure you have Node.js installed.
- **npm**: The Node Package Manager (npm) comes with Node.js.
- **Truffle**: Install Truffle, which is used for smart contract management,by running the command:

```bash
npm install -g truffle
```

### **1. Install Dependencies**

Run the following command to install all required packages:

``` bash
npm install

# All necessary libraries & dependencies of js
npm init -y
npm install truffle web3

# Initialize the truffle framework
truffle init
```

This will install:

- **Truffle**: A development environment for Ethereum.
- **Web3.js**: A JavaScript library to interact with Ethereum.
- **Ganache**: A personal blockchain for local testing.

### **2. Install MetaMask**

- Download and install MetaMask.
- Once installed, Create Account, which is used to interact with the Ethereum blockchain.

### **3. Install Ganache**

- Download and install Ganache.
- Once installed, launch Ganache, which will provide you with a local Ethereum blockchain.

![ganache1](webapp/images/g1.png)

### **4. Configure Truffle with Ganache**

1. Create a `truffle-config.js` file (if it doesn’t already exist) in the project’s root directory.
2. Add the Ganache network configuration:

```js
module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*",  // Match any network id
    },
  },
  compilers: {
    solc: {
      version: "0.8.0", // Ensure Solidity version matches your contracts
    },
  },
};
```

### **5. Compile Smart Contracts**

Run the following command to compile your smart contracts:

``` bash
truffle compile
```

### **6. Deploy Smart Contracts**

Deploy the smart contracts to the local blockchain (Ganache):

``` bash
truffle migrate --reset --network development
```

This will deploy the smart contracts and set up the initial state on the blockchain.
After deploying, update the **contract address** and **contract ABI** in .js files.

![snapshot](webapp/images/m1.png)

### **7. Run the Application**

To run the DApp locally:

- Launch the application:

1. Open the project folder in Visual Studio Code.
2. Right-click on the index.html file (or the main HTML file) in the file explorer panel.
3. Select Open with Live Server from the context menu.
4. This will launch the application on your browser, usually at <http://127.0.0.1:5500>.

![UI1](webapp/images/Int1.png)
![UI2](webapp/images/Int2.png)

### **8. Interaction with MetaMask**

- Open **MetaMask** and connect it to the Ganache network by adding a new custom RPC network.
- MetaMask will act as the Ethereum wallet for sending transactions.

### **9. Test the Voting System**

user can now interact with the voting system through the application’s frontend:

- Register as a new voter.
- Vote on the election.
- Verify your vote on the blockchain.
- Check the transparency of the election results via the public ledger.

![UI3](webapp/images/Int3.png)
![UI4](webapp/images/Int4.png)
![UI5](webapp/images/Int5.png)
![ganache2](webapp/images/g2.png)

## **Code Structure**

``` bash
/Blockchain-Based-Voting-System
│
├── /node_modules                  # Contains all installed Node.js packages required for the project
│
├── /contracts                     # Smart contracts for voting logic written in Solidity
│   └── Voting.sol                 # Main smart contract file
│
├── /build                         # Compiled contract artifacts generated by Truffle
│   └── contracts
│       └── Voting.json            # JSON files containing ABI and bytecode for smart contracts
│
├── /migrations
│   └── 1_deploy_contracts.js      # Smart contract migration scripts
│
├── /webapp                        # Frontend files for interacting with the blockchain
│   ├── index.html                 # Main HTML page for the user interface
│   ├── styles.css                 # CSS file for web application styling
│   └── app.js                     # JavaScript file to interact with the blockchain using Web3.js
│
├── /test                          # Test files for smart contracts
│
├── package-lock.json
│
├── package.json                   # Metadata and dependencies for the project
│
├── trufffle-config.js
│
└── README.md                      # Project documentation with setup and usage instructions
```
