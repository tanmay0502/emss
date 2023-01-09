import React, { useEffect, useState } from 'react'
import Group from './Group'
import styles from './styles/StatusHistory.module.css'
import DynamicDataTable from "@langleyfoxall/react-dynamic-data-table";

export default function StatusHistory() {

    const URL = window.location.href;
    const arr = URL.split("/");
    const param = arr[arr.length - 1];
    const arr1 = param.split("=");
    const UNITID = arr1[0];
    const [sortedTableData, setSortedTableData] = useState([])
    const [isDetail, setIsDetail] = useState(0);
    const [data, setdata] = useState([]);


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

            let data = await response.json();
            if (response.status == 200) {
                const sorted = data['data'].sort((a, b) => {
                    if (b[1] > a[1]) {
                        return -1;
                    }
                    else {
                        return 1;
                    }

                })
                setdata(sorted.reverse());
            }
            else {
                setdata([]);
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
    console.log(data, 'data')
    useEffect(() => {
        if (data) {
            var Data = data.map((val) => {
                return {
                    // "Unit ID": val[0],
                    "Status": val[2],
                    "Previous Status": val[3],
                    "Updated By": val[6],
                    "Location": val[4],
                    "Updated At": new Date(val[1]).toLocaleDateString('en-us', { year: "numeric", month: "short", day: "numeric", hour: 'numeric', minute: 'numeric' }),
                }
            })
            console.log(Data, "======")
            setSortedTableData(Data)
        }
        return () => {

        }
    }, [data])

    return (
        <div className={styles.MyContainer}>
            <div className={`${styles.myCard}`} >
                <div className={`${styles.myCardHeader} ${styles.myPadding}`} >
                    Status History - {UNITID}
                </div>
                <div className={`${styles.myPadding} `}>
                    {isDetail == 0 ?
                        <div style={{ width: "100%" }}>
                            <DynamicDataTable
                                styles={{
                                    width: "100%"
                                }}
                                rows={sortedTableData}
                                buttons={[]}
                            />
                        </div>
                        : ''
                    }
                </div>
            </div>
        </div>
    )
}
