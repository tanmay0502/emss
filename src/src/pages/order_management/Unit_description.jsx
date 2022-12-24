import React from "react";
import styles from './styles/orderdetails.module.css'
import { useState, useEffect } from "react";
import { ReactComponent as SearchInputIcon } from '../../assets/searchInputIcon.svg'
import { ReactComponent as ArrowLeft } from "../../assets/ArrowLeft.svg";
import { ReactComponent as ArrowRight } from "../../assets/ArrowRight.svg";
import SubOrder from "./SubOrder";
import Modal from 'react-modal';

export default function UnitDescription(props) {

    const [Length, setLength] = useState(0);
    console.log(props.Order)
    const units = [props.Order]
    const OrderID = props.OrderID
    const [photoFileName, setPhotoFileName] = useState("")
    const [photoFileData, setPhotoFileData] = useState("")
    const [flag, setflag] = useState(0);
    const [modalIsOpen, setIsOpen] = React.useState(false);

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

    function LEFT() {
        if (Length - 1 < 0) {
            if (units.length > 1)
                setLength(units.length - 2);
        }
        else {
            setLength(Length - 1);
        }
    }

    function RIGHT() {
        if (Length + 2 < units.length) {
            setLength(Length + 1)
        }
        else {
            setLength(0)
        }
    }


    return (
        <div className={styles.orderDetailsHolder}>
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
                                <button style={{ color: "white", }} onClick={()=>{ closeModal()}}>Close</button>
                            </div>
      </Modal>
            <div className={styles.orderDetailsTitle}>
                Order details
            </div>

            <div className={styles.orderDetailsIDandSearch}>
                <span><span className={styles.orderDetailsID}>Order ID: </span>{OrderID}</span>
                <button onClick={()=>generatePDF(OrderID)} className="text-white">Print Pdf</button>
                <div className={styles.orderDetailsSearch}>
                    <SearchInputIcon />
                    <input type="search" name="searchRefID" placeholder="Search By Reference ID" />
                </div>
            </div>
            {
                units.length > 1 &&
                <div className={styles.detailsContainer}>
                    <SubOrder isSubOrder={props.isSubOrder} Order={units[Length]} />
                    <SubOrder isSubOrder={props.isSubOrder} Order={units[Length + 1]} />
                </div>

            }
            {
                units.length == 1 &&
                <div className={styles.detailsContainer}>
                    <SubOrder isSubOrder={props.isSubOrder} Order={units[0]} />
                </div>
            }
            {units.length == 0 &&
                <div>Order is empty</div>
            }

            {/* <div className={styles.detailsNavigator} >
                <button onClick={LEFT}> <ArrowLeft /></button>
                <button onClick={RIGHT}><ArrowRight /></button>
            </div> */}
        </div>
    );
}