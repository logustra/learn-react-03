import React, { Component } from 'react';
import axios from '../../../../services/axios';
import { Button } from "reactstrap";

import Comment from "./Comment/Comment";
import EditComment from "../Comments/EditComent/EditComment";
import NewComment from "../Comments/NewComment/NewComment";

class Comments extends Component {
    constructor(props) {
        super(props)
        this.state = {
            postId: null,
            comments: null,
            newComment: false,
            editCommentById: null
        }
    }

    componentDidUpdate() {
        if (this.props.id) {
            if (!this.state.comments || (this.state.postId !== this.props.id)) {
                axios.get(`/comments?postId=${this.props.id}`).then(response => {
                    const comments = response.data;
                    this.setState({ comments, postId: this.props.id })
                });
            }
        }
    }

    editCommentHandler = (id) => {
        this.setState({ editCommentById: id, newComment: false })
    }

    formNewCommentHandler = () => {
        this.setState({ newComment: true })
    }

    deleteCommentHandler = (id) => {
        axios.delete(`/comments/${id}`).then( response => {
            console.log(response);
        })
    }

    render() {
        let comments, btnNewComment, formNewComment;
        if (this.state.comments) {
            btnNewComment = (
                <Button
                    color="success"
                    onClick={() => this.formNewCommentHandler()}>
                    New Comment
                </Button>
            )

            comments = this.state.comments.map( comment => {
                return (
                    <Comment
                        key={comment.id}
                        name={comment.name}
                        comment={comment.body} 
                        edit={() => this.editCommentHandler(comment.id)}
                        delete={() => this.deleteCommentHandler(comment.id)}/>
                )
            })
        }

        if(this.state.newComment) {
            formNewComment = (
                <NewComment postId={this.state.postId} />
            )
        }

        return (
            <div className={this.props.class}>
                {btnNewComment}
                {comments}
                {formNewComment}
                <EditComment id={this.state.editCommentById} postId={this.props.id}  />
            </div>
        )
    }
}

export default Comments;