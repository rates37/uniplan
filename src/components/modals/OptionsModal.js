import React from "react";
import classes from "./Modal.module.css";

function OptionsModal(props) {
  return (
    <div className={classes.modal}>
      <h3>View Options:</h3>

      <div>
        <p
          style={{
            fontSize: "1.5rem",
            fontWeight: "lighter",
          }}
        >
          Toggle Unit Names:{" "}
          <button
            className={classes.addButton}
            onClick={props.unitNameToggle}
          />
        </p>
      </div>
    </div>
  );
}

export default OptionsModal;
