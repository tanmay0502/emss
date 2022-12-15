import React from "react";
import DynamicDataTable from "@langleyfoxall/react-dynamic-data-table";
import { useState,useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import Edit from '../../assets/editBtn.png';
import styles from './styles/TnaList.module.css';
import { AiOutlineSortAscending, AiOutlineSortDescending } from "react-icons/ai";
import { ReactComponent as SearchInputElement } from '../../assets/searchInputIcon.svg';
import { ReactComponent as ChevronDown } from '../../assets/ChevronDown.svg';
// import { ReactComponent as Edit } from '../../assets/editBtn.svg';
export default function ScheduleList() {

    const navigate = useNavigate()
    const [sortOrder, setSortOrder] = useState("asc");
    const [sortBy, setSortBy] = useState("None");
    const [isDetail, setIsDetail] = useState(0);
    const [tableFilter, setTableFilter] = useState("");
    const [tnaList, setTnaList] = useState([]);
    const [tna, setTna] = useState([]);
    async function getTnaList() {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_SERVER}/unit/listTNA`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: 'same-origin',
                    mode: "cors"
                }
            );
            const data = await response.json();
            console.log(data['data'])
            if(data["data"]!=404){
                setTnaList(data);       
            }
            
        } catch (err) {
            console.log({err});
        }
    }
    
    useEffect(() => {
        getTnaList();
        // s(elections);
        
    }, []);

    {
        tnaList !== undefined && console.log(tnaList)
    }

    function makeTnaList(props){
        try{

        
        let eList = []
        for( const i in props){
            console.log("i " + i + "data: " + props[i])
            // var start ='';
            // var end = '';
            // // console.log(props[i]['startdate'])
            // if(props[i]['startdate'] !== undefined){
            //     start = props[i]['startdate'].slice(0,10);
            //     end = props[i]['enddate'].slice(0,10)
            // }
           

            const row = {
                'Strong Room': props[i]['strongroom'],
                'Num Awareness Unit': props[i]['numawarenessunit'],
                "Unit Type": props[i]['unittype'],
                "Timestamp": props[i]['madeon'].slice(0,10),
                "ID":props[i]['tnaid']
            }  
            console.log({row})
            eList.push(row);
              
        }
        console.log({eList})
        setTna(eList)
        }catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        if(tnaList !== undefined){
            makeTnaList(tnaList);
        }
    }, [tnaList])
    const sortMapping = {
        "None": null,
        "Strong Room": "Strong Room",
        "Num Awareness Unit": "Num Awareness Unit",
        "Unit Type": "Unit Type",
        "Timestamp" : "Timestamp",
       
    }
    const row2 = {
        'Strong Room': 'AA1122',
        'Num Awareness Unit': '56',
        "Unit Type": 'CU',
        "Timestamp": '15-10-2021',
        // "Edit":
        // <div className="flex justify-center">
        //     <img src={Edit} />
        // </div>
        
    }
    const row3 = {
        'Strong Room': 'AA1122',
        'Num Awareness Unit': '56',
        "Unit Type": 'CU',
        "Timestamp": '15-10-2021',
        // "Edit":
        // <div className="flex justify-center">
        //     <img src={Edit} />
        // </div>
        
    }
    const row1 = {
        'Strong Room': 'AA1122',
        'Num Awareness Unit': '56',
        "Unit Type": 'CU',
        "Timestamp": '15-10-2021',
        // "Edit":
        // <div className="flex justify-center">
        //     <img src={Edit} />
        // </div>
        
    }
    const data = [row1, row2, row3, row2, row1, row2,row1, row2, row3, row2, row1, row2,];
    // const data1 = [row1, row2, row1];

    // const Table = [
    //     <Collapse orderId='XYZ/20' data={data} time='22-09-2021' />,
    //     <Collapse orderId='XYZ/12' data={data} time='12-12-2021' />,
    //     <Collapse orderId='XYZ/14' data={data1} time='2-05-2021' bottom={true} />
    // ]

    return (
        <div className={`${styles.myWrapper1}`} style={{ position: "relative", height: "100%" }}>
            {isDetail == 0 ? <div className='MainHeader pd-5 ' style={{ display: "flex", "flexDirection": "row", "justifyContent": "space-between", "alignItems": "center" }}>
                <h4 className='text-white'>Scheduled TnA List</h4>

                <div style={{ display: "flex", "flexDirection": "row", alignItems: "center", justifyContent: "center" }}>
                    <button className='createRequestBtn' onClick={() => {
                        window.location.pathname = "/session/unitmanagement/tna_scheduling";
                    }}>
                        Schedule Tna
                    </button>

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
                            <option value={"Strong Room"}>Strong Room</option>
                            <option value={"Num Awareness Unit"}>Num Awareness Unit</option>
                            <option value={"Unit Type"}>Unit Type</option>
                            <option value={"Timestamp"}>Timestamp</option>
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
            {tna !== 0 ? 
            <div class={styles.table}>
            
            <DynamicDataTable 
                rows={tna}
                buttons={[]} 
                fieldsToExclude={["ID"]}
                onClick={(event, row) => {
                    navigate(`/session/unitmanagement/edit_tna/${row["ID"]}`)
                }}
                
                />
                </div>
                : ''
            }
        </div>
    )
}