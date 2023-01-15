import classes from "./App.module.css";
import { useEffect, useState } from "react";
import Semester from "./components/Semester";
import Header from "./components/Header";
import Backdrop from "./components/modals/Backdrop";
import NewUnitModal from "./components/modals/NewUnitModal";
import NewSemesterModal from "./components/modals/NewSemesterModal";
import units from "./units.json";
import OptionsModal from "./components/modals/OptionsModal";

// let const_plans_template = [
//   {
//     name: "My course plan name",
//     semesters: [
//       {
//         name: "2020, Semester 1",
//         units: ["ENG1001", "ENG1005", "ENG1060", "FIT1045"],
//       },
//       {
//         name: "2020, Semester 2",
//         units: ["ENG1002", "ENG1003", "ENG2005", "FIT1054"],
//       },
//       {
//         name: "2021, Semester 1",
//         units: ["ECE2071", "ECE2131", "FIT1047", "MAT1830"],
//       },
//       {
//         name: "2021, Semester 2",
//         units: ["ECE2072", "ECE2191", "FIT1048", "FIT1049"],
//       },
//       {
//         name: "2022, Semester 1",
//         units: ["CHM1011", "ECE3073", "FIT2004", "FIT2099"],
//       },
//       {
//         name: "2022, Semester 2",
//         units: ["ECE2111", "ECE3121", "FIT2014", "FIT2102"],
//       },
//     ],
//   },

//   // more of the same
// ];

let empty_plans_template = [
  {
    name: "Course Plan",
    semesters: [
      {
        name: "2023, Semester 1",
        units: []
      }

    ],
  },
]

const LOCAL_STORAGE_KEY = "uni-planner-plans";
let const_plans = localStorage.getItem(LOCAL_STORAGE_KEY) ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) : empty_plans_template;

function App() {
  let [plans, setPlans] = useState(const_plans);
  let [newUnitModalDisplay, setNewUnitModalDisplay] = useState(false);
  let [newSemesterModalDisplay, setNewSemesterModalDisplay] = useState(false);
  let [optionsModalDisplay, setOptionsModalDisplay] = useState(false);
  let [semName, setSemName] = useState("");
  let [planName, setPlanName] = useState(plans[0].name);
  let [displayUnitNames, setDisplayUnitNames] = useState(true);

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
    ].sort((a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0));
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
        <Header addSemester={() => setNewSemesterModalDisplay(true)} displayOptions={() => setOptionsModalDisplay(true)}/>
      {/* // TODO: Add a plan selector so user can make multiple plans */}
        {/* code for when multiple plans are implemented: */}
        {/* {plans.map((plan) => {
          return (
            <div key={plan.name} className={classes.ignoreAll}>
              <h2 className={classes.title}>{plan.name}</h2>
              {plan.semesters.map((sem) => {
                return (
                  <Semester
                    key={sem.name}
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
                      setSemName(sem.name);
                    }}
                  />
                );
              })}
            </div>
          );
        })} */}

        <h2 className={classes.title}>{plans[0].name}</h2>
        {plans[0].semesters.map((sem) => {
          return (
            <Semester
              key={sem.name}
              units={sem.units}
              semesterName={sem.name}
              planName={plans[0].name}
              addUnit={addUnit}
              removeUnit={removeUnit}
              removeSemester={removeSemester}
              unitsList={units.units}
              newUnitDisplay={() => {
                setNewUnitModalDisplay(true);
                setPlanName(plans[0].name);
                setSemName(sem.name);
              }}
              displayUnitNames={displayUnitNames}
            />
          );
        })}
      </div>
      {newUnitModalDisplay ? (
        <>
          <Backdrop onClick={() => setNewUnitModalDisplay(false)} />
          <NewUnitModal
            units={units.units}
            details={{ planName: planName, semesterName: semName }}
            addUnitFunc={addUnit}
            plan={plans.filter((p) => p.name === planName)[0]}
            close={() => setNewUnitModalDisplay(false)}
            displayUnitNames={displayUnitNames}
          />
        </>
      ) : newSemesterModalDisplay ? (
        <>
          <Backdrop onClick={() => setNewSemesterModalDisplay(false)} />
          <NewSemesterModal
            plan={plans.filter((p) => p.name === planName)[0]}
            addSemester={(semName) => addSemester(planName, semName)}
            close={() => setNewSemesterModalDisplay(false)}
          />
        </>
      ) : optionsModalDisplay ? (
        <>
          <Backdrop onClick={() => setOptionsModalDisplay(false)} />
          <OptionsModal
          unitNameToggle={() => {displayUnitNames ? setDisplayUnitNames(false) : setDisplayUnitNames(true)}}
          />
        </>
      ) : null}
    </>
  );
}

export default App;
