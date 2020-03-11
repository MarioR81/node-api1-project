const express = require('express');
const shortid = require('shortid');

const server = express();

const users = [];


server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({ api: 'Running...' })
});

const PORT = 5000;
server.listen(PORT, () =>
console.log(`\n ** API running on http:localhost:${PORT} ** \n`)
);