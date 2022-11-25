import { DynamicDataTable } from '@langleyfoxall/react-dynamic-data-table'
import React, { useState } from 'react'
import styles from './styles/ScheduleNew.module.css'
import { TagsInput } from "react-tag-input-component";

function ScheduleElection() {

    const [tags, setTags] = React.useState([]);

    return(
        <>
        <div className={styles.Schedule_container}>
            <div className={styles.Schedule_header}>
                <h4>
                Schedule TnA
                </h4> 
            </div>
            <div class={styles.parent}>

                <div class={styles.div1}>
                    <p> Strong Room</p>
                    <select
                        //   required={!isTemporary}
                        required
                        name=""
                        id="formLevel"
                        className=" selectBox"
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

                <div class={styles.div2}> 
                <p> Num Awareness Unit</p>
                <input  
                    class={styles.input}
                    type="number"
                    // id="formLevel"
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
                        id="formLevel"
                        className=" selectBox"
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

                <div class={styles.div4}> 
                <p> Timestamp</p>
                <input  
                    class={styles.dateInput}
                    type="date"
                    // id="formLevel"
                    className=" selectBox"
                    ></input>
                </div>

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
        </>
    )
}

export default ScheduleElection