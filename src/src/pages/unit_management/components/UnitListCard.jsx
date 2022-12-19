import { useState, useEffect } from "react";
import styles from "../styles/UnitList.module.css";
import { DynamicDataTable } from "@langleyfoxall/react-dynamic-data-table";
import {
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from "react-icons/ai";

import { ReactComponent as OptionsIndicator } from "../../../assets/Options_Indicator.svg";
import { ReactComponent as SearchInputElement } from "../../../assets/searchInputIcon.svg";
import { ReactComponent as ChevronDown } from "../../../assets/ChevronDown.svg";
import { expD } from "../Homepage";



const UnitListCard = () => {
    const [tableFilter, setTableFilter] = useState("");
    const [sortBy, setSortBy] = useState("None");
    const [sortOrder, setSortOrder] = useState("asc");
    const [tableData, setTableData] = useState([]);
  
    const sortMapping = {
      None: null,
      ID: "ID",
      Status: "Status",
      Location: "Location",
      Time: "Status Update Time",
    };
  
    const [data, setData] = useState(expD);
    useEffect(()=>{
      const getData = async()=>{
          try {
              const response = await fetch(
                `${process.env.REACT_APP_API_SERVER}/unit/listUnits/?status=FLC OK`,
          {
              method: "GET",
              headers: {
                  "Content-Type": "application/json",
              },
              credentials:'include'
          }
          );
          let data2 = await response.json();
          console.log("/unit/listUnits/", data2);
          if (data2.data.length) {
              console.log("data updated")
              setData(data2.data);
          }
      } catch (err) {
          console.log(err)
      }
      }
      getData()
    },[])
  
    function formatData() {
      if (data) {
        console.log("Data to be filtered", data)
        var data_tmp = data
          .filter((elem) => {
            if (tableFilter === "") {
              return true;
            } else {
              const filter = tableFilter.toLowerCase();
              return (
                elem["modelID"].toLowerCase().includes(filter) ||
                elem["status"].toLowerCase().includes(filter) ||
                elem["remark"].toLowerCase().includes(filter)
              );
            }
          })
          .map((val) => {
            return {
              ID: val["unitid"],
              Status_Hidden: val["modelStatus"],
              Status: (
                <div className={styles.unit_status}>{val["modelStatus"]}</div>
              ),
              Remarks: val["modelRemarks"],
              Location: val["modelLocation"],
              "Status Update Time": val["Status Update Time"],
              "": (
                <button className={styles.optionsButton}>
                  <OptionsIndicator />
                  <div className={styles.optionsMenu}>
                    <ul>
                      <li>Status History</li>
                    </ul>
                  </div>
                </button>
              ),
            };
          });
        // data_tmp.sort(function (a, b) {
        //   if (sortMapping[sortBy] !== null) {
        //     return a[sortMapping[sortBy]].localeCompare(b[sortMapping[sortBy]]);
        //   } else return 0;
        // });
        // if (sortMapping[sortBy] !== null && sortOrder === "desc") {
        //   data_tmp.reverse();
        // }
  
        setTableData(data_tmp);
      }
    }
  
    useEffect(() => {
      formatData();
    }, [tableFilter, sortBy, sortOrder, data]);
  
    return (
      <>
        <div className={styles.unit_list_container}>
          <div className={styles.unit_list_header}>
            <h4>Unit List</h4>
            <div className={styles.unit_list_header_right}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "var(--lightGrayBG )",
                  borderRadius: "10px",
                  padding: "7.5px 15px 7.5px 0",
                  fontSize: "0.8em",
                }}
              >
                <SearchInputElement
                  style={{ margin: "0 7.5px", width: "20px" }}
                />
                <input
                  type="search"
                  value={tableFilter}
                  onChange={(e) => {
                    setTableFilter(e.target.value);
                  }}
                  placeholder="Search"
                  style={{
                    outline: "none",
                    background: "transparent",
                    height: "100%",
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "var(--lightGrayBG)",
                  borderRadius: "10px",
                  padding: "7.5px",
                  fontSize: "0.8em",
                }}
              >
                <span
                  className="SampleText"
                  style={{
                    minWidth: "max-content",
                    lineHeight: "125%",
                    paddingInlineStart: "7.5px",
                  }}
                >
                  Sort by : &nbsp;
                </span>
                <select
                  style={{
                    textAlign: "center",
                    outline: "none",
                    background: "transparent",
                    padding: "0px",
                    border: "none",
                    lineHeight: "125%",
                  }}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="None">None</option>
                  <option value="ID">ID</option>
                  <option value="Location">Location</option>
                  <option value="Time">Status Update Time</option>
                </select>
                <ChevronDown />
                <button
                  className="sortOrderButton"
                  onClick={() => {
                    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                  }}
                >
                  {sortOrder === "asc" ? (
                    <AiOutlineSortAscending />
                  ) : (
                    <AiOutlineSortDescending />
                  )}
                </button>
              </div>
              {/* <div style={{ display: "flex", "flexDirection": "row", alignItems: "center", justifyContent: "center", marginLeft: "10px", background: "var(--lightGrayBG )", borderRadius: "10px", padding: "7.5px 15px 7.5px 0", fontSize: "0.8em" }}> */}
              <button
                className={styles.filterButton}
                onClick={() => {
                  // setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
                }}
              >
                {sortOrder === "asc" ? (
                  <AiOutlineSortAscending />
                ) : (
                  <AiOutlineSortDescending />
                )}
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
        </div>
      </>
    );
  };

  export default UnitListCard;