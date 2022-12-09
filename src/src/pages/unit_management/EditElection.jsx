import { DynamicDataTable } from '@langleyfoxall/react-dynamic-data-table'
import React, { useEffect, useState } from 'react'
import styles from './styles/ScheduleNew.module.css'


function EditElection() {
    const Id = () => {
        const URL = window.location.href;
        const arr = URL.split("/");
        const param = arr[arr.length - 1];
        const arr1 = param.split("=");
        return arr1[1];
      }
    
    var currentdate = new Date(); 
    var hrs = currentdate.getHours();
    var mins = currentdate.getMinutes();
    var secs = currentdate.getSeconds();

    if (hrs <10){
        hrs = "0" + hrs;

    }
    if(mins<10){
        mins = "0" + mins;
    }
    if(secs<10){
        secs = "0" + secs;
    }

    var time =  hrs + ":"  
                + mins + ":" 
                + secs;

    // console.log(time)

    
    const [PC, setPC] = useState("");
    const [PCs, setPCs] = useState("");
    const [AC, setAC] = useState("");

    const [state, setState] = useState("");
    const [states, setStates] = useState({});
    const [elections, setElections] = useState([]);

    async function getElectionList() {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_SERVER}/unit/listElection`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: 'same-origin',
                    mode: "cors"
                }
            );
            const data = await response.json();
            console.log(data['data'])
            if(data["data"]!=404){
                setElections(data['data']);
                
            }
            
        } catch (err) {
            console.log({err});
        }
    }
   


    async function postFlc() {

        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_SERVER}/unit/flc_announce`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: 'same-origin',
                    body: JSON.stringify({
                        // Severity: document.getElementById("formSeverity").value.slice(-1),


                    }),
                }
            );
            

            // console.log(response);
            const data = await response.json();
            // console.log("data" + data);
            // console.log("Message:" + data["message"])
            if (data["message"] === "Insertion successful") {
                document.getElementById("form").reset();
                alert("Successful");
                window.location.pathname = "/session/unitmanagement/flc_list";
            } else {
                alert("Failed!");
            
            }
        } catch (err) {
            console.log(err);
        }
    }

    async function getState() {
        try {

          const response = await fetch(
            `${process.env.REACT_APP_API_SERVER}/user/getStateList`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
    
          const data = await response.json();
        //   console.log(data);
          setStates(data["states"]);
          getPCListbyState();
        } catch (err) {
          console.log(err);
        }
        
      }

    async function getPCListbyState(){
        try {
            const response = await fetch(
              `${process.env.REACT_APP_API_SERVER}/user/getPCListbyState/${states[state]}`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            const data2 = await response.json();
            if (data2["PCs"]) {
              setPCs(data2["PCs"]);
            }
          } catch (err) {
            console.log(err);
          }
    }
    
    async function getACListbyState(){
        try {
            const response = await fetch(
              `${process.env.REACT_APP_API_SERVER}/user/getACListbyStatePC/${states[state]}`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            const data2 = await response.json();
            // console.log(data2)
            if (data2["ACs"]) {
              setAC(data2["ACs"]);
            }
          } catch (err) {
            console.log("AC",err);
          }
    }



    console.log(states[state])
    // getPCListbyState()
    useEffect(() => {
        getState();
        getElectionList();
        // getPCListbyState()
        // console.log(states)
    },[])

    useEffect(() => {
        getPCListbyState()
        getACListbyState()
    },[state])
    // getPCListbyState()
    // getACListbyState()
    console.log({PCs})

    
    async function postElection() {

        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_SERVER}/unit/schedule_election`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: 'same-origin',
                    body: JSON.stringify({
                        // Severity: document.getElementById("formSeverity").value.slice(-1),
                        State: document.getElementById("1").value,
                        PC: document.getElementById("2").value,
                        AC: document.getElementById("3").value,
                        electionType: document.getElementById("4").value.slice(-1),
                        startDate: document.getElementById("5").value + " " + time,
                        endDate: document.getElementById("6").value + " " + time


                    }),
                }
            );
            

            console.log(response);
            const data = await response.json();
            console.log("data" + data);
            console.log("Message:" + data["message"])
            if (data["message"] === "Insertion successful") {
                document.getElementById("form").reset();
                alert("Successful");
                window.location.pathname = "/session/unitmanagement/schedule_list";
            } else {
                alert("Failed!");
            
            }
        } catch (err) {
            console.log(err);
        }
    }

    const onFormSubmit = async (e) => {
        e.preventDefault();
        console.log("submit button clicked")
        postElection();
        // try{

        
        // let submittingData = []
        // // const i = 3;
        // // submittingData.push(document.getElementById(i).value)
        // var i = 1;
        // while(i<12){
        //     // console.log(i)
        //     submittingData.push(document.getElementById(i).value);
        //     i = i +1;
        // }
        // console.log({submittingData})
        // }catch{
            
        // }
        
        // console.log("date: " +document.getElementById("10").value)
        // console.log("times: " + Date.now().getHours())
    };

    // const [currData, setCurrData] = useState([]);
    let id = Id();
    
    // console.log(elections[5][5])
    // function setData(props){
    //     try{
    //         // var i = 0;
    //         // while(i<=5){
    //             // currData.push(elections[props][i])
    //             // console.log(elections[5][5])
    //             // i = i+1;
    //         // }
    //         console.log(elections)
    //     }catch{
    //         console.log(elections[props][0])
    //     }

        
    // }

    const [currState,setCurrState] = useState("")
    const [currPC,setCurrPC] = useState("")
    const [currAC,setCurrAC] = useState("")
    const [currType,setCurrType] = useState("")
    const [currStart,setCurrStart]= useState("")
    const [currEnd,setCurrEnd]= useState("")

    


    useEffect(() => {
        try{
            if(elections !== undefined){
                setCurrState(elections[id][0]);
                setCurrPC(elections[id][1]);
                setCurrAC(elections[id][2]);
                setCurrType(elections[id][3]);
                setCurrStart(elections[id][4].slice(0,10));
                setCurrEnd(elections[id][5].slice(0,10));
                console.log(currEnd)
                
            }

        }catch{
            console.log("err")
        }

    },[elections])
    const [edit, setEdit] = useState(false)
    console.log({AC})
    useEffect(() => {
        try{
            if(elections !== undefined){
        setState(elections[id][0])
    }

    }catch{
        console.log("err2")
    }
        },[edit])

    
    return(
        <>
        <button className={styles.editBtn} 
            onClick = {() => { setEdit(true)}}
        >
            Edit Flc Schedule
        </button>
        <form onSubmit={onFormSubmit} id="form">
        <div className={styles.Schedule_container}>
            <div className={styles.Schedule_header}>
                <h4>
                Schedule Election
                </h4> 
            </div>
            <div class={styles.parent}>

                <div class={styles.div1}>
                    <p> State</p>
                    {edit === false ?
                    <input 
                    class={styles.dateInput}
                    disabled = {true}
                    defaultValue={currState}
                    type = "text"
                    className=" selectBox"
                    
                    ></input>:

                
                    <select
                        //   required={!isTemporary}
                        required
                        name=""
                        id="1"
                        className=" selectBox"
                        defaultValue={currState}
                        onChange={(e) => {setState(e.target.value)}}
                    >

                <option value="0" disabled selected>
                    Select State
                </option>
                {/* {console.log(states)} */}
                {states && Object.keys(states).map((st) => (
                  <option value={st} className="text-black">
                    {st}
                  </option>
                ))}
                </select>
                }
                </div>

                <div class={styles.div2}> 
                <p> PC</p>
                {edit === false ?
                    <input 
                    class={styles.dateInput}
                    disabled = {true}
                    defaultValue={currPC}
                    type = "text"
                    className=" selectBox"
                    
                    ></input>:
                    <select
                        //   required={!isTemporary}
                        required
                        name=""
                        id="2"
                        defaultValue={currPC}
                        className=" selectBox"
                    //   onChange={(e) => setRoleFunc(e.target.value)}
                    >
                        <option value="0" disabled selected>
                            Select PC
                        </option>
                        {/* {console.log(states)} */}
                        {PCs && Object.keys(PCs).map((st) => (
                            <option value={st} className="text-black">
                            {st}
                            </option>
                        ))}
                        {/* {levelArray.map((st, index) => (
                            <option value={st} className="text-black">
                                {index + 1}. {st}
                            </option>
                        ))} */}

                    </select>
                    }
                </div>

                <div class={styles.div3}> 
                <p> AC</p>
                {edit === false ?
                    <input 
                    class={styles.dateInput}
                    disabled = {true}
                    defaultValue={currAC}
                    type = "text"
                    className=" selectBox"
                    
                    ></input>:
                    <select
                        //   required={!isTemporary}
                        required
                        name=""
                        id="3"
                        className=" selectBox"
                        defaultValue={currAC}
                    //   onChange={(e) => setRoleFunc(e.target.value)}
                    >
                        <option value="" disabled selected>
                            Select AC
                        </option>
                        {AC && Object.keys(AC).map((st) => (
                            <option value={st} className="text-black">
                            {st}
                            </option>
                        ))}

                    </select>
                    }
                </div>

                <div class={styles.div4}> 
                <p> Election Type</p>
                {edit === false ?
                    <input 
                    class={styles.dateInput}
                    disabled = {true}
                    defaultValue={currType}
                    type = "text"
                    className=" selectBox"
                    
                    ></input>:
                    <select
                        //   required={!isTemporary}
                        required
                        name=""
                        id="4"
                        defaultValue={currType}
                        className=" selectBox"
                    //   onChange={(e) => setRoleFunc(e.target.value)}
                    >
                        <option value="" disabled selected>
                            Select
                        </option>
                        <option value="A">
                        Assembly-A
                        </option>
                        <option value="L">
                        Lok Sabha-L
                        </option>
                        <option value="B">
                        By elections
                        </option>
                        {/* {levelArray.map((st, index) => (
                            <option value={st} className="text-black">
                                {index + 1}. {st}
                            </option>
                        ))} */}

                    </select>
                    }
                </div>

                <div class={styles.div5}> 
                <p> Start date</p>
                {edit === false ?
                    <input 
                    class={styles.dateInput}
                    disabled = {true}
                    defaultValue={currStart}
                    type = "text"
                    className=" selectBox"
                    
                    ></input>:
                    <input  
                    class={styles.dateInput}
                    type="date"
                    id="5"
                    className=" selectBox"
                    defaultValue={currStart}
                    ></input>
                    }
                </div>

                <div class={styles.div6}> 
                <p> End date</p>
                {edit === false ?
                    <input 
                    class={styles.dateInput}
                    disabled = {true}
                    defaultValue={currEnd}
                    type = "text"
                    className=" selectBox"
                    
                    ></input>:
                    <input 
                    class={styles.dateInput}
                    defaultValue={currEnd}
                    type = "date"
                    id = "6"
                    className=" selectBox"
                    ></input>
                }
                </div>
            </div>
            
        </div>
        {edit === true ?
            <button class={styles.submitBtn} type='submit' > Submit </button>
            : " "
        }
            </form>
        
        </>
    )
}

export default EditElection