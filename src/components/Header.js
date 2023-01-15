import React from 'react'
import classes from './Header.module.css'

function Header(props) {
  return (
    <header className={classes.header}>
        <div className={classes.logo}>Course Planner</div>
        <div>
        <button className={classes.addButton} onClick={props.addSemester} title={"Add Semester"}>Add Semester</button>
        <button className={classes.addButton} onClick={props.displayOptions} title={"Options"}>Options</button>

        </div>
    </header>
  )
}

export default Header