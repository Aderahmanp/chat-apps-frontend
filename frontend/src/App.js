import React, { Component, Fragment } from "react";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

class App extends Component {
  render() {
    return (
      <Fragment>
        <SignIn />
        <SignUp />
      </Fragment>
    );
  }
}

export default App;
