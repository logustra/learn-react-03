import React from "react";
import { Col } from "reactstrap";
import Wrapper from "../../../../../components/Styles/Wrapper";

const Post = (props) => {
    return (
        <Col sm="4">
            <Wrapper border onClick={props.clicked}>
                <strong>{props.title}</strong>
            </Wrapper>
        </Col>
    )
}

export default Post;