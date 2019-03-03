/*
//Create the workers.
const workerProcess = ()=>{

  //Ouput
  console.log(`Worker ${process.pid} started`);

  //When receive a message from master.
  process.on('message', (message)=>{

    //On hello.
    if ((message.code)&&(message.code==='hello')){

      //Received.
      console.log(`---> HELLO received, Worker ${process.pid} '${JSON.stringify(message)}'`);

      //Output.
      console.log(`(!) Worker ${process.pid} sends message to master...`);

      //Send thanks to the master.
      process.send({ msg: `Message from worker ${process.pid}` });

    } else {
      console.log(`---> Worker ${process.pid} recevies message '${JSON.stringify(message)}'`);  
    }
    
  });

}

module.exports = workerProcess;
*/