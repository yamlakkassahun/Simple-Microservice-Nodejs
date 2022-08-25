const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { application } = require('express');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const post = [];

app.get('/posts', (req, res, next) => {
    res.status(200).send(post)
})

app.post('/events', (req, res, next) => {
    const { type, data } = req.body;

    if (type === 'PostCerated') {
        const { id, title } = data;
        const newPost = {
            id: id, 
            title: title,
            comments: [],
        }

        post.push(newPost);
    }

    if (type === 'CommentCerated') {
        const { id, content, postId } = data;

        const existingPost = post.find(post => post.id === postId);

        if (!existingPost) {
            res.status(404).send({ message: 'post not found' });
        }

        const newComment = {
            id: id,
            content: content, 
            postId: postId
        }

        existingPost.comments.push(data);
    }

    res.send({});
})

app.listen(4002, () => {
    console.log('query server is listening on http://localhost:4002');
})