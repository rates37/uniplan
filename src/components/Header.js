import React from 'react'
import classes from './Header.module.css'

function Header(props) {
  return (
    <header className={classes.header}>
        <div className={classes.logo}>Course Planner</div>
        <button className={classes.addButton} onClick={props.addSemester} title={"Add Semester"}>Add Semester</button>
    </header>
  )
}

export default Header