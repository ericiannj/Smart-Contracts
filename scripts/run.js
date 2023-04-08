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
  console.log('List of Ballots:', ballots)

  newBallotTxn = await ballotContract.deleteBallot(0, true);
  await newBallotTxn.wait();
  let ballots2 = await ballotContract.getAllBallots();
  console.log('Change on Deleted:', ballots2)
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