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
  
    console.log('');
    console.log('');
    console.log('createBallot Method:');
    const calculate1Transaction = await calculateTimeOfCreation(1);
    console.log('createBallot: Tempo médio de computação (μs) com 1 transação:', calculate1Transaction)
  
    console.log('');
    console.log('vote Method:');
    const calculate1Vote = await calculateTimeOfVote(1);
    console.log('vote: Tempo médio de computação (μs) com 1 transação:', calculate1Vote)
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