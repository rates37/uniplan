import classes from "./App.module.css";
import { useEffect, useState } from "react";
import Semester from "./components/Semester";
import Header from "./components/Header";
import Backdrop from "./components/modals/Backdrop";
import NewUnitModal from "./components/modals/NewUnitModal";

// import unit data
const units = require("./units.json");

let const_plans = [
  {
    name: "My course plan name",
    semesters: [
      {
        name: "2020, Semester 1",
        units: ["ENG1001", "ENG1005", "ENG1060", "FIT1045"],
      },
      {
        name: "2020, Semester 2",
        units: ["ENG1002", "ENG1003", "ENG2005", "FIT1054"],
      },
      {
        name: "2021, Semester 1",
        units: ["ECE2071", "ECE2131", "FIT1047", "MAT1830"],
      },
      {
        name: "2021, Semester 2",
        units: ["ECE2072", "ECE2191", "FIT1048", "FIT1049"],
      },
      {
        name: "2022, Semester 1",
        units: ["CHM1011", "ECE3073", "FIT2004", "FIT2099"],
      },
      {
        name: "2022, Semester 2",
        units: ["ECE2111", "ECE3121", "FIT2014", "FIT2102"],
      },
    ],
  },

  // more of the same
];

const LOCAL_STORAGE_KEY = "uni-planner-plans";
// let const_plans = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));

function App() {
  let [plans, setPlans] = useState(const_plans);
  let [newUnitModalDisplay, setNewUnitModalDisplay] = useState(true);
  let [semName, setSemName] = useState("");
  let [planName, setPlanName] = useState("");

  // function to delete a semester from the plan:
  function removeSemester(planName, semesterName) {
    const plan = plans.find((p) => p.name === planName);
    const planSemesters = plan.semesters.filter(
      (sem) => sem.name !== semesterName
    );

    const otherPlans = plans.filter((p) => p.name !== planName);

    const newPlans = [
      ...otherPlans,
      { name: planName, semesters: planSemesters },
    ];
    setPlans(newPlans);
    console.log(newPlans);
  }

  // function to add a semester to a plan:
  function addSemester(planName, semesterName) {
    const plan = plans.find((p) => p.name === planName);
    const planSemesters = [
      ...plan.semesters,
      { name: semesterName, units: [] },
    ];
    const otherPlans = plans.filter((p) => p.name !== planName);

    const newPlans = [
      ...otherPlans,
      { name: planName, semesters: planSemesters },
    ];
    setPlans(newPlans);
  }

  // function to delete a unit from a semester in the plan:
  function removeUnit(planName, semesterName, unitName) {
    const plan = plans.find((p) => p.name === planName);
    const targetSemester = plan.semesters.find((s) => s.name === semesterName);
    const newUnitList = targetSemester.units.filter((u) => u !== unitName);

    const newSemester = { ...targetSemester, units: newUnitList };
    const newPlan = {
      ...plan,
      semesters: [
        ...plan.semesters.filter((s) => s.name !== semesterName),
        newSemester,
      ].sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0)),
    };

    // console.log(newPlan);
    const otherPlans = plans.filter((p) => p.name !== planName);
    const newPlans = [...otherPlans, newPlan];
    setPlans(newPlans);
  }

  // function to add a unit to a semester in the plan:
  function addUnit(planName, semesterName, unitName) {
    const plan = plans.find((p) => p.name === planName);
    const targetSemester = plan.semesters.find((s) => s.name === semesterName);
    const newUnitList = [...targetSemester.units, unitName];

    const newSemester = { ...targetSemester, units: newUnitList };
    const newPlan = {
      ...plan,
      semesters: [
        ...plan.semesters.filter((s) => s.name !== semesterName),
        newSemester,
      ].sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0)),
    };

    // console.log(newPlan);
    const otherPlans = plans.filter((p) => p.name !== planName);
    const newPlans = [...otherPlans, newPlan];
    setPlans(newPlans);
  }

  // Store plans in local storage:
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(plans));
  }, [plans]);

  // Load plans from local storage:
  useEffect(() => {
    const storedPlans = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedPlans) setPlans(storedPlans);
  }, []);

  return (
    <>
      <div className={classes.mainBody}>
        <Header />

        {plans.map((plan) => {
          return (
            <>
              <h2 className={classes.title}>{plan.name}</h2>
              {plan.semesters.map((sem) => {
                return (
                  <Semester
                    units={sem.units}
                    semesterName={sem.name}
                    planName={plan.name}
                    addUnit={addUnit}
                    removeUnit={removeUnit}
                    removeSemester={removeSemester}
                    unitsList={units.units}
                    newUnitDisplay={() => {
                      setNewUnitModalDisplay(true);
                      setPlanName(plan.name);
                      setSemName(sem.name)
                    }
                  }
                  />
                );
              })}
            </>
          );
        })}
      </div>
      {newUnitModalDisplay ? (
        <>
          <Backdrop onClick={() => setNewUnitModalDisplay(false)} />
          <NewUnitModal
            units={units.units}
            details={{planName: planName, semesterName: semName}}
            addUnitFunc={addUnit}
          />
        </>
      ) : null}
    </>
  );
}

export default App;
