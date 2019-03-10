# Cluster-Boilerplate
This template was made thinking in a production environemnt, is a master / worker process, that you can use to make parallel processing.

**Diagram:**

The project architecture is the next..
![N|Solid](https://github.com/damiancipolat/Cluster-Boilerplate/blob/master/doc/diagram.png?raw=true)

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

Use the parameter -w or --workers to set the number of worker process to use.
```sh
$ npm install
$ node server.js --w 4
```

**Modules:**
- Winston, for logging.
- Commander, to parse console parameters.
- Config, to load confi json files.
