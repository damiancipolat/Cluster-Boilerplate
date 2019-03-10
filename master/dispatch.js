//Include npm modules.
const rr = require('rr');

//Get random number between min / max.
const random = (min, max)=> Math.floor(Math.random() * (max - min + 1) + min);

//Get random value from array.
const getRandomArray = (list) => (list.length>0) ? list[random(1,list.length)-1] : null;

//Get a value from array using round robin.
const getRoundRobin = (list) => rr(list);

module.exports.random     = getRandomArray;
module.exports.roundRobin = getRoundRobin;