import { DynamicDataTable } from '@langleyfoxall/react-dynamic-data-table'
import React, { useState,useEffect } from 'react'
import styles from './styles/first_Randomisation_Scheduling.module.css'
import { TagsInput } from "react-tag-input-component";
import { getRealm, formatRealm, formatRealm2 } from '../../components/utils'
function First_Randomisation_Scheduling() {


    const [districtList, setDistrictList] = useState([]);
    const [district, setdistrict] = useState('');
    const [electiontype, setelectiontype] = useState('');
    const [startdate, setstartdate] = useState('');
    const [enddate, setenddate] = useState('');
    const [realm, setRealm] = useState([])
    const [state2, setState2] = useState([])
    const [dist, setDist] = useState([])
    const [AC, setAC] = useState([])
    const [states, setStates] = useState([]);
    const [myState, setmyState] = useState("");
    const [mydistcode, setmydistcode] = useState("");
    const [currState, setCurrState] = useState([]);
    const [currDist, setCurrDist] = useState([])
    const [distCodes, setDistCodes] = useState(new Set());

    useEffect(() => {
        getRealmData();
    }, [])

    const getRealmData = async () => {
        setRealm(await getRealm('Unit', 'ScheduleFirstRandomization'));
    }



    useEffect(() => {
	async function fetch_district_list() {
	    try {
		const response = await fetch(`${process.env.REACT_APP_API_SERVER}/user/getRealm`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body:JSON.stringify({
                        "module_name": "Warehouse",
                        "operation": "CreateWarehouse"
                      }),
                    credentials: "include"
		});
		const data = await response.json();
		console.log(data, "datatatatatatatat")
        setRealm(data);
        console.log(data)
		if (response.status === 200) {
                    console.log("inside if")
                    // if (data.hasOwnProperty('data')) {
			// console.log("inside second if", data['data']['dist'])
			// setRealm(data);
            console.log(data)
		    
		}
	    } catch (err) {
		alert('Error occured during scheduling');
	    }
	}
    

	// fetch_district_list();
    },[]);
    useEffect(() => {
        if(realm && realm !== []){
          setState2(formatRealm2(realm))
          console.log(realm)
            console.log(state2)

          try{
            setCurrState(state2[0]["stCode"]);
          }catch(err){

          }
          
        }
       
      }, [realm]);
  
      useEffect(() => {
        if(currState && currState !== ""){
          setDist(formatRealm2(realm, currState))
          console.log(dist)
        }
    
      }, [currState,realm]);



    async function Submit_First_randomization() {

        var currentdate = new Date();
        var hrs = currentdate.getHours();
        var mins = currentdate.getMinutes();
        var secs = currentdate.getSeconds();

        if (hrs < 10) {
            hrs = "0" + hrs;

        }
        if (mins < 10) {
            mins = "0" + mins;
        }
        if (secs < 10) {
            secs = "0" + secs;
        }

        var time = hrs + ":"
            + mins + ":"
            + secs;

        console.log(time, document.getElementById("enddate") ? document.getElementById("enddate").value + " " + time : "")

        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_SERVER}/unit/scheduleFirstRandomization`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        districts: [...distCodes],
                        electiontype: document.getElementById("electiontype") ? document.getElementById("electiontype").value : "",
                        startdate: document.getElementById("startdate") ? document.getElementById("startdate").value + " " + time : "",
                        enddate: document.getElementById("enddate") ? document.getElementById("enddate").value + " " + time : "",
                    }),
                }
            );
            console.log(distCodes)
            const data3 = await response.json();
            console.log(data3, "data3")
            if (response.status === 200) {
                alert("Schedule First Randomization Created Successfully");
                window.location.pathname = "/session/unitmanagement"
            } else {
                alert(data3.data);
                document.getElementById("electiontype").value = ""
                document.getElementById("startdate").value = ""
                document.getElementById("enddate").value = ""
            }

        } catch (err) {
            console.log(err);
        }

    }


    const onFormSubmit = async (e) => {
        e.preventDefault();
        Submit_First_randomization();
    };


    return (
        <form onSubmit={onFormSubmit}>
            <div className={styles.Schedule_container}>
                <div className={styles.Schedule_header}>
                    <h4>
                        Schedule First Randomisation
                    </h4>
                </div>

                <div class={styles.parent}>
                    {/* <div class={styles.div1}>
                        <p> CEO User ID</p>
                        <input
                            id="ceouserid"
                            type="text"
                            required
                            placeholder='Enter CEO User ID'
                            onChange={(e) => { setceouserid(e) }}
                        >
                        </input>
                    </div> */}


                    {/* <div class={styles.div1}>
                        <p> District</p>
                        <select id="district"
                            name="district"
                        >
                            <option hidden>Select:</option>
			    {//districtList.map(item => (
                            //    <option value={item.distId}>{item.distName}</option>
				//))
			    }
                
			    {dist && dist.map((item) => (

                                <option value={item["dtCode"]}>{item["dtName"]}</option>
                            ))}

                        </select>
                    </div> */}

                    <div class={styles.div1}>
                        <p> Election Type</p>
                        <select id="electiontype" onSelect={(e) => { setelectiontype(e)}}>
                            <option value="" >Select:</option>
                            <option value="GP">General Election - Parlimentary</option>
                            <option value="GA">General Election - Assembly</option>
                            <option value="BP">By Election - Parlimentary</option>
                            <option value="BA">By Election - Assembly</option>
                        </select>
                        {/* <input
                            id="electiontype"
                            type="text"
                            required
                            placeholder='Enter Election Type'
                            onChange={(e) => { setelectiontype(e) }}
                        >
                        </input> */}
                    </div>

                    <div class={styles.div2}>
                        <p> Start date</p>
                        <input
                            id="startdate"
                            required
                            class={styles.dateInput}
                            type="date"
                            className=" selectBox"
                            onChange={(e) => { setstartdate(e) }}

                        ></input>
                    </div>

                    <div class={styles.div3}>
                        <p> End date</p>
                        <input
                            id="enddate"
                            required
                            class={styles.dateInput}
                            type="date"
                            className="selectBox"
                            onChange={(e) => { setenddate(e) }}
                        ></input>
                    </div>
                    </div>
                    <div className='text-lg'>
                        Select Districts
                    </div>

                    <div className={styles.div5}>
                        
                            <DynamicDataTable
                                renderCheckboxes={true}
                                renderMasterCheckbox={false}
                                isCheckboxChecked={({dtCode}) => {
                                    console.log(dtCode)    
                                    distCodes.has(dtCode)
                                }}
                                // onMasterCheckboxChange={(_, rows) => {
                                //     let all = true
                            
                                //     rows.forEach(({ id }) => {
                                //         if(!all){
                                //             return;
                                //         }
                                //         if(!distCodes.has(id)) {
                                //             all = false
                                //         }
                                //     })
                            
                                //     rows.forEach(({ id }) => {
                                //         var tmp = new Set(distCodes)
                                //         if (all) {
                                //             tmp.delete(id)
                                //         } else if (!tmp.has(id)) {
                                //             tmp.add(id)
                                //         }
                                //         setDistCodes(tmp)
                                //     })
                                // }}
                                onCheckboxChange={(_, { dtCode }) => {
                                    var tmp = new Set(distCodes)
                                    if (distCodes.has(dtCode)) {
                                        tmp.delete(dtCode)
                                    } else {
                                        tmp.add(dtCode)
                                    }
                                    setDistCodes(tmp)
                                }}

                                rows={dist}
                                buttons={[]}
                                fieldMap={
                                    {
                                        // 'acCode': 'AC Code',
                                        // 'acName': 'AC Name'
                                    }
                                }
                            />
                        
                    </div>
                    
                

            </div>
            <center><input type={"submit"} className={styles.mySubmit} ></input></center>
        </form>
    )
}

export default First_Randomisation_Scheduling
