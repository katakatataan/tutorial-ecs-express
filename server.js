'use strict';

const express = require('express');

const Redis = require("ioredis");
const nodes = [{
host: process.env.REDIS_CLUSTER_PRIMARY_ENDPOINT,
port: '6379',
}];
const options = {
    dnsLookup: (address, callback) => callback(null, address),
    redisOptions: {
        tls: {}
    }
}



// Constants
const PORT = 80;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', (req, resp) => {
  const cluster = new Redis.Cluster(nodes,options);

  cluster.set('test-key', 'test-value');

  cluster.get('test-key', function (err, res) {
    console.log(res);

    if (err) {
        console.error(err)
    }

    cluster.disconnect()
    resp.send(res);
  });

});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
