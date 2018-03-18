import React, { Component } from "react";
import axios from "../../../../../services/axios";
import { Label, FormGroup, Input, Button } from "reactstrap";
import { injectGlobal } from "styled-components";

injectGlobal`
    .btn-full {
        width: 100%;
    }
`

class EditComment extends Component {
    constructor(props) {
        super(props)
        this.state = {
            postId: null,
            id: null,
            name: null,
            email: null,
            body: null,
        }
    }

    componentDidUpdate() {
        if(this.props.id) {
            if (!this.state.id || (this.state.id !== this.props.id)) {
                axios.get(`/comments/${this.props.id}`).then( response => {
                    const data = response.data;
                    this.setState(
                        { 
                            postId: this.props.postId,
                            id: this.props.id, 
                            name: data.name, 
                            email: data.email, 
                            body: data.body
                        }
                    )
                }).catch( error => {
                    console.log(error);
                })
            }
        }
    }

    editCommentHandler = () => {
        const data = {
            postId: this.state.postId,
            id: this.state.id,
            name: this.state.name,
            email: this.state.email,
            body: this.state.body
        };
        axios.put(`/comments/${this.props.id}`, data).then(response => {
            console.log(response);
        })
    }

    render() {
        let formEdit;

        if (this.state.id) {
            formEdit = (
                <div>
                    <FormGroup>
                        <Label>Name</Label>
                        <Input
                            type="text"
                            value={this.state.name}
                            placeholder="Name"
                            onChange={(event) => this.setState({ name: event.target.value })} />
                    </FormGroup>

                    <FormGroup>
                        <Label>Email</Label>
                        <Input
                            type="email"
                            value={this.state.email}
                            placeholder="Email"
                            onChange={(event) => this.setState({ email: event.target.value })} />
                    </FormGroup>

                    <FormGroup>
                        <Label>Body</Label>
                        <Input
                            type="textarea"
                            value={this.state.body}
                            placeholder="Body"
                            onChange={(event) => this.setState({ body: event.target.value })} />
                    </FormGroup>

                    <FormGroup>
                        <Button
                            color="info"
                            className="btn-full text-center"
                            onClick={() => this.editCommentHandler()}>
                            Update
                    </Button>
                    </FormGroup>
                </div>
            )
        }

        return (
            <div>
                {formEdit}
            </div>
        )
    }
}

export default EditComment;