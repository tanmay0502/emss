import { DynamicDataTable } from '@langleyfoxall/react-dynamic-data-table'
import React, { useState } from 'react'
import styles from './styles/ScheduleNew.module.css'


function ScheduleElection() {
    return(
        <>
        <div className={styles.Schedule_container}>
            <div className={styles.Schedule_header}>
                <h4>
                Schedule Election
                </h4> 
            </div>
            <div class={styles.parent}>

                <div class={styles.div1}>
                    <p> State</p>
                    <select
                        //   required={!isTemporary}
                        required
                        name=""
                        id="formLevel"
                        className=" selectBox"
                    //   onChange={(e) => setRoleFunc(e.target.value)}
                    >
                        <option value="" disabled selected>
                            Select State
                        </option>
                        {/* {levelArray.map((st, index) => (
                            <option value={st} className="text-black">
                                {index + 1}. {st}
                            </option>
                        ))} */}

                    </select>

                </div>

                <div class={styles.div2}> 
                <p> PC</p>
                    <select
                        //   required={!isTemporary}
                        required
                        name=""
                        id="formLevel"
                        className=" selectBox"
                    //   onChange={(e) => setRoleFunc(e.target.value)}
                    >
                        <option value="" disabled selected>
                            Select PC
                        </option>
                        {/* {levelArray.map((st, index) => (
                            <option value={st} className="text-black">
                                {index + 1}. {st}
                            </option>
                        ))} */}

                    </select>
                    
                </div>

                <div class={styles.div3}> 
                <p> AC</p>
                    <select
                        //   required={!isTemporary}
                        required
                        name=""
                        id="formLevel"
                        className=" selectBox"
                    //   onChange={(e) => setRoleFunc(e.target.value)}
                    >
                        <option value="" disabled selected>
                            Select AC
                        </option>
                        {/* {levelArray.map((st, index) => (
                            <option value={st} className="text-black">
                                {index + 1}. {st}
                            </option>
                        ))} */}

                    </select>
                
                </div>

                <div class={styles.div4}> 
                <p> Election Type</p>
                    <select
                        //   required={!isTemporary}
                        required
                        name=""
                        id="formLevel"
                        className=" selectBox"
                    //   onChange={(e) => setRoleFunc(e.target.value)}
                    >
                        <option value="" disabled selected>
                            Select Election Type
                        </option>
                        {/* {levelArray.map((st, index) => (
                            <option value={st} className="text-black">
                                {index + 1}. {st}
                            </option>
                        ))} */}

                    </select>
                
                </div>

                <div class={styles.div5}> 
                <p> Start date</p>
                    <input  
                    class={styles.dateInput}
                    type="date"
                    // id="formLevel"
                    className=" selectBox"
                    ></input>
                
                </div>

                <div class={styles.div6}> 
                <p> End date</p>
                    <input 
                    class={styles.dateInput}
                    type = "date"
                    className=" selectBox"
                    ></input>
                </div>
            </div>
            
        </div>
            <button class={styles.submitBtn} type='submit' > Submit </button>
        </>
    )
}

export default ScheduleElection