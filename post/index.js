const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const { randomBytes } = require('crypto')
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const posts = [ ];

app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/posts', async (req, res) => {
    const { title } = req.body;

    const newPost = {
        id: randomBytes(4).toString('hex'),
        title: title,
    }

    posts.push(newPost);

    //this is an async function
    await axios.post('http://localhost:4006/events', {
        type: 'PostCerated',
        data: newPost,
    });

    res.status(201).send(newPost);
});


app.post('/events', (req, res) => {
    console.log('Received event on Post Server :', req.body.type);
    res.send({});
});

app.listen( 4000, () => {
    console.log('post service is Listening on port 4000');
})