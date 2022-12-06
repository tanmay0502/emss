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

export default function UnitList() {
  const userID = sessionStorage.getItem("sessionToken");
  const [cardVisibility, setCardVisibility] = useState({
    replacementForm: false,
  });
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleButtonClick = (e) => {
    // alert(`Button Clicked: ${e.target.name}`);
    const { name } = e.target;
    setCardVisibility({
      ...cardVisibility,
      [name]: !cardVisibility[name],
    });
  };

  return (
    <>
      <UnitListTable />
      <StatusUpdate
        inputValue={inputValue}
        handleInputChange={handleInputChange}
        onButtonClick={handleButtonClick}
      />
      <ReplacementForm
        isVisible={cardVisibility.replacementForm}
        userID={userID}
        unitID={inputValue}
      />
    </>
  );
}

// Unit List Table
const UnitListTable = () => {
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

  useEffect(() => {
    formatData();
  }, [tableFilter, sortBy, sortOrder]);

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

// Status Update Card
const StatusUpdate = ({ inputValue, handleInputChange, onButtonClick }) => {
  return (
    <>
      <div className={styles.unit_list_container}>
        <div className={styles.unit_list_header}>
          <h4>Status Update</h4>
        </div>
        <div className="mt-2 w-full bg-white p-6">
          <div className="grid grid-cols-4">
            <input
              className="col-span-4 mx-8 mb-8 h-20 w-auto rounded-md bg-zinc-100 px-5 pb-8 text-gray-500 focus:text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="EBUAA01234"
              value={inputValue}
              onChange={handleInputChange}
            />
            <ActionButton text="EP Unmark" onClick={onButtonClick} />
            <ActionButton
              text="Unit Replacement"
              name="replacementForm"
              onClick={onButtonClick}
            />
            <ActionButton text="Unit Block" onClick={onButtonClick} />
            <ActionButton text="Unit UnBlock" onClick={onButtonClick} />
            <ActionButton text="Mark Defective" onClick={onButtonClick} />
            <ActionButton text="Unit Destruction" onClick={onButtonClick} />
            <ActionButton text="1st Randomisation" onClick={onButtonClick} />
            <ActionButton text="2nd Randomisation" onClick={onButtonClick} />
          </div>
        </div>
      </div>
    </>
  );
};

const ActionButton = ({ active, text, name, onClick }) => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = (e) => {
    setIsActive(!isActive);
    onClick(e);
  };

  useEffect(() => {
    setIsActive(active);
    console.log(name);
  }, []);

  return (
    <button
      className={`font-mediumisActive mx-auto mb-8 w-4/5 border-[1px] border-solid border-secondary hover:bg-secondary hover:text-white ${
        isActive ? "bg-secondary text-white" : "bg-white  text-secondary"
      }`}
      name={name ? name : text}
      onClick={handleClick}
    >
      {text}
    </button>
  );
};

const ReplacementForm = ({ isVisible, userID, unitID }) => {
  const initialValues = {
    replacedId: "",
    replacingId: "",
    replacementLevel: "",
    defecDestId: "",
  };
  const [inputValues, setInputValues] = useState(initialValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    const formData = {
      userID,
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
    try {
      const response = await fetch(`${baseUrl}/replace_unit`, requestOptions);
      const data = await response.json();
      console.log(data);
      if (data.status == 200) {
        alert("Unit Replaced Successfully");
      } else {
        alert("Could not replace the unit");
      }
    } catch (err) {
      alert(`Error occured: ${err}`);
    }
    setInputValues(initialValues);
  };

  useEffect(() => {
    setInputValues({ ...inputValues, replacedId: unitID });
  }, [unitID]);

  return (
    <>
      {isVisible && (
        <div className={styles.unit_list_container}>
          <div className={styles.unit_list_header}>
            <h4>Unit Replacement</h4>
          </div>
          <div className="mt-2 w-full bg-white p-6">
            <div className="grid grid-cols-3">
              <div className="mx-auto mb-8 flex w-3/4 flex-col text-left">
                <label className="mb-2 w-full text-base">
                  Replaced Unit ID<span className="text-red-600">*</span>
                </label>
                <div className="relative text-gray-800">
                  <input
                    className="h-10 w-full rounded-md bg-zinc-100 p-2 px-5 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                    name="replacedId"
                    placeholder="Old Unit ID"
                    value={inputValues.replacedId}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="mx-auto mb-8 flex w-3/4 flex-col text-left">
                <label className="mb-2 w-full text-base">
                  Replacing Unit ID<span className="text-red-600">*</span>
                </label>
                <div className="relative text-gray-800">
                  <input
                    className="h-10 w-full rounded-md bg-zinc-100 p-2 px-5 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                    name="replacingId"
                    placeholder="New Unit ID"
                    value={inputValues.replacingId}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="mx-auto mb-8 flex w-3/4 flex-col text-left">
                <label className="mb-2 w-full text-base">
                  Replacement Level<span className="text-red-600">*</span>
                </label>
                <div className="relative text-[#494A59]">
                  <select
                    className="relative h-10 w-full rounded-md border p-2"
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
                  <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 -translate-x-1/2" />
                </div>
              </div>
              <div className="mx-auto mb-8 flex w-3/4 flex-col text-left">
                <label className="mb-2 w-full text-base">
                  Warehouse Dest ID<span className="text-red-600">*</span>
                </label>
                <div className="relative text-gray-800">
                  <input
                    className="h-10 w-full rounded-md bg-zinc-100 p-2 px-5 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
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
            className="font-semibold text-white"
            onClick={handleFormSubmit}
          >
            Submit
          </button>
        </div>
      )}
    </>
  );
};
