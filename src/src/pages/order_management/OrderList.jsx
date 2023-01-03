import React, { Fragment } from "react";
import DynamicDataTable from "@langleyfoxall/react-dynamic-data-table";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'

import styles from './styles/order.module.css';
import { AiOutlineSortAscending, AiOutlineSortDescending } from "react-icons/ai";
import { ReactComponent as SearchInputElement } from '../../assets/searchInputIcon.svg';
import { ReactComponent as ChevronDown } from '../../assets/ChevronDown.svg';
import Modal from 'react-modal';
import {AiOutlineDownload} from 'react-icons/ai'
import {CSVLink, CSVDownload} from 'react-csv';

export default function OrderList() {

    const navigate = useNavigate()
    const [sortOrder, setSortOrder] = useState("asc");
    // const [sortBy, setSortBy] = useState("Default");
    const [isDetail, setIsDetail] = useState(0);
    const [tableFilter, setTableFilter] = useState("");
    const [photoFileName, setPhotoFileName] = useState("")
    const [photoFileData, setPhotoFileData] = useState("")
    const [flag, setflag] = useState(0);
    const [modalIsOpen, setIsOpen] = React.useState(false);

    const [passingOrder,setPassingOrder]  = useState({})

    function downloadPDF(pdf) {
        const linkSource = `data:application/pdf;base64,${pdf}`;
        const downloadLink = document.createElement("a");
        const fileName = "vct_illustration.pdf";
    
        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();
    }

    function openModal() {
        setIsOpen(true);

    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        //   subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    async function getcertificate(val) {
    setflag(1)
    console.log(val);
    try {
        const response = await fetch(
            `${process.env.REACT_APP_API_SERVER}/order/getOrderPdf/`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(val),
                credentials: 'include'
            }
        );
        const data = await response.json();
        console.log(data);
        if (response.status == 200) {
            setPhotoFileData(data)
        }
        else{
            alert(data.message)
          }

    } catch (err) {
        console.log({ err });
    }
    }

    if (flag == 0) {
    if (photoFileName) {
        getcertificate();
    }
    }
        function generatePDF(id){
            console.log(id)
            const t = {
                "listofOrders": [
                {
                    "orderid": id
                }
                ]
            }
            getcertificate(t);
            openModal();
        }

    const sortMapping = {
        "None": null,
        "Request ID": "Request ID",
        "Registration Date": "Registration Date",
        "Last Action Date": "Last Action Date",
    }
    const UserId = window.sessionStorage.getItem('sessionToken');
    useEffect(()=>{
        async function getOrders() {
            try {
                const response = await fetch(
                    `${process.env.REACT_APP_API_SERVER}/order/list_orders/`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        credentials: 'include',
                    }
                );
                const data2 = await response.json();
                console.log(data2)
                if (data2["status"] != 404 && data2["data"])
                    setData(data2["data"])
                    else{
                        alert(data2.message)
                      }
            } catch (err) {
                console.log(err);
            }
        }
        getOrders();
    },[])
    
    const [data, setData] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [sortedTableData, setSortedTableData] = useState([])

    useEffect(() => {
        if (data) {
            console.log("HEre");
            console.log(data);
            let subordid = [];
            let mapping = {}
            const tmp = [...new Set(data.map((val) => {
                const id = sessionStorage.getItem("sessionToken").substring(8);
                console.log("Here " + val['referenceorderid'] );
                console.log(val["referenceorderid"].split(':__').length);
                if (id!="WHM" && val["referenceorderid"].split(':__').length==1) {
                    
                    
                    return JSON.stringify({
                        'displayID': val['orderid'].split(':__')[0],
                        'type': val['type'],
                        'creatoruserid': val['creatoruserid'],
                        'orderstatus': val['orderstatus'] == 'OC' ? 'Completed' : 'Pending',
                        'timestamp': new Date(val['timestamp']).toLocaleDateString('en-us', { year: "numeric", month: "short", day: "numeric", hour: 'numeric', minute: 'numeric' }),
                    })
                }
                else if((id=="WHM" && val["referenceorderid"].split(':__').length>1)) {
                    let thiorder = val['orderid'];
                    if(!subordid.includes(val['orderid'])) {
                        subordid.push(val['orderid']);
                        data.map(function(v){
                            if(v["referenceorderid"].split(':__').length>1 && v['orderid']!=val['orderid']) {
                                if(val["referenceorderid"].split(':__')[0]===v["referenceorderid"].split(':__')[0]) {
                                    thiorder = thiorder + ',' + v['orderid'];
                                    subordid.push(v['orderid']);
                                }
                            }
                        });
                       
                        mapping[thiorder]=val["referenceorderid"].split(':__')[0]
                        console.log(mapping)
                    // setPassingOrder(pp);
                  
                        return JSON.stringify({
                            'displayID': thiorder,
                            'type': val['type'],
                            'creatoruserid': val['creatoruserid'],
                            'orderstatus': val['orderstatus'] == 'OC' ? 'Completed' : 'Pending',
                            'timestamp': new Date(val['timestamp']).toLocaleDateString('en-us', { year: "numeric", month: "short", day: "numeric", hour: 'numeric', minute: 'numeric' }),
                        })
                    }
                    
                }
                else {
                    return null
                }
            }).filter(val => val))]
            console.log(mapping)
            setPassingOrder(mapping)

            let pp=tmp.map(val => JSON.parse(val));
            
            for(let i=0;i<pp.length;i++){
                pp[i]["print"]=(<button key={i} target='_blank' onClick={(e)=>{
                    e.stopPropagation(); 
                    generatePDF(pp[i]["displayID"])}} className="text-white">Show Pdf</button>);
            }
            console.log("Print PP", pp);
            setTableData(pp);
            setSortedTableData(pp)
        }

        return () => {

        }
    }, [data])


    const [update, setUpdate] = useState(0);
    const sortTableData = (sortBy, reverse=false)=>{
        const sorted = tableData.sort((a,b)=>{
            if (sortBy === "Type") {
                return b.type > a.type;
            }
            if (sortBy === "OrderID") {
                return b.displayID > a.displayID;
            }
            if (sortBy === "Time") {
                return b.timestamp > a.timestamp;
            }
            if (sortBy === "CreatorID") {
                return b.creatoruserid > a.creatoruserid;
            }
            if (sortBy === "Status") {
                return b.status > a.status;
            }
            return false;
        })
        if (sortBy === "Reverse") {
            sorted.reverse();
        }
        if (sortBy === "Default") {
            setSortedTableData(tableData);
        } else {
            for(let i=0;i<sorted.length;i++){
                sorted[i]["print"]=(<button key={i} target='_blank' onClick={(e)=>{
                    e.stopPropagation(); 
                    generatePDF(sortedTableData[i]["displayID"])}} className="text-white">Show Pdf</button>);
            }
            setSortedTableData(sorted);
        }
        // alert("Sort by "+ sortBy)
        // console.log("sorted table data", sortedTableData)
        setUpdate(prev=>(prev+1)%10)
    }

    const filterTableData = (key)=>{
        console.log(key)
        const sorted = tableData.filter((e)=>{
            return e.type.includes(key) || e.displayID.includes(key) || e.timestamp.includes(key) || e.creatoruserid.includes(key);
        })
        if (key) {
            setSortedTableData(sorted);
        }else{
            setSortedTableData(tableData);
        }
        console.log("filtered table data", sortedTableData)
        // alert("Sort by "+ key)
        console.log("sorted table data", sortedTableData)
        setUpdate(prev=>(prev+1)%10)
    }

    useEffect(()=>{

    }, [update])


    return (
        <>
        <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
        >
            <div id="root" className=''>
                <div className='flex justify-center items-center'>
                    {console.log("This Data:")}
                    {/* {console.log(photoFileData["data"].slice(0,-1))} */}
                    {/* {console.log(fileData)} */}
                    {console.log("Fetched Data:- ",photoFileData)}
                    {/* {<embed style={{ width: "600px", height: "600px", padding: "10px" }} src={fileData} />} */}
                    {photoFileData !== undefined && <embed type="text/html" style={{ width: "1000px", height: "800px", padding: "10px" }} src={photoFileData} />}
                </div>
                <button style={{ color: "white", }} onClick={()=>{closeModal()}}>Close</button>
            </div>
      </Modal>
         <div className={`${styles.myWrapper1}`} style={{ position: "relative", height: "100%" }}>
            {isDetail == 0 ? <div className='MainHeader pd-5 ' style={{ display: "flex", "flexDirection": "row", "justifyContent": "space-between", "alignItems": "center" }}>
                <h4 className='text-white'>Order List</h4>
                <div style={{ display: "flex", "flexDirection": "row", alignItems: "center", justifyContent: "center" }}>
                    <button className='createRequestBtn' onClick={() => {
                        window.location.pathname = "/session/ordermanagement/ordertypes";
                    }}>
                        Generate Order</button>
                    <div style={{ display: "flex", "flexDirection": "row", alignItems: "center", justifyContent: "center", background: "#F9FBFF", borderRadius: "10px", padding: "7.5px 15px 7.5px 0", fontSize: "0.8em" }}>
                        <SearchInputElement style={{ margin: "0 7.5px", width: "20px" }} />
                        <input type={'search'} defaultValue={tableFilter} onChange={(e) => { setTableFilter(e.target.value); filterTableData(e.target.value) }} placeholder='Search' style={{ outline: "none", background: "transparent" }} />
                    </div>
                    <div style={{ display: "flex", "flexDirection": "row", alignItems: "center", justifyContent: "center", marginLeft: "10px", background: "#F9FBFF", borderRadius: "10px", padding: "7.5px 15px 7.5px 0", fontSize: "0.8em" }}>
                        <span style={{ minWidth: "max-content", paddingInlineStart: "7.5px" }}>Sort by : &nbsp;</span>
                        <select
                            style={{ textAlign: "center", outline: "none", background: "transparent", padding: "0px", border: "none" }}
                            onChange={(e) => sortTableData(e.target.value)}>
                            <option value={"Default"}>Default</option>
                            <option value={"OrderID"}>OrderID</option>
                            <option value={"Time"}>Time</option>
                            <option value={"Type"}>Type</option>
                        </select>
                        <ChevronDown />
                        <button className='sortOrderButton' onClick={() => {
                            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
                            sortTableData("Reverse");
                        }}>
                            {sortOrder === 'asc' ? <AiOutlineSortAscending /> : <AiOutlineSortDescending />}
                        </button>
                    </div>
                        <CSVLink filename="OrderList.csv" data={data}><div className="text-white text-lg m-2 py-1 px-2" title="Export To CSV"><AiOutlineDownload/></div></CSVLink>
                </div>
            </div> : <></>}
            {isDetail == 0 ?
                <div className={styles.Scroll}>
                    
                    <DynamicDataTable
                        rows={sortedTableData}
                        buttons={[]}
                        fieldMap={
                            {
                                'displayID': (<div onClick={()=>{sortTableData("OrderID")}} className="flex cursor-pointer justify-center">Order ID</div>),
                                'creatoruserid': (<div onClick={()=>{sortTableData("CreatorID")}} className="flex cursor-pointer justify-center">Creator User ID</div>),
                                'itemquantity': 'Quantity',
                                'timestamp' : (<div onClick={()=>{sortTableData("Time")}} className="flex cursor-pointer justify-center">Time</div>),
                                'type' : ((<div onClick={()=>{sortTableData("Type")}} className="flex cursor-pointer justify-center">Type</div>)),
                                orderstatus: (<div onClick={()=>{sortTableData("Status")}} className="flex cursor-pointer justify-center">Status</div>),
                            }
                        }
                        headers={false}
                        fieldsToExclude={['orderID', 'manufacturer', 'item', 'itemmodel', 'referenceorderid', 'itemquantity', 'source', 'destination']}
                        fieldOrder={[
                            'displayID', 'creatoruserid', 'timestamp', 'type', 'status'
                        ]}
                        onClick={(event, row) => {
                            let passingID = "";
                            let id;
                            console.log(Object.keys(passingOrder).length)
                            console.log(row["displayID"])

                            if(Object.keys(passingOrder).length!=0){
                                console.log("heh")
                                id=passingOrder[row["displayID"]]
                            }
                            else{
                                id=row["displayID"]
                            }
                            console.log(id);
                            for(let i=0;i<id.length;i++){
                                // console.log(id[i])
                                if(id[i]=='/'){
                                    passingID+='-';
                                }
                                else{
                                    passingID+=id[i];
                                }
                            }
                            console.log(passingID)
                            if(Object.keys(passingOrder).length!=0)
                            navigate("/session/ordermanagement/orderdetails/" + passingID + "," +row["displayID"])

                            else
                            navigate("/session/ordermanagement/orderdetails/" + passingID)

                        }}
                    />
                </div>
                : ''
            }
        </div>
        </>
    )
}
