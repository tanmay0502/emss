import { DynamicDataTable } from '@langleyfoxall/react-dynamic-data-table'
import React, { useEffect, useState } from 'react'
import styles from './styles/ScheduleNew.module.css'


function ScheduleElection() {
    
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
            console.log(err);
          }
    }



    console.log(states[state])
    // getPCListbyState()
    useEffect(() => {
        // getState();

    },[])

    useEffect(() => {
        getPCListbyState()
        getACListbyState()
    },[state])

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


    return(
        <>
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
                    <select
                        //   required={!isTemporary}
                        required
                        name=""
                        id="1"
                        className=" selectBox"
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

                </div>

                <div class={styles.div2}> 
                <p> PC</p>
                    <select
                        //   required={!isTemporary}
                        required
                        name=""
                        id="2"
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
                    
                </div>

                <div class={styles.div3}> 
                <p> AC</p>
                    <select
                        //   required={!isTemporary}
                        required
                        name=""
                        id="3"
                        className=" selectBox"
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
                
                </div>

                <div class={styles.div4}> 
                <p> Election Type</p>
                    <select
                        //   required={!isTemporary}
                        required
                        name=""
                        id="4"
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
                
                </div>

                <div class={styles.div5}> 
                <p> Start date</p>
                    <input  
                    class={styles.dateInput}
                    type="date"
                    id="5"
                    className=" selectBox"
                    ></input>
                
                </div>

                <div class={styles.div6}> 
                <p> End date</p>
                    <input 
                    class={styles.dateInput}
                    type = "date"
                    id = "6"
                    className=" selectBox"
                    ></input>
                </div>
            </div>
            
        </div>
            <button class={styles.submitBtn} type='submit' > Submit </button>
            </form>
        </>
    )
}

export default ScheduleElection