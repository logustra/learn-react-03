import React, { Component } from "react";
import axios from "../../../../../services/axios";
import { Button, FormGroup, Label, Input } from "reactstrap";
import { injectGlobal } from "styled-components";

injectGlobal`
    .btn-full {
        width: 100%;
    }
`

class NewPost extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: null,
            body: null,
        }
    }

    newPostHandler = () => {
        const data = {
            title: this.state.title,
            body: this.state.body
        }

        axios.post("/posts", data).then(response => {
            console.log(response);
        }).catch(error => {
            console.log(error);
        })
    }

    render() {
        return (
            <div>
                <FormGroup>
                    <Label>Title</Label>
                    <Input
                        type="text"
                        placeholder="Title"
                        onChange={(event) => this.setState({ title: event.target.value })} />
                </FormGroup>

                <FormGroup>
                    <Label>Body</Label>
                    <Input
                        type="textarea"
                        placeholder="Body"
                        onChange={(event) => this.setState({ body: event.target.value })} />
                </FormGroup>

                <FormGroup>
                    <Button
                        color="info"
                        className="btn-full"
                        onClick={() => this.newPostHandler()}>
                        Add New
                        </Button>
                </FormGroup>
            </div>
        )
    }
}

export default NewPost;