'use strict';

const express = require('express');

const Redis = require("ioredis");

const cluster = new Redis.Cluster([
  {
    port: 6379,
    host: "127.0.0.1",
  },
  {
    port: 6381,
    host: "127.0.0.1",
  },
]);


// Constants
const PORT = 80;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', (req, res) => {
  cluster.set("foo", "bar");
  cluster.get("foo", (err, res) => {
    // res === 'bar'
  });

  res.send('Hello World');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
