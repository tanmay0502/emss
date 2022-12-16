import React, { useEffect, useState } from "react";
import { AiOutlineArrowLeft, AiOutlineEdit } from 'react-icons/ai'
import { useNavigate } from "react-router-dom";
import styles from './css/auditpage.module.css';
import Modal from 'react-modal';
import { ReactComponent as File_icon } from "../../assets/file_icon.svg";
// import { Tooltip as ReactTooltip } from 'react-tooltip'
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

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
    const [list,setList] = useState([])
    console.log(props.id)
    async function getAudit() {

        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_SERVER}/warehouse/getWarehouseAudit/${props.id}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: 'include',
                    mode: "cors"
                }
            );
            const data = await response.json();
            console.log(data)
            if (response.status == 200) {
                setList(data["data"]);
            }

        } catch (err) {
            console.log({ err });
        }
    }

    useEffect(() => {
        getAudit();
    }, []);
    console.log({list})
    function issueId(){
        return(props.id)
    }
    const getDocuments = async (docName) => {
        const myId = issueId();
        console.log("Document Details:")
        console.log(issueId())
        console.log({docName})

        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_SERVER}/warehouse/getAuditImage/${myId}/${docName}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    mode: 'cors'
                }
            )
            const data = await response.json();
            if(data["message"] === "Image not found"){
                // console.log("Not Found")
                // setDocuments("blank");
                // alert(Documents["data"])
                // console.log(Documents["data"])
            }else{
                setDocuments(data);
            }
            
            console.log(data)
            // console.log(Documents["data"])

            
        } catch (error) {

            console.log({error});
        }
    }



    const List = [1, 2, 2, 2, 2, 2, 2, 2, 2, 2]
    const imageData = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFKSURBVHgB3VXtdYMwDLwR2KAegRE8QkZgg7IB3qDZIN2gI3gERmAERmhxIz3OQhSa9lfuPb3AWbZOHzHAM2JYbFrsU357s65r42K3xS74BUbZzDbtBLA+4ejwgZyjcLNwjePfLtZRwFm4Q/WRuCzcT2Uowa8UJOw5arqMJNyVOFWcJQPFO/GnA0Rnk+3BgDUTLWn0AujGF+JaOoj7UJ57WovCJ3m/eQE+UNf7lRTN8BudUGcY4E9e5az1zrQ5wEdDAhReqb8RjXMkNQ32MaFWbN8rqOrOvL/hn9ChVl2arH0YjG+DB2FVd9iOZKDAWXwvOHFdwKjunSATifBsxPaC3IBnvCfV9k9WxETcJzCjHutDJDqolKChbDL2Ve6OqQfOZEJ993iIWMt0GgF1acrzDfemtuZw9Ut4AB38j43X5D+hxdpUm1nC0+ELIayoHUrW/fUAAAAASUVORK5CYII='"
    console.log(UserID, show, showImage)

    // let currDoc = ''
    // if (Documents["data"] !== undefined){
    //     currDoc = currDoc + Documents["data"];
    // } else {
    //     currDoc = "loding";
    // }
    const [currDoc, setCurrDoc] = useState("loding")
    useEffect(() => {
        try{

        // if(Documents["data"] === undefined){
        //     setCurrDoc("blank")
        // }else{
            setCurrDoc(Documents["data"].slice(0,-1))
            console.log(currDoc)
        // }/\



                    
    }catch(err){
        // setCurrDoc("blank")
    }
    }, [Documents]);
    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        //   subtitle.style.color = '#f00';
    }

    function openModal(props) {
        console.log("Getting Document")
        console.log("Opening")
        getDocuments(props);
        imageName(props)
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
            {hide !== 1 &&<div className="text-left text-md font-bold mt-2 hover:cursor-pointer bg-transparent hover:bg-orange-500 text-orange-500 font-semibold hover:text-white py-2 px-4 border border-orange-500 hover:border-transparent rounded" onClick={show_hide}>Audit Details</div>
                }
             {hide == 1 && <div className="text-left text-md font-bold mt-2 mr-2 hover:cursor-pointer bg-transparent hover:bg-orange-500 text-orange-500 font-semibold hover:text-white py-2 px-4 border border-orange-500 hover:border-transparent rounded" onClick={show_fun}>Hide Audit Details</div>}
            </div>
            {
                show == 1 && showImage == 0 &&
                <div className={styles.mainbox} >
                    {list.length > 0 &&
                        list.map((value, id) => (
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
                                    <Tippy content={value[2]}>
                                    <div className={styles.fileIcon} 
                                    // 'hover:cursor-pointer scale-50 form_select '
                                    onClick={() => { openModal(value[2]);
                                        // setModalImage(value[2]); 
                                        // console.log("Getting Document")
                                        // getDocuments(value[2]);
                                    }}
                                    ><File_icon /> </div>
                                    </Tippy>
                                     </div>
                                    {/* <div className="form_select">
                                        <button className=' w-50 h-9 mb-2' style={{ color: "white" }} onClick={() => { openModal(value[2]);
                                                // setModalImage(value[2]); 
                                                // console.log("Getting Document")
                                                // getDocuments(value[2]);
                                            }}
                                        
                                        >
                                            {value[2]}</button>
                                    </div> */}
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
                                <h4>{modalImage}</h4>
                                <div className='flex justify-center items-center'>
                                    {/* {currDoc === "loding" ? <p className={`${styles.loader}`}></p> : <embed style={{ width: "600px", height: "600px", padding: "10px" }} src={`${currDoc.slice(0, -1)}`} />} */}
                                    {/* {console.log(currDoc)} */}
                                    {currDoc === "loding" ? <p className={`${styles.loader}`}></p> : <embed style={{ width: "600px", height: "600px", padding: "10px" }} src={currDoc} />}
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

