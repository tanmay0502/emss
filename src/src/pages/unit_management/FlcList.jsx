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
    const [sortBy, setSortBy] = useState("None");
    const [isDetail, setIsDetail] = useState(0);
    const [tableFilter, setTableFilter] = useState("");
    const [tableData, setTableData] = useState([])
    const [flc, setFlc] = useState([])
    const [flcValue, setFlcValue] = useState([])

    async function getElectionList() {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_SERVER}/unit/listFLC`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: 'include'
                }
            );
            const data = await response.json();
            console.log("Flc data",data)

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
                    // const filter = tableFilter.toLowerCase();
                    // return (elem["userid"].toLowerCase().includes(filter) || elem["name"].toLowerCase().includes(filter))
                }
            }).map((val) => {
                let st = ""
                let ed = ""
                try {
                    st = st + val['startdate'].slice(0,10)
                    ed = ed + val["enddate"].slice(0,10)
                }catch(err){
                    // st = ""
                    console.log(err)
                }

                return {
                    'Flcid': val['flcid'],
                    'District': val['district'],
                    'Manufacturer Name': val['manufacturername'],
                    "Status": val['status'],
                    "ECI Supervisor's Name": val['ecisupervisor'],
                    "No. Of Engineers": val['numengineers'],
                    "Start Date Of FLC":st,
                    "End Date Of FLC": ed,
                }
            })
            setTableData(data)

        }
        return () => {

        }
    }, [flc])



    useEffect(() => {
        getElectionList();
    }, []);



    return (
        <div className={`${styles.myWrapper1}`} style={{ position: "relative", height: "100%" }}>
            {isDetail == 0 ? <div className='MainHeader pd-5 ' style={{ display: "flex", "flexDirection": "row", "justifyContent": "space-between", "alignItems": "center" }}>
                <h4 className='text-white'>Scheduled FLC List</h4>

                <div style={{ display: "flex", "flexDirection": "row", alignItems: "center", justifyContent: "center" }}>
                    <button className='createRequestBtn' onClick={() => {
                        window.location.pathname = "/session/unitmanagement/announce_flc";
                    }}>
                        Schedule FLC
                    </button>

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
                        rows={flcValue !== undefined ? tableData : "No Data"}
                        fieldsToExclude={["Flcid"]}
                        buttons={[]}
                        onClick={(event, row) => {
                            navigate('/session/unitmanagement/editFlc/' + row["Flcid"])
                        }}
                    />
                </div>
                : ''
            }
        </div>
    )
}