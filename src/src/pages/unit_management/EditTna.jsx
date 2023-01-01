import { DynamicDataTable } from '@langleyfoxall/react-dynamic-data-table'
import React, { useState,useEffect } from 'react'
import styles from './styles/ScheduleTNA.module.css'
import defStyles from './styles/TemporaryUser.module.css'
import UserImageTest from '../../assets/UserImageTest.png'
import { ReactComponent as SearchInputElement } from '../../assets/searchInputIcon.svg';
import { TagsInput } from "react-tag-input-component";

function EditTna() {
    const [details, setDetails] = useState([])
    const [tags, setTags] = React.useState([]);
    const [edit, setEdit] = useState(false)
    const [tna,setTna] = useState([])
    const [polling, setPolling] = useState([])

    const issueId = () => {
        const URL = window.location.href;
        const arr = URL.split("/");
        const param = arr[arr.length - 1];
        const arr1 = param.split("=");
        console.log(arr1)
        return arr1[0];
        
      }
    async function getTna() {
        let id = issueId();
        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_SERVER}/unit/viewTNA/${id}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: 'same-origin',
                }
            );
            const data = await response.json();
            console.log(data)
            if(data["data"]!=404){
                setTna(data);       
            }
            
        } catch (err) {
            console.log({err});
        }
    }
    
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
                                body: JSON.stringify({
                                }),
                            })

                        const data = await response.json();
                        console.log(data);
                        setDetails(data["data"])
                        console.log(data["data"], "data")
                    } catch (error) {
                        console.log(error)
                    }

                }
                async function getPoll() {

                    try {
                        const response = await fetch(
                            `${process.env.REACT_APP_API_SERVER}/unit/countPolling`,
                            {
                                method: "POST",
                                credentials: "include",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                }),
                            })

                        const data = await response.json();
                        console.log(data);
                        setPolling(data["data"])
                        console.log(data["data"], "data")
                    } catch (error) {
                        console.log(error)
                    }

                }

                useEffect(() => {
                    getList();
                    getPoll();
                    getTna(); 
                }, [])

    const [currStrong,setCurrStrong] = useState("")
    const [currNum,setCurrNum] = useState()
    const [currType,setCurrType] = useState("")
    const [currTags,setCurrTags] = useState([])

    useEffect(() => {
        try{
            if(tna !== undefined){
                // setCurrStrong(elections[id][0]);
                setCurrStrong("AA1122");
                setCurrNum(23);
                setCurrType("CU");
                setCurrTags(["SSSPPPAARRR", "AAAGGSOOOSO"]);
                setTags(currTags)
            }

        }catch{
            console.log("err")
        }

    },[tna])
    const row21 = {
        'User_ID': 'MH00000CEO',
        "": <div style={{ display: "flex", flexDirection: "row", alignItems: "right", justifyContent: "flex-start", paddingLeft: "40px" }}><img src={UserImageTest} /></div>,
        'Name': 'Jane Cooper',
        ' ': <div className="flex justify-end " style={{ marginLeft: "3%" }}><button type="button" className="text-white bg-orange-600 p-1 text-2xl w-8 h-8 -mt-4 " style={{ borderRadius: "50%", marginTop: "2%" }}>-</button></div>

    }

    const row22 = {
        'User_ID': 'MH00000CEO',
        "": <div style={{ display: "flex", flexDirection: "row", alignItems: "right", justifyContent: "flex-start", paddingLeft: "40px" }}><img src={UserImageTest} /></div>,
        'Name': 'Jane Cooper',
        ' ': <div className="flex justify-end " style={{ marginLeft: "3%" }}><button type="button" className="text-white bg-orange-600 p-1 text-2xl w-8 h-8 -mt-4 " style={{ borderRadius: "50%", marginTop: "2%" }}>-</button></div>

    }
    const data2 = [row21, row22];
    const [tableFilter, setTableFilter] = useState("");
    const [rows_Temporary_Users, setRows_Temporary_Users] = useState([...data2]);
    const [isEdit_Temporary_Users, setEdit_Temporary_Users] = React.useState(-1);




    const handleRemoveClick_Temporary_Users = (i) => {
        if (window.confirm(`Are you sure you want to delete from temporary Users table?`)) {
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
                "": <div style={{ display: "flex", flexDirection: "row", alignItems: "right", justifyContent: "flex-start", paddingLeft: "40px" }}><img src={UserImageTest} /></div>,
                Name: "",
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

    async function postEditTna() {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_SERVER}/unit/edit_tna_schedule`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: 'same-origin',
                    body: JSON.stringify({
                        // Severity: document.getElementById("formSeverity").value.slice(-1),
                        tnaid: 1,
                        StrongRoom: "string",
                        NumAwarenessUnit: "string",
                        UnitType: "string",
                        tempUsers: [
                          "string"
                        ]
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
        postEditTna();
    };

    return(
        <>

        {edit === false ? 
        <button className={styles.editBtn} 
            onClick = {() => {setEdit(true)}}
        >
            Edit Training and Awareness
        </button>
        : "" }
        <form onSubmit={onFormSubmit} id="form">
        <div className={styles.mainDiv}>
        <div className={styles.Schedule_container}>
            <div className={styles.Schedule_header}>
                <h4>
                Edit Training and Awareness
                </h4> 
            </div>
            <div class={styles.parent}>

                    <div class={styles.div1}>
                        <p>Source Strong Room</p>
                        <select
                            //   required={!isTemporary}
                            required
                            name=""
                            id="1"
                            className=" selectBox"
                        //   onChange={(e) => setRoleFunc(e.target.value)}
                        >
                            <option value="" disabled selected>
                                Select Source Strong Room
                            </option>
                                {details.map(item => (
                                            <option value={item.warehouseid}>{item.warehouseid}</option>
                                )) }
                        </select>

                    </div>

                    <div class={styles.div3}> 
                    <p>Destination Strong Room</p>
                        <select
                            //   required={!isTemporary}
                            required
                            name=""
                            id="2"
                            className=" selectBox"
                        //   onChange={(e) => setRoleFunc(e.target.value)}
                        >
                            <option value="" disabled selected>
                            Select Destination Strong Room
                            </option>
                            {details.map(item => (
                                            <option value={item.warehouseid}>{item.warehouseid}</option>
                                )) }
                        </select>

                    </div>

                    <div class={styles.div2}>
                    <p> Number of Polling Stations:</p>
                        <input  
                        class={styles.input}
                        type="number"
                        disabled= {true}
                        // id="3"
                        className="selectBox"
                        placeholder='Fetching Number of Polling Stations'
                        ></input>

                    </div>


                    <div class={styles.div4}>
                        <h5>Awareness Units:</h5>

                    </div>


                    <div class={styles.div5}>
                        <input  
                        class={styles.input}
                        type="text"
                        id="1"
                        className="selectBox"
                        placeholder='Awareness Units in Percentage'
                        ></input>
                        <h5 className='pl-2 pt-2 flex items-center' >(%)</h5>
                    </div>


                    <div class={styles.div6}>
                        
                        <input  
                        class={styles.input}
                        type="text"
                        id="3"
                        className="selectBox"
                        placeholder='Number of Awareness Units'
                        ></input>
                        <h5 className='pl-2 pt-2 flex items-center' >(Count)</h5>
                    </div>


                    <div class={styles.div10}>
                        <h4 className='pt-12'> Person Handed over to: </h4>

                    </div>


                    <div class={styles.div13}>
                        <p>Name</p>
                        <input  
                        class={styles.input}
                        type="text"
                        id="4"
                        className="selectBox"
                        placeholder='Enter Name'
                        ></input>

                    </div>


                    <div class={styles.div14}>
                        <p>Mobile Number</p>
                        <input  
                        class={styles.input}
                        type="number"
                        id="5"
                        className="selectBox"
                        placeholder='Enter Mobile Number'
                        ></input>

                    </div>


                    <div class={styles.div15}>
                        <p>Designation</p>
                        <input  
                        class={styles.input}
                        type="text"
                        id="6"
                        className="selectBox"
                        placeholder='Enter Designation'
                        ></input>

                    </div>


                    <div class={styles.div16}>
                    <p>Start Date</p>
                        <input  
                            class={styles.dateInput}
                            type="date"
                            id="7"
                            className=" selectBox"
                        ></input>


                    </div>


                    <div class={styles.div18}>
                    <p>End Date</p>
                            <input  
                                class={styles.dateInput}
                                type="date"
                                id="8"
                                className=" selectBox"
                            ></input>

                    </div>


                    {/* <div class={styles.div19}>
                        <h5> Temporary Users:</h5>
                    </div> */}
                    <div class={styles.div17}>
                        <p>Temporary Users</p>

                    <TagsInput
                        className='li_noti hide-scroll-bar tagInput'
                        value={tags}
                        id="formTags"
                        onChange={setTags}
                        placeHolder="SSPPAAARRR, SSPPAAARRR"
                        />

                    </div>

                    </div>
            

            
            
        </div>

        <div class={defStyles.Schedule_container2}>
                    <div class={defStyles.Schedule_header2}>
                        <h4>
                            Temporary Users
                        </h4>
                        <div style={{ display: "flex", "flexDirection": "row", alignItems: "center", justifyContent: "center", background: "#F9FBFF", borderRadius: "10px", padding: "7.5px 15px 7.5px 0", fontSize: "0.8em" }}>
                            <SearchInputElement style={{ margin: "0 7.5px", width: "20px" }} />
                            <input type={'search'} defaultValue={tableFilter} onChange={(e) => { setTableFilter(e.target.value) }} placeholder='Search' style={{ outline: "none", background: "transparent" }} />
                        </div>
                    </div>
                    <div class={defStyles.Schedule_CDP_table}>
                        {/* <DynamicDataTable rows={data2} buttons={[]} /> */}
                        <table >
                            <thead >
                                <tr>
                                    <th style={{ color: "#f56a3f", padding: "20px" }}>User ID</th>
                                    <th style={{ color: "#f56a3f", padding: "20px" }}></th>
                                    <th style={{ color: "#f56a3f", padding: "20px" }}>Name</th>
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
                                                <td className="text-black text-sm">{val['Name']}</td>
                                                {edit === true ?
                                                <td className="text-black text-sm" onClick={() => handleRemoveClick_Temporary_Users(id)}>{val[' ']}</td>
                                                : " "}
                                                </tr>
                                        </tbody>
                                        :
                                        <tbody >
                                            <tr onDoubleClick={() => { handleEdit_Temporary_Users(-1) }}>
                                                <td >
                                                    <input
                                                        className={defStyles.Assigned_Engineer_Tr}
                                                        value={val.User_ID}
                                                        name="User_ID"
                                                        placeholder="User ID"
                                                        onChange={(e) => handleInputChange_Temporary_Users(e, id)}
                                                    />
                                                </td >
                                                <td className="text-black text-sm" >{val['']}</td>
                                                <td >
                                                    <input
                                                        className={defStyles.Assigned_Engineer_Tr}
                                                        value={val.Name}
                                                        placeholder="Name"
                                                        name="Name"
                                                        onChange={(e) => handleInputChange_Temporary_Users(e, id)}
                                                    />
                                                </td>
                                                <td className="text-black text-sm" onClick={() => handleRemoveClick_Temporary_Users(id)}>{val[' ']}</td>
                                            </tr>
                                        </tbody>
                                    )
                                })}
                        </table>
                    </div>
                    {edit === true ?
                    <button type="button" className="text-white bg-orange-600 p-1 text-2xl w-8 h-8 -mt-4 " style={{ borderRadius: "50%", marginLeft: "85%", marginTop: "1%" }} onClick={() => { handleAdd_Temporary_Users() }}>+</button>
                    : " "}
                </div>
            </div>

            {edit === true ?
            <button class={styles.submitBtn} type='submit' > Submit </button>
            : " "}
            </form>
            
        </>
    )
}

export default EditTna
