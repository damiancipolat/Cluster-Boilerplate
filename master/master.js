//Include native modules.
const cluster = require('cluster');
const config  = require('config');

//Include custom lib modules.
const logger = require('../lib/logger.js');

//Get dispatchers algorithm.
const {
  random,
  roundRobin
} = require('./dispatch.js');

//Workers collection.
let workers = [];

//Dispatch message to the workers.
const dispatchToWorker = (message)=>{

  //Using the dispatcher algorithm, get the dispatch function.
  const dispatcher = (config.get('service.dispatch')==='round-robin') ? roundRobin : random;

  //Get the workers using the dispatcher.
  const worker = dispatcher(workers);

  //Send message to the worker.
  worker.send(message);

  logger.info('DISPATCH TO', { "PID": worker.process.pid});

}

//Get response from the worker.
const onResponseFromWorker = (message)=>{

  logger.info('Received from worker',{msg:message});

}

//Build worker.
const buildWorker = ()=>{

  //Create fork.
  const worker = cluster.fork();

  //Register worker.
  workers.push(worker);

  //When receive response from one worker.
  worker.on('message',onResponseFromWorker);

  //When the worker die.
  worker.on('exit', onDie);

}

//On cluster die.
const onDie = (worker)=>{

  //Detect the process exit code.
  if (worker['process']['exitCode'] === 0)
    logger.info('Worker died peacefully', {"PID": worker.process.pid});
  else {

    logger.info('Worker died peacefully', {"PID": worker.process.pid, "exitCode":worker['process']['exitCode']});

    //Create the new worker.
    buildWorker();    
  }

}

//Create workers.
const createWorkers = (workerNum)=>{

  //Create the workers.
  for (let i=1;i<=workerNum;i++){

    //Create fork.
    const worker = buildWorker();

    //Show worker pid.
    logger.info('Worker registered', { "PID": worker.process.pid});

  }

}

//Send hello to al the workers.
const sendHello = ()=>{

  logger.info(`Send hello to ${workers.length} workers...`)

  //Send hello to all the workers.
  workers.forEach((worker)=>{

    //Send message to the worker.
    worker.send({ code:'hello', payload: `Message from master ${process.pid}` });

  });

}

//Master process start function.
const start = (workerNum,collector)=>{

  //Show entry parameters.
  logger.info('Server starting', { "workers": workers});
  logger.info('Master process', { "PID": process.pid});
  logger.info('--------------');

  try{

    //Create the workers.
    createWorkers(workerNum);

    //Send hello to all.
    sendHello();

    //Timeout to the childrens.
    setInterval(()=>{
      dispatchToWorker({code:'test',msg:'test hola'});
    },200);

  } catch(err){
    logger.error('Error creating workers', err);
  }

}

module.exports = start;