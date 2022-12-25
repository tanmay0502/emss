import React from 'react'
import { useState, useEffect, useRef } from 'react';
import styles from "./styles/issuerequestchat.module.css"
import { useNavigate } from 'react-router-dom';
import ChatListItem from './components/ChatListItem';

import { ReactComponent as SearchInputIcon } from '../../assets/searchInputIcon.svg';
import defaultImage from '../../assets/issueUserImage.png'
import { ReactComponent as SearchIcon } from '../../assets/search.svg'
import { ReactComponent as AttachDocument } from '../../assets/AttachDocument.svg'
import { ReactComponent as SendMessage } from '../../assets/SendMessage.svg'
import { ReactComponent as ChevronDown } from '../../assets/ChevronDown.svg'
import ChatGroup from './components/ChatGroup';
import FileBase64 from './components/FileBase64';
import path from 'path-browserify'

function RequestList() {

    const navigate = useNavigate()

    const chatFormRef = useRef();
    const [searchFieldVal, setSearchFieldVal] = useState("")

    const [selectedissue, setSelectedissue] = useState(null)
    const [selectedSeverity, setSelectedSeverity] = useState('H')

    const [selectedIssueData, setSelectedIssueData] = useState(null)

    const [issueRequestList, setIssueRequestList] = useState([])
    const [uploadedSupportingDocuments, setUploadedSupportingDocuments] = useState([])

    const UserID = sessionStorage.getItem('sessionToken');

    let getDetailsController = new AbortController();

    useEffect(() => {
        getRequestList();

        return () => {

        }
    }, [])

    useEffect(() => {
        const elem = document.getElementsByClassName(styles.issuesList)[0]
        if (elem.children.item(0)) {
            elem.children.item(0).scrollIntoView({
                behavior: 'smooth'
            })
        }

        // setSelectedissue(null)
    }, [selectedSeverity])


    const [sortedList, setSortedList] = useState([])

    async function getRequestList() {
        setSortedList([])
        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_SERVER}/issue_requests/list_request`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: 'include',
                }
            );
            const data2 = await response.json();
            // console.log(data2)
            if (data2["status"] != 404) {
                setIssueRequestList(data2['data']);
            }

        } catch (err) {
            console.log(err);
        }
    }

    const getDetails = async () => {
        getDetailsController.abort()
        getDetailsController = new AbortController();
        
        const myId = selectedissue;
        if(myId !== null){
            try {
                const response = await fetch(
                    `${process.env.REACT_APP_API_SERVER}/issue_requests/search_request`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            "issueid": `${myId}`,
                        }),
                        credantials: 'same-origin',
                        mode: 'cors',
                        signal: getDetailsController.signal
                    }
                )
                const data = await response.json();
                // console.log(data["remarks"].reverse())
                setSelectedIssueData(data);
    
            } catch (error) {
                console.log(error);
            }
        }
    }

    useEffect(() => {
        const tmp = issueRequestList.filter((val) => {
            if(searchFieldVal !== ""){
                return val.issueid.toString().toLowerCase().includes(searchFieldVal.toLowerCase()) || val.subject.toLowerCase().includes(searchFieldVal.toLowerCase())
            }
            return val.severity === selectedSeverity
        }).sort((a,b) => {
            return new Date(a['updatedon_max_time']) - new Date(b['updatedon_max_time'])
        })

        tmp.reverse();

        setSortedList(tmp)
    
      return () => {
        
      }
    }, [issueRequestList, selectedSeverity, searchFieldVal])

    useEffect(()=>{
        if(searchFieldVal !== ""){
            
        }
    }, [searchFieldVal])
    

    useEffect(()=>{
        if(document.querySelector('.issueSelectorCheckbox:checked')) document.querySelector('.issueSelectorCheckbox:checked').checked = false;
    }, [sortedList])

    useEffect(() => {
        setSelectedIssueData(null)
        getDetails();
        return () => {

        }
    }, [selectedissue])

    useEffect(()=>{
        setChatScrollToBottom(document.getElementById('chatwindow'));
    }, [selectedIssueData])


    function setChatScrollToBottom(elem) {
        if (elem) {
            elem.scrollTop = elem.scrollHeight;
        }

        return <></>
    }
    
    const [actiontext, setActionText] = useState("New Recipient");
    const [showRemarksAndDocuments, setShowRemarksAndDocuments] = useState(true)
    const [showSecondaryInput, setShowSecondaryInput] = useState(true)

    const actionChanged = (e)=>{
        var action = e.target.value
        if(action === 'merge'){
            //Hide Remarks and Supporting Documents
            setShowRemarksAndDocuments(false)

            //Show Secondary Input
            setShowSecondaryInput(true)

            //Change placeholdertext
            setActionText("New Parent Issue ID")
        }
        else if(action === 'forward'){
            // Show Remarks and SupportingDocuments
            setShowRemarksAndDocuments(true)

            //Show Secondary Input
            setShowSecondaryInput(true)

            //Change placeholdertext
            setActionText("New Recipient")
        }
        else if(action === 'reopen' || action === 'close'){
            // Show Remarks and SupportingDocuments
            setShowRemarksAndDocuments(true)

            setShowSecondaryInput(false)
        }
    }

    const handleFileUploadChange = (e) => {
        setUploadedSupportingDocuments(e)
    }

    const raiseAPICall = async (e) => {
        e.preventDefault();
        e.nativeEvent.preventDefault();

        var selectedAPI = document.getElementById('actionSelector').value;

        var SupportingDocuments = []
        var MimeTypes = []
        var SupportingDocumentsBase64 = []

        uploadedSupportingDocuments.forEach(element => {
            SupportingDocuments.push( path.parse(element.name).name)
            MimeTypes.push(path.parse(element.name).ext.substring(1))
            SupportingDocumentsBase64.push(element.base64)
        });

        switch (selectedAPI) {
            case 'merge':
                try {
                    const response = await fetch(
                        `${process.env.REACT_APP_API_SERVER}/issue_requests/merge_issue`,
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                "mergingIssueID": selectedissue,
                                "mergingIntoIssueID": document.getElementById('secondaryInput').value
                            }),
                            credentials: 'include',
                        }
                    );
                    const data2 = await response.json();
                    // console.log(data2)
                    if (response.status !== 200) {
                        alert('Invalid Data!');
                    }
                    else{
                        document.getElementById('remarks').value = ""
                        document.getElementById('secondaryInput').value = ""
                        getDetails();
                    }
        
                } catch (err) {
                    console.log(err);
                }
                break;
            case 'forward':
                try {
                    const response = await fetch(
                        `${process.env.REACT_APP_API_SERVER}/issue_requests/forward_issue`,
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                "issueID": selectedissue,
                                "remarks": document.getElementById('remarks').value,
                                "SupportingDocuments": SupportingDocuments,
                                "MMType": MimeTypes,
                                "SupportingDocumentsData": SupportingDocumentsBase64,
                                "newrecipient": document.getElementById('secondaryInput').value
                            }),
                            credentials: 'include',
                        }
                    );
                    const data2 = await response.json();
                    // console.log(data2)
                    if (response.status !== 200) {
                        alert('Invalid Data!');
                    }
                    else{
                        document.getElementById('remarks').value = ""
                        document.getElementById('secondaryInput').value = ""
                        getDetails();
                    }
        
                } catch (err) {
                    console.log(err);
                }
                break;
            case 'reopen':
            case 'close':
                try {
                    const response = await fetch(
                        `${process.env.REACT_APP_API_SERVER}/issue_requests/${selectedAPI}_issue`,
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                "issueID": selectedissue,
                                "remarks": document.getElementById('remarks').value,
                                "SupportingDocuments": SupportingDocuments,
                                "MMType": MimeTypes,
                                "SupportingDocumentsData": SupportingDocumentsBase64,
                            }),
                            credentials: 'include',
                        }
                    );
                    const data2 = await response.json();
                    // console.log(data2)
                    if (response.status !== 200) {
                        alert('Invalid Data!');
                    }
                    else{
                        document.getElementById('remarks').value = ""
                        document.getElementById('secondaryInput').value = ""
                        getDetails();
                    }
        
                } catch (err) {
                    console.log(err);
                }
                break;
    
            default:
                break;
        }
    }

    return (
        <div className={styles.chatWrapper}>
            <div className={styles.chatList}>
                <div className={styles.searchIssueInputGroup}>
                    <SearchInputIcon />
                    <input type={"search"} placeholder={"Search For Issue"} value={searchFieldVal} onChange={(e)=> {setSearchFieldVal(e.target.value)}} />
                </div>
                <div className={styles.severityGroup}>
                    <input id='highSeverityButton' type="radio" name='Severity' value='H' defaultChecked />
                    <label htmlFor='highSeverityButton' style={{ '--bg-color': '#DF0404CC' }} onClick={() => {
                        setSelectedSeverity('H')
                    }} >High</label>
                    <input id='medSeverityButton' type="radio" name='Severity' value='M' />
                    <label htmlFor='medSeverityButton' style={{ '--bg-color': '#EEC000' }} onClick={() => {
                        setSelectedSeverity('M')
                    }} >Medium</label>
                    <input id='lowSeverityButton' type="radio" name='Severity' value='L' />
                    <label htmlFor='lowSeverityButton' style={{ '--bg-color': '#00AA00' }} onClick={() => {
                        setSelectedSeverity('L')
                    }} >Low</label>
                </div>
                <div className={styles.issuesList}>
                    {
                        sortedList.map((val) => {
                            return (
                                <ChatListItem issueID={val.issueid} subject={val.subject} setSelectedissue={setSelectedissue} updateTime={val.updatedon_max_time} />
                            )
                        })
                    }
                </div>
                <button className={styles.createIssueButton} onClick={() => {
                    navigate('/session/issuemanagement/createIssue')
                }}>

                </button>
            </div>
            <div className={styles.chatView}>
                {
                    selectedissue ?
                        <>
                            <div className={styles.chatHeader}>
                                <div className={styles.chatHeaderLeft}>
                                    <img src={defaultImage} />
                                    <div>
                                        <b>
                                            {selectedIssueData && selectedIssueData['issue'] ? selectedIssueData['issue'][0]['subject'] : "Loading..."}
                                        </b>
                                        <span>
                                            {selectedIssueData && selectedIssueData['issue'] ? "Lodged By " + selectedIssueData['issue'][0]['lodgeruserid'] : <></>}
                                        </span>
                                    </div>
                                </div>
                                {/* <div className={styles.chatHeaderRight}>
                                    <div className={styles.searchIssueInputGroup}>
                                        <SearchInputIcon />
                                        <input type={"search"} placeholder={"Search Within Issue"} />
                                    </div>
                                </div> */}
                            </div>

                            <div id="chatwindow" className={styles.chatWindow} >
                                {selectedIssueData && selectedIssueData['issue'] ? <ChatGroup data={selectedIssueData} /> :<div style={{
                                    'flex' : 1,
                                    'display': 'flex',
                                    'flexDirection': 'column',
                                    'alignItems': 'stretch',
                                    'justifyContent': 'center',
                                    'textAlign': 'center'
                                }}><b>Loading...</b></div>}
                                {
                                    // setScroll value to bottom
                                    setChatScrollToBottom()
                                }
                            </div>

                            <form className={styles.chatMessaging} ref={chatFormRef} onSubmit={(e) => {
                                e.preventDefault();
                                raiseAPICall(e);
                            }}>
                                
                                <label for="docUpload">
                                    <button className={styles.uploadDocumentsButton} title='Attach Supporting Documents' style={showRemarksAndDocuments ? {'display': 'block'} : {'display' : "none"}} >
                                        <AttachDocument />
                                        <FileBase64 domID="docUpload"
                                            multiple={ true }
                                            onDone={ handleFileUploadChange } />
                                    </button>
                                </label>
                                <div className={styles.DropDownGroup} onMouseDown={(e) => {
                                    const selectContainer = document.getElementById('actionSelector')

                                    try {
                                        selectContainer.dispatchEvent(e.nativeEvent)
                                    } catch (error) {
                                        
                                    }
                                }}>
                                    <span style={{ minWidth: 'max-content' }}>
                                        Action :&nbsp;
                                    </span>
                                    <select name="actionSelector" id="actionSelector" onChange={actionChanged}>
                                        <option value={"forward"} defaultChecked>Forward Issue</option>
                                        <option value={"merge"}>Merge Issue</option>
                                        <option value={"close"}>Close Issue</option>
                                        <option value={"reopen"}>Reopen Issue</option>
                                    </select>
                                    <ChevronDown />
                                </div>
                                <div className={styles.msgInputGroup} style={showSecondaryInput ? {'display': 'block'} : {'display' : "none"}} >
                                    <input id='secondaryInput' autoComplete={"off"} type={"text"} placeholder={actiontext} required={showSecondaryInput} />
                                </div>
                                <div className={styles.msgInputGroup} style={{'display': showRemarksAndDocuments ? 'block' : "none"}} >
                                    <input id='remarks' type={"text"} autoComplete={"off"} placeholder={"Add Remarks"} />
                                </div>
                                <button onClick={(e)=>{
                                    // e.preventDefault();
                                    // chatFormRef.current.submit();
                                    raiseAPICall();
                                }}>
                                    <SendMessage />
                                </button>
                            </form>
                        </>
                        :
                        <h3 style={{ 'textAlign': 'center' }}>
                            Select An Issue To<br />Take Action
                        </h3>
                }
            </div>
        </div>
    );

}

export default RequestList