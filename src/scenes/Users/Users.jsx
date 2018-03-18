import React, { Component } from "react";
import axios from "../../services/axios";
import { Container, Row, Col } from "reactstrap";

import User from "./components/User/User";
import Posts from "./components/Posts/Posts";

class Users extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            seletedUser: {
                id: null,
                name: null
            }
        }
    }

    componentDidMount() {
        axios.get("/users").then( response => {
            const users = response.data;
            this.setState({ users })            
        }).catch( error => {
            console.log(error);
        })
    }

    selectedUserHandler = (id, name) => {
        this.setState({ seletedUser: { id, name } })
    }

    render () {
        let users;
        users = this.state.users.map( user => {
            return (
                <User 
                    key={user.id}
                    name={user.name}
                    clicked={() => this.selectedUserHandler(user.id, user.name)}/>
            )
        })

        return (
            <Container>
                <Row>
                    <Col sm="3">
                        <h3 className="text-center">Users</h3>
                        {users}
                    </Col>
                    <Col sm="9">
                        <section className="Posts">
                            <Posts id={this.state.seletedUser.id} name={this.state.seletedUser.name}/>
                        </section>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Users;