import React, { useEffect, useState } from 'react'
import {FaEdit} from 'react-icons/fa'
import styles from './styles/issue.module.css'

import Group from './Group'
import ConnnectorOne from './ConnectorOne';
import ConnectorTwo from './ConnectorTwo';
import { useNavigate } from 'react-router-dom';

export default function ViewRequest(){
    const navigate = useNavigate()

    const [Details,setDetails] = useState({});

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
                `http://evm.iitbhilai.ac.in:8100/issue_requests/search_request/${myId}`,
                {
                    method: "GET",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    mode : 'cors'
                }
            )
            const data = await response.json();

            let connectorLength = data['remarks'].filter((e,index) => {
                if(e[6] == "Y") return index != data['remarks'].length - 1 ? <ConnectorTwo/> : <ConnnectorOne/>
            })

            if(data['remarks']!=undefined && data['remarks'].length == 1 || data['remarks'].length == 0 || connectorLength.length == 1) connectorLength = '';
            
            data['ConnectorLength'] = connectorLength;
            setDetails(data);
           
        } catch (error) {
            console.log(error);
        }        
    }

    const mapSeverity = (code) => code != undefined && code == "L" ? "Low" : code == "M" ? "Medium" : "High";
    
    const getTime = (str) => {
        const myArr = str.split("T");
        return myArr[0] + ' / '+ myArr[1].split(".")[0];
    }

    const checkAction = () => {
        const countEle = Details['remarks'].filter((val) => val[6] == "Y" && val)
        return countEle.length ? true : false;
    };

    useEffect(()=>{
        getDetails();
    },[]);

    console.log(Details);
   let len = Details['remakrs']!= undefined && Details['remarks'].length ;
    return (
        <div className={styles.MyContainer}>
            <div className={styles.PageTitle}>
                <div className={`${styles.RequestId} ${styles.myFlexBoxCenter}`} >
                    <FaEdit/> <span> Request ID : {issueId()}</span>
                </div>
                <button className={`${styles.ActionButton} ${styles.myButton}`} onClick={()=>navigate('/session/issuemanagement/actionIssue/id='+issueId())}>Take Action</button>
            </div>

            <div className={`${styles.myCard}`} >
                <div className={`${styles.myCardHeader} ${styles.myPadding}`} >
                    Request
                </div>
                <div className={`${styles.myCardBody} ${styles.myPadding} `}>
                    <div className={`${styles.myFlexBox} ${styles.myFlexWrap}`} >
                        <Group LabelText = 'Lodger' value = { Details['issue'] != undefined && Details['issue'][0][1]} />
                        <Group LabelText = 'Recipient' value = { Details['issue'] != undefined && Details['issue'][0][7]}/>
                        <Group LabelText = 'Date / Time' value = {Details['issue'] != undefined &&  getTime(Details['issue'][0][9])}/>
                        <Group LabelText = 'Severity' value = {Details['issue'] != undefined && mapSeverity(Details['issue'][0][5])}/>
                    </div>
                    <div className={`${styles.myFlexBox} ${styles.myFlexWrap}`}>
                        <Group  LabelText = 'Remarks'  value = {Details['remarks'] != undefined && Details['remarks'].length ? Details['remarks'][0][3] : "No Remarks Added"}/>
                    </div>
                    <div className={`${styles.myFlexBox} ${styles.myFlexWrap}`}>
                        <Group  LabelText = 'Documents' value = 'No data Found'/>
                    </div>
                </div>
            </div>
            <div className={`${styles.myCard} ${styles.mt_3}`}>
                <div className={`${styles.myCardHeader} ${styles.myPadding}`} >
                    Action
                </div>

                <div className={len > 3 ? `${styles.myCardBody} ${styles.myPadding} ${styles.myFlexBox} ${styles.maxHeight}` : `${styles.myCardBody} ${styles.myPadding} ${styles.myFlexBox}` }  id='ActionCard'>
                     <div className={Details['ConnectorLength']  ? `${styles.connector_box} ${styles.myFlexBoxTop}` : `${styles.dNone}`}>
                        {Details['ConnectorLength']}
                     </div>
                     <div className={`${styles.action_box}`}>
                         
                            {Details['remarks']!= undefined && Details['remarks'].length && checkAction() ? Details['remarks'].map((val,index) =>(
                                val[6] == "Y" &&
                                 <div>
                                      <div className={`${styles.action}`}>
                                        <div className={`${styles.myFlexBox} ${styles.myFlexWrap}`}>
                                            <Group LabelText = 'Done By' value = {val[2]} className={`${styles.first_child}`}/>
                                            <Group LabelText = 'Action' value = {val[3]} />
                                            <Group LabelText = 'Date / Time' value = {getTime(val[7])} />
                                            <Group LabelText = 'Severity' value = {Details['issue'] != undefined && Details['issue'][0][5] == "L" ? "Low" : Details['issue'][0][5] == "M" ? "Medium" : "High"} class='first-child'/>
                                        </div>
                                        <Group  LabelText = 'Remarks' className={`${styles.first_child}`} value = {Details['remarks'][index-1][3]}/>
                                 </div>{index != Details['remarks'].length - 1 ? <hr/> : ''}
                                 </div>
                            )) : 
                            'No data Found' }
                     </div>
                </div>
            </div>
        </div>
    )
}