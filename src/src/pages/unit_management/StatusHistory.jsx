import React, { useEffect, useState } from 'react'
import Group from './Group'
import styles from './styles/StatusHistory.module.css'

export default function StatusHistory() {

    const URL = window.location.href;
    const arr = URL.split("/");
    const param = arr[arr.length - 1];
    const arr1 = param.split("=");
    const UNITID = arr1[0];
    const [Data, setData] = useState([]);
    const getData = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_SERVER}/unit/viewUnitHistory/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    "unitid": String(UNITID)
                }),
                credentials: "include",
            });

            let Input = await response.json();
            if (response.status == 200) {
                setData(Input['data']);
            }
            else {
                setData([]);
            }
        } catch (err) {
            console.log(err)
        }
    }


    useEffect(
        () => {
            let timer1 = setTimeout(() => getData(), 1 * 1000);
            return () => {
                clearTimeout(timer1);
            };
        },
        []
    );

    return (
        <div className={styles.MyContainer}>
            <div className={`${styles.myCard}`} >
                <div className={`${styles.myCardHeader} ${styles.myPadding}`} >
                    Status History
                </div>
                <div className={`${styles.myCardBody} ${styles.myPadding} `}>
                    {Data &&
                        Data.map((val, ind) => {
                            return (<div style={{ marginTop: '2%' }}>
                                <div className={`${styles.myFlexBox} ${styles.myFlexWrap}`} >
                                    <Group LabelText='Unit ID' value={val[0]} />
                                    <Group LabelText='Status' value={val[2]} />
                                    <Group LabelText='Previous Status' value={val[3]} />
                                    <Group LabelText='Updated By' value={val[6]} />
                                    <Group LabelText='Location' value={val[4]} />
                                    <Group LabelText='Updated at' value={val[1] != '' ? val[1].split('T')[0].slice(8) + "-" + val[1].split('T')[0].slice(5, 7) + '-' + val[1].split('T')[0].slice(0, 4) + ' ' + val[1].split('T')[1].slice(0, 8) : ''} />
                                </div>
                                <div className={`${styles.myFlexBox} ${styles.myFlexWrap}`}>
                                    <Group LabelText='Remarks' value={val[5]} />
                                </div>
                            </div>)
                        })}
                </div>
            </div>
        </div>
    )
}
