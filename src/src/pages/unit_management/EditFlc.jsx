import React, { useState,useEffect } from 'react'
import scheduleStyles from './styles/ScheduleFlc.module.css'
import { ReactComponent as SearchInputElement } from '../../assets/searchInputIcon.svg';
import styles from './styles/ScheduleCDP_edit.module.css'
import UserImageTest from '../../assets/UserImageTest.png'



function FlcEdit(){

    const issueId = () => {
        const URL = window.location.href;
        const arr = URL.split("/");
        const param = arr[arr.length - 1];
        const arr1 = param.split("=");
        return arr1[1];
      }
    // console.log(issueId())

    const [edit, setEdit] = useState(false)
    // console.log(edit)

    const row11 = {
        'Name': 'Jane Cooper',
        'Mobile': '8845244243',
        "EmailID": 'abc@gmail.com',
        '': <div className="flex justify-end " style={{ marginLeft: "3%" }}><button type="button" className="text-white bg-orange-600 p-1 text-2xl w-8 h-8 -mt-4 " style={{ borderRadius: "50%", marginTop: "2%" }} >-</button></div>
    }

    const row12 = {
        'Name': 'Jane Cooper',
        'Mobile': '8845244243',
        "EmailID": 'abc@gmail.com',
        '': <div className="flex justify-end " style={{ marginLeft: "3%" }}><button type="button" className="text-white bg-orange-600 p-1 text-2xl w-8 h-8 -mt-4 " style={{ borderRadius: "50%", marginTop: "2%" }} >-</button></div>
    }




    const data1 = [row11, row12];
    const [tableFilter, setTableFilter] = useState("");
    const [rows_Assigned_Engineer, setRows_Assigned_Engineer] = useState([...data1]);
    const [isEdit_Assigned_Engineer, setEdit_Assigned_Engineer] = React.useState(-1);
    const [Num, setNum] = useState(Number(window.location.href.split("/")[6]));
    const [assign_engineer_number, setassign_engineer_number] = React.useState([]);
    const [assign_engineer_email, setassign_engineer_email] = React.useState([]);
    const [assign_engineer_name, setassign_engineer_name] = React.useState([]);





    const handleRemoveClick_Assigned_Engineer = (i) => {
        if (window.confirm(`Are you sure you want to delete row from Assigned Engineer table?`)) {
            const list = [...rows_Assigned_Engineer];
            list.splice(i, 1);
            setRows_Assigned_Engineer(list);
            setEdit_Assigned_Engineer(-1);
        }
    };


    const handleInputChange_Assigned_Engineer_number = (e, index) => {
        const { name, value } = e.target;
        const list = [...assign_engineer_number];
        list[index] = value;
        setassign_engineer_number(list);
    };

    const handleInputChange_Assigned_Engineer = (e, index) => {
        const { name, value } = e.target;
        const list = [...rows_Assigned_Engineer];
        list[index][name] = value;
        setRows_Assigned_Engineer(list);
    };
    const handleInputChange_Assigned_Engineer_name = (e, index) => {
        const { name, value } = e.target;
        const list = [...assign_engineer_name];
        list[index] = value;
        setassign_engineer_name(list);
    };
    const handleEdit_Assigned_Engineer = (i) => {
        setEdit_Assigned_Engineer(i);
    };

    const handleAdd_Assigned_Engineer = () => {

        setassign_engineer_email([...assign_engineer_email, ""])
        setassign_engineer_name([...assign_engineer_name, ""])
        setassign_engineer_number([...assign_engineer_number, ""])
        setRows_Assigned_Engineer([
            ...rows_Assigned_Engineer,
            {
                enggname: "",
                enggmobno: "",
                enggemail: "",
                "": <div className="flex justify-end " style={{ marginLeft: "3%" }}><button type="button" className="text-white bg-orange-600 p-1 text-2xl w-8 h-8 -mt-4 " style={{ borderRadius: "50%", marginTop: "2%" }} >-</button></div>
            },
        ]);



        setEdit_Assigned_Engineer(rows_Assigned_Engineer.length);
    };

    const [flc, setFlc] = useState([]);
    const [details, setDetails] = useState([]);

    async function getFLC() {
        let id = issueId();
        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_SERVER}/unit/viewFLC/${id}`,
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
            // console.log(data['data'])
            if(data["data"]!=404){
                setFlc(data);       
            }
            
        } catch (err) {
            console.log({err});
        }
    }

    // {flc['flc'][0] !== undefined && console.log(flc['flc'][0])}

    // let details = flc['flc'][0];
    // console.log(details)

    let detail = []

    try{
        
    if(flc['flc'][0] !== undefined){
        // console.log("found")
        console.log(flc['flc'][0])
        detail.push(flc['flc'][0]['flcwarehouse']);
        detail.push(flc['flc'][0]['warehousesupervisor']);
        detail.push(flc['flc'][0]['tentativeyear']);
        detail.push(flc['flc'][0]['manufacturername']);
        detail.push(flc['flc'][0]['ecisupervisor']);
        detail.push(flc['flc'][0]['electiontype']);
        detail.push(flc['flc'][0]['manufactureremailid']);
        detail.push(flc['flc'][0]['manufacturermobno']);
        detail.push(flc['flc'][0]['tentativemonth']);
        detail.push(flc['flc'][0]['startdate']);
        detail.push(flc['flc'][0]['enddate']);
        detail.push(flc['flc'][0]['numengineers']);
    }

    } catch(err){   
        console.log("not found")

    }
    // console.log("detail:- " + detail)

    useEffect(() => {
        getFLC();        
    }, []);

    let startD = '';
    let endD = '';
    let electionType = '';

    try{
        startD = detail[9].slice(0,10);
        endD = detail[10].slice(0,10);

        if(detail[5] === "A"){
            electionType = "Assembly-A"
        }else if(detail[5] === "L"){
            electionType = "Lok Sabha-L"
        }else if(detail[5] === "B"){
            electionType = "By elections"
        }else{
            electionType = "Invalid"
        }

    }catch{
        
    }

    // useEffect(() => {
    //     setDetails(flc['flc'][0]);        
    // }, [flc]);


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


    async function postFlc() {

        try {
            let id = issueId();
            const response = await fetch(
                `${process.env.REACT_APP_API_SERVER}/unit/edit_flc_announce`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: 'same-origin',
                    body: JSON.stringify({
                        // Severity: document.getElementById("formSeverity").value.slice(-1),
                        ID: id,
                        FLCwarehouse: document.getElementById("1").value,
                        WarehouseSupervisor: document.getElementById("2").value,
                        ManufacturerName: document.getElementById("4").value,
                        ManufacturerMobNo: document.getElementById("8").value,
                        ManufacturerEmailID: document.getElementById("7").value,
                        ECISupervisor: document.getElementById("5").value,
                        TentativeYear: document.getElementById("3").value,
                        TentativeMonth: document.getElementById("9").value,
                        StartDate: document.getElementById("10").value + " " + time,
                        EndDate: document.getElementById("11").value + " " + time,
                        ElectionType: document.getElementById("6").value.slice(-1)


                    }),
                }
            );
            

            // console.log(response);
            const data = await response.json();
            // console.log("data" + data);
            // console.log("Message:" + data["message"])
            if (data["message"] === "Success") {
                Final_Submit_Assign_Engineer()
                document.getElementById("form").reset();
                alert("Successful");
                window.location.pathname = "/session/unitmanagement/flc_list";
            } else {
                alert("Edit Failed! ");
            
            }
        } catch (err) {
            console.log(err);
        }
    }


    async function Final_Submit_Assign_Engineer() {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_SERVER}/unit/assign_engineers`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        engineerName: assign_engineer_name,
                        engineerMobNo: assign_engineer_number,
                        engineerEmailID: assign_engineer_email,
                        Process: 'FLC',
                        ProcessID: Num,
                    }),
                }
            );

            const data4 = await response.json();
            if (response.status === 200) {
                // alert("Schedule CDP Updated Successfully");
                // window.location.pathname = "/session/unitmanagement/Schedule_List_CDP"
                alert("Successful");
                window.location.pathname = "/session/unitmanagement/flc_list";
            } else {
                alert("Unable to Assign Engineers");
            }
        } catch (err) {
            console.log(err);
        }

    }

    const onFormSubmit = async (e) => {
        e.preventDefault();
        // console.log("submit button clicked")
        
        try{

        
        let submittingData = []
        // const i = 3;
        // submittingData.push(document.getElementById(i).value)
        var i = 1;
        while(i<12){
            // console.log(i)
            submittingData.push(document.getElementById(i).value);
            i = i +1;
        }
        // console.log({submittingData})
        }catch{
            
        }


        postFlc();
        // console.log("date: " +document.getElementById("10").value)
        // console.log("times: " + Date.now().getHours())
    };


    useEffect(() => {
        if (rows_Assigned_Engineer != []) {

            const Temp_email = [...assign_engineer_email]
            const Temp_number = [...assign_engineer_number]
            const Temp_name = [...assign_engineer_name]
            rows_Assigned_Engineer.map((val, id) => {
                Temp_email[id] = val['enggemail']
                Temp_name[id] = val['enggname']
                Temp_number[id] = val['enggmobno']
            })
            setassign_engineer_email(Temp_email)
            setassign_engineer_name(Temp_name)
            setassign_engineer_number(Temp_number)
        }
    }, [rows_Assigned_Engineer]);
    console.log("SUBMITTING ENGINEERS:-" , assign_engineer_email, assign_engineer_name, assign_engineer_number)



    return(
        <>

        <button className={scheduleStyles.editBtn} 
            onClick = {() => { setEdit(true)}}
        >
            Edit Flc Schedule
        </button>

        <form onSubmit={onFormSubmit} id="form">
        <div className={scheduleStyles.Schedule_container}>
            <div className={scheduleStyles.Schedule_header}>
                <h4>
                Schedule FLC
                </h4> 
            </div>
            <div class={scheduleStyles.parent}>

            <div class={scheduleStyles.div1}>
                    <p>FLC Warehouse</p>
                    <input  
                    class={scheduleStyles.input}
                    type="text"
                    id="1"
                    className="selectBox"
                    placeholder='Enter Warehouse ID'
                    defaultValue={detail[0]}
                    disabled = {edit === true ? false : true}
                    ></input>

                </div>

                <div class={scheduleStyles.div2}> 
                <p> Warehouse Supervisor</p>
                <input  
                    class={scheduleStyles.input}
                    type="text"
                    id="2"
                    className="selectBox"
                    defaultValue={detail[1]}
                    disabled = {edit === true ? false : true}
                    placeholder='Enter User ID'
                    ></input>
                    
                </div>

                <div class={scheduleStyles.div3}> 
                <p> Tentative year of election</p>
                <input  
                    class={scheduleStyles.input}
                    type="number"
                    defaultValue={detail[2]}
                    id="3"
                    className="selectBox"
                    disabled = {edit === true ? false : true}
                    placeholder='Enter Year'
                    ></input>
                    
                
                </div>

                <div class={scheduleStyles.div4}> 
                <p> Manufacturer</p>
                <input  
                    class={scheduleStyles.input}
                    type="text"
                    defaultValue={detail[3]}
                    id="4"
                    className="selectBox"
                    disabled = {edit === true ? false : true}
                    placeholder='Full Name'
                    ></input>
                
                </div>

                <div class={scheduleStyles.div5}> 
                <p> ECI Supervisor</p>
                <input  
                    class={scheduleStyles.input}
                    type="text"
                    defaultValue={detail[4]}
                    id="5"
                    className="selectBox"
                    disabled = {edit === true ? false : true}
                    placeholder='Full Name'
                    ></input>
                </div>

                <div class={scheduleStyles.div6}> 
                <p> Type of election</p>

                {edit === false ?
                    <input 
                    class={scheduleStyles.dateInput}
                    disabled = {true}
                    defaultValue={electionType}
                    type = "text"
                    className=" selectBox"
                    
                    ></input>:

                
                <select
                        //   required={!isTemporary}
                        required
                        name=""
                        id="6"
                        disabled = {edit === true ? false : true}
                        defaultValue={detail[5]}
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
                        By elections-B
                        </option>
                </select>
                }
                </div>

                <div class={scheduleStyles.div7}> 
                <p>Manufacturer Email ID</p>
                <input  
                    class={scheduleStyles.input}
                    type="email"
                    id="7"
                    disabled = {edit === true ? false : true}
                    className="selectBox"
                    placeholder='xyz@example.com'
                    defaultValue={detail[6]}
                    ></input>
                </div>

                <div class={scheduleStyles.div8}> 
                <p>Manufacturer Mobile No.</p>
                <input  
                    class={scheduleStyles.input}
                    type="number"
                    id="8"
                    className="selectBox"
                    defaultValue={detail[7]}
                    disabled = {edit === true ? false : true}
                    placeholder='Enter Number'
                    ></input>
                </div>

                <div class={scheduleStyles.div9}> 
                <p>Tentative month of election</p>

                {edit === false ?
                                    <input 
                                    class={scheduleStyles.dateInput}
                                    disabled = {true}
                                    defaultValue={detail[8]}
                                    type = "text"
                                    className=" selectBox"
                                    
                                    ></input>:

                
                <select
                        //   required={!isTemporary}
                        required
                        name=""
                        id="9"
                        disabled = {edit === true ? false : true}
                        className=" selectBox"
                        defaultValue={detail[8]}
                    //   onChange={(e) => setRoleFunc(e.target.value)}
                    >
                        <option value="" disabled selected>
                            Select
                        </option>
                        {/* January, February, March, April, May, June, July, August, September, October, November, and December. */}
                        <option value="January">
                        January
                        </option>
                        <option value="February">
                        February
                        </option>
                        <option value="March">
                        March
                        </option>
                        <option value="April">
                        April
                        </option>
                        <option value="May">
                        May
                        </option>
                        <option value="June">
                        June
                        </option>
                        <option value="July">
                        July
                        </option>
                        <option value="August">
                        August
                        </option>
                        <option value="September">
                        September
                        </option>
                        <option value="October">
                        October
                        </option>
                        <option value="November">
                        November
                        </option>
                        <option value="December">
                        December
                        </option>
                        
                </select>
                }
                </div>

                <div class={scheduleStyles.div10}> 
                <p>Start date</p>
                {edit === true ?
                    <input 
                    class={scheduleStyles.dateInput}
                    type = "date"
                    className=" selectBox"
                    defaultValue={detail[9].slice(0,10)}
                    id="10"
                    ></input>
                    : 
                    <input 
                                    class={scheduleStyles.dateInput}
                                    disabled = {true}
                                    defaultValue={startD}
                                    type = "text"
                                    className=" selectBox"
                                    
                                    ></input>}
                </div>

                <div class={scheduleStyles.div11}> 
                <p>End date</p>
                {edit === true ?
                    <input 
                    class={scheduleStyles.dateInput}
                    defaultValue={detail[10].slice(0,10)}
                    type = "date"
                    className=" selectBox"
                    id="11"
                    ></input>
                    : 
                    <input 
                                    class={scheduleStyles.dateInput}
                                    disabled = {true}
                                    defaultValue={endD}
                                    type = "text"
                                    className=" selectBox"
                                    
                                    ></input>
                    }
                </div>

                <div class={scheduleStyles.div12}> 
                <p>Number of Assigned Engineers: </p>
                    {/* <input 
                    class={scheduleStyles.dateInput}
                    type = "date"
                    className=" selectBox"
                    disabled = {edit === true ? false : true}
                    ></input> */}
                    {/* {console.log("s" +detail[11] )} */}
                    {edit === false ? <h3 className='flex justify-center pt-2'><p>{detail[11]}</p></h3>:
                    <h3 className='flex justify-center pt-2'>{rows_Assigned_Engineer.length}</h3>
                    }
                    
                </div>

                
            </div>
            
        </div>


            
            <>   
            <div class={styles.parent2}>
                <div class={styles.Schedule_container2}>
                    <div class={styles.Schedule_header2}>
                        <h4>
                            Assigned Engineer
                        </h4>

 
                        <div style={{ display: "flex", "flexDirection": "row", alignItems: "center", justifyContent: "center", background: "#F9FBFF", borderRadius: "10px", padding: "7.5px 15px 7.5px 0", fontSize: "0.8em" }}>
                            <SearchInputElement style={{ margin: "0 7.5px", width: "20px" }} />
                            <input type={'search'} defaultValue={tableFilter} onChange={(e) => { setTableFilter(e.target.value) }} placeholder='Search' style={{ outline: "none", background: "transparent" }} />
                        </div>
                    </div>
                    <div class={styles.Schedule_CDP_table}>
                        {/* <DynamicDataTable rows={data1} buttons={[]} /> */}
                        <table >
                            <thead >
                                <tr>
                                    <th style={{ color: "#f56a3f", padding: "20px" }}>Name</th>
                                    <th style={{ color: "#f56a3f", padding: "20px" }}>Mobile</th>
                                    <th style={{ color: "#f56a3f", padding: "20px" }}>Email ID</th>
                                </tr>
                            </thead>
                            {rows_Assigned_Engineer.length > 0 &&
                                rows_Assigned_Engineer.map((val, id) => {
                                    return (isEdit_Assigned_Engineer != id ?
                                        <tbody >
                                            <tr onDoubleClick={() => { handleEdit_Assigned_Engineer(id) }}>
                                                <td className="text-black text-sm">{assign_engineer_name[id]}</td>
                                                <td className="text-black text-sm">{assign_engineer_number[id]}</td>
                                                <td className="text-black text-sm">{assign_engineer_email[id]}</td>
                                                <td className="text-black text-sm" onClick={() => handleRemoveClick_Assigned_Engineer(id)}>{row12['']}</td>
                                            </tr>
                                        </tbody>
                                        :
                                        <tbody >
                                            <tr onDoubleClick={() => { handleEdit_Assigned_Engineer(-1) }}>
                                                <td >
                                                    <input
                                                        className={styles.Assigned_Engineer_Tr}
                                                        value={assign_engineer_name[id]}
                                                        name="enggname"
                                                        placeholder="Name"
                                                        onChange={(e) => handleInputChange_Assigned_Engineer_name(e, id)}
                                                    />
                                                </td >
                                                <td >
                                                    <input
                                                        className={styles.Assigned_Engineer_Tr}
                                                        value={assign_engineer_number[id]}
                                                        placeholder="Mobile Number"
                                                        name="enggmobno"
                                                        onChange={(e) => handleInputChange_Assigned_Engineer_number(e, id)}
                                                    />
                                                </td>
                                                <td >
                                                    <input
                                                        className={styles.Assigned_Engineer_Tr}
                                                        value={assign_engineer_email[id]}
                                                        placeholder="Email ID"
                                                        name="enggemail"
                                                        onChange={(e) => handleInputChange_Assigned_Engineer(e, id)}
                                                    />
                                                </td>
                                                <td className="text-black text-sm" onClick={() => handleRemoveClick_Assigned_Engineer(id)}>{row12['']}</td>
                                            </tr>
                                        </tbody>
                                    )
                                })}
                        </table>
                    </div>
                    {edit === true ?
                    <button type="button" className="text-white bg-orange-600 p-1 text-2xl w-8 h-8 -mt-4 " style={{ borderRadius: "50%", marginLeft: "91%", marginTop: "1%" }} onClick={() => { handleAdd_Assigned_Engineer() }}>+</button>
                    : " "}
                </div>
                
            </div>

            {edit === true ?
            <button class={scheduleStyles.submitBtn} type='submit'
            > Submit </button>

            : " "}
            </>
        


            </form>
        </>
    
    )



}

export default FlcEdit