//Include modules.
const cluster = require('cluster');
const program = require('commander');
const config  = require('config');

//Include custom lib modules.
const logger = require('./lib/logger.js');

//Load master / worker modules.
const worker  = require('./worker.js');
const master  = require('./master.js');

//Define run commands fron console: node server.js --port P --workers N --collector
program
  .version('1.0.0', '-v, --version')
  .usage('[OPTIONS]...')
  .option('-c, --crocodile', 'Use crocodile instead of alligator')
  .option('-n, --name <name>', 'Your name', 'human')
  .parse(process.argv);

const reptile = (program.crocodile ? 'Crocodiles' : 'Alligators');

console.log(
  `${reptile} are the best! Don't you agree, ${program.name}?`
);

// allow commander to parse `process.argv`
program.parse(process.argv);	

//logger.info('message content', { "context": "index.js", "metric": 1 });
/*


//Switch process flow.
if (cluster.isMaster)
  master();
else
  worker();
*/