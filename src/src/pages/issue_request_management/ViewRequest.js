import React, { useEffect, useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import styles from './styles/issue.module.css'
import Group from './Group'
import ConnnectorOne from './ConnectorOne';
import ConnectorTwo from './ConnectorTwo';
import { useNavigate } from 'react-router-dom';
import { AiOutlineArrowLeft } from 'react-icons/ai'
import Modal from 'react-modal';
import { getBase64 } from "../../assets/helper/FileHelpers";

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
  Modal.setAppElement(document.getElementById('root'));
  


export default function ViewRequest() {

    function mystring(arr){
        let ans=""
        arr.map((v)=>{
            ans=ans+v+" ";
        })

        return ans
    }


    const navigate = useNavigate()
    const [modalImage, setModalImage] = useState('')
    const [Details, setDetails] = useState({});
    const [Documents, setDocuments] = useState([]);

// for showing document
    // let subtitle;
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

    function imageName(name){
        setModalImage(name)
    }
  
//END for showing documents
     const issueId = () => {
        const URL = window.location.href;
        const arr = URL.split("/");
        const param = arr[arr.length - 1];
        const arr1 = param.split("=");
        return arr1[1];
    }

    const getDetails = async () => {
        const myId = issueId();
        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_SERVER}/issue_requests/search_request/${myId}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credantials: 'same-origin',
                    mode: 'cors'
                }
            )
            const data = await response.json();
            // console.log(data["remarks"].reverse())
            

            let connectorLength = data['remarks'].map((e, index) => {
                if (e[4] === "Y") return index !== data['remarks'].length - 1 ? <ConnectorTwo /> : <ConnnectorOne />
            })
            connectorLength = connectorLength.filter((ele) => {
                return ele !== undefined;
            })
        console.log({connectorLength});
            if (data['remarks'] != undefined && data['remarks'].length == 1 || data['remarks'].length == 0 || connectorLength.length == 1) connectorLength = '';

            data['ConnectorLength'] = connectorLength;
            setDetails(data);

        } catch (error) {
            console.log(error);
        }
    }
    // console.log(Details)
    const getDocuments = async (docName) => {
        const myId = issueId();
        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_SERVER}/issue_requests/getDocument/${myId}/${docName}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    mode: 'cors'
                }
            )
            const data = await response.json();

            // let connectorLength = data['remarks'].map((e, index) => {
            //     if (e[6] == "Y") return index != data['remarks'].length - 1 ? <ConnectorTwo /> : <ConnnectorOne />
            // })
            // connectorLength = connectorLength.filter((ele) => {
            //     return ele !== undefined;
            // })
            // console.log(connectorLength);
            // if (data['remarks'] != undefined && data['remarks'].length == 1 || data['remarks'].length == 0 || connectorLength.length == 1) connectorLength = '';

            // data['ConnectorLength'] = connectorLength;
            setDocuments(data);
            // console.log({Documents})

            
        } catch (error) {
            console.log(error);
        }
    }


    const mapSeverity = (code) => code != undefined && code == "L" ? "Low" : code == "M" ? "Medium" : "High";

    const getTime = (str) => {
        
        // const myArr = str.split("T");
        // return myArr[0] + ' / ' + myArr[1].split(".")[0];
        return str;
    }
    
    const checkAction = () => {
        const countEle = Details['remarks'].filter((val) => val[4] === "Y" && val)
        return countEle.length ? true : false;
    };

    useEffect(() => {
        getDetails();
        
    }, []);

    useEffect(() => {
      console.log(Documents)

    }, [Documents]);
    // const imageData = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFKSURBVHgB3VXtdYMwDLwR2KAegRE8QkZgg7IB3qDZIN2gI3gERmAERmhxIz3OQhSa9lfuPb3AWbZOHzHAM2JYbFrsU357s65r42K3xS74BUbZzDbtBLA+4ejwgZyjcLNwjePfLtZRwFm4Q/WRuCzcT2Uowa8UJOw5arqMJNyVOFWcJQPFO/GnA0Rnk+3BgDUTLWn0AujGF+JaOoj7UJ57WovCJ3m/eQE+UNf7lRTN8BudUGcY4E9e5az1zrQ5wEdDAhReqb8RjXMkNQ32MaFWbN8rqOrOvL/hn9ChVl2arH0YjG+DB2FVd9iOZKDAWXwvOHFdwKjunSATifBsxPaC3IBnvCfV9k9WxETcJzCjHutDJDqolKChbDL2Ve6OqQfOZEJ993iIWMt0GgF1acrzDfemtuZw9Ut4AB38j43X5D+hxdpUm1nC0+ELIayoHUrW/fUAAAAASUVORK5CYII='"

    // console.log(Documents["data"])
    let currDoc = ''
    if(Documents["data"] !== undefined){
        currDoc = currDoc + Documents["data"];
       
        // console.log("DOCUMENT"+ currDoc)
    }else{
        currDoc = "loding";
        // console.log("DOCUMENT else"+ currDoc)
    }
    // console.log("DOCUMENT else"+ currDoc)
    

    console.log({Details});
    let len = Details['remakrs'] !== undefined && Details['remarks'].length;


    const document = Details['supportingDocuments']
    console.log({document})
    // var documentID = '';
    var documentName = [];
    var actions = 0;
    var actionDocsName = [];
    var index = 0;
    var actionDocuments = {

    }

    if (document !== undefined){

        for (const [key, value] of Object.entries(document)) {
            console.log("KEY: VALUE")
            console.log(  `${key}: ${value}`);
            // documentID = documentID + `${key}`;
            // documentName = documentName + `${value}`
            console.log(value.length)
            if(index === 0){
                for(const i in value){
                    documentName.push(value[i])
                    console.log(value[i])
                }
            }else{
                if(value.length !== 0){
                    console.log(value)
                    actions = actions +1;
                    for(const i in value){
                        // actionDocsName.push(value[i])
                        console.log(value[i])
                        console.log("here")
                        actionDocuments[actions] =  value[i];
                    }
                    
                }else{
                    console.log()
                }
                
            }            

            index = index+1;
          }
          console.log(actionDocuments)

    }
    else documentName = ['No Documents Found']
    
    


    
