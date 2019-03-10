//Include modules.
const cluster = require('cluster');
const program = require('commander');
const config  = require('config');

//Include custom lib modules.
const logger = require('./lib/logger.js');

//Load master / worker modules.
const worker  = require('./worker/worker.js');
const master  = require('./master/master.js');

/*
  Define run commands from console:
  node server.js --port P --workers N --collector
*/
program
  .version('1.0.0', '-v, --version')
  .usage('[OPTIONS]...')
  .option('-w, --workers <workers>', 'Number of workers to run', config.get('service.workers'))
  .parse(process.argv);

//Allow commander to parse `process.argv`
program.parse(process.argv);

//Start cluster.
try{

  //Get parameters from program.
  const {
    workers
  } = program;

  //Switch process flow.
  if (cluster.isMaster)
    master(workers);
  else
    worker();

} catch(err){
  logger.error('Error in startup', err);
}
