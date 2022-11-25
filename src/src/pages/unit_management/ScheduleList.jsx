import React from "react";
import DynamicDataTable from "@langleyfoxall/react-dynamic-data-table";
import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import Edit from '../../assets/editBtn.png';
import styles from './styles/ScheduleList.module.css';
import { AiOutlineSortAscending, AiOutlineSortDescending } from "react-icons/ai";
import { ReactComponent as SearchInputElement } from '../../assets/searchInputIcon.svg';
import { ReactComponent as ChevronDown } from '../../assets/ChevronDown.svg';
// import { ReactComponent as Edit } from '../../assets/editBtn.svg';
export default function ScheduleList() {

    const navigate = useNavigate()
    const [sortOrder, setSortOrder] = useState("asc");
    const [sortBy, setSortBy] = useState("None");
    const [isDetail, setIsDetail] = useState(0);
    const [tableFilter, setTableFilter] = useState("");

    const sortMapping = {
        "None": null,
        "State": "State",
        "Start Date": "Start Date",
        "End Date": "End Date",
        "AC" : "AC",
        "PC" : "PC",
        "Election Type": "Election Type",
       
    }
    const row1 = {
        'State': 'Madhya Pradesh',
        'PC': 'Bhopal',
        "AC": 'Govindpura',
        "Election Type": 'Assembly',
        "Start Date": '22-09-2021',
        "End Date": '15-10-2021',
        "Edit":
        <div className={styles.editBtn}>
            <img src={Edit} />
        </div>
        
    }
    const row2 = {
        'State': 'Madhya Pradesh',
        'PC': 'Bhopal',
        "AC": 'Govindpura',
        "Election Type": 'Assembly',
        "Start Date": '22-09-2021',
        "End Date": '15-10-2021',
        "Edit":
        <div className={styles.editBtn}>
            <img src={Edit} />
        </div>
    }
    const row3 = {
        'State': 'Madhya Pradesh',
        'PC': 'Bhopal',
        "AC": 'Govindpura',
        "Election Type": 'Assembly',
        "Start Date": '22-09-2021',
        "End Date": '15-10-2021',
        "Edit":
        <div className={styles.editBtn}>
            <img src={Edit} />
        </div>
    }
    const data = [row1, row2, row3, row2, row1, row2,row1, row2, row3, row2, row1, row2,];
    // const data1 = [row1, row2, row1];

    // const Table = [
    //     <Collapse orderId='XYZ/20' data={data} time='22-09-2021' />,
    //     <Collapse orderId='XYZ/12' data={data} time='12-12-2021' />,
    //     <Collapse orderId='XYZ/14' data={data1} time='2-05-2021' bottom={true} />
    // ]

    return (
        <div className={`${styles.myWrapper1}`} style={{ position: "relative", height: "100%" }}>
            {isDetail == 0 ? <div className='MainHeader pd-5 ' style={{ display: "flex", "flexDirection": "row", "justifyContent": "space-between", "alignItems": "center" }}>
                <h4 className='text-white'>Scheduled Election List</h4>

                <div style={{ display: "flex", "flexDirection": "row", alignItems: "center", justifyContent: "center" }}>
                    <button className='createRequestBtn' onClick={() => {
                        window.location.pathname = "/session/unitmanagement/election_scheduling";
                    }}>
                        Schedule Election
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
                            <option value={"State"}>State</option>
                            <option value={"Start Date"}>Start Date</option>
                            <option value={"End Date"}>End Date</option>
                            <option value={"AC"}>AC</option>
                            <option value={"PC"}>PC</option>
                            <option value={"Election Type"}>Election Type</option>
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
                rows={data}
                buttons={[]} 
                // onClick={(event, row) => {
                //     navigate(`/session/ordermanagement/orderdetails`)
                // }}
                
                />
                </div>
                : ''
            }
        </div>
    )
}