# Cluster-Boilerplate
This template was made thinking in a production environemnt, is a master / worker process, that you can use to make parallel processing.

**Configuration:**

Go to /config/default.json and change the default parameters, feel free to adapt this file.
```json
{
  "service":{
    "name":"cluster-boiler",
    "workers":3,
    "dispatch":"round-robin"
  },
  "log":"log-central.log"
}
```

**To run:**
```sh
$ npm install
$ node server.js --w 4
```
Use the parameter -w or --workers to set the number of worker process to use.
