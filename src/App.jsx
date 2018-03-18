import React, { Component } from "react";
import Aux from "./hoc/Aux/Aux";
import Users from "./scenes/Users/Users";

class App extends Component {
  render() {
    return (
      <Aux>
        <Users />
      </Aux>
    );
  }
}

export default App;
