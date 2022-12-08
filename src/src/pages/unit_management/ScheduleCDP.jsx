import { DynamicDataTable } from '@langleyfoxall/react-dynamic-data-table'
import React, { useState } from 'react'
import styles from './styles/ScheduleCDP.module.css'
import { TagsInput } from "react-tag-input-component";

function ScheduleCDP() {


    const [tags, setTags] = React.useState([]);

    return (
        <>
            <div className={styles.Schedule_container}>
                <div className={styles.Schedule_header}>
                    <h4>
                        Schedule CDP
                    </h4>
                </div>

                <div class={styles.parent}>
                    <div class={styles.div1}>
                        <p> CDP Incharge</p>
                        <input
                            type="text"
                            required
                            name=""
                            id="formLevel"
                            placeholder='Enter UserID'
                        >
                        </input>
                    </div>


                    <div class={styles.div2}>
                        <p> Process</p>
                        <select
                            required
                            name=""
                            id="formLevel"
                            className=" selectBox"
                        >
                            <option value="" disabled selected>
                                Select
                            </option>
                        </select>
                    </div>

                    <div class={styles.div3}>
                        <p> Unit Type</p>
                        <select
                            required
                            name=""
                            id="formLevel"
                            className=" selectBox"
                        >
                            <option value="" disabled selected>
                                Select
                            </option>
                        </select>
                    </div>


                    <div class={styles.div4}>
                        <p> Unit Quantity</p>
                        <input
                            type="number"
                            required
                            name=""
                            id="formLevel"
                            placeholder='Enter Number'
                        >
                        </input>

                    </div>
                    <div class={styles.div5}>
                        <p> Manufacturer</p>
                        <select
                            required
                            name=""
                            id="formLevel"
                            className=" selectBox"
                        >
                            <option value="" disabled selected>
                                Select
                            </option>
                        </select>
                    </div>

                    <div class={styles.div6}>
                        <p> Start date</p>
                        <input
                            class={styles.dateInput}
                            type="date"
                            className=" selectBox"
                        ></input>
                    </div>

                    <div class={styles.div7}>
                        <p> End date</p>
                        <input
                            class={styles.dateInput}
                            type="date"
                            className=" selectBox"
                        ></input>
                    </div>

                    <div class={styles.div8}>
                        <p> Add Temporary Users</p>
                        <input
                            type='text'
                            value={tags}
                            id="formTags"
                            onChange={setTags}
                            placeHolder="@SSPPAAAASS, @SSPPAAAASS"
                            style={{ marginBottom: "2%" }}
                        >
                        </input>

                    </div>

                </div>

            </div>
            <button class={styles.submitBtn} type='submit' > Submit </button>
        </>
    )
}

export default ScheduleCDP