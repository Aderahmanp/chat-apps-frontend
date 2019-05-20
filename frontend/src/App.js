import React, { Component, Fragment } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import ChatRoom from "./components/ChatRoom";

class App extends Component {
  state = {
    isLogin: false
  };

  isLogin = () => {
    this.setState({
      isLogin: true
    });
  };

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            component={props => <SignIn {...props} isLogin={this.isLogin} />}
          />
          <Route
            path="/signup"
            component={props => <SignUp {...props} isLogin={this.isLogin} />}
          />
          {this.state.isLogin && (
            <Route path="/chatroom" component={ChatRoom} />
          )}
          <Route path="*" component={() => "Salah alamat gan!"} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
