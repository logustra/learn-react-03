import React from "react";
import { Button } from "reactstrap";
import { injectGlobal } from "styled-components";
import Wrapper from "../../../../../components/Styles/Wrapper";

injectGlobal`
    p {
        margin: 0;
    }
`

const Comment = (props) => {
    return (
        <Wrapper border>
            <strong>{props.name}</strong>
            <p>{props.comment}</p>

            <Button color="link" onClick={props.edit}>
                Edit
            </Button>

            <Button color="link" onClick={props.delete}>
                Delete
            </Button>
        </Wrapper>
    )
}

export default Comment;