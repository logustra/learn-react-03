import React, { Component } from "react";
import axios from "../../../../../services/axios";
import { Label, FormGroup, Input, Button } from "reactstrap";
import { injectGlobal } from "styled-components";

injectGlobal`
    .btn-full {
        width: 100%;
    }
`

class EditPost extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userId: this.props.userId,
            id: this.props.id,
            title: this.props.title,
            body: this.props.body
        }
    }

    editPostHandler = () => {
        const data = {
            userId: this.state.userId,
            id: this.state.id,
            title: this.state.title,
            body: this.state.body
        }

        axios.put(`/posts/${this.props.id}`, data).then(response => {
            console.log(response);
        })
    }

    render() {
        return (
            <div>
                <FormGroup>
                    <Label>Title</Label>
                    <Input
                        type="text"
                        value={this.state.title}
                        placeholder="Title"
                        onChange={(event) => this.setState({ title: event.target.value })} />
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
                        onClick={() => this.editPostHandler()}>
                        Update
                    </Button>
                </FormGroup>
            </div>
        )
    }
}

export default EditPost;