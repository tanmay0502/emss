import React from "react";
import DynamicDataTable from "@langleyfoxall/react-dynamic-data-table";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import Edit from '../../assets/editBtn.png';
import styles from './styles/ScheduleCDPList.module.css';
import { AiOutlineSortAscending, AiOutlineSortDescending } from "react-icons/ai";
import { ReactComponent as SearchInputElement } from '../../assets/searchInputIcon.svg';
import { ReactComponent as ChevronDown } from '../../assets/ChevronDown.svg';
// import { ReactComponent as Edit } from '../../assets/editBtn.svg';
export default function Schedule_List_CDP() {

    const navigate = useNavigate()
    const [sortOrder, setSortOrder] = useState("asc");
    const [setSortBy] = useState("None");
    const [isDetail] = useState(0);
    const [tableFilter, setTableFilter] = useState("");
    const [tableData, setTableData] = useState([])
    const [cdp, setcdp] = useState([])
    const [IsLoading, setIsLoading] = useState(0);
    const User_ID = sessionStorage.getItem("sessionToken");
    const Role = User_ID.substring(8)

    async function getlistCDP() {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_SERVER}/unit/listCDP`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: 'include'
                }
            );
            const data = await response.json();
            console.log(data, "getlistCDP")
            if (response.status == 200) {
                setcdp(data['data'])
            }
        } catch (err) {
            console.log({ err });
        }
    }


    useEffect(() => {
        if (cdp) {
            var data = cdp.filter((elem) => {
                if (tableFilter === "") {
                    return true;
                }
                else {
                    return false;
                    // const filter = tableFilter.toLowerCase();
                    // return (elem["userid"].toLowerCase().includes(filter) || elem["name"].toLowerCase().includes(filter))
                }
            }).map((val) => {
                // let st = ""
                // let ed = ""
                try {
                    // st = st + val['startdate'].slice(0, 10)
                    // ed = ed + val["enddate"].slice(0, 10)
                } catch (err) {
                    // st = ""
                    console.log(err)
                }

                return {
                    'CDP ID': val['id'],
                    'CDP Incharge': val['cdpincharge'],
                    'Manufacturer': val['manufacturer'],
                    'Process': val['process'],
                    "CDP Period": (val['startdate'] && val['enddate']) ? val['startdate'].split('T')[0].slice(8) + "-" + val['startdate'].split('T')[0].slice(5, 7) + '-' + val['startdate'].split('T')[0].slice(0, 4) + " - " + val['enddate'].split('T')[0].slice(8) + "-" + val['enddate'].split('T')[0].slice(5, 7) + '-' + val['enddate'].split('T')[0].slice(0, 4) : ''
                }
            })
            setTableData(data)

        }
        return () => {

        }
    }, [cdp, tableFilter])


    useEffect(
        () => {

            setIsLoading(1);

            let timer1 = setTimeout(() => getlistCDP(), 1 * 1000);

            return () => {
                clearTimeout(timer1);
            };
        },
        [setIsLoading]
    );

    console.log(tableData, 'tableData', cdp, isDetail)

    return (
        <div className={`${styles.myWrapper1}`} style={{ position: "relative", height: "100%" }}>
            {isDetail == 0 ? <div className='MainHeader pd-5 ' style={{ display: "flex", "flexDirection": "row", "justifyContent": "space-between", "alignItems": "center" }}>
                <h4 className='text-white'>Schedule CDP List</h4>

                <div style={{ display: "flex", "flexDirection": "row", alignItems: "center", justifyContent: "center" }}>
                    {(Role == 'RO' || Role == 'PCRO') &&

                        <button className='createRequestBtn' onClick={() => {
                            window.location.pathname = "/session/unitmanagement/ScheduleCDP";
                        }}>
                            Schedule CDP
                        </button>
                    }

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
                            <option value={"CDP Incharge"}>CDP Incharge</option>
                            <option value={"Process"}>Process</option>
                            <option value={"Manufacturer"}>Manufacturer</option>
                            <option value={"Start Date"}>Start Date</option>
                            <option value={"End Date"}>End Date </option>
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
            {(tableData != []) ?
                <div class={styles.table}>
                    <DynamicDataTable
                        rows={tableData}
                        fieldsToExclude={["CDP ID"]}
                        buttons={[]}
                        onClick={(event, row) => {
                            navigate('/session/unitmanagement/editcdp/' + row["CDP ID"])
                        }}
                    />
                </div>
                : <div style={{ background: 'black' }}>'hiiiiiiiiiiiiiiii'</div>
            }
        </div>
    )
}