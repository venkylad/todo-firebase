import React, { useEffect, useState } from "react";
import { FormControl, Input, InputLabel, Button } from "@material-ui/core";
import Todo from "./Todo";
import { db, auth } from "./firebase";
import firebase from "firebase";

const TodoInput = ({ uid, user }) => {
  const [todo, setTodo] = useState([]);
  const [input, setInput] = useState("");

  const handleClick = (e) => {
    e.preventDefault();
    db.collection(`${uid}`).add({
      todo: input,
      timeStamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    setInput("");
  };

  useEffect(() => {
    db.collection(`${uid}`)
      .orderBy("timeStamp", "desc")
      .onSnapshot((snapshot) => {
        setTodo(
          snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              todo: doc.data().todo
            };
          })
        );
      });
  }, [uid]);

  return (
    <div>
      <h1>
        Hello <i>{user.displayName}</i> ! Let's Set What TODO
      </h1>
      <br />
      <hr />
      <br />
      <Button
        variant="contained"
        color="primary"
        onClick={() => auth.signOut()}
      >
        Sign Out
      </Button>

      <br />
      <br />

      <hr />

      <br />
      <br />

      <form>
        <FormControl>
          <InputLabel htmlFor="my-input">Enter What TO DO</InputLabel>
          <Input
            id="my-input"
            aria-describedby="my-helper-text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </FormControl>
        <Button
          disabled={!input}
          variant="contained"
          color="primary"
          type="submit"
          onClick={handleClick}
        >
          Set it
        </Button>
      </form>
      {todo.map((singleTodo, idx) => (
        <Todo key={idx} todo={singleTodo} uid={uid} />
      ))}
    </div>
  );
};
export default TodoInput;
