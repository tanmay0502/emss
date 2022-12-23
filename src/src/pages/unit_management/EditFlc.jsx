import React, { useState,useEffect } from 'react'
import scheduleStyles from './styles/ScheduleFlc.module.css'
import { ReactComponent as SearchInputElement } from '../../assets/searchInputIcon.svg';
function FlcEdit(){

    const issueId = () => {
        const URL = window.location.href;
        const arr = URL.split("/");
        const param = arr[arr.length - 1];
        const arr1 = param.split("=");
        return arr1[0];
      }
    // console.log(issueId())

    const [edit, setEdit] = useState(false)
    const [flc, setFlc] = useState([]);

    async function getFLC() {
        let id = issueId();
        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_SERVER}/unit/viewFLC`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: 'include',
                    body: JSON.stringify(
                        {
                            flcId: id
                        }
                    )
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
    let detail = []

    try{
        
    if(flc['flc'][0] !== undefined){
       
        detail.push(flc['flc'][0]['warehouseid']);
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
    }

    } catch(err){   
        console.log("not found")

    }

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
                    credentials: 'include',
                    body: JSON.stringify({
                        flcId: id,
                        warehouseId: document.getElementById("1").value,
                        manufacturerName: document.getElementById("4").value,
                        manufacturerMobNo: document.getElementById("8").value,
                        manufacturerEmailID: document.getElementById("7").value,
                        tentativeYear: document.getElementById("3").value,
                        tentativeMonth: document.getElementById("9").value,
                        startDate: document.getElementById("10").value,
                        endDate: document.getElementById("11").value,
                        electionType: document.getElementById("6").value.slice(-1),
                    }),
                }
            );

            const data = await response.json();
            if (data["message"] === "Success") {
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

    const onFormSubmit = async (e) => {
        e.preventDefault();       
        postFlc();

    };
    console.log({detail})
    return(
        <>

        <button className="text-white mb-4 flex"
            onClick = {() => {setEdit(true)}}
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
                    <p>Warehouse Id</p>
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

                <div class={scheduleStyles.div6}> 
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

                <div class={scheduleStyles.div7}> 
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


                <div class={scheduleStyles.div4}> 
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
                        required
                        name=""
                        id="6"
                        disabled = {edit === true ? false : true}
                        defaultValue={detail[5]}
                        className=" selectBox"

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

                <div class={scheduleStyles.div9}> 
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

                <div class={scheduleStyles.div5}> 
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

                <div class={scheduleStyles.div2}> 
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

                <div class={scheduleStyles.div3}> 
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
            </div>
            
        </div>

            <>   
            {edit === true ?
            <button class={scheduleStyles.submitBtn} type='submit'
            > Submit </button>

            : " "}
            </>
        </div>
            </form>
        </>
    
    )



}

export default FlcEdit