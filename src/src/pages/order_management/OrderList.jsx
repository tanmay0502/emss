import React, { Fragment } from "react";
import DynamicDataTable from "@langleyfoxall/react-dynamic-data-table";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'

import styles from './styles/order.module.css';
import { AiOutlineSortAscending, AiOutlineSortDescending } from "react-icons/ai";
import { ReactComponent as SearchInputElement } from '../../assets/searchInputIcon.svg';
import { ReactComponent as ChevronDown } from '../../assets/ChevronDown.svg';
import Modal from 'react-modal';

export default function OrderList() {

    const navigate = useNavigate()
    const [sortOrder, setSortOrder] = useState("asc");
    const [sortBy, setSortBy] = useState("None");
    const [isDetail, setIsDetail] = useState(0);
    const [tableFilter, setTableFilter] = useState("");
    const [photoFileName, setPhotoFileName] = useState("")
    const [photoFileData, setPhotoFileData] = useState("")
    const [flag, setflag] = useState(0);
    const [modalIsOpen, setIsOpen] = React.useState(false);

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
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        credentials: 'include',
                    }
                );
                const data2 = await response.json();
                console.log(data2)
                if (data2["status"] != 404)
                    setData(data2["data"])
            } catch (err) {
                console.log(err);
            }
        }
        getOrders();
    },[])

    const [data, setData] = useState([]);
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        if (data) {
            const tmp = [...new Set(data.map((val) => {
                if (1) {
                    return JSON.stringify({
                        'displayID': val['orderid'].split(':__')[0],
                        'type': val['type'],
                        'creatoruserid': val['creatoruserid'],
                        'orderstatus': val['orderstatus'] == 'OC' ? 'Completed' : 'Pending',
                        'timestamp': new Date(val['timestamp']).toLocaleDateString('en-us', { year: "numeric", month: "short", day: "numeric", hour: 'numeric', minute: 'numeric' }),
                        
                    })
                }
                else {
                    return null
                }
            }).filter(val => val))]

            // setTableData(tmp.map(val => JSON.parse(val)));
            let pp=tmp.map(val => JSON.parse(val));
            
            for(let i=0;i<pp.length;i++){
                pp[i]["print"]=(<button target='_blank' onClick={(e)=>{
                    e.stopPropagation(); 
                    generatePDF(pp[i]["displayID"])}} className="text-white">Show Pdf</button>);
            }
            console.log(pp);
            setTableData(pp);

        }

        return () => {

        }
    }, [data])


    // const Table = [
    //     <Collapse orderId='XYZ/20' data={data} time='22-09-2021' />,
    //     <Collapse orderId='XYZ/12' data={data} time='12-12-2021' />,
    //     <Collapse orderId='XYZ/14' data={data1} time='2-05-2021' bottom={true} />
    // ]
    // const Table = [
    //     <Collapse orderId='XYZ/20' data={data} time='22-09-2021' />,
    //     <Collapse orderId='XYZ/12' data={data} time='12-12-2021' />,
    //     <Collapse orderId='XYZ/14' data={data1} time='2-05-2021' bottom={true} />
    // ]

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
                        <input type={'search'} defaultValue={tableFilter} onChange={(e) => { setTableFilter(e.target.value) }} placeholder='Search' style={{ outline: "none", background: "transparent" }} />
                    </div>
                    <div style={{ display: "flex", "flexDirection": "row", alignItems: "center", justifyContent: "center", marginLeft: "10px", background: "#F9FBFF", borderRadius: "10px", padding: "7.5px 15px 7.5px 0", fontSize: "0.8em" }}>
                        <span style={{ minWidth: "max-content", paddingInlineStart: "7.5px" }}>Sort by : &nbsp;</span>
                        <select
                            style={{ textAlign: "center", outline: "none", background: "transparent", padding: "0px", border: "none" }}
                            onChange={(e) => setSortBy(e.target.value)}>
                            <option value={"None"}>Default</option>
                            {/* <option value={"Order ID"}>Request ID</option>
                            <option value={"Registration Date"}>Registration Date</option>
                            <option value={"Logged by"}>Logged by</option> */}
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
            {isDetail == 0 ?
                <div className={styles.Scroll}>
                    <DynamicDataTable
                        rows={tableData}
                        buttons={[]}
                        fieldMap={
                            {
                                'displayID': 'Order ID',
                                'creatoruserid': 'Creator User ID',
                                'itemquantity': 'Quantity',
                                orderstatus: 'Status',
                            }
                        }
                        fieldsToExclude={['orderID', 'manufacturer', 'item', 'itemmodel', 'referenceorderid', 'itemquantity', 'source', 'destination']}
                        fieldOrder={[
                            'displayID', 'creatoruserid', 'timestamp', 'type', 'status'
                        ]}
                        onClick={(event, row) => {
                            let passingID = "";
                            const id=row["displayID"];
                            console.log(id.lenght);
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
