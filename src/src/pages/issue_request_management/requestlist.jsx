import React from 'react'
import { useState } from 'react';
import "./styles/requestlist.css"
import { AiOutlineSortAscending, AiOutlineSortDescending } from "react-icons/ai";
import { ReactComponent as SearchInputElement } from '../../assets/searchInputIcon.svg';
import { ReactComponent as ChevronDown } from '../../assets/ChevronDown.svg';
import DynamicDataTable from "@langleyfoxall/react-dynamic-data-table";




function RequestList() {

    const [sortOrder, setSortOrder] = useState("asc");
    const [sortBy, setSortBy] = useState("None");
    const [tableData, setTableData] = useState([])
    const [isDetail, setIsDetail] = useState(0);
    const [tableFilter, setTableFilter] = useState("");
    const [request, setRequest] = useState("");

    const sortMapping = {
        "None": null,
        "Request ID": "Request ID",
        "Registration Date": "Registration Date",
        "Last Action Date": "Last Action Date",
    }

    function close() {
        setIsDetail(0);
        setRequest(null)
    }

    function details(value) {
        console.log(value);
        setRequest(value);
    }

    return (
        <div className="user-list-grid">
            <div className="myWrapper myWrapper1" style={{ position: "relative", height: "100%", gridArea: "1 / 1 / 6 / 2" }}>
                {isDetail == 0 ? <div style={{ display: "flex", "flexDirection": "row", "justifyContent": "space-between" }}>
                    <h4>Issue / Request List</h4>
                    <div style={{ display: "flex", "flexDirection": "row", alignItems: "center", justifyContent: "center" }}>
                        <button className='createUserBtn' onClick={() => {
                            window.location.pathname = "/session/issuemanagement/registerrequest";
                        }}>
                            Add Request</button>
                        <div style={{ display: "flex", "flexDirection": "row", alignItems: "center", justifyContent: "center", background: "#F9FBFF", borderRadius: "10px", padding: "7.5px 15px 7.5px 0", fontSize: "0.8em" }}>
                            <SearchInputElement style={{ margin: "0 7.5px", width: "20px" }} />
                            <input type={'search'} defaultValue={tableFilter} onChange={(e) => { setTableFilter(e.target.value) }} placeholder='Search' style={{ outline: "none", background: "transparent" }} />
                        </div>
                        <div style={{ display: "flex", "flexDirection": "row", alignItems: "center", justifyContent: "center", marginLeft: "10px", background: "#F9FBFF", borderRadius: "10px", padding: "7.5px 15px 7.5px 0", fontSize: "0.8em" }}>
                            <span style={{ minWidth: "max-content", paddingInlineStart: "7.5px" }}>Sort by : &nbsp;</span>
                            <select
                                style={{ textAlign: "center", outline: "none", background: "transparent", padding: "0px", border: "none" }}
                                onChange={(e) => setSortBy(e.target.value)}>
                                {/* <option value={"Name"}>Name</option> */}
                                <option value={"None"}>None</option>
                                <option value={"Request ID"}>Request ID</option>
                                <option value={"Registration Date"}>Registration Date</option>
                                <option value={"Last Action Date"}>Last Action Date</option>
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
                {isDetail == 0 ? <DynamicDataTable className="users-table"
                    rows={tableData}
                    fieldsToExclude={["Details", "Edit"]}
                    // orderByField={sortMapping[sortBy]}
                    orderByDirection={sortOrder}
                    columnWidths={{
                        "": "50px"
                    }}
                    onClick={(event, row) => {
                        details(row["Details"])
                        // console.log(row)
                    }}
                    buttons={[]}
                    allowOrderingBy={[
                        'User ID', 'User Name', 'Role'
                    ]} />
                    :

                    {/* <UserDetail detail={request} close={close} /> */ }
                }
            </div>
        </div>
    );

}

export default RequestList