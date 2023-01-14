import React from "react";
import Unit from "./Unit";
import classes from "./Semester.module.css";

function Semester(props) {
  function removeUnit(unitName) {
    props.removeUnit(props.planName, props.semesterName, unitName);
  }

  /*
  function addUnit(unitName) {
    props.addUnit(props.planName, props.semesterName, unitName);
  } // */

  function removeSemester() {
    props.removeSemester(props.planName, props.semesterName);
  }

  function unitDesc(unitName) {
    return props.unitsList.find(u => u.name === unitName).desc
  }

  function makeUnitCards() {
    let number = 0;
    return (
      <>
        {props.units.map((unit) => {
          number += 1;
          return (
            <Unit
            key={unit}
              unitName={unit}
              unitDesc={unitDesc(unit)}
              unitNumber={number.toString().length < 2 ? "0" + number.toString() : number.toString()}
              removeUnit={() => removeUnit(unit)}
            />
          );
        })}
      </>
    );
  }

  return (
    <>
      <div className={classes.container}>
        <h2 className={classes.myh2}>{props.semesterName}</h2>

        <div className={classes.buttonDiv}>
        <button onClick={props.newUnitDisplay} className={classes.plusButton} title={"Add Unit"}>
        +
        </button>
      <div> ⠀ ⠀</div>
        <button onClick={removeSemester} className={classes.bigButton} title={"Remove Semester"}>
        x
        </button>
        </div>
        {makeUnitCards()}

      </div>
    </>
  );
}

export default Semester;
