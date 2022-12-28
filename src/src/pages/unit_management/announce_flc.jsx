import React, { useState, useEffect } from 'react'
import { DynamicDataTable } from '@langleyfoxall/react-dynamic-data-table'
import styles from './styles/announce_flc.module.css'


function Announce_Flc() {

    var currentdate = new Date();
    var hrs = currentdate.getHours();
    var mins = currentdate.getMinutes();
    var secs = currentdate.getSeconds();
    const [District, setDistrict] = useState([])
    const [details,setDetails] = useState([])

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

    console.log(time)

    
        async function getList() {
    
            try {
                const response = await fetch(
                    `${process.env.REACT_APP_API_SERVER}/warehouse/listWarehouses`,
                    {
                        method: "POST",
                        credentials: "include",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    })
    
                const data = await response.json();
                // console.log(data);
                setDetails(data["data"])
                // console.log(data["data"], "data")
            } catch (error) {
                console.log(error)
            }
    
        }
        async function getDistrictsList() {
    
            try {
                const response = await fetch(
                    `${process.env.REACT_APP_API_SERVER}/user/getRealm`,
                    {
                        method: "POST",
                        credentials: "include",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    })
    
                const data = await response.json();
                // console.log(data);
                setDistrict(data["data"]["dist"])
                // console.log(data["data"], "data")
            } catch (error) {
                console.log(error)
            }
    
        }

    useEffect(() => {
        getList();
        getDistrictsList();
    }, []);
    console.log(details)




    async function AnnounceFLC() {

        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_SERVER}/unit/flc_announce`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        warehouseId: document.getElementById("1") ? document.getElementById("1").value : "",
                        manufacturerName: document.getElementById("3") ? document.getElementById("3").value : "",
                        manufacturerMobNo: document.getElementById("8") ? document.getElementById("8").value : "",
                        manufacturerEmailId: document.getElementById("7") ? document.getElementById("7").value : "",
                        tentativeYear: document.getElementById("4") ? document.getElementById("4").value : "",
                        tentativeMonth: document.getElementById("6") ? document.getElementById("6").value : "",
                        electionType: document.getElementById("5") ? document.getElementById("5").value : "",
                        startDate: document.getElementById("2") ? document.getElementById("2").value : "",
                        endDate: document.getElementById("9") ? document.getElementById("9").value : "",
                    }),
                }
            );
            const data = await response.json();

            if (response.status === 200) {
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
        AnnounceFLC();
    };

    const [selectedDistricts, setSelectedDistricts] = useState(["900","001","900","001","900","001","900","001"])


    return (
        <div className='flex justify-between'>
            <form onSubmit={onFormSubmit} id="form" className='w-2/3 m-5'>
                <div className={styles.Schedule_container}>
                    <div className={styles.Schedule_header}>
                        <h4>
                            Announce FLC
                        </h4>
                    </div>

                    <div className='w-full text-left p-4'>
                    <div className='w-1/2 m-2' >
                            <p>Districts</p>
                           
                            <select
                                required
                                name=""
                                id="1"
                                className=" selectBox"
                            >
                                <option value="" disabled selected>
                                    Select Districts
                                </option>
                                {District.length > 0 && District.map((val) => (
                                    <option value={val} >
                                        {val}
                                    </option>
                                ))
                                }

                            </select>
                           
                       
                        </div>
                        <div className='flex w-full'>
                            {selectedDistricts && selectedDistricts.map((val)=>(
                                <div className='rounded-lg m-1 p-2 shadow-md shadow-black'>{val}
                                <a className='p-2 rounded-sm'>close</a></div>
                            ))}
                        </div>
                        <div className='flex justify-between'>
                                <div  className='w-1/2 m-2'>
                                <p>Start date</p>
                                    <input
                                        class={styles.dateInput}
                                        type="date"
                                        required pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
                                        id="2"
                                        className="selectBox"
                                    ></input>
                                </div>

                                <div  className='w-1/2 m-2' >
                                <p>End date</p>
                                    <input
                                        class={styles.dateInput}
                                        type="date"
                                        id="9"
                                        className=" selectBox"
                                    ></input>
                                </div>
                        </div>
                        <div className='flex justify-between'>
                        <div  className='w-1/2 m-2'>
                            <p>Tentative Year Of Election</p>
                            <input
                                class={styles.input}
                                type="number"
                                id="4"
                                className="selectBox"
                                placeholder='Enter Year'
                            ></input>

                        </div>


                        <div className='w-1/2 m-2'>
                            <p> Manufacturer </p>
                            <input
                                class={styles.input}
                                type="text"
                                id="3"
                                className="selectBox"
                                placeholder='Full Name'
                            ></input>

                        </div>
                        </div>

                        <div className='flex justify-between'>
                                <div className='w-1/2 m-2' >
                                    <p> Type of election</p>
                                    <select
                                        //   required={!isTemporary}
                                        required
                                        name=""
                                        id="5"
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
                                </div>

                                <div className='w-1/2 m-2'>
                                    <p>Tentative month of election</p>
                                    <select
                                        required
                                        name=""
                                        id="6"
                                        className=" selectBox"
                                    //   onChange={(e) => setRoleFunc(e.target.value)}
                                    >
                                        <option value="" disabled selected>
                                            Select
                                        </option>
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

                        </div>
                        <div className='flex justify-between'>
                            <div className='w-1/2 m-2'>
                                <p>Manufacturer Email ID</p>
                                <input
                                    class={styles.input}
                                    type="email"
                                    id="7"
                                    className="selectBox"
                                    placeholder='xyz@example.com'
                                ></input>
                            </div>

                            <div className='w-1/2 m-2'>
                                <p>Manufacturer Mobile No.</p>
                                <input
                                    class={styles.input}
                                    type="number"
                                    id="8"
                                    className="selectBox"
                                    placeholder='Enter Number'
                                ></input>
                            </div>
                        </div>
                    </div>

                    

                </div>
                <button class={styles.submitBtn} type={"submit"} > Submit </button>
            </form>
            <div className='w-1/3 m-5'>
                <div className={styles.Schedule_container}>
                        <div className={styles.Schedule_header}>
                            <h4>
                                Announce FLC
                            </h4>
                        </div>
                </div> 
            </div>
        </div>
    )
}

export default Announce_Flc