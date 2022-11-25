import { DynamicDataTable } from '@langleyfoxall/react-dynamic-data-table'
import React, { useState } from 'react'
import styles from './styles/ScheduleFlc.module.css'


function ScheduleFLC() {
    return(
        <>
        <div className={styles.Schedule_container}>
            <div className={styles.Schedule_header}>
                <h4>
                Schedule FLC
                </h4> 
            </div>
            <div class={styles.parent}>

                <div class={styles.div1}>
                    <p>FLC Warehouse</p>
                    <select
                        //   required={!isTemporary}
                        required
                        name=""
                        id="formLevel"
                        className=" selectBox"
                    //   onChange={(e) => setRoleFunc(e.target.value)}
                    >
                        <option value="" disabled selected>
                            Select warehouse ID
                        </option>
                        {/* {levelArray.map((st, index) => (
                            <option value={st} className="text-black">
                                {index + 1}. {st}
                            </option>
                        ))} */}

                    </select>

                </div>

                <div class={styles.div2}> 
                <p> Warehouse Supervisor</p>
                    <select
                        //   required={!isTemporary}
                        required
                        name=""
                        id="formLevel"
                        className=" selectBox"
                    //   onChange={(e) => setRoleFunc(e.target.value)}
                    >
                        <option value="" disabled selected>
                            Select User ID
                        </option>
                        {/* {levelArray.map((st, index) => (
                            <option value={st} className="text-black">
                                {index + 1}. {st}
                            </option>
                        ))} */}

                    </select>
                    
                </div>

                <div class={styles.div3}> 
                <p> Tentative year of election</p>
                <input  
                    class={styles.input}
                    type="number"
                    // id="formLevel"
                    className="selectBox"
                    placeholder='Enter Year'
                    ></input>
                    
                
                </div>

                <div class={styles.div4}> 
                <p> Manufacturer</p>
                <input  
                    class={styles.input}
                    type="text"
                    // id="formLevel"
                    className="selectBox"
                    placeholder='Full Name'
                    ></input>
                
                </div>

                <div class={styles.div5}> 
                <p> ECI Supervisor</p>
                <input  
                    class={styles.input}
                    type="text"
                    // id="formLevel"
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
                        id="formLevel"
                        className=" selectBox"
                    //   onChange={(e) => setRoleFunc(e.target.value)}
                    >
                        <option value="" disabled selected>
                            Select
                        </option>
                </select>
                </div>

                <div class={styles.div7}> 
                <p>Manufacturer Email ID</p>
                <input  
                    class={styles.input}
                    type="email"
                    // id="formLevel"
                    className="selectBox"
                    placeholder='xyz@example.com'
                    ></input>
                </div>

                <div class={styles.div8}> 
                <p>Manufacturer Mobile No.</p>
                <input  
                    class={styles.input}
                    type="number"
                    // id="formLevel"
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
                        id="formLevel"
                        className=" selectBox"
                    //   onChange={(e) => setRoleFunc(e.target.value)}
                    >
                        <option value="" disabled selected>
                            Select
                        </option>
                </select>
                </div>

                <div class={styles.div10}> 
                <p>Start date</p>
                    <input 
                    class={styles.dateInput}
                    type = "date"
                    className=" selectBox"
                    ></input>
                </div>

                <div class={styles.div11}> 
                <p>End date</p>
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

export default ScheduleFLC