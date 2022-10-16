import React from "react";
import './styles/order.css';
import { AiOutlineSortAscending, AiOutlineSortDescending } from "react-icons/ai";
import { ReactComponent as SearchInputElement } from '../../assets/searchInputIcon.svg';
import { ReactComponent as ChevronDown } from '../../assets/ChevronDown.svg';
import DynamicDataTable from "@langleyfoxall/react-dynamic-data-table";
import { useState } from "react";
import Collapse from "./Collapse";

export default function OrderList(){

    const [sortOrder, setSortOrder] = useState("asc");
    const [sortBy, setSortBy] = useState("None");
    const [isDetail, setIsDetail] = useState(0);
    const [tableFilter, setTableFilter] = useState("");

    const sortMapping = {
        "None": null,
        "Request ID": "Request ID",
        "Registration Date": "Registration Date",
        "Last Action Date": "Last Action Date",
    }
    const row1 = {
        "Creator User ID": 'IL00000ECI-Admin',
        "Order Status" : 'Order Generated',
        "Source": 'MH',
        "Destination" : 'CH',
        "Type" : 'ITRS',
        'Item' :<div className="item_col">
                    <span className="table_btn">50 CU</span>
                    <div className="item_details">
                        <p>Manufacturer : ECIL</p>
                        <p>Item Model : M12</p>
                        <p>Item Quantity : 8</p>
                    </div>
                </div> ,
        'Timestamp' : '22-09-2021'
    }
    const row2 = {
        "Creator User ID": 'IL00000ECI-Admin',
        "Order Status" : 'Order Generated',
        "Source": 'MH',
        "Destination" : 'CH',
        "Type" : 'ITRS',
        'Item' : <div className="item_col">
        <span className="table_btn">50 CU</span>
        <div className="item_details">
            <p>Manufacturer : ECIL</p>
            <p>Item Model : M12</p>
            <p>Item Quantity : 8</p>
        </div>
    </div>,
        'Timestamp' : '22-09-2021'
    }
    const data = [row1,row2];
    const data1 = [row1,row2,row1];

    const Table = [
        <Collapse orderId='XYZ/20' data={data} time='22-09-2021'/>,
        <Collapse orderId='XYZ/12' data={data} time='12-12-2021'/>,
        <Collapse orderId='XYZ/14' data={data1} time='2-05-2021' bottom={true}/>
    ]

    return (
         
        <div className="request-list-grid">
            <div className="mt-5 myWrapper myWrapper1" style={{ position: "relative", height: "100%", gridArea: "1 / 1 / 6 / 6" }}>
            {isDetail == 0 ? <div className='MainHeader pd-5 ' style={{ display: "flex", "flexDirection": "row", "justifyContent": "space-between", "alignItems" : "center"}}>
                <h4 className='text-white'>Order List</h4>
                <div  style={{ display: "flex", "flexDirection": "row", alignItems: "center", justifyContent: "center" }}>
                    <button className='createRequestBtn' onClick={() => {
                        window.location.pathname = "/session/ordermanagement/ordertypes";
                    }}>
                        Generate Order</button>
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
            {isDetail == 0 ? Table
                : ''
            }
        </div>
        </div>
    )
}