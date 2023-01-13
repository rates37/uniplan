import React from "react";
import classes from "./Unit.module.css";

function Unit(props) {
  const handbookLink =
    "https://handbook.monash.edu/current/units/" + props.unitName;
  return (
    <div className={classes.card}>
      <div className={classes.box}>
        <div className={classes.content}>
          <h2>{props.unitNumber}</h2>
          <h3>{props.unitName}</h3>
          <p>{props.unitDesc}</p>
          <a target="_blank" rel="noreferrer" href={handbookLink} title={"View unit in Handbook"}>
            Handbook
          </a>
          {props.addUnit ? (
            <button onClick={props.addUnit} title={"Add Unit"}>+</button>
          ) : <button onClick={props.removeUnit} title={"Remove Unit"}>☓</button> }
         
        </div>
      </div>
    </div>
  );
}

export default Unit;
