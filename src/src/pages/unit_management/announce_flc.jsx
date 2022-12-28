import React, { useState, useEffect } from 'react'
import { DynamicDataTable } from '@langleyfoxall/react-dynamic-data-table'
import styles from './styles/announce_flc.module.css'
import { AiOutlineClose } from "react-icons/ai"

function Announce_Flc() {

    var currentdate = new Date();
    var hrs = currentdate.getHours();
    var mins = currentdate.getMinutes();
    var secs = currentdate.getSeconds();
    const [District, setDistrict] = useState([])
    const [details, setDetails] = useState([])
    const [listElections, setListElections] = useState([])

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
    async function getListElections() {

        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_SERVER}/unit/listElections`,
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
            const data = await response.json();
            console.log(data);
            if (data.length) {
                setListElections(data)
            }
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        getList();
        getDistrictsList();
        getListElections();
    }, []);
    console.log(details)

    const tempBody = {
        state: "From User ID",
        district: ["BGP", "LOK"],
        manufacturer: "BEL",
        manufacturerStateCoordinatorName: "Mukul",
        manufacturerStateCoordinatorMobNo: "75464184",
        manufacturerStateCoordinatorEmailId: "fsfa@fad.fadf",
        startDate: "start date",
        endDate: "end Data",
        tentativeYear: "2024",
        tentativeMonth: "March",
        electionType: "FLC",
    }
    const [body, setBody] = useState(tempBody)
    const [update, setUpdate] = useState(0)

    useEffect(()=>{
        console.log(body)
    },[update])
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

    const [selectedDistricts, setSelectedDistricts] = useState([])


    return (<>
        <div className='m-auto flex justify-center gap-5 w-96'><h5 className='self-center'>Select Election</h5>
            <div className='w-48'>
                <select>
                    <option value="">Select:</option>
                    {listElections.map((val,ind)=>{
                        return(<>
                        <option value="">{`${val.electiontype} ${val.startdate.slice(0,4)}`}</option>
                        </>)
                    })}
                </select>
            </div>
        </div>
        <div className='flex justify-between'>
            <form onSubmit={onFormSubmit} id="form" className='w-2/3 m-5'>
                <div className={styles.Schedule_container}>
                    <div className={styles.Schedule_header}>
                        <h4>
                            Announce FLC
                        </h4>
                    </div>

                    <div className='w-full text-left p-4'>
                        {/* <div className='flex' > */}
                        <div className='w-1/2 m-2' >
                            <p>Districts</p>

                            <select
                                required
                                name=""
                                id="1"
                                className=" selectBox"
                                onChange={(e) => {
                                    setSelectedDistricts([...selectedDistricts, e.target.value])
                                }}
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
                        <div className='flex flex-wrap w-full h-10 items-center'>
                            {selectedDistricts && selectedDistricts.map((val) => (
                                <div className='rounded-lg gap-1 m-1 p-2 flex align-middle shadow-md shadow-black'>{val}
                                    <AiOutlineClose className='cursor-pointer text-red-400' onClick={() => {
                                        setSelectedDistricts((prev) => {
                                            return prev.filter((e) => {
                                                return e != val;
                                            })
                                        })
                                    }} /></div>
                            ))}
                        </div>

                        {/* </div> */}
                        <div className='grid grid-cols-2 gap-6'>
                            <div className=''>
                                <p>Start date</p>
                                <input
                                    class={styles.dateInput}
                                    type="date"
                                    required pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
                                    id="2"
                                    className="selectBox"
                                    onChange={(e)=>{
                                        console.log(e.target.value)
                                        setBody((prev)=>{
                                            prev.startDate = e.target.value;
                                            return prev;
                                        })
                                        setUpdate(prev=>(prev+1)%10)
                                    }}
                                ></input>
                            </div>
                            <div className='' >
                                <p>End date</p>
                                <input
                                    class={styles.dateInput}
                                    type="date"
                                    id="9"
                                    className=" selectBox"
                                    onChange={(e)=>{
                                        console.log(e.target.value)
                                        setBody((prev)=>{
                                            prev.endDate = e.target.value;
                                            return prev;
                                        })
                                        setUpdate(prev=>(prev+1)%10)
                                    }}
                                ></input>
                            </div>
                            <div className=''>
                                <p>Tentative Year Of Election</p>
                                <input
                                    class={styles.input}
                                    type="text"
                                    id="4"
                                    className="selectBox"
                                    placeholder='Enter Year'
                                    value={body.tentativeYear}
                                    disabled
                                ></input>
                            </div>
                            <div className=''>
                                <p>Tentative month of election</p>
                                <select
                                    required
                                    name=""
                                    id="6"
                                    className=" selectBox"
                                    onSelect={(e)=>{
                                        setBody((prev)=>{
                                            prev.tentativeMonth = e.target.value;
                                            return prev;
                                        })
                                        setUpdate(prev=>(prev+1)%10)
                                    }}
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

                            <div className=''>
                                <p> Manufacturer</p>
                                <select
                                    required
                                    name=""
                                    id="5"
                                    className=" selectBox"
                                    defaultValue={"Select"}
                                    onSelect={(e)=>{
                                        setBody((prev)=>{
                                            prev.manufacturer = e.target.value;
                                            return prev;
                                        })
                                        setUpdate(prev=>(prev+1)%10)
                                    }}
                                >
                                    <option>Select:</option>
                                    {["BEL", "ECIL"].map((val) => {
                                        return <option value={val}>{val}</option>
                                    })}
                                </select>
                            </div>
                            <div className=''>
                                <p> Manufacturer State Coordinator Name</p>
                                <input
                                    class={styles.input}
                                    type="text"
                                    id="3"
                                    className="selectBox"
                                    placeholder='Full Name'
                                    value={body.manufacturerStateCoordinatorName}
                                    onChange={(e)=>{setBody((prev)=>{
                                        prev.manufacturerStateCoordinatorName = e.target.value;
                                        return prev;
                                    })
                                    setUpdate(prev=>(prev+1)%10)
                                }}
                                    ></input>
                            </div>
                            <div className=''>
                                <p>Manufacturer State Coordinator Email ID</p>
                                <input
                                    class={styles.input}
                                    type="email"
                                    id="7"
                                    className="selectBox"
                                    placeholder='xyz@example.com'
                                    value={body.manufacturerStateCoordinatorEmailId}
                                    onChange={(e)=>{setBody((prev)=>{
                                        prev.manufacturerStateCoordinatorEmailId = e.target.value;
                                        return prev;
                                    })
                                    setUpdate(prev=>(prev+1)%10)
                                }}
                                    ></input>
                            </div>
                            <div className=''>
                                <p>Manufacturer State Coordinator Mobile No.</p>
                                <input
                                    class={styles.input}
                                    type="number"
                                    id="8"
                                    className="selectBox"
                                    placeholder='Enter Number'
                                    value={body.manufacturerStateCoordinatorMobNo}
                                    onChange={(e)=>{
                                        setBody((prev)=>{
                                        prev.manufacturerStateCoordinatorMobNo = e.target.value;
                                        return prev;
                                    })
                                    setUpdate(prev=>(prev+1)%10)
                                }}
                                ></input>
                            </div>
                            <div className='' >
                                <p> Type of election</p>
                                <select
                                    required
                                    name=""
                                    id="5"
                                    className=" selectBox"
                                >
                                    <option value="" disabled selected>
                                        {body.electionType}
                                    </option>
                                    {/* <option value="A">
                                        Byepoll Assembly
                                    </option>
                                    <option value="L">
                                        Byepoll Parliamentary
                                    </option>
                                    <option value="B">
                                        General Assembly
                                    </option>
                                    <option value="B">
                                        General Parliamentary
                                    </option> */}
                                </select>
                            </div>
                        </div>
                    </div>



                </div>
                <button class={styles.submitBtn} type={"submit"} > Submit </button>
            </form>
            <div className='w-1/3 m-5'>
                <div className={styles.Schedule_container}>
                    <div className={styles.Schedule_header}>

                    </div>
                    <div className='mt-10'>
                        <div className='grid grid-cols-2'>
                            <h4 className='m-auto'>Total Districts</h4>
                            <div>{"459"}</div>
                        </div>
                        <div className='grid grid-cols-2 mt-10 gap-30'>
                            <h5>No. of Districts ready</h5>
                            <div>{"399"}</div>
                            <h5>No. of Districts pending</h5>
                            <div>{"60"}</div>
                        </div>
                        <div className='mt-5 grid gap-2'>
                            <h5>Districts :</h5>
                            {["Gandninagar", "Bhagalpur", "Lucknow", "Raipur"].map((val, ind) => {
                                return <div className='grid grid-cols-2 text-center'>
                                    <div>{val}</div>
                                    <button className='cursor-pointer text-white'>View</button>
                                </div>
                            })}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </>
    )
}

export default Announce_Flc