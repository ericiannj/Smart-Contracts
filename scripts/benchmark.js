const main = async() => {
  const ballotContractFactory = await hre.ethers.getContractFactory("BallotPortal");
  const ballotContract = await ballotContractFactory.deploy();
  await ballotContract.deployed();
  console.log("Endereço do contrato:", ballotContract.address);

  const ballotExample = {
    title : 'Qual o melhor do mundo?',
    description :'Gostaríamos de saber quem é o maior atleta.',
    proposals: ['Pelé',  'Michael Jordan', 'Lewis Hamilton',  'Michael Phelps']
  }
  
  const calculateTimeOfCreation = async (numberOfInteractions) => {
    let totalExecutionTime = 0;
    for (let i = 0; i < numberOfInteractions; i++) {
      const startTime = Date.now();
      createBallotTxn = await ballotContract.createBallot(ballotExample.title, ballotExample.description, ballotExample.proposals);
      await createBallotTxn.wait(); 
      const endTime = Date.now();
      let averageExecutionTime = (endTime - startTime)
      totalExecutionTime += averageExecutionTime;
    }
    const average = totalExecutionTime / numberOfInteractions;
    
    return average
  }

  const calculateTimeOfVote = async (numberOfInteractions) => {
    let totalExecutionTime = 0;
    for (let i = 0; i < numberOfInteractions; i++) {
      const startTime = Date.now();
      createBallotTxn = await ballotContract.vote(0, 1);
      await createBallotTxn.wait(); 
      const endTime = Date.now();
      let averageExecutionTime = (endTime - startTime)
      totalExecutionTime += averageExecutionTime;
    }
    const average = totalExecutionTime / numberOfInteractions;
    
    return average
  }
  
  const calculateCreationsPerMinute = async () => {
    let transactionCounter = 0;
    let elapsedTime = 0; 
    const startTime = Math.floor(Date.now() / 1000); 
    const endTime = startTime + 60; 
  
    while (Math.floor(Date.now() / 1000) < endTime) {
      let startTimeTxn = Math.floor(Date.now() / 1000); 
      createBallotTxn = await ballotContract.createBallot(ballotExample.title, ballotExample.description, ballotExample.proposals);
      await createBallotTxn.wait(); 
      let endTimeTxn = Math.floor(Date.now() / 1000);
      let transactionTime = (endTimeTxn - startTimeTxn); 
      transactionCounter++;
      elapsedTime += transactionTime;
    }

    return transactionCounter;
  };

  const calculateVotesPerMinute = async () => {
    let transactionCounter = 0;
    let elapsedTime = 0; 
    const startTime = Math.floor(Date.now() / 1000); 
    const endTime = startTime + 60; 
  
    while (Math.floor(Date.now() / 1000) < endTime) {
      let startTimeTxn = Math.floor(Date.now() / 1000); 
      createBallotTxn = await ballotContract.vote(0, 1);
      await createBallotTxn.wait(); 
      let endTimeTxn = Math.floor(Date.now() / 1000);
      let transactionTime = (endTimeTxn - startTimeTxn); 
      transactionCounter++;
      elapsedTime += transactionTime;
    }

    return transactionCounter;
  };

  console.log('');
  console.log('');
  console.log('createBallot Method:');
  const calculate1Transaction = await calculateTimeOfCreation(1);
  console.log('createBallot: Tempo médio de computação (μs) com 1 transação:', calculate1Transaction)
  const calculate10Transactions = await calculateTimeOfCreation(10);
  console.log('createBallot: Tempo médio de computação (μs) com 10 transações:', calculate10Transactions)
  const calculate100Creations = await calculateTimeOfCreation(100);
  console.log('createBallot: Tempo médio de computação (μs) com 100 transações:', calculate100Creations)
  const calculate1000Creations = await calculateTimeOfCreation(100);
  console.log('createBallot: Tempo médio de computação (μs) com 1000 transações:', calculate1000Creations)

  const createResult = await calculateCreationsPerMinute();
  console.log('createBallot: Quantidade de transações por minuto:', createResult);

  console.log('');
  console.log('');
  console.log('vote Method:');
  const calculate1Vote = await calculateTimeOfVote(1);
  console.log('vote: Tempo médio de computação (μs) com 1 transação:', calculate1Vote)
  const calculate10Votes = await calculateTimeOfVote(10);
  console.log('vote: Tempo médio de computação (μs) com 10 transações:', calculate10Votes)
  const calculate100Votes = await calculateTimeOfVote(100);
  console.log('vote: Tempo médio de computação (μs) com 100 transações:', calculate100Votes)
  const calculate1000Votes = await calculateTimeOfVote(100);
  console.log('vote: Tempo médio de computação (μs) com 1000 transações:', calculate1000Votes)

  const voteResult = await calculateVotesPerMinute();
  console.log('vote: Quantidade de transações por minuto:', voteResult);
}

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