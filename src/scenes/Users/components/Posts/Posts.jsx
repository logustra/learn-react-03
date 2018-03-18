import React, { Component } from "react";
import axios from "../../../../services/axios";
import { Row, Button } from "reactstrap";
import { injectGlobal } from "styled-components";

import Aux from "../../../../hoc/Aux/Aux";
import Post from "./Post/Post";
import FullPost from "./FullPost/FullPost";
import NewPost from "./NewPost/NewPost";

injectGlobal`
    .hidden {
        display: none;
    }

    .visible {
        display: block !important;
        margin: 0 auto;
    }
`

class Posts extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userId: null,
            posts: null,
            newPost: false,
            selectedPost: {
                id: null,
                userId: null,
            }
        }
    }

    componentDidUpdate() {
        if (this.props.id) {
            if (!this.state.posts || (this.state.userId !== this.props.id)) {
                axios.get(`/posts?userId=${this.props.id}`).then(response => {
                    const posts = response.data.splice(0, 6);
                    this.setState({ posts, userId: this.props.id })
                }).catch(error => {
                    console.log(error);
                })
            }
        }
    }

    selectedPostHandler = (id, userId) => {
        this.setState({ selectedPost: { id, userId }, newPost: false })
    }

    FormNewPostHandler = () => {
        this.setState({ newPost: true })
    }

    render() {
        let title, posts, newPost;
        title = <p className="text-center">Please select a user!</p>;
        if (this.state.posts) {
            title = (
                <h3 className="text-center">Posted by {this.props.name}</h3>
            )

            posts = this.state.posts.map(post => {
                return (
                    <Post
                        key={post.id}
                        title={post.title}
                        clicked={() => this.selectedPostHandler(post.id, post.userId)} />
                )
            })
        }

        if(this.state.newPost) {
            newPost = (
                <NewPost />
            )
        }

        return (
            <Aux>
                {title}
                <Button 
                    color="success"
                    className={(this.state.posts ? "visible center-block" : "hidden")}
                    onClick={() => this.FormNewPostHandler()}>
                    Add Post
                </Button>

                <Row>
                    {posts}
                </Row>

                {newPost}

                <FullPost id={this.state.selectedPost.id} userId={this.state.userId}/>
            </Aux>
        )
    }
}

export default Posts;