const express = require('express');
const shortid = require('shortid');

const server = express();

const users = [
    {
        id: 1, // hint: use the shortid npm package to generate it
        name: "Jane Doe", // String, required
        bio: "Not Tarzan's Wife, another Jane",  // String, required
    } 
];


server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({ api: 'Running...' })
});

server.post('/api/users', (req, res) => {
    const userInfo = req.body;

    if (userInfo.name && userInfo.bio){
        userInfo.id = shortid.generate();
        users.push(userInfo);
        res.status(201).json(userInfo)
    } else if (!users){
        res.status(500).json({ errorMessage: 'There was as error while saving the user tp the database'})
    } else {
        res.status(400).json({ errorMessage: 'Please provide name and bio for the user.' })
    }
});

server.get('/api/users', (req, res) => {
    if (users.length > 0){
        res.status(200).json(users)
    } else {
        res.status(500).json({ errorMessage: 'Users infor could not be retrieved.' })
    }
});

server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const user = users.find(user => user.id === String(id))

    if(!user) {
        res.status(404).json({message: "user with given id does not exist"})
    } else if (!id) {
        res.status(500).json({message: "server error"})
    } else {
        res.status(200).json(user)
    }
});

server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const user = users.find(user => user.id === String(id))
    remove(user);
    res.status(200).json('User Deleted Successfully.')
});

const PORT = 5000;
server.listen(PORT, () =>
console.log(`\n ** API Running on http:localhost:${PORT} ** \n`)
);