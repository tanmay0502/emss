import { DynamicDataTable } from '@langleyfoxall/react-dynamic-data-table'
import React, { useState } from 'react'
import styles from './styles/UnitList.module.css'

import { AiOutlineSortAscending, AiOutlineSortDescending } from "react-icons/ai";
import { ReactComponent as OptionsIndicator } from '../../assets/Options_Indicator.svg'

import { useNavigate } from 'react-router-dom'
import { ReactComponent as SearchInputElement } from '../../assets/searchInputIcon.svg';
import { ReactComponent as ChevronDown } from '../../assets/ChevronDown.svg';
import { useEffect } from 'react';

function UnitList() {

	const navigate = useNavigate();
	
	const [tableFilter, setTableFilter] = useState("")
	const [sortBy, setSortBy] = useState("None")
	const [sortOrder, setSortOrder] = useState("asc")
	const [tableData, setTableData] = useState([])

	const sortMapping = {
		"None": null,
		"ID": "ID",
		"Status": "Status",
		"Location": "Location",
		"Time": "Status Update Time",
	}

	const data = [
		{
			ID: "EBUAA01234",
			Status: "In Poll",
			Remarks: "Remarks will be added according to the status of the unit.",
			Location: "Bhopal",
			"Status Update Time": "22-09-2021, 22:40 HRS"
		},
		{
			ID: "EBUAA12345",
			Status: "In Poll",
			Remarks: "Remarks will be added according to the status of the unit.",
			Location: "Lahore",
			"Status Update Time": "22-09-2021, 22:40 HRS"
		},
		{
			ID: "EBUAA23456",
			Status: "In Poll",
			Remarks: "Remarks will be added according to the status of the unit.",
			Location: "Lucknow",
			"Status Update Time": "22-09-2021, 22:40 HRS"
		}
	]

	function formatData(){
		if (data) {
			var data_tmp = data.filter((elem) => {
				if (tableFilter === "") {
					return true;
				}
				else {
					const filter = tableFilter.toLowerCase();
					// console.log(elem[2])
					// return true
					return ( elem["ID"].toLowerCase().includes(filter) || elem["Location"].toLowerCase().includes(filter) || elem["Status"].toLowerCase().includes(filter))
				}
			}).map((val) => {
				return {
					"ID": val["ID"],
					"Status_Hidden": val["Status"], 
					"Status": <div className={styles.unit_status}>{val["Status"]}</div>,
					"Remarks": val["Remarks"],
					"Location": val["Location"],
					"Status Update Time": val["Status Update Time"],
					"": <button className={styles.optionsButton}><OptionsIndicator />
							<div className={styles.optionsMenu} >
								<ul>
									<li>Status History</li>
								</ul>
							</div>
						</button>
				}
			})
			data_tmp.sort(function (a, b) {
				if (sortMapping[sortBy] !== null) {
					return a[sortMapping[sortBy]].localeCompare(b[sortMapping[sortBy]])
				}
				else return 0;
			});
			if (sortMapping[sortBy] !== null && sortOrder === 'desc') {
				data_tmp.reverse();
			}

			setTableData(data_tmp)
		}
	}

	useEffect(() => {
		formatData();
	}, []);

	useEffect(() => {
		formatData();
	}, [tableFilter, sortBy, sortOrder]);

	return (
		<div className={styles.unit_list_container}>
			<div className={styles.unit_list_header}>
				<h4>
					Unit List
				</h4>
				<div className={styles.unit_list_header_right}>
					<div style={{ display: "flex", "flexDirection": "row", alignItems: "center", justifyContent: "center", background: "var(--lightGrayBG )", borderRadius: "10px", padding: "7.5px 15px 7.5px 0", fontSize: "0.8em" }}>
						<SearchInputElement style={{ margin: "0 7.5px", width: "20px" }} />
						<input type={'search'} defaultValue={tableFilter} onChange={(e) => { setTableFilter(e.target.value) }} placeholder='Search' style={{ outline: "none", background: "transparent", height: "100%" }} />
					</div>
					<div style={{ display: "flex", "flexDirection": "row", alignItems: "center", justifyContent: "center", background: "var(--lightGrayBG )", borderRadius: "10px", padding: "7.5px", fontSize: "0.8em" }}>
						<span className='SampleText' style={{ minWidth: "max-content", lineHeight: "125%", paddingInlineStart: "7.5px" }}>Sort by : &nbsp;</span>
						<select
							style={{ textAlign: "center", outline: "none", background: "transparent", padding: "0px", border: "none", lineHeight: "125%" }}
							onChange={(e) => setSortBy(e.target.value)}>
							<option value={"None"}>None</option>
							<option value={"ID"}>ID</option>
							<option value={"Location"}>Location</option>
							<option value={"Time"}>Status Update Time</option>
						</select>
						<ChevronDown />
						<button className='sortOrderButton' onClick={() => {
							setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
						}}>
							{sortOrder === 'asc' ? <AiOutlineSortAscending /> : <AiOutlineSortDescending />}
						</button>
					</div>
					{/* <div style={{ display: "flex", "flexDirection": "row", alignItems: "center", justifyContent: "center", marginLeft: "10px", background: "var(--lightGrayBG )", borderRadius: "10px", padding: "7.5px 15px 7.5px 0", fontSize: "0.8em" }}> */}
					<button className={styles.filterButton} onClick={() => {
						// setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
					}}>
						{sortOrder === 'asc' ? <AiOutlineSortAscending /> : <AiOutlineSortDescending />}
					</button>
					{/* </div> */}
				</div>
			</div>
			<DynamicDataTable
				className={styles.unitListTable}
				rows={tableData} 
				hoverable 
				renderCheckboxes 
				buttons={[]} 
				fieldsToExclude={["Status_Hidden"]}
				orderByField={sortMapping[sortBy]}
				orderByDirection={sortOrder}
				/>
			<button style={{color: "white", fontWeight: "600"}}>Submit</button>
		</div>
	)
}

export default UnitList