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
let workers = new Map();

//Dispatch message to the workers.
const dispatchToWorker = (message)=>{

  try{

    //Using the dispatcher algorithm, get the dispatch function.
    const dispatcher = (config.get('service.dispatch')==='round-robin') ? roundRobin : random;

    //Transform the map to array.
    const workerList = Array.from(workers).map(e => e[1]);

    //Get the workers using the dispatcher.
    const worker = dispatcher(workerList);

    //Send message to the worker.
    worker.send(message);

    logger.info('DISPATCH TO', { "PID": worker.process.pid});

  } catch(error){
    logger.error('Error in dispatch',error);
  }

}

//Get response from the worker.
const onAnswer = (message)=>{

  logger.info('Received from worker',{msg:message});

}

//On cluster die.
const onDeath = (deadWorker, code, signal)=>{

  //Get pid from the old process.
  const {pid} = deadWorker.process;

  //Delete the process from the map.
  const result = workers.get(pid);

  //If the worker exists, remove and create it again.
  if (result){

    //Delete in the map.
    workers.delete(pid);

    //Create the new worker.
    const worker = buildWorker();

    //Register worker.
    registerWorker(worker);

    logger.info('Worker death detected, restarted OK', { "old": pid, "new":worker.process.pid});

  }

}

//Register the worker.
const registerWorker = (worker)=>{

  const {pid} = worker.process;

  //Find if the process exists in the collection.
  const result = workers.get(pid);

  //If the worker exists, remove and create it again.
  if (result)
    workers.delete(pid);

  //Set the worker in the map.
  workers.set(pid,worker);

  //Show worker pid.
  logger.info('Worker registered', { "PID": worker.process.pid});

}

//Build worker.
const buildWorker = ()=>{

  //Create fork.
  const worker = cluster.fork();

  //When receive response from one worker.
  worker.on('message',onAnswer);

  //When the worker die.
  cluster.on('exit', onDeath);  

  return worker;

}

//Create workers.
const createWorkers = (workerNum)=>{

  //Create the workers.
  for (let i=1;i<=workerNum;i++){

    //Create fork.
    const worker = buildWorker();
    
    //Register the worker in the collection.
    registerWorker(worker);

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
      //dispatchToWorker({code:'test',msg:'test hola'});
    },2000);

  } catch(err){
    logger.error('Error creating workers', err);
  }

}

module.exports = start;