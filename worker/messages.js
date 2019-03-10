//Include custom lib modules.
const logger = require('../lib/logger.js');

//Get communication lib.
const {
  reply
} = require('../lib/com.js');

//Message callbacks.
const hello = (payload)=>{

  logger.info('hello');
  reply({msg:'hello',data:payload});

}

const test = (payload)=>{

  logger.info('test');
  reply({msg:'test',data:payload});

}

module.exports.hello = hello;
module.exports.test  = test;