const main = async () => {
  const ballotContractFactory = await hre.ethers.getContractFactory("BallotPortal");
  const ballotContract = await ballotContractFactory.deploy();
  await ballotContract.deployed();
  console.log("Endereço do contrato:", ballotContract.address);

  const ballotExample = {
    title : 'Qual o melhor do mundo?',
    description :'Gostaríamos de saber quem é o maior atleta.',
    proposals: ['Pelé',  'Michael Jordan', 'Lewis Hamilton',  'Michael Phelps']
  }

  ballotTxn = await ballotContract.createBallot(ballotExample.title, ballotExample.description, ballotExample.proposals);
  await ballotTxn.wait(); 
  let ballots = await ballotContract.getAllBallots();
  console.log('1. List of Ballots:', ballots)
  let numberOfBallots = await ballotContract.getTotalBallots();
  console.log('2. Total Number of Ballots:', numberOfBallots);

  ballotTxn = await ballotContract.vote(0, 2);
  await ballotTxn.wait();
  let ballots2 = await ballotContract.getAllBallots();
  console.log('3. Vote on one proposal:', ballots2)

  ballotTxn = await ballotContract.vote(0, 1);
  await ballotTxn.wait();
  let ballots3 = await ballotContract.getAllBallots();
  console.log('4. Vote on one another proposal:', ballots3)

  ballotTxn = await ballotContract.disableBallot(0, true);
  await ballotTxn.wait();
  let ballots4 = await ballotContract.getAllBallots();
  console.log('5. Change on Disabled:', ballots4)

  ballotTxn = await ballotContract.deleteBallot(0, true);
  await ballotTxn.wait();
  let ballots5 = await ballotContract.getAllBallots();
  console.log('6. Change on Deleted:', ballots5);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();