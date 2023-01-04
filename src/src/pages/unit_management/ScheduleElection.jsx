import { DynamicDataTable } from '@langleyfoxall/react-dynamic-data-table'
import React, { useEffect, useState } from 'react'
import styles from './styles/ScheduleNew.module.css'
import { getRealm, formatRealm2,formatRealm3 } from '../../components/utils'

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

    const [Dist, setDist] = useState("");
    const [Dists, setDists] = useState("");
    const [AC, setAC] = useState("");

    const [state, setState] = useState("");
    const [states, setStates] = useState({});

//TEMP START
const [tableFilter, setTableFilter] = useState("");
const [rows_Temporary_Users, setRows_Temporary_Users] = useState([2]);
const [isEdit_Temporary_Users, setEdit_Temporary_Users] = React.useState(-1);




const handleRemoveClick_Temporary_Users = (i) => {
    if (window.confirm(`Remove selection?`)) {
        const list = [...rows_Temporary_Users];
        list.splice(i, 1);
        setRows_Temporary_Users(list);

    }
};


const handleAdd_Temporary_Users = () => {
    setRows_Temporary_Users([
        ...rows_Temporary_Users,
        {
            User_ID: "",
            "": <div style={{ display: "flex", flexDirection: "row", alignItems: "right", justifyContent: "flex-start", paddingLeft: "40px" }}></div>,
            Name: " ",
            " ": <div className="flex justify-end " style={{ marginLeft: "3%" }}><button type="button" className="text-white bg-orange-600 p-1 text-2xl w-8 h-8 -mt-4 " style={{ borderRadius: "50%", marginTop: "2%" }} >-</button></div>
        },
    ]);
    setEdit_Temporary_Users(rows_Temporary_Users.length);
};



const handleInputChange_Temporary_Users = (e, index) => {
    const { name, value } = e.target;
    const list = [...rows_Temporary_Users];
    list[index][name] = value;
    setRows_Temporary_Users(list);
};


const handleEdit_Temporary_Users = (i) => {
    setEdit_Temporary_Users(i);
};

//TEMP END


    // Check Replacement for Dist in new API: 
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
                        // Dist: document.getElementById("2").value,
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
    };

    const [eType, setEType] = useState("")
    const [showState, setShowState] = useState(false)
    const [showAC, setShowAC] = useState(false)
    const [showSubmit, setShowSubmit] = useState(true)
    const [showTable, setShowTable] = useState(false)
    const [showDist, setShowDist] = useState(false)

    useEffect(() => {
        if(eType === "GA"){
            setShowState(true)
            setShowTable(false)
        }else if(eType === "GP"){
            setShowState(false)
            setShowAC(false)
            // setShowSubmit(true)
            setShowTable(false)
        }else if(eType === "BA"){
            setShowState(true)
            setShowAC(true)
            // setShowSubmit(false)
            setShowTable(false)
        }else if(eType === "BP"){
            setShowState(false)
            setShowAC(false)
            // setShowSubmit(false)
            setShowTable(true)
        }
        
    }, [eType]);

    const [realm, setRealm] = useState([])
    const [state2, setState2] = useState([])
    const [distn, setDistn] = useState([])
    const [currState, setCurrState] = useState([]);


    useEffect(() => {
        getRealmData();
    }, [])

    const getRealmData = async () => {
        setRealm(await getRealm('Unit', 'ScheduleElection'));
    }
    useEffect(() => {
        if (realm && realm !== []) {
            setState2(formatRealm2(realm))
            console.log(realm)
            console.log(state2)

        }
    }, [realm]);

    useEffect(() => {
        if (currState && currState !== "") {
            setDistn(formatRealm3(realm, currState))
            console.log(distn)
        }
    }, [currState, realm]);

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

                <div class={styles.div4}>
                    <div style={{ display: showState ? "block" : "none" }}>
                    <p> State</p>
                    <select
                        //   required={!isTemporary}
                        required
                        name=""
                        id="1"
                        className=" selectBox"
                        onChange={(e) => {setCurrState(e.target.value)}}
                    >

                <option value="0" disabled selected>
                    Select State
                </option>
                {/* {console.log(states)} */}
                {state2 && state2.map((st,i) => (
                  <option value={state2[i]["stCode"]} className="text-black">
                    {state2[i]["stCode"]} - {state2[i]["stName"]}
                    
                  </option>
                ))}
                </select>
                </div>
                </div>

                <div class={styles.div6}> 
                <div style={{ display:"none" }}>
                <p> District</p>
                
                    <select
                        //   required={!isTemporary}
                        required
                        name=""
                        id="2"
                        className=" selectBox"
                    //   onChange={(e) => setRoleFunc(e.target.value)}
                    >
                        <option value="0" disabled selected>
                            Select Dist
                        </option>
                        {/* {console.log(states)} */}
                        {Dists && Object.keys(Dists).map((st) => (
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
                </div>

                <div class={styles.div5}> 
                <div style={{ display: showAC ? "block" : "none" }}>
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
                        {distn && distn.map((st,i) => (
                            <option value={distn[i]["acCode"]} className="text-black">
                                {distn[i]["acCode"]} - {distn[i]["acName"]}
                                
                            </option>
                            ))}

                    </select>
                    </div>
                </div>

                <div class={styles.div1}> 
                <p> Election Type</p>
                    <select
                        //   required={!isTemporary}
                        required
                        name=""
                        id="4"
                        className=" selectBox"
                        onChange={(e) => {setEType(e.target.value)}}
                    >
                        <option value="" disabled selected>
                            Select
                        </option>
                        <option value="GA">
                            General Assembly-GA
                        </option>
                        <option value="GP">
                            General Parliamentary-GP
                        </option>
                        <option value="BA">
                            Bye Poll Assembly-BA
                        </option>
                        <option value="BP">
                            Bye Poll Parliamentary-BP
                        </option>
                    </select>
                
                </div>

                <div class={styles.div2}> 
                <p> Start date</p>
                    <input  
                    class={styles.dateInput}
                    type="date"
                    id="5"
                    className=" selectBox"
                    ></input>
                
                </div>

                <div class={styles.div3}> 
                <p> End date</p>
                    <input 
                    class={styles.dateInput}
                    type = "date"
                    id = "6"
                    className=" selectBox"
                    ></input>
                </div>
            </div>

                <div style={{ display: showTable ? "block" : "none" }}>
                        {/* <DynamicDataTable rows={data2} buttons={[]} /> */}
                        <table >
                            <thead >
                                <tr>
                                    <th style={{ color: "#f56a3f", padding: "20px" }}>State</th>
                                    <th style={{ color: "#f56a3f", padding: "20px" }}></th>
                                    <th style={{ color: "#f56a3f", padding: "20px" }}>PC</th>
                                    <th style={{ color: "#f56a3f", padding: "20px" }}></th>
                                </tr>
                            </thead>
                            {rows_Temporary_Users.length > 0 &&
                                rows_Temporary_Users.map((val, id) => {
                                    return (isEdit_Temporary_Users != id ?
                                        <tbody >
                                            <tr onDoubleClick={() => { handleEdit_Temporary_Users(id) }}>
                                                <td className="text-black text-sm">{val['User_ID']}</td>
                                                <td className="text-black text-sm">{val['']}</td>
                                                <td className="text-black text-sm" onClick={() => handleRemoveClick_Temporary_Users(id)}>{val[' ']}</td>
                                                </tr>
                                        </tbody>
                                        :
                                        <tbody >
                                            <tr onDoubleClick={() => { handleEdit_Temporary_Users(-1) }}>
                                                <td >
                                                <select
                                                    //   required={!isTemporary}
                                                    value={val.User_ID}
                                                    required
                                                    name="User_ID"
                                                    className="selectBox"
                                                    onChange={(e) => handleInputChange_Temporary_Users(e, id)}
                                                >
                                                    <option value="" disabled selected>
                                                        Select State
                                                    </option>
                                                    {state2 && state2.map((st,i) => (
                                                        <option value={state2[i]["stCode"]} className="text-black">
                                                            {state2[i]["stCode"]} - {state2[i]["stName"]}
                                                            
                                                        </option>
                                                    ))}
                                                </select>
                                                    
                                                    {/* <input
                                                        className={styles.Assigned_Engineer_Tr}
                                                        value={val.User_ID}
                                                        name="User_ID"
                                                        placeholder="Select State"
                                                        onChange={(e) => handleInputChange_Temporary_Users(e, id)}
                                                    /> */}

                                                </td >
                                                <td className="text-black text-sm" >{val['']}</td>
                                                <td >
                                                <select
                                                    required
                                                    name="Name"
                                                    value={val.Name}
                                                    className="selectBox"
                                                    onChange={(e) => handleInputChange_Temporary_Users(e, id)}
                                                    >
                                                    <option value="" disabled selected>
                                                        Select PC
                                                    </option>
                                                    <option value="GA">
                                                        General Assembly-GA
                                                    </option>
                                                    <option value="GP">
                                                        General Parliamentary-GP
                                                    </option>
                                                </select>
                                                    {/* <input
                                                        className={styles.Assigned_Engineer_Tr}
                                                        value={val.Name}
                                                        placeholder="Select PC"
                                                        name="Name"
                                                        onChange={(e) => handleInputChange_Temporary_Users(e, id)}
                                                    /> */}
                                                </td>
                                                <td className="text-black text-sm" onClick={() => handleRemoveClick_Temporary_Users(id)}>{val[' ']}</td>
                                            </tr>
                                        </tbody>
                                    )
                                })}
                        </table>
                        <button type="button" className="text-white bg-orange-600 p-1 text-2xl w-8 h-8 -mt-4 " style={{ borderRadius: "50%", marginLeft: "85%", marginTop: "1%" }} onClick={() => { handleAdd_Temporary_Users() }}>+</button>
                    </div>

        </div>
        <div style={{ display: showSubmit ? "block" : "none" }}><button class={styles.submitBtn} type='submit' > Submit </button></div>
            
            </form>
        </>
    )
}

export default ScheduleElection