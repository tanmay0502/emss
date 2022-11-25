import { DynamicDataTable } from '@langleyfoxall/react-dynamic-data-table'
import React, { useState } from 'react'
import styles from './styles/ScheduleNew.module.css'


function PhysicalVarification() {
    return(
        <>
        <div className={styles.Schedule_container}>
            <div className={styles.Schedule_header}>
                <h4>
                Physical Varification
                </h4> 
            </div>
            <div class={styles.parent}>

                <div class={styles.div1}>
                    <p> Order Id</p>
                    <select
                        //   required={!isTemporary}
                        required
                        name=""
                        id="formLevel"
                        className=" selectBox"
                    //   onChange={(e) => setRoleFunc(e.target.value)}
                    >
                        <option value="" disabled selected>
                            Enter Order ID
                        </option>
                        {/* {levelArray.map((st, index) => (
                            <option value={st} className="text-black">
                                {index + 1}. {st}
                            </option>
                        ))} */}

                    </select>

                </div>

                <div class={styles.div2}> 
                <p> Warehouse ID</p>
                    <select
                        //   required={!isTemporary}
                        required
                        name=""
                        id="formLevel"
                        className=" selectBox"
                    //   onChange={(e) => setRoleFunc(e.target.value)}
                    >
                        <option value="" disabled selected>
                            Enter Warehouse ID
                        </option>
                        {/* {levelArray.map((st, index) => (
                            <option value={st} className="text-black">
                                {index + 1}. {st}
                            </option>
                        ))} */}

                    </select>
                    
                </div>

                <div class={styles.div3}> 
                <p> Status</p>
                    <select
                        //   required={!isTemporary}
                        required
                        name=""
                        id="formLevel"
                        className=" selectBox"
                    //   onChange={(e) => setRoleFunc(e.target.value)}
                    >
                        <option value="" disabled selected>
                            Select Status
                        </option>
                        {/* {levelArray.map((st, index) => (
                            <option value={st} className="text-black">
                                {index + 1}. {st}
                            </option>
                        ))} */}

                    </select>
                
                </div>

                <div class={styles.div4}> 
                <p> Start Date</p>
                    <input  
                        class={styles.dateInput}
                        type="date"
                        // id="formLevel"
                        className=" selectBox"
                    ></input>
                
                </div>

                <div class={styles.div5}> 
                <p> End Date</p>
                    <input  
                    classname = "selectbox"
                    type="date"
                    // id="formLevel"
                    
                    ></input>
                
                </div>

                <div class={styles.div6}> 
                <p> Enter Timestamp</p>
                    <input 
                    class={styles.dateInput}
                    type = "number"
                    className=" selectBox"
                    placeholder='Enter Timestamp'
                    ></input>
                </div>
            </div>
            
        </div>
            <button class={styles.submitBtn} type='submit' > Submit </button>
        </>
    )
}

export default PhysicalVarification