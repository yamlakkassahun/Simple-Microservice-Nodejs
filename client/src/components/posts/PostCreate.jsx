import React, { useState } from 'react'
import axios from 'axios'


const PostCreate = () => {
    const [title, setTitle] = useState("");

    const onSubmit = async (event) => {
        event.preventDefault();

        await axios.post("http://localhost:4000/posts", {
            title,
        });

        setTitle("");
    };

    return (
        <div className="container-fluid">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="form-control"
                    />
                    <button className="btn btn-primary mt-3">Submit</button>
                </div>
            </form>
        </div>
    );
}

export default PostCreate