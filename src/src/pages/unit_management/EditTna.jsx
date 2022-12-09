import { DynamicDataTable } from '@langleyfoxall/react-dynamic-data-table'
import React, { useState,useEffect } from 'react'
import defStyles from './styles/ScheduleNew.module.css'
import styles from './styles/TemporaryUser.module.css'
import UserImageTest from '../../assets/UserImageTest.png'
import { ReactComponent as SearchInputElement } from '../../assets/searchInputIcon.svg';
import { TagsInput } from "react-tag-input-component";

function EditTna() {

    const [tags, setTags] = React.useState([]);
    const [edit, setEdit] = useState(false)
    const [tna,setTna] = useState([])
    const issueId = () => {
        const URL = window.location.href;
        const arr = URL.split("/");
        const param = arr[arr.length - 1];
        const arr1 = param.split("=");
        return arr1[1];
      }
    async function getTna() {
        let id = issueId();
        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_SERVER}/unit/viewTNA/${id}`,
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
                setTna(data);       
            }
            
        } catch (err) {
            console.log({err});
        }
    }
    useEffect(() => {
        getTna();        
    }, []);

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




    return(
        <>
        <button className={defStyles.editBtn} 
            onClick = {() => {setEdit(true)}}
        >
            Edit TnA
        </button>
        <div className={defStyles.mainDiv}>
        <div className={defStyles.Schedule_container}>
            <div className={defStyles.Schedule_header}>
                <h4>
                Schedule TnA
                </h4> 
            </div>
            <div class={defStyles.parent}>

                <div class={defStyles.div1}>
                    <p> Strong Room</p>
                    <select
                        //   required={!isTemporary}
                        required
                        name=""
                        id="formLevel"
                        className=" selectBox"
                        disabled = {edit === true ? false : true}
                    //   onChange={(e) => setRoleFunc(e.target.value)}
                    >
                        <option value="" disabled selected>
                           Select Warehouse ID
                        </option>
                        {/* {levelArray.map((st, index) => (
                            <option value={st} className="text-black">
                                {index + 1}. {st}
                            </option>
                        ))} */}

                    </select>

                </div>

                <div class={defStyles.div2}> 
                <p> Num Awareness Unit</p>
                <input  
                    class={defStyles.input}
                    type="number"
                    // id="formLevel"
                    className="selectBox"
                    placeholder='Enter Number'
                    disabled = {edit === true ? false : true}
                    ></input>
                </div>

                <div class={defStyles.div3}> 
                <p> Unit Type</p>
                    <select
                        //   required={!isTemporary}
                        required
                        name=""
                        id="formLevel"
                        className=" selectBox"
                        disabled = {edit === true ? false : true}
                    //   onChange={(e) => setRoleFunc(e.target.value)}
                    >
                        <option value="" disabled selected>
                            Select Unit Type
                        </option>
                        {/* {levelArray.map((st, index) => (
                            <option value={st} className="text-black">
                                {index + 1}. {st}
                            </option>
                        ))} */}

                    </select>
                
                </div>

                <div class={defStyles.div4}> 
                <p> Timestamp</p>
                <input  
                    class={defStyles.dateInput}
                    type="date"
                    // id="formLevel"
                    className=" selectBox"
                    disabled = {edit === true ? false : true}
                    ></input>
                </div>

                <div class={defStyles.div5Tna}> 
                <p> Add Temporary Users</p>
                    <TagsInput

                    // style={{ width: '100%' }}
                    className='li_noti hide-scroll-bar tagInput p-2'
                    value={tags}
                    id="formTags"
                    onChange={setTags}
                    disabled = {edit === true ? false : true}
                    placeHolder="SSPPAAARRR, SSPPAAARRR"
                    />
                </div>

                
            </div>
            
        </div>

        <div class={styles.Schedule_container2}>
                    <div class={styles.Schedule_header2}>
                        <h4>
                            Temporary Users
                        </h4>
                        <div style={{ display: "flex", "flexDirection": "row", alignItems: "center", justifyContent: "center", background: "#F9FBFF", borderRadius: "10px", padding: "7.5px 15px 7.5px 0", fontSize: "0.8em" }}>
                            <SearchInputElement style={{ margin: "0 7.5px", width: "20px" }} />
                            <input type={'search'} defaultValue={tableFilter} onChange={(e) => { setTableFilter(e.target.value) }} placeholder='Search' style={{ outline: "none", background: "transparent" }} />
                        </div>
                    </div>
                    <div class={styles.Schedule_CDP_table}>
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
                                                        className={styles.Assigned_Engineer_Tr}
                                                        value={val.User_ID}
                                                        name="User_ID"
                                                        placeholder="User ID"
                                                        onChange={(e) => handleInputChange_Temporary_Users(e, id)}
                                                    />
                                                </td >
                                                <td className="text-black text-sm" >{val['']}</td>
                                                <td >
                                                    <input
                                                        className={styles.Assigned_Engineer_Tr}
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
            <button class={defStyles.submitBtn} type='submit' > Submit </button>
            : " "}
        </>
    )
}

export default EditTna