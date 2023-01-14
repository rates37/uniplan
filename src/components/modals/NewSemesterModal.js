import React, { useState } from "react";
import classes from "./Modal.module.css";

function NewSemesterModal(props) {
    let [errorMessage, setErrorMessage] = useState("");
    let [yearContents, setYearContents] = useState("");
    let [semesterContents, setSemesterContents] = useState("Semester 1");

    function handleYearInput(e) {
        setYearContents(e.target.value);
    }

    function handleSemesterInput(e) {
        setSemesterContents(e.target.value);
    }
    
    // false if invalid, true if valid
    function validateInputs() {
        // check year is a valid year:
         if (+yearContents < 2010 || +yearContents > 2050) {
            setErrorMessage("Please select a valid year");
            return false
         }

         // check if year + semester already exists in plan:
         for (let sem of props.plan.semesters) {
             if ((yearContents + ", " + semesterContents) === sem.name) {
                setErrorMessage("This semester already exists in your plan!");
                return false;
             }
         }

         setErrorMessage("");
         return true;
    }

    function addSemester() {
        if (validateInputs()) {
            props.addSemester(yearContents + ", " + semesterContents)
            props.close()
        }
    }


  return (
    <div>
      <div className={classes.modal}>
        <h3>Add Semester:</h3>

        {/* Error Display */}
        <div className={classes.error}>{errorMessage}</div>

        {/* Year and Semester input: */}
        <div className={classes.form__group}>
          <input
            type="number"
            className={classes.form__field + " " + classes.input}
            placeholder="Year"
              onChange={handleYearInput}
            required
          />
            <select className={classes.select} onChange={handleSemesterInput}>
                <option>Semester 1</option>
                <option>Semester 2</option>
                <option>Summer Semester</option>
            </select>
        </div>

        {/* Go Button */}
        <div>
            <button className={classes.addButton} onClick={addSemester}>Add</button>
        </div>
      </div>
    </div>
  );
}

export default NewSemesterModal;
