import { DynamicDataTable } from "@langleyfoxall/react-dynamic-data-table";
import React, { useState } from "react";
import styles from "./styles/UnitList.module.css";

import {
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from "react-icons/ai";
import { ReactComponent as OptionsIndicator } from "../../assets/Options_Indicator.svg";

import { useNavigate } from "react-router-dom";
import { ReactComponent as SearchInputElement } from "../../assets/searchInputIcon.svg";
import { ReactComponent as ChevronDown } from "../../assets/ChevronDown.svg";
import { useEffect } from "react";

function UnitList() {
  const navigate = useNavigate();

  const [tableFilter, setTableFilter] = useState("");
  const [sortBy, setSortBy] = useState("None");
  const [sortOrder, setSortOrder] = useState("asc");
  const [tableData, setTableData] = useState([]);

  const userID = sessionStorage.getItem("sessionToken");
  const initialFormValues = {
    replacedId: "",
    replacingId: "",
    replacementLevel: "",
    defecDestId: "",
  };

  const [inputValues, setInputValues] = useState(initialFormValues);

  const sortMapping = {
    None: null,
    ID: "ID",
    Status: "Status",
    Location: "Location",
    Time: "Status Update Time",
  };

  const data = [
    {
      ID: "EBUAA01234",
      Status: "In Poll",
      Remarks: "Remarks will be added according to the status of the unit.",
      Location: "Bhopal",
      "Status Update Time": "22-09-2021, 22:40 HRS",
    },
    {
      ID: "EBUAA12345",
      Status: "In Poll",
      Remarks: "Remarks will be added according to the status of the unit.",
      Location: "Lahore",
      "Status Update Time": "22-09-2021, 22:40 HRS",
    },
    {
      ID: "EBUAA23456",
      Status: "In Poll",
      Remarks: "Remarks will be added according to the status of the unit.",
      Location: "Lucknow",
      "Status Update Time": "22-09-2021, 22:40 HRS",
    },
  ];

  function formatData() {
    if (data) {
      var data_tmp = data
        .filter((elem) => {
          if (tableFilter === "") {
            return true;
          } else {
            const filter = tableFilter.toLowerCase();
            // console.log(elem[2])
            // return true
            return (
              elem["ID"].toLowerCase().includes(filter) ||
              elem["Location"].toLowerCase().includes(filter) ||
              elem["Status"].toLowerCase().includes(filter)
            );
          }
        })
        .map((val) => {
          return {
            ID: val["ID"],
            Status_Hidden: val["Status"],
            Status: <div className={styles.unit_status}>{val["Status"]}</div>,
            Remarks: val["Remarks"],
            Location: val["Location"],
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
      data_tmp.sort(function (a, b) {
        if (sortMapping[sortBy] !== null) {
          return a[sortMapping[sortBy]].localeCompare(b[sortMapping[sortBy]]);
        } else return 0;
      });
      if (sortMapping[sortBy] !== null && sortOrder === "desc") {
        data_tmp.reverse();
      }

      setTableData(data_tmp);
    }
  }

  // useEffect(() => {
  //   userID = sessionStorage.getItem("sessionToken");
  // }, []);

  useEffect(() => {
    formatData();
  }, [tableFilter, sortBy, sortOrder]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  const handleReplacementFormSubmit = async (e) => {
    const formData = {
      userID: userID,
      replacedUnitID: inputValues.replacedId,
      replacingUnitID: inputValues.replacingId,
      replacementLevel: inputValues.replacementLevel,
      defectiveDstWarehouseID: inputValues.defecDestId,
    };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };

    const baseUrl = "http://localhost:8100/unit";
    const response = await fetch(`${baseUrl}/replace_unit`, requestOptions);
    const data = await response.json();
    console.log(data);
    setInputValues(initialFormValues);
  };

  return (
    <>
      {/* Unit List */}
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
                type={"search"}
                defaultValue={tableFilter}
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
                background: "var(--lightGrayBG )",
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
                <option value={"None"}>None</option>
                <option value={"ID"}>ID</option>
                <option value={"Location"}>Location</option>
                <option value={"Time"}>Status Update Time</option>
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
      {/* Status Update */}
      <div className={styles.unit_list_container}>
        <div className={styles.unit_list_header}>
          <h4>Status Update</h4>
        </div>
        <div className="bg-white p-6 mt-2 w-full">
          <div className="grid grid-cols-4">
            <input
              className="w-auto mx-8 mb-8 col-span-4 h-20 px-5 pb-8 rounded-md bg-zinc-100 text-gray-400 outline-none"
              value="EBUAA01234"
              readOnly
              disabled
            />
            <button className="text-secondary font-medium w-4/5 mb-8 mx-auto border-solid border-[1px] border-secondary bg-white hover:bg-secondary hover:text-white">
              EP Unmark
            </button>
            <button className="text-white font-medium w-4/5 mb-8 mx-auto border-solid border-[1px] border-secondary bg-secondary hover:bg-secondary hover:text-white">
              Unit Replacement
            </button>
            <button className="text-secondary font-medium w-4/5 mb-8 mx-auto border-solid border-[1px] border-secondary bg-white hover:bg-secondary hover:text-white">
              Unit Block
            </button>
            <button className="text-secondary font-medium w-4/5 mb-8 mx-auto border-solid border-[1px] border-secondary bg-white hover:bg-secondary hover:text-white">
              Unit UnBlock
            </button>
            <button className="text-secondary font-medium w-4/5 mb-8 mx-auto border-solid border-[1px] border-secondary bg-white hover:bg-secondary hover:text-white">
              Mark Defective
            </button>
            <button className="text-secondary font-medium w-4/5 mb-8 mx-auto border-solid border-[1px] border-secondary bg-white hover:bg-secondary hover:text-white">
              Unit Destruction
            </button>
            <button className="text-secondary font-medium w-4/5 mb-8 mx-auto border-solid border-[1px] border-secondary bg-white hover:bg-secondary hover:text-white">
              1st Randomisation
            </button>
            <button className="text-secondary font-medium w-4/5 mb-8 mx-auto border-solid border-[1px] border-secondary bg-white hover:bg-secondary hover:text-white">
              2nd Randomisation
            </button>
          </div>
        </div>
      </div>
      {/* Unit Replacement */}
      <div className={styles.unit_list_container}>
        <div className={styles.unit_list_header}>
          <h4>Unit Replacement</h4>
        </div>
        <div className="bg-white p-6 mt-2 w-full">
          <div className="grid grid-cols-3">
            {/* <div className="flex flex-col text-left w-3/5 mx-auto mb-8">
              <label className="w-full mb-2 text-base">
                User ID<span className="text-red-600">*</span>
              </label>
              <div className="relative text-[#494A59]">
								<select
									className="w-full h-10 p-2 border rounded-md relative"
									placeholder="Type"
								>
									{" "}
									<option>Select</option>
									<option>option</option>
									<option>option</option>
								</select>
              	<ChevronDown className="right-0 top-1/2 -translate-y-1/2 -translate-x-1/2 absolute" />
							</div>
            </div> */}
            <div className="flex flex-col text-left w-3/4 mx-auto mb-8">
              <label className="w-full mb-2 text-base">
                Replaced Unit ID<span className="text-red-600">*</span>
              </label>
              <div className="relative text-gray-800">
                <input
                  className="w-full h-10 p-2 px-5 rounded-md bg-zinc-100 placeholder:text-gray-400 focus:ring-2 focus:ring-[#84587C] focus:outline-none"
                  name="replacedId"
                  placeholder="Old Unit ID"
                  value={inputValues.replacedId}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="flex flex-col text-left w-3/4 mx-auto mb-8">
              <label className="w-full mb-2 text-base">
                Replacing Unit ID<span className="text-red-600">*</span>
              </label>
              <div className="relative text-gray-800">
                <input
                  className="w-full h-10 p-2 px-5 rounded-md bg-zinc-100 placeholder:text-gray-400 focus:ring-2 focus:ring-[#84587C] focus:outline-none"
                  name="replacingId"
                  placeholder="New Unit ID"
                  value={inputValues.replacingId}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="flex flex-col text-left w-3/4 mx-auto mb-8">
              <label className="w-full mb-2 text-base">
                Replacement Level<span className="text-red-600">*</span>
              </label>
              <div className="relative text-[#494A59]">
                <select
                  className="w-full h-10 p-2 border rounded-md relative"
                  name="replacementLevel"
                  placeholder="Select"
                  value={inputValues.replacementLevel}
                  onChange={handleInputChange}
                >
                  {" "}
                  <option hidden>Select</option>
                  <option>Commissioning</option>
                  <option>Distribution</option>
                  <option>Mock Polling</option>
                  <option>Actual Polling</option>
                </select>
                <ChevronDown className="right-0 top-1/2 -translate-y-1/2 -translate-x-1/2 absolute" />
              </div>
            </div>
            <div className="flex flex-col text-left w-3/4 mx-auto mb-8">
              <label className="w-full mb-2 text-base">
                Warehouse Dest ID<span className="text-red-600">*</span>
              </label>
              <div className="relative text-gray-800">
                <input
                  className="w-full h-10 p-2 px-5 rounded-md bg-zinc-100 placeholder:text-gray-400 focus:ring-2 focus:ring-[#84587C] focus:outline-none"
                  name="defecDestId"
                  placeholder="Defective Location ID"
                  value={inputValues.defecDestId}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </div>
        <button
          style={{ color: "white", fontWeight: "600" }}
          onClick={handleReplacementFormSubmit}
        >
          Submit
        </button>
      </div>
    </>
  );
}

export default UnitList;
