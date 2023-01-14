import React, { useState } from "react";
import Unit from "../Unit";
import classes from "./Modal.module.css";

function NewUnitModal(props) {
  const [units, setUnits] = useState([]);
  
  function handleSearch(event) {
    // console.log("searching for " + event.target.value);
    const searchTarget = event.target.value.toUpperCase();
    let matchedUnits = [];
    if (searchTarget.length > 2) {
      // find all units that start with eth
      for (let unit of props.units) {
        if (unit.name.includes(searchTarget)) {
          matchedUnits.push(unit);
        }
      }
    }

    // remove all units that are already in the current semester:
    matchedUnits = matchedUnits.filter((u) => {
      for (let unit of props.plan.semesters.find(sem => sem.name === props.details.semesterName).units) {
        if (unit === u.name) {
          return false
        }
      }
      return true
    })

    
    
      setUnits(matchedUnits);
  }

  return (
    <div className={classes.modal}>
      <h3>Add Unit:</h3>

      {/* Search div: */}
      <div className={classes.form__group}>
        <input
          type="input"
          className={classes.form__field}
          placeholder="Unit Name..."
          onChange={handleSearch}
          required
        />
      </div>

      {/* Results Div: */}
      <div>
        {units.map((unit) => {
          return (
            <Unit
              unitName={unit.name}
              unitDesc={unit.desc}
              addUnit={() =>{
                props.addUnitFunc(props.details.planName, props.details.semesterName, unit.name)
                props.close()
              }
              }
            />
          );
        })}
      </div>
    </div>
  );
}

export default NewUnitModal;
