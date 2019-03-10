//Send to the master process.
const reply = (data) => process.send(data);

module.exports.reply = reply;