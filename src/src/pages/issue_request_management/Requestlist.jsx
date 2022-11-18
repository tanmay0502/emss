import React from 'react'
import { useState, useEffect } from 'react';
import "./styles/requestlist.css"
import { AiOutlineSortAscending, AiOutlineSortDescending } from "react-icons/ai";
import { ReactComponent as SearchInputElement } from '../../assets/searchInputIcon.svg';
import { ReactComponent as ChevronDown } from '../../assets/ChevronDown.svg';
import DynamicDataTable from "@langleyfoxall/react-dynamic-data-table";
// import UserImageTest from '../../assets/UserImageTest.png'
import { useNavigate } from 'react-router-dom';
import { FaUserEdit } from "react-icons/fa";
import SeverityButton from './SeverityButton'
import UserImageTest from '../../assets/UserImageTest.png'

function RequestList() {

    const navigate = useNavigate()

    const [sortOrder, setSortOrder] = useState("asc");
    const [sortBy, setSortBy] = useState("None");
    const [tableData, setTableData] = useState([])
    const [isDetail, setIsDetail] = useState(0);
    const [tableFilter, setTableFilter] = useState("");
    const [request, setRequest] = useState([]);
    const [user, setUser] = useState();

    const sortMapping = {
        "None": null,
        "Request ID": "Request ID",
        "Registration Date": "Registration Date",
        "Last Action Date": "Last Action Date",
    }

    useEffect(() => {
        if (user) {
            setIsDetail(1);
        }
    }, [user]);

    function details(value) {
        setUser(value);
    }

    function close() {
        setIsDetail(0);
        setUser(null)
    }

    const UserID = sessionStorage.getItem('sessionToken');
    async function getrequestlist() {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_SERVER}/issue_requests/list_request/${UserID}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: 'same-origin',
                    mode: "cors"
                }
            );
            const data2 = await response.json();
            setRequest(data2['data']);

        } catch (err) {
            console.log(err);
        }
    }

    const Tagged = (type) =>  UserID === type ? "Recipient" : "Tagged"; 

    var reverseK = Object.keys(request).reverse();
    var reverseV = Object.values(request).reverse();

    var reverse = []
    
    var i = 0;
    while(i<reverseV.length){
        reverse[i] = reverseV[i]

        i = i +1;
    }
    // const reverselist = request 
    console.log(reverse)
    console.log(request)
    
    async function renderremarkslist() {
        var data = reverse.filter((elem) => {
            if (tableFilter === "") {
                return true;
            }
            else {
                const filter = tableFilter.toLowerCase();
                return (elem[0].toLowerCase().includes(filter) || elem[2].toLowerCase().includes(filter))
            }
        }).map((val) => {
            console.log(val);
            return {
                "Request ID": val['issueid'],
                "Logged by": <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", paddingRight: "15px" }}><img src={UserImageTest} /><span style={{'marginLeft' : "15px"}}>{val['lodgeruserid']}</span></div>,
                "Registration Date": val['createdon'].split('T')[0],
                "Severity" :  <SeverityButton userID={val['issueid']} severity = {val['severity']} 
				customLabels={{
					"active": "Low",
					"inactive": "Medium"
				}}/>,
                "Subject": val['subject'],
                "Tagged/Recipient" : Tagged(val['recipientuserid']),
                "Details" : val
            }
        })
        data.sort(function (a, b) {
            if (sortMapping[sortBy] !== null) {
                return a[sortMapping[sortBy]].localeCompare(b[sortMapping[sortBy]])
            }
            else return 0;
        });
        if (sortMapping[sortBy] !== null && sortOrder === 'desc') {
            data.reverse();
        }
        setTableData(data)
        return () => {
        }
    }

    useEffect(() => {
        getrequestlist();
    }, []);

    useEffect(() => {
        renderremarkslist();
    }, [request, tableFilter, sortBy, sortOrder]);
    
    return (
        <div style={{height: "100%"}}>
            <div className="" style={{ background: "white", position: "relative", height: "100%", gridArea: "1 / 1 / 6 / 6", borderRadius: "20px" }}>
                {isDetail == 0 ? <div className='MainHeader pd-5 ' style={{ display: "flex", "flexDirection": "row", "justifyContent": "space-between", "alignItems" : "center"}}>
                    <h4 className='text-white'>Issue / Request List</h4>
                    <div  style={{ display: "flex", "flexDirection": "row", alignItems: "center", justifyContent: "center" }}>
                        <button className='createRequestBtn' onClick={() => {
                            navigate("/session/issuemanagement/createIssue");
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
                                <option value={"None"}>Default</option>
                                <option value={"Request ID"}>Request ID</option>
                                <option value={"Registration Date"}>Registration Date</option>
                                <option value={"Logged by"}>Logged by</option>
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
                {isDetail == 0 ? <DynamicDataTable className="request-table"
                    rows={tableData}
                    fieldsToExclude={["Details", "Edit"]}
                    orderByField={sortMapping[sortBy]}
                    orderByDirection={sortOrder}
                    onClick={(event, row) => {
                        navigate(`/session/issuemanagement/viewRequest/id=${row.Details.issueid}`);
                    }}
                    buttons={[]}
                    allowOrderingBy={[
                        'Request ID', 'Registration Date'
                    ]} />
                    : ''
                }
            </div>
        </div>
    );

}

export default RequestList