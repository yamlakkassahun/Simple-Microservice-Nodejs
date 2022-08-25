const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const comments = [];

app.get('/posts/:postId/comments', (req, res) => {
    const result = comments.filter(comment => comment.postId === req.params.postId);
    res.status(200).send(result);
});

app.post('/posts/:postId/comments', async (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;
    
    const newComment = {
        id: commentId,
        postId: req.params.postId,
        content: content,
    }

    comments.push(newComment);

    
    //this is an async function
    await axios.post('http://localhost:4006/events', {
        type: 'CommentCerated',
        data: newComment,
    });

    res.status(201).send(comments);
});

app.post('/events', (req, res) => {
    console.log('Received event on Comment service :', req.body.type);
    res.send({});
});

app.listen(4001, () => {
    console.log('comment server is listening on port 4001');
});