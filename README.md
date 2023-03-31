# Smart Contracts 

The repository is the project that works on the smart contracts necessary for Web3Vote to work. The basic Stack is solidity with the use of Hardhat.

## Installation

Use NPM to install the dependencies 

```bash
npm install
```

## Usage

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help

// The basic flow: Test scripts + Deploy to create a new blockchain

npx hardhat run scripts/run.js
npx hardhat run scripts/deploy-ballot.js --network goerli
```