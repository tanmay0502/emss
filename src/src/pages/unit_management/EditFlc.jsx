import React, { useState, useEffect } from 'react'
import EditFlc_Ceo_Manufacturer from './EditFlc_Ceo_Manufacturer'
import EditFlc_Ceo from './EditFlc_Ceo'

function FlcEdit() {
    const URL = window.location.href;
    const arr = URL.split("/");
    const param = arr[arr.length - 1];
    const [flc, setFlc] = useState([]);
    // const arr1 = param.split("=");

    const User_ID = sessionStorage.getItem("sessionToken");
    const Role = User_ID.substring(8)
    const Status = flc['status'];
    // upload pending

    async function getFLC() {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_SERVER}/unit/viewFLC/${param}`,
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
            console.log(data, "data")
            if (response.status == 200) {
                setFlc(data['flc'][0]);
            }

        } catch (err) {
            console.log({ err });
        }
    }

    useEffect(() => {
        getFLC();
    }, []);



    return (
        <>
            {Role == "CEO" && Status == "scheduled" &&
                <div>
                    <EditFlc_Ceo_Manufacturer ID={param} />
                </div>
            }

            {
                Role == "CEO" && Status == "schedule pending" &&
                <div>
                    <EditFlc_Ceo ID={param} Status={Status} />
                </div>
            }

            {
                Role == "CEO" && Status == "upload pending" &&
                <div>
                    <EditFlc_Ceo ID={param} Status={Status} />
                </div>
            }
        </>
    )


}

export default FlcEdit