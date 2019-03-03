/*
const cluster = require('cluster');
const io      = require("socket.io");

//Set amount of forkers process.
const workerNum = 4;

//Collection of process.
let workers   = [];

//Create the workers.
const createWorkers = ()=>{

  console.log(`Master ${process.pid} is running.`);

  //Create the workers.
  for (let i=1;i<=workerNum;i++){

    //Create fork.
    const worker = cluster.fork();

    //Register worker.
    workers.push(worker);

    //Add message handler.
    worker.on('message', (message)=>{

      //Output
      console.log(`--->Master ${process.pid} recevies message '${JSON.stringify(message)}' from worker ${worker.process.pid}`);

    });

  }

  //Send hello to all the workers.
  workers.forEach((worker)=>{

    //Output
    console.log(`(!) Master ${process.pid} sends message to worker ${worker.process.pid}...`);

    //Send message to the worker.
    worker.send({ code:'hello', msg: `Message from master ${process.pid}` });

  });

}

//Get random.
const random=(min, max)=>{

  return Math.floor(Math.random() * (max - min + 1) + min);

}

//Get a random worker.
const getWorker = ()=>{

  return (workers.length>0)?workers[random(1,workers.length)-1]:null;

}

//Create the server.
const createServer = ()=>{

  try{

    //Get the port
    const port = (process.argv.length>=3) ? process.argv[2] : 8000;

    //Show running port.
    console.log('-> Running in port',port);

    //Start server.
    const server  = io.listen(port);

    //Create client map.
    let sequenceNumberByClient = new Map();
    let msgCounter = 0;

    // event fired every time a new client connects:
    server.on("connection", (socket) => {

      console.info(`Client connected [id=${socket.id}]`);
      
      // initialize this client's sequence number
      sequenceNumberByClient.set(socket, 1);

      //When the message is received.
      socket.on('test', (data)=>{
        
        //Sum message.
        msgCounter++;

        //Get a selected worker.
        let workerSelected = getWorker();
        
        console.log('(!) Sent to',workerSelected.id);

        workerSelected.send({ code:'test', msg: `Message from master ${process.pid}` });
      });

      // when socket disconnects, remove it from the list:
      socket.on("disconnect", () => {
        sequenceNumberByClient.delete(socket);
        console.info(`Client gone [id=${socket.id}]`);
      });

    });

  } catch(err){
    console.log('Error creating the server',err);
  }

}

const masterProcess = ()=>{

  createWorkers();
  createServer();

}

module.exports = masterProcess;
*/