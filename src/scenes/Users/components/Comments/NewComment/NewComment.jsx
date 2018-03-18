import React, { Component } from "react";
import axios from "../../../../../services/axios";
import { Button, FormGroup, Label, Input } from "reactstrap";
import { injectGlobal } from "styled-components";

injectGlobal`
    .btn-full {
        width: 100%;
    }
`

class NewComment extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: null,
            comment: null,
        }
    }

    NewCommentHandler = () => {
        const data = {
            name: this.state.name,
            comment: this.state.comment
        }

        axios.post(`/comments?postId=${this.props.postId}`, data).then(response => {
            console.log(response);
        }).catch(error => {
            console.log(error);
        })
    }

    render() {
        return (
            <div>
                <FormGroup>
                    <Label>Name</Label>
                    <Input
                        type="text"
                        placeholder="Name"
                        onChange={(event) => this.setState({ name: event.target.value })} />
                </FormGroup>

                <FormGroup>
                    <Label>Comment</Label>
                    <Input
                        type="textarea"
                        placeholder="Comment"
                        onChange={(event) => this.setState({ comment: event.target.value })} />
                </FormGroup>

                <FormGroup>
                    <Button
                        color="info"
                        className="btn-full"
                        onClick={() => this.NewCommentHandler()}>
                        Add New
                        </Button>
                </FormGroup>
            </div>
        )
    }
}

export default NewComment;