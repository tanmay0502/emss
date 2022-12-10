import { DynamicDataTable } from '@langleyfoxall/react-dynamic-data-table'
import React, { useState } from 'react'
import styles from './styles/ScheduleFlc.module.css'
import { useNavigate } from 'react-router-dom';




function ScheduleFLC() {

    var currentdate = new Date(); 
    var hrs = currentdate.getHours();
    var mins = currentdate.getMinutes();
    var secs = currentdate.getSeconds();
    const navigate = useNavigate();

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

    console.log(time)


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
            

            console.log(response);
            const data = await response.json();
            console.log("data" + data);
            console.log("Message:" + data["message"])
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
    const onFormSubmit = async (e) => {
        e.preventDefault();
        console.log("submit button clicked")
        
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
        console.log({submittingData})
        }catch{
            
        }


        postFlc();
        // console.log("date: " +document.getElementById("10").value)
        // console.log("times: " + Date.now().getHours())
    };

    const handleButtonClick = (e) => {
        // console.log("clicked" + e.target.name);
        navigate('/session/unitmanagement/flc_list');
      };


    return(
        <>
        <form onSubmit={onFormSubmit} id="form">
       
        <div className={styles.Schedule_container}>
            <div className={styles.Schedule_header}>
             
                <h4>
                Schedule FLC
                </h4> 
                <button className="font-semibold text-black" style={{backgroundColor: 'white'}} onClick={handleButtonClick}>Go Back</button>
            </div>
            <div class={styles.parent}>

                <div class={styles.div1}>
                    <p>FLC Warehouse</p>
                    <input  
                    class={styles.input}
                    type="text"
                    id="1"
                    className="selectBox"
                    placeholder='Enter Warehouse ID'
                    ></input>

                </div>

                <div class={styles.div2}> 
                <p> Warehouse Supervisor</p>
                <input  
                    class={styles.input}
                    type="text"
                    id="2"
                    className="selectBox"
                    placeholder='Enter User ID'
                    ></input>
                    
                </div>

                <div class={styles.div3}> 
                <p> Tentative year of election</p>
                <input  
                    class={styles.input}
                    type="number"
                    id="3"
                    className="selectBox"
                    placeholder='Enter Year'
                    ></input>
                    
                
                </div>

                <div class={styles.div4}> 
                <p> Manufacturer</p>
                <input  
                    class={styles.input}
                    type="text"
                    id="4"
                    className="selectBox"
                    placeholder='Full Name'
                    ></input>
                
                </div>

                <div class={styles.div5}> 
                <p> ECI Supervisor</p>
                <input  
                    class={styles.input}
                    type="text"
                    id="5"
                    className="selectBox"
                    placeholder='Full Name'
                    ></input>
                </div>

                <div class={styles.div6}> 
                <p> Type of election</p>
                <select
                        //   required={!isTemporary}
                        required
                        name=""
                        id="6"
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
                </select>
                </div>

                <div class={styles.div7}> 
                <p>Manufacturer Email ID</p>
                <input  
                    class={styles.input}
                    type="email"
                    id="7"
                    className="selectBox"
                    placeholder='xyz@example.com'
                    ></input>
                </div>

                <div class={styles.div8}> 
                <p>Manufacturer Mobile No.</p>
                <input  
                    class={styles.input}
                    type="number"
                    id="8"
                    className="selectBox"
                    placeholder='Enter Number'
                    ></input>
                </div>

                <div class={styles.div9}> 
                <p>Tentative month of election</p>
                <select
                        //   required={!isTemporary}
                        required
                        name=""
                        id="9"
                        className=" selectBox"
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
                </div>

                <div class={styles.div10}> 
                <p>Start date</p>
                    <input 
                    class={styles.dateInput}
                    type = "date"
                    className=" selectBox"
                    id="10"
                    ></input>
                </div>

                <div class={styles.div11}> 
                <p>End date</p>
                    <input 
                    class={styles.dateInput}
                    type = "date"
                    className=" selectBox"
                    id="11"
                    ></input>
                </div>

                
            </div>
            
        </div>
            <button class={styles.submitBtn} type={"submit"} > Submit </button>
        </form>
        </>
    )
}

export default ScheduleFLC