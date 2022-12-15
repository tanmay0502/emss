import { DynamicDataTable } from '@langleyfoxall/react-dynamic-data-table'
import React, { useState } from 'react'
import styles from './styles/ScheduleNew.module.css'
import { TagsInput } from "react-tag-input-component";

function ScheduleTna() {

    const [tags, setTags] = React.useState([]);

    // var currentdate = new Date(); 
    // var hrs = currentdate.getHours();
    // var mins = currentdate.getMinutes();
    // var secs = currentdate.getSeconds();

    // if (hrs <10){
    //     hrs = "0" + hrs;

    // }
    // if(mins<10){
    //     mins = "0" + mins;
    // }
    // if(secs<10){
    //     secs = "0" + secs;
    // }

    // var time =  hrs + ":"  
    //             + mins + ":" 
    //             + secs;

    // console.log(time)

    
    async function postTna() {

        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_SERVER}/unit/tna_schedule`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: 'same-origin',
                    body: JSON.stringify({
                        // Severity: document.getElementById("formSeverity").value.slice(-1),
                            StrongRoom: document.getElementById("1").value,
                            NumAwarenessUnit: document.getElementById("2").value,
                            UnitType: document.getElementById("3").value,
                            tempUsers: tags
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
                window.location.pathname = "/session/unitmanagement/schedule_tna_list";
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


        postTna();
        // console.log("date: " +document.getElementById("10").value)
        // console.log("times: " + Date.now().getHours())
    };

    return(
        <>
        <form onSubmit={onFormSubmit} id="form">
        <div className={styles.Schedule_container}>
            <div className={styles.Schedule_header}>
                <h4>
                Schedule TnA
                </h4> 
            </div>
            <div class={styles.parent}>

                <div class={styles.div1}>
                    <p> Strong Room</p>
                    <input  
                    class={styles.input}
                    type="text"
                    id="1"
                    className="selectBox"
                    placeholder='Enter Warehouse ID'
                    ></input>

                </div>

                <div class={styles.div2}> 
                <p> Num Awareness Unit</p>
                <input  
                    class={styles.input}
                    type="number"
                    id="2"
                    className="selectBox"
                    placeholder='Enter Number'
                    ></input>
                </div>

                <div class={styles.div3}> 
                <p> Unit Type</p>
                    <select
                        //   required={!isTemporary}
                        required
                        name=""
                        id="3"
                        className=" selectBox"
                    //   onChange={(e) => setRoleFunc(e.target.value)}
                    >
                        <option value="" disabled selected>
                            Select Unit Type
                        </option>
                        <option value="CU">
                            CU
                        </option>
                        <option value="BU">
                            BU
                        </option>
                        <option value="VT">
                            VT
                        </option>
                        <option value="SC">
                            SC
                        </option>


                    </select>
                
                </div>

                {/* <div class={styles.div4}> 
                <p> Timestamp</p>
                <input  
                    class={styles.dateInput}
                    type="date"
                    // id="formLevel"
                    className=" selectBox"
                    ></input>
                </div> */}

                <div class={styles.div5Tna}> 
                <p> Add Temporary Users</p>
                    <TagsInput

                    // style={{ width: '100%' }}
                    className='li_noti hide-scroll-bar tagInput p-2'
                    value={tags}
                    id="formTags"
                    onChange={setTags}
                    placeHolder="SSPPAAARRR, SSPPAAARRR"
                    />
                </div>

                
            </div>
            
        </div>
            <button class={styles.submitBtn} type='submit' > Submit </button>
        </form>
        </>
    )
}

export default ScheduleTna