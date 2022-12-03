import React, { useEffect, useState } from "react";
import { AiOutlineArrowLeft, AiOutlineEdit } from 'react-icons/ai'
import { useNavigate } from "react-router-dom";
import styles from './css/auditpage.module.css';
import Modal from 'react-modal';

function AuditDetail(props) {


    const UserID = sessionStorage.getItem('sessionToken');
    const [show, setShow] = useState(0)
    const [showImage, setShowImage] = useState(0)
    const [hide, setHide] = useState(0)
    const navigate = useNavigate()
    const [modalImage, setModalImage] = useState('')
    const [Details, setDetails] = useState({});
    const [Documents, setDocuments] = useState([]);
    const [modalIsOpen, setIsOpen] = React.useState(false);



    const name = ["Image"]
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

    const List = [1, 2, 2, 2, 2, 2, 2, 2, 2, 2]
    const imageData = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFKSURBVHgB3VXtdYMwDLwR2KAegRE8QkZgg7IB3qDZIN2gI3gERmAERmhxIz3OQhSa9lfuPb3AWbZOHzHAM2JYbFrsU357s65r42K3xS74BUbZzDbtBLA+4ejwgZyjcLNwjePfLtZRwFm4Q/WRuCzcT2Uowa8UJOw5arqMJNyVOFWcJQPFO/GnA0Rnk+3BgDUTLWn0AujGF+JaOoj7UJ57WovCJ3m/eQE+UNf7lRTN8BudUGcY4E9e5az1zrQ5wEdDAhReqb8RjXMkNQ32MaFWbN8rqOrOvL/hn9ChVl2arH0YjG+DB2FVd9iOZKDAWXwvOHFdwKjunSATifBsxPaC3IBnvCfV9k9WxETcJzCjHutDJDqolKChbDL2Ve6OqQfOZEJ993iIWMt0GgF1acrzDfemtuZw9Ut4AB38j43X5D+hxdpUm1nC0+ELIayoHUrW/fUAAAAASUVORK5CYII='"
    console.log(UserID, show, showImage)

    let currDoc = ''
    if (Documents["data"] !== undefined) {
        currDoc = currDoc + Documents["data"];
    } else {
        currDoc = "loding";
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        //   subtitle.style.color = '#f00';
    }

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    function imageName(name) {
        setModalImage(name)
    }
    function show_fun() {
        setShow(0);
        setShowImage(0);
        setHide(0)
    }

    function show_hide() {
        setShow(1)
        setHide(1)
    }

    function Image() {
        setShow(0);
        setShowImage(1);

    }

    return (
        <>
            <div className="flex justify-between mb-10">
                <div className="text-left text-lg font-bold mt-2 " onClick={show_hide}>Audit Details</div>
                {hide == 1 && <div className="text-left text-lg font-bold mt-2 mr-2" onClick={show_fun}>Hide Audit Details</div>}
            </div>
            {
                show == 1 && showImage == 0 &&
                <div className={styles.mainbox} >
                    {List.length > 0 &&
                        List.map((value, id) => (
                            <div className={styles.box} >
                                <div className="form_group">
                                    <div className="form_label">
                                        <label htmlFor="" className={styles.Label}>User ID:</label>
                                    </div>
                                    <div className="form_select">
                                        <span className={styles.Span}>{UserID}</span>
                                    </div>
                                </div>
                                <div className="form_group">
                                    <div className="form_label">
                                        <label htmlFor="" className={styles.Label}>Audit Time:</label>
                                    </div>
                                    <div className="form_input">
                                        <span className={styles.Span}>SSPPAAARRR</span>
                                    </div>
                                </div>
                                <div className="form_group">
                                    <div className="form_label">
                                        <label htmlFor="" className={styles.Label}>Description:</label>
                                    </div>
                                    <div className="form_select">
                                        <span className={styles.Span}>SSPPAAARRR</span>
                                    </div>
                                </div>

                                <div className="form_group">
                                    <div className="form_label">
                                        <label htmlFor="" className={styles.Label}>Image:</label>
                                    </div>
                                    <div className="form_select">
                                        <button className=' w-50 h-9 mb-2' style={{ color: "white" }} onClick={() => { openModal(); }}>{name[0].length >= 20 ? name[0].slice(0, 20) + "..." : name}</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    <div>
                        <Modal
                            isOpen={modalIsOpen}
                            // onAfterOpen={afterOpenModal}
                            onRequestClose={closeModal}
                            style={customStyles}
                            contentLabel="Example Modal"
                        >
                            <div id="root" className=''>
                                {/* <h4>{modalImage}</h4> */}
                                <h4>Image</h4>
                                <div className='flex justify-center items-center'>
                                    {/* {currDoc === "loding" ? <p className={`${styles.loader}`}></p> : <embed style={{ width: "600px", height: "600px", padding: "10px" }} src={`${currDoc.slice(0, -1)}`} />} */}
                                    {currDoc !== "loding" ? <p className={`${styles.loader}`}></p> : <embed style={{ width: "600px", height: "600px", padding: "10px" }} src={`${imageData.slice(0, -1)}`} />}
                                </div>
                                <button style={{ color: "white", }} onClick={closeModal}>Close</button>
                            </div>
                        </Modal>
                    </div>
                </div>
            }

        </>
    );
}
export default AuditDetail;

