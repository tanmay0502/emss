import React from "react";
import DynamicDataTable from "@langleyfoxall/react-dynamic-data-table";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import Edit from '../../assets/editBtn.png';
import styles from './styles/ScheduleCDPList.module.css';
import { AiOutlineSortAscending, AiOutlineSortDescending } from "react-icons/ai";
import { ReactComponent as SearchInputElement } from '../../assets/searchInputIcon.svg';
import { ReactComponent as ChevronDown } from '../../assets/ChevronDown.svg';


export default function Schedule_List_CDP() {

    const navigate = useNavigate()
    const [sortOrder, setSortOrder] = useState("asc");
    const [sortBy, setSortBy] = useState("None");
    const [isDetail, setIsDetail] = useState(0);
    const [tableFilter, setTableFilter] = useState("");
    const [CDPList, setCDPList] = useState([]);

    async function List_Of_CDP() {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_SERVER}/unit/listCDP`,
                {
                    method: "GET",
                    credentials: 'same-origin',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    mode: "cors"
                }
            );
            const CDP = await response.json();
            setCDPList(CDP);
            console.log(CDP)
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        List_Of_CDP();
    }, []);


    return (
        <div className={`${styles.myWrapper1}`} style={{ position: "relative", height: "100%" }}>
            {isDetail == 0 ? <div className='MainHeader pd-5 ' style={{ display: "flex", "flexDirection": "row", "justifyContent": "space-between", "alignItems": "center" }}>
                <h4 className='text-white'>Schedule CDP List</h4>

                <div style={{ display: "flex", "flexDirection": "row", alignItems: "center", justifyContent: "center" }}>
                    <button className='createRequestBtn' onClick={() => {
                        window.location.pathname = "/session/unitmanagement/ScheduleCDP";
                    }}>
                        Schedule CDP
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
                            <option value={"CDP Incharge"}>CDP Incharge</option>
                            <option value={"Process"}>Process</option>
                            <option value={"Unit Quantity"}>Unit Quantity</option>
                            <option value={"Unit Type"}>Unit Type</option>
                            <option value={"No. of engineers"}>No. of engineers</option>
                            <option value={"Manufacturer"}>Manufacturer</option>
                            <option value={"Start Date of FLC"}>Start Date of FLC</option>
                            <option value={"End Date of FLC"}>End Date of FLC</option>
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
                    {/* <DynamicDataTable rows={CDP_List} buttons={[]} /> */}
                    <table >
                        <thead >
                            <tr>
                                <th style={{ color: "#f56a3f", padding: "20px" }}>ID</th>
                                <th style={{ color: "#f56a3f", padding: "20px" }}>CDP Incharge</th>
                                <th style={{ color: "#f56a3f", padding: "20px" }}>Process</th>
                                <th style={{ color: "#f56a3f", padding: "20px" }}>Unit Quantity</th>
                                <th style={{ color: "#f56a3f", padding: "20px" }}>Unit Type</th>
                                <th style={{ color: "#f56a3f", padding: "20px" }}>No. of engineers</th>
                                <th style={{ color: "#f56a3f", padding: "20px" }}>Manufacturer</th>
                                <th style={{ color: "#f56a3f", padding: "20px" }}>Start Date of FLC</th>
                                <th style={{ color: "#f56a3f", padding: "20px" }}>End Date of FLC</th>
                            </tr>
                        </thead>
                        {CDPList != [] && CDPList.length > 0 &&
                            CDPList.map((val, id) => {
                                return (
                                    <tbody >
                                        <tr onClick={(event, row) => {
                                            navigate("/session/unitmanagement/ScheduleCDP_edit/" + val["id"])
                                        }}>
                                            <td className="text-black text-sm">{val['id']}</td>
                                            <td className="text-black text-sm">{val['cdpincharge']}</td>
                                            <td className="text-black text-sm">{val['process']}</td>
                                            <td className="text-black text-sm">{val['unitqnty']}</td>
                                            <td className="text-black text-sm">{val['unittype']}</td>
                                            <td className="text-black text-sm">{val['numengineers']}</td>
                                            <td className="text-black text-sm">{val['manufacturer']}</td>
                                            <td className="text-black text-sm">{val['startdate'].split('T')[0]}</td>
                                            <td className="text-black text-sm">{val['enddate'].split('T')[0]}</td>
                                        </tr>
                                    </tbody>
                                )
                            })}
                    </table>
                </div> : ''
            }
        </div >
    )
}