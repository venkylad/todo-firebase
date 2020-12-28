import React, { Component } from "react";
import "./styles.css";
import Todo from "./TodoInput";
import { Button } from "@material-ui/core";
import { signInWithGoogle, auth } from "./firebase";

class App extends Component {
  state = {
    user: null,
    uid: null
  };

  unsubscribe = null;

  componentDidMount = () => {
    this.unsubscribe = auth.onAuthStateChanged((user) => {
      this.setState({ user: user });
      this.setState({ uid: user.uid });
    });
  };

  render() {
    const { user, uid } = this.state;
    return (
      <div className="App">
        {user === null ? (
          <div>
            <h1>
              Sign in to start your what <i>TODO</i>
            </h1>
            <br />
            <br />
            <Button
              variant="contained"
              color="primary"
              onClick={signInWithGoogle}
            >
              Sign In With Google
            </Button>
          </div>
        ) : (
          <Todo uid={uid} user={user} />
        )}
      </div>
    );
  }
}
export default App;
