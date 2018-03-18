import React from "react";
import Wrapper from "../../../../components/Styles/Wrapper";

const User = (props) => {
    return (
        <Wrapper background onClick={props.clicked}>
            <strong>{props.name}</strong>
        </Wrapper>
    )
}

export default User;