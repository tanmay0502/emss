import React from "react";
import DynamicDataTable from "@langleyfoxall/react-dynamic-data-table";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import styles from './styles/TnaList.module.css';
import { AiOutlineSortAscending, AiOutlineSortDescending } from "react-icons/ai";
import { ReactComponent as SearchInputElement } from '../../assets/searchInputIcon.svg';
import { ReactComponent as ChevronDown } from '../../assets/ChevronDown.svg';

export default function FLCList() {

    const navigate = useNavigate()
    const [sortOrder, setSortOrder] = useState("asc");
    const [setSortBy] = useState("None");
    const [isDetail] = useState(0);
    const [tableFilter, setTableFilter] = useState("");
    const [tableData, setTableData] = useState([])
    const [flc, setFlc] = useState([])
    const [IsLoading, setIsLoading] = useState(0);

    async function getElectionList() {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_SERVER}/unit/listFLC`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: 'include'
                }
            );
            const data = await response.json();
            console.log(data, "listFLC")
            if (data.length) {
                setFlc(data)
            }
        } catch (err) {
            console.log({ err });
        }
    }


    useEffect(() => {
        if (flc) {
            var data = flc.filter((elem) => {
                if (tableFilter === "") {
                    return true;
                }
                else {
                    return false;
                    // const filter = tableFilter.toLowerCase();
                    // return (elem["userid"].toLowerCase().includes(filter) || elem["name"].toLowerCase().includes(filter))
                }
            }).map((val) => {
                // let st = ""
                // let ed = ""
                try {
                    // st = st + val['startdate'].slice(0, 10)
                    // ed = ed + val["enddate"].slice(0, 10)
                } catch (err) {
                    // st = ""
                    console.log(err)
                }

                return {
                    'FLC ID': val['flcid'],
                    'Manufacturer': val['manufacturer'],
                    'District': val['district'],
                    'Election Type': ((val['electiontype'] === 'GA') ? "General Assembly" : (val['electiontype'] === 'GP') ? 'General Parliment' : (val['electiontype'] === 'BA') ? 'By-Poll Assembly' : 'By-Poll Parliment'),
                    "FLC Period": (val['startdate'] && val['enddate']) ? val['startdate'].split('T')[0] + " - " + val['enddate'].split('T')[0] : ""

                }
            })
            setTableData(data)

        }
        return () => {

        }
    }, [flc, tableFilter])


    useEffect(
        () => {

            setIsLoading(1);

            let timer1 = setTimeout(() => getElectionList(), 1 * 1000);

            return () => {
                clearTimeout(timer1);
            };
        },
        [setIsLoading]
    );





    return (
        <div className={`${styles.myWrapper1}`} style={{ position: "relative", height: "100%" }}>
            {isDetail === 0 ? <div className='MainHeader pd-5 ' style={{ display: "flex", "flexDirection": "row", "justifyContent": "space-between", "alignItems": "center" }}>
                <h4 className='text-white'>Scheduled FLC List</h4>

                <div style={{ display: "flex", "flexDirection": "row", alignItems: "center", justifyContent: "center" }}>

                    {sessionStorage.getItem("sessionToken").substring(8) === "CEO" &&
                        <button className='createRequestBtn' onClick={() => {
                            window.location.pathname = "/session/unitmanagement/announce_flc";
                        }}>
                            Schedule FLC
                        </button>
                    }
                    {sessionStorage.getItem("sessionToken").substring(8) === "DEO" &&
                        <button className='createRequestBtn' onClick={() => {
                            window.location.pathname = "/session/unitmanagement/preparednesscertificate";
                        }}>
                            Upload Preparedness Certitificate
                        </button>
                    }

                    <div style={{ display: "flex", "flexDirection": "row", alignItems: "center", justifyContent: "center", background: "#F9FBFF", borderRadius: "10px", padding: "7.5px 15px 7.5px 0", fontSize: "0.8em" }}>
                        <SearchInputElement style={{ margin: "0 7.5px", width: "20px" }} />
                        <input type={'search'} defaultValue={tableFilter} onChange={(e) => { setTableFilter(e.target.value) }} placeholder='Search' style={{ outline: "none", background: "transparent" }} />
                    </div>

                    <div style={{ display: "flex", "flexDirection": "row", alignItems: "center", justifyContent: "center", marginLeft: "10px", background: "#F9FBFF", borderRadius: "10px", padding: "7.5px 15px 7.5px 0", fontSize: "0.8em" }}>
                        <span style={{ minWidth: "max-content", paddingInlineStart: "7.5px" }}>Sort by : &nbsp;</span>
                        <select
                            style={{ textAlign: "center", outline: "none", background: "transparent", padding: "0px", border: "none" }}
                            onChange={(e) => setSortBy(e.target.value)}>
                            <option value={"None"}>Default</option>
                            <option value={"Strong Room"}>Strong Room</option>
                            <option value={"Num Awareness Unit"}>Num Awareness Unit</option>
                            <option value={"Unit Type"}>Unit Type</option>
                            <option value={"Timestamp"}>Timestamp</option>
                        </select>
                        <ChevronDown />

                        <button className='sortOrderButton' onClick={() => {
                            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
                        }}>
                            {sortOrder === 'asc' ? <AiOutlineSortAscending /> : <AiOutlineSortDescending />}
                        </button>
                    </div>
                </div>
            </div> : <></>}
            {isDetail === 0 ?
                <div class={styles.table}>
                    <DynamicDataTable
                        rows={tableData.length !== 0 ? tableData : [{ "": "No FLC scheduled" }]}
                        fieldsToExclude={["FLC ID"]}
                        buttons={[]}
                        onClick={(event, row) => {
                            navigate('/session/unitmanagement/editFlc/' + row["FLC ID"])
                        }}
                    />
                </div>
                : <div className={styles.ListLoader}></div>
            }
        </div>
    )
}