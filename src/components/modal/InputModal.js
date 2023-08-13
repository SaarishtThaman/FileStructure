import { useState } from "react";
import classes from "./Modal.module.css";

const InputModal = (props) => {
  const [name, setName] = useState("");

  return (
    <div className={classes.modal}>
      <div>{props.data.question}</div>
      <input
        type="text"
        onChange={(e) => {
          setName(e.target.value);
        }}
      ></input>
      <div className={classes.buttons}>
        <button
          onClick={() => {
            if (name === "") {
              alert("Name cannot be empty");
              return;
            }
            props.data.ok(name, props.data.isFolder);
          }}
        >
          OK
        </button>
        &nbsp;
        <button onClick={() => props.data.displayModal(false)}>CANCEL</button>
      </div>
    </div>
  );
};

export default InputModal;