// 
    // console.log("Document ID: " + documentID);
    // console.log("Document Name: " + documentName[0]);
    // var documentData2 = "data:" + Documents["data"].slice(5);
    // var documentData2 = Documents["data"];

    // var documentData2 = '';
    // if(documentName.slice(-3) === "png"){
    //     documentData2 = "data:image/png;base64," + Documents["data"];
    // }else if(documentName.slice(-3) === "jpg"){
    //     documentData2 = "data:image/jpeg;base64," + Documents["data"];
    // }else if(documentName.slice(-3) === "pdf"){
    //     documentData2 = "data:application/pdf;base64," + Documents["data"];
    // }
    // console.log(Details["issue"][0][2])

    return (

        <div className={styles.MyContainer}>
        
            {/* <div className={styles.PageTitle}>
                <div className={`${styles.RequestId} ${styles.myFlexBoxCenter}`} >
                    <FaEdit /> <span> Request ID : {issueId()}</span>
                </div>
                <button className={`${styles.ActionButton} ${styles.myButton}`} onClick={() => window.location.href = '/session/issuemanagement/actionIssue/id=' + issueId()}
                >Take Action</button>
            </div> */}
            <div className="PageTitle" >
                <h4>
                    <button
                        className="flex justify-center rounded-full aspect-square "
                        onClick={() => {
                            navigate('/session/issuemanagement')
                        }}
                        style={{ "background": "#84587C", color: "white" }}
                    >
                        <AiOutlineArrowLeft />
                    </button>
                    <div className={`${styles.RequestId} ${styles.myFlexBoxCenter}`} >
                        <FaEdit /> <span> Request ID : {issueId()}</span>
                    </div>
                </h4>
                <button className={`${styles.ActionButton} ${styles.myButton}`} style={{ marginBottom: "10px" }} onClick={() => window.location.href = '/session/issuemanagement/actionIssue/id=' + issueId()}
                >Take Action</button>
            </div>


            <div className={`${styles.myCard}`} >
                <div className={`${styles.myCardHeader} ${styles.myPadding}`} >
                    Subject: {Details["issue"] != undefined && Details["issue"][0][2]}
                </div>
                <div className={`${styles.myCardBody} ${styles.myPadding} `}>
                    <div className={`${styles.myFlexBox} ${styles.myFlexWrap}`} >
                        <Group LabelText='Lodger' value={Details['issue'] != undefined && Details['issue'][0][1]} />
                        <Group LabelText='Recipient' value={Details['issue'] != undefined && Details['issue'][0][7]} />
                        <Group LabelText='Date / Time' value={Details['issue'] != undefined && getTime(Details['issue'][0][9])} />
                        <Group LabelText='Severity' value={Details['issue'] != undefined && mapSeverity(Details['issue'][0][5])} />
                    </div>
                    <div className={`${styles.myFlexBox} ${styles.myFlexWrap}`}>
                        <Group LabelText='Remarks' value={Details['remarks'] != undefined && Details['remarks'].length ? Details['remarks'][0][3] : "No Remarks Added"} />
                        <Group LabelText='Status' value={Details['issue'] != undefined && Details['issue'].length ? (Details['issue'][0][6]=="A"? "Active":"Closed") : "Status not found"} />
                    </div>
                    <div className={`${styles.myFlexBox} ${styles.myFlexWrap}`}>
                        <Group LabelText='Tagged Users' value={Details['tags'] != undefined && Details['tags'].length ? (mystring(Details["tags"])) : "No tags Added"} />
                    </div>
                    <div className={`${styles.myFlexBox} ${styles.myFlexWrap}`}>
                    {/* <Group LabelText='Documents' value={Details['remarks'] != undefined && Details['remarks'].length ? Details['remarks'][0][4] : "Document not found"} /> */}
                        {/* <Group LabelText='Documents' value={""} /> */}
                        <div className='labelStyle pt-2'> Documents: </div>
                        {/* <img src={documentData2} height='200px'/> */}
                        
                        
                        {/* <div className='flex justify-start'> s </div> */}
                    </div>
                    
                    <div className='p-2 grid grid-cols-3'>
                        {documentName !== undefined && documentName.map(
                            (name) => {
                               return( <> 
                               
                               <button onClick={() => {
                                    openModal();
                                    setModalImage(name); 
                                    getDocuments(name);

                               }} className='m-4 w-60 h-9' style={{ backgroundColor: "#F56A3F", color: "white", overflow:"hidden", display : 'flex',justifyContent : 'center', alignItems : 'center' }}>{name[0].length >= 20 ? name[0].slice(0,20)+"..." : name}</button>


                                </>

                               )                                                                                       
                            }
                            
                        )}
                        
                    <div>
      {/* <button onClick={openModal}> Open Modal </button> */}
      <Modal        
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
        >
            <div id="root" className=''>
            <h4>{modalImage}</h4>
            <div className='flex justify-center items-center'>
                {/* <img className='p-10' src={currDoc} /> */}
                
                {   currDoc === "loding" ? <p className={`${styles.loader}`}></p>: <embed style={{width: "600px" ,height:"600px" , padding: "10px"}} src={`${currDoc.slice(0,-1)}`} />

                }
                {/* <img style={{width: "400px" , padding: "10px"}} src={`${currDoc}`} /> */}
                            
                

                {/* {console.log("This should be shown:" + currDoc.slice(0,-1))} */}

            </div>
            
            <button style={{  color: "white",}} onClick={closeModal}>Close</button>
            </div>
        </Modal>


    </div>


                    </div>
                </div>
            </div>


            <div className={`${styles.myCard} ${styles.mt_3}`}>
                <div className={`${styles.myCardHeader} ${styles.myPadding}`} >
                    Action
                </div>
                

                <div className={len > 3 ? `${styles.myCardBody} ${styles.myPadding} ${styles.myFlexBox} ${styles.maxHeight}` : `${styles.myCardBody} ${styles.myPadding} ${styles.myFlexBox}`} id='ActionCard'>
                    <div className={Details['ConnectorLength'] ? `${styles.connector_box} ${styles.myFlexBoxTop}` : `${styles.dNone}`}>
                        {Details['ConnectorLength']}
                        {/* {console.log(Details['ConnectorLength'])} */}
                    </div>
                    <div className={`${styles.action_box}`}>
                        {console.log({Details})}
                        {Details['remarks'] !== undefined && Details['remarks'].length && checkAction() ? Details['remarks'].map((val, index) => (
                            val[4] === "Y" && 
                           
                            <div>
                                 {/* {console.log(} */}
                                <div className={`${styles.action}`}>
                                    <div className={`${styles.myFlexBox} ${styles.myFlexWrap}`}>
                                        <Group LabelText='Done By' value={val[2]} className={`${styles.first_child}`} />
                                        <Group LabelText='Action' value={val[3]} />
                                        <Group LabelText='Date / Time' value={getTime(val[5])} />
                                        <Group LabelText='Severity' value={Details['issue'] != undefined && Details['issue'][0][5] == "L" ? "Low" : Details['issue'][0][5] == "M" ? "Medium" : "High"} class='first-child' />
                                    </div>
                                    <div className='flex justify-start mt-1'>
                                    <div  className="inline-block text-left ">
                                    <div className='labelStyle pt-2'> Documents: </div>
                                        <div className='p-2 grid grid-cols-3'>

                                            {
                                                console.log((index/2)-1)
                                            }
                                            
                                            {Object.values(actionDocuments)[(index/2)-2] !== undefined && Object.values(actionDocuments)[(index/2)-2].map(
                                                (name) => {
                                                return( <> 
                                                
                                                <button onClick={() => {
                                                        openModal();
                                                        setModalImage(name); 
                                                        getDocuments(name);

                                                }} className='w-60 h-7' style={{ backgroundColor: "#F56A3F", color: "white", overflow:"hidden", display : 'flex',justifyContent : 'center', alignItems : 'center' }}>{name[0].length >= 20 ? name[0].slice(0,20)+"..." : name}</button>


                                                    </>

                                                )                                                                                       
                                                }
                                                
                                            )}
                                            
                                        </div>

                                        
                                        <Group LabelText='Remarks' className={`${styles.remarks}`} value={Details['remarks'][index-1][3]} />
                                        
                                    </div>
                                    </div>

                                    
                                </div>{index != Details['remarks'].length - 1 ? <hr /> : ''}
                            </div>
                        )) :
                            'No data Found'}
                    </div>
                </div>
            </div>
        </div>
    )
}