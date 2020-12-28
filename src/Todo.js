import React, { useState } from "react";
import { db } from "./firebase";
import {
  List,
  Button,
  ListItem,
  ListItemText,
  Modal,
  makeStyles,
  ListItemAvatar
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

const Todo = ({ todo, uid }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [modalStyle] = useState(getModalStyle);
  const [input, setInput] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    db.collection(`${uid}`).doc(todo.id).set(
      {
        todo: input
      },
      { merge: true }
    );
    setInput("");
    setOpen(false);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <input
            className="input-field"
            placeholder={todo.todo}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button disabled={!input} className="edit-btn" onClick={handleSubmit}>
            Edit
          </button>
        </div>
      </Modal>
      <List className="todo-hover">
        <ListItem>
          <ListItemAvatar />
          <ListItemText primary={todo.todo} />
          <EditIcon onClick={handleOpen} />
          &nbsp; &nbsp;
          <DeleteIcon
            onClick={() => db.collection(`${uid}`).doc(todo.id).delete()}
          />
        </ListItem>
      </List>
    </div>
  );
};
export default Todo;
