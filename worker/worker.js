//Include custom lib modules.
const logger  = require('../lib/logger.js');

//Get messages callbacks.
const {
  hello,
  test
} = require('./messages.js');

//When receive message from master.
const onMasterMsg = (message)=>{

  //Get message data.
  const {
    code,
    payload
  } = message;

  //Message callbacks.
  if (code==='hello')
    hello(payload);


  if (code==='test')
    test(payload);

}

//Worker process.
const start = ()=>{

  //Ouput
  logger.info('Worker started',{'PID':process.pid});

  //When receive a message from master.
  process.on('message', onMasterMsg);

}

module.exports = start;