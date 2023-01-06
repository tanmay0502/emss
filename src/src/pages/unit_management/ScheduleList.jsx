import React from "react";
import DynamicDataTable from "@langleyfoxall/react-dynamic-data-table";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import styles from './styles/ScheduleList.module.css';
import { AiOutlineSortAscending, AiOutlineSortDescending } from "react-icons/ai";
import { ReactComponent as SearchInputElement } from '../../assets/searchInputIcon.svg';
import { ReactComponent as ChevronDown } from '../../assets/ChevronDown.svg';
import load from "../../loaders.module.css"
// import { ReactComponent as Edit } from '../../assets/editBtn.svg';
export default function ScheduleList() {

    const navigate = useNavigate()
    const [sortOrder, setSortOrder] = useState("asc");

    const [isDetail, setIsDetail] = useState(0);
    const [tableFilter, setTableFilter] = useState("");
    let post = sessionStorage.getItem("sessionToken").substring(8);
    const [elections, setElections] = useState([])
    const [electionList, setElectionList] = useState([])
    const [loading, setLoading] = useState(true)
    async function getElectionList() {
        setLoading(true)
        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_SERVER}/unit/listElections`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: 'same-origin',
                }
            );
            const data = await response.json();
            console.log(data)
            if(response.status===200){
                setElections(data);
                console.log(elections)
                setLoading(false)
            }
            
        } catch (err) {
            console.log({err});
        }
    }

    function makeElctionList(elections){
        let eList = []
        const electionslist=elections['data']
        console.log("in",electionslist)
        for( const i in electionslist){
            console.log("i " + i + "data: " + electionslist[i]["election_id"])
            const row = {
                'ID':electionslist[i]["election_id"],
                'State': electionslist[i]['state'],
                'PC': <div className="px-8">{electionslist[i]['pc']}</div>,
                "AC": <div className="px-8">{electionslist[i]["ac"].slice(0,3)}</div>,
                "Election Type": <div className="px-8">{electionslist[i]['electiontype']}</div>,
                "Start Date - End Date": electionslist[i]['startdate'] +" to "+ electionslist[i]['enddate'],
                // "End Date": ,
                // "Edit":
                // <div className={styles.editBtn}
                // onClick={() => {
                //     navigate(`/session/unitmanagement/edit_election/${i}`)
                // }}
                // >
                //     <img src={Edit} />
                    
                // </div>
            }  
            console.log({row})
            eList.push(row);
              
        }
        console.log({eList})
        setElectionList(eList)
    }


        // if(elections !== undefined){
        //     useEffect(() => {
        //             makeElctionList(elections);
        //     }, []);
        // }
    useEffect(() => {

          

        let timer1 = setTimeout(() => getElectionList() (), 1 * 1000);

        return () => {
          clearTimeout(timer1);
          setIsDetail(0)
        };
        
    }, []);

    useEffect(()=>{
        if(elections !== undefined){
            makeElctionList(elections);
        }
    }, [elections])


    // console.log({electionList})




    return (
        <div className={`${styles.myWrapper1}`} style={{ position: "relative", height: "100%" }}>
            {isDetail === 0 ? <div className='MainHeader pd-5 ' style={{ display: "flex", "flexDirection": "row", "justifyContent": "space-between", "alignItems": "center" }}>
                <h4 className='text-white'>Scheduled Election List</h4>

                <div style={{ display: "flex", "flexDirection": "row", alignItems: "center", justifyContent: "center" }}>
                    {post === "ADM" ? 
                    <button className='createRequestBtn' onClick={() => {
                        window.location.pathname = "/session/unitmanagement/election_scheduling";
                    }}>
                        Schedule Election
                    </button>
                    :
                    <div className="text-white pr-2"> You dont have rights to Schedule new Election </div>
                    }

                    <div style={{ display: "flex", "flexDirection": "row", alignItems: "center", justifyContent: "center", background: "#F9FBFF", borderRadius: "10px", padding: "7.5px 15px 7.5px 0", fontSize: "0.8em" }}>
                        <SearchInputElement style={{ margin: "0 7.5px", width: "20px" }} />
                        <input type={'search'} defaultValue={tableFilter} onChange={(e) => { setTableFilter(e.target.value) }} placeholder='Search' style={{ outline: "none", background: "transparent" }} />
                    </div>

                    <div style={{ display: "flex", "flexDirection": "row", alignItems: "center", justifyContent: "center", marginLeft: "10px", background: "#F9FBFF", borderRadius: "10px", padding: "7.5px 15px 7.5px 0", fontSize: "0.8em" }}>
                        <span style={{ minWidth: "max-content", paddingInlineStart: "7.5px" }}>Sort by : &nbsp;</span>
                        <select
                            style={{ textAlign: "center", outline: "none", background: "transparent", padding: "0px", border: "none" }}
                            >
                            <option value={"None"}>Default</option>
                            <option value={"State"}>State</option>
                            <option value={"Start Date"}>Start Date</option>
                            <option value={"End Date"}>End Date</option>
                            <option value={"AC"}>AC</option>
                            <option value={"Dist"}>District</option>
                            <option value={"Election Type"}>Election Type</option>
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
            {isDetail === 0 ? 
            <div class={styles.table}>
            {loading === true ? <div className={load.tableLoader}></div>:
            
            <DynamicDataTable 
                rows={
                    electionList
                }
                buttons={[]} 
                fieldsToExclude={["ID"]}
                onClick={(event, row) => {
                    if (post === "ADM"){
                        // navigate(`/session/unitmanagement/edit_election/${row["ID"]}`)
                    }else{
                        alert("You dont have rights to Edit Election")
                    }
                    
                }}
                
                />
                
                }
                </div>
                : ''


            }
        </div>
    )
}