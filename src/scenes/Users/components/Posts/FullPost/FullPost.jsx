import React, { Component } from "react";
import axios from "../../../../../services/axios";
import { Button } from "reactstrap";
import styled, { injectGlobal } from "styled-components";

import Comments from "../../Comments/Comments";
import EditPost from "../EditPost/EditPost";
import Wrapper from "../../../../../components/Styles/Wrapper";

injectGlobal`
    .hidden {
        display: none;
    }

    .visible {
        display: block:
    }
`

const BtnGroup = styled.div`
    text-align: center;
    margin: 15px 0;

    .btn {
        margin: 0 7.5px;
    }
`

class FullPost extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userId: null,
            post: null,
            editPost: false,
            showCommentsById: null,
            data: {
                title: null,
                body: null
            }
        }
    }

    componentDidUpdate() {
        if(this.props.id) {
            if (!this.state.post || (this.state.userId !== this.props.id)) {
                axios.get(`/posts/${this.props.id}`).then( response => {
                    const post = response.data;
                    this.setState({ post, userId: this.props.id })
                }).catch( error => {
                    console.log(error);
                })
            }
        }
    }

    showCommentsHandler = (id) => {
        this.setState({ showCommentsById: id, editPost: false })
    }

    formEditPostHandler = () => {
        this.setState({ editPost: true})
    }

    deletePostHandler = () => {
        axios.delete(`/posts/${this.props.id}`).then(response => {
            console.log(response);
        })
    }

    render() {
        let post, formEdit;
        if (this.state.post) {
            post = (
                <Wrapper border>
                    <h3 className="text-center">{this.state.post.title}</h3>
                    <p>{this.state.post.body}</p>
                    <BtnGroup>
                        <Button color="primary"
                            onClick={() => this.showCommentsHandler(this.state.post.id)}>
                            Comments
                         </Button>

                        <Button color="info"
                            onClick={() => this.formEditPostHandler()}>
                            Edit
                        </Button>

                        <Button color="danger"
                            onClick={() => this.deletePostHandler()}>
                            Delete
                        </Button>
                    </BtnGroup>
                </Wrapper>
            )
        }

        if (this.state.editPost) {
            formEdit = (
                <EditPost 
                    userId={this.props.userId}
                    id={this.state.post.id} 
                    title={this.state.post.title} 
                    body={this.state.post.body} />
            )
        }

        return (
            <div>
                {post}
                {formEdit}
                <Comments 
                    class={(this.state.editPost ? "hidden" : "visible")} 
                    id={this.state.showCommentsById} />
            </div>
        )
    }
}

export default FullPost;
