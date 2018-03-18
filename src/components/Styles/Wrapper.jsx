import styled from "styled-components";
import colors from "./Colors";

const Wrapper = styled.div`
    background: ${props => props.background ? colors.green : 'white'};
    border: ${props => props.border ? `1px solid ${colors.darksmoke}` : '0'}
    padding: 15px;
    margin: 15px 0;
    cursor: pointer;

    h2 {
        font-size: 15px;
    }
`;

export default Wrapper;