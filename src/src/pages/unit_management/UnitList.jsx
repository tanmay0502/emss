import { useState, useEffect, useMemo } from "react";
import React from 'react';
import styles from "./styles/UnitList.module.css";
import { useTable } from "react-table";
import { DynamicDataTable } from "@langleyfoxall/react-dynamic-data-table";
import {
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from "react-icons/ai";

import { useNavigate } from "react-router-dom";
import { ReactComponent as OptionsIndicator } from "../../assets/Options_Indicator.svg";
import { ReactComponent as SearchInputElement } from "../../assets/searchInputIcon.svg";
import { ReactComponent as ChevronDown } from "../../assets/ChevronDown.svg";
import { expD } from "./Homepage";

const userID = sessionStorage.getItem("sessionToken");
const baseUrl = "http://localhost:8100/unit";

export default function UnitList() {
  const initialVisibilityValues = {
    replacementForm: false,
    epForm: false,
    epUnmarkForm: false,
    firstRandomisationForm: false,
    secondRandomisationForm: false,
  };
  const [cardVisibility, setCardVisibility] = useState(initialVisibilityValues);

  const handleButtonClick = (e) => {
    const { name } = e.currentTarget;
    const update = { ...initialVisibilityValues };
    if (cardVisibility[name]) {
      update[name] = false;
    } else {
      update[name] = true;
    }
    setCardVisibility(update);
  };

  return (
    <>
      <UnitListTable />
      <StatusUpdate
        activeButtons={cardVisibility}
        onButtonClick={handleButtonClick}
      />
      <EPForm isVisible={cardVisibility.epForm} />
      <EPUnmarkForm isVisible={cardVisibility.epUnmarkForm} />
      <ReplacementForm isVisible={cardVisibility.replacementForm} />
      <FirstRandomisationForm
        isVisible={cardVisibility.firstRandomisationForm}
      />
      <SecondRandomisationForm
        isVisible={cardVisibility.secondRandomisationForm}
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

  const data = expD;

  function formatData() {
    if (data) {
      var data_tmp = data
        .filter((elem) => {
          if (tableFilter === "") {
            return true;
          } else {
            const filter = tableFilter.toLowerCase();
            return (
              elem["modelID"].toLowerCase().includes(filter) ||
              elem["modelLocation"].toLowerCase().includes(filter) ||
              elem["modelStatus"].toLowerCase().includes(filter)
            );
          }
        })
        .map((val) => {
          return {
            ID: val["modelId"],
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
const ActionButton = ({ isActive, text, name, onClick }) => {
  return (
    <button
      className={`font-mediumisActive mx-auto mb-8 w-4/5 border-[1px] border-solid border-secondary hover:bg-secondary hover:text-white ${
        isActive ? "bg-secondary text-white" : "bg-white  text-secondary"
      }`}
      name={name ? name : text}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

const StatusUpdate = ({ activeButtons, onButtonClick }) => {
  return (
    <>
      <div className={styles.unit_list_container}>
        <div className={styles.unit_list_header}>
          <h4>Status Update</h4>
        </div>
        <div className="mt-2 w-full bg-white p-6">
          <div className="grid grid-cols-4">
            {/* <input
              className="col-span-4 mx-8 mb-8 h-20 w-auto rounded-md bg-zinc-100 px-5 pb-8 text-gray-500 focus:text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="EBUAA01234"
              value={inputValue}
              onChange={handleInputChange}
            /> */}
            <ActionButton
              isActive={activeButtons.epForm}
              text="EP Mark"
              name="epForm"
              onClick={onButtonClick}
            />
            <ActionButton
              isActive={activeButtons.epUnmarkForm}
              text="EP Unmark"
              name="epUnmarkForm"
              onClick={onButtonClick}
            />
            <ActionButton
              isActive={activeButtons.replacementForm}
              text="Unit Replacement"
              name="replacementForm"
              onClick={onButtonClick}
            />
            <ActionButton text="Unit Block" onClick={onButtonClick} />
            <ActionButton text="Unit UnBlock" onClick={onButtonClick} />
            <ActionButton text="Mark Defective" onClick={onButtonClick} />
            <ActionButton text="Unit Destruction" onClick={onButtonClick} />
            <ActionButton
              isActive={activeButtons.firstRandomisationForm}
              text="1st Randomisation"
              name="firstRandomisationForm"
              onClick={onButtonClick}
            />
            <ActionButton
              isActive={activeButtons.secondRandomisationForm}
              text="2nd Randomisation"
              name="secondRandomisationForm"
              onClick={onButtonClick}
            />
          </div>
        </div>
      </div>
    </>
  );
};

// EP Marking Form
const EPForm = ({ isVisible }) => {
  const initialValues = {
    bulk: "",
    destinationLocation: "",
    acLocation: "",
    unitIDs: "",
    remarks: "",
  };
  const [inputValues, setInputValues] = useState(initialValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  const baseUrl = "http://localhost:8100/unit";

  const handleFinalFormSubmit = async (e) => {
    try {
      const response = await fetch(`${baseUrl}/marking_complete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userID, ...inputValues }),
        credentials: "include"
      });
      const data = await response.json();
      if (data.status == 200) {
        alert(data.message);
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert(`Error occured: ${err}`);
    }
    setInputValues(initialValues);
  };

  const handleFormSubmit = async (e) => {
    try {
      const response = await fetch(`${baseUrl}/ep_mark`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ ...inputValues }),
      });
      console.log(response);
      console.log(JSON.stringify({ ...inputValues }));
      const data = await response.json();
      if (data.status == 200) {
        alert(data.message);
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert(`Error occured: ${err}`);
    }
    setInputValues(initialValues);
  };

  function ACNum() {
    return (
      <div className="mx-auto mb-8 flex w-3/4 flex-col text-left">
        <label className="mb-2 w-full text-base">
          AC Location<span className="text-red-600">*</span>
        </label>
        <div className="relative text-gray-800">
          <input
            className="h-10 w-full rounded-md bg-zinc-100 p-2 px-5 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
            name="acLocation"
            placeholder="AC Location"
            value={inputValues.acLocation}
            onChange={handleInputChange}
          />
        </div>
      </div>
    );
  }

  function UList() {
    return (
      <div className="mx-auto mb-8 flex w-3/4 flex-col text-left">
        <label className="mb-2 w-full text-base">
          Unit IDs<span className="text-red-600">*</span>
        </label>
        <div className="relative text-gray-800">
          <input
            className="h-10 w-full rounded-md bg-zinc-100 p-2 px-5 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
            name="unitIDs"
            placeholder="Unit IDs"
            value={inputValues.unitIDs}
            onChange={handleInputChange}
          />
        </div>
      </div>
    );
  }

  function UaCList(val) {
    switch (val) {
      case "Yes":
        return <ACNum />;
      case "No":
        return <UList />;
      default:
        return <div></div>;
    }
  }

  return (
    <>
      {isVisible && (
        <div className={styles.unit_list_container}>
          <div className={styles.unit_list_header}>
            <h4>EP Mark</h4>{" "}
            <button
              className="font-semibold text-black"
              onClick={handleFinalFormSubmit}
              style={{ backgroundColor: "white" }}
            >
              Final Submit
            </button>
          </div>
          <div className="mt-2 w-full bg-white p-6">
            <div className="grid grid-cols-3">
              <div className="mx-auto mb-8 flex w-3/4 flex-col text-left">
                <label className="mb-2 w-full text-base">
                  Bulk<span className="text-red-600">*</span>
                </label>
                <div className="relative text-[#494A59]">
                  <select
                    className="relative h-10 w-full rounded-md border p-2"
                    name="bulk"
                    placeholder="Select"
                    value={inputValues.bulk}
                    onChange={handleInputChange}
                  >
                    {" "}
                    <option hidden>Select</option>
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                  <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 -translate-x-1/2" />
                </div>
              </div>
              <div className="mx-auto mb-8 flex w-3/4 flex-col text-left">
                <label className="mb-2 w-full text-base">
                  Destination Location<span className="text-red-600">*</span>
                </label>
                <div className="relative text-gray-800">
                  <input
                    className="h-10 w-full rounded-md bg-zinc-100 p-2 px-5 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                    name="destinationLocation"
                    placeholder="Location"
                    value={inputValues.destinationLocation}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              {UaCList(inputValues.bulk)}
              <div className="mx-auto mb-8 flex w-3/4 flex-col text-left">
                <label className="mb-2 w-full text-base">
                  Remarks<span className="text-red-600">*</span>
                </label>
                <div className="relative text-gray-800">
                  <input
                    className="h-40 w-full rounded-md bg-zinc-100 p-2 px-5 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                    name="remarks"
                    placeholder="Remarks"
                    value={inputValues.remarks}
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

// EP Unmarking Form
const EPUnmarkForm = ({ isVisible }) => {
  const initialValues = {
    bulk: "",
    destinationLocation: "",
    acLocation: "",
    unitList: "",
    remarks: "",
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
    e.preventDefault();
    console.log(JSON.stringify(filebase64Array2))
    // console.log(filebase64Array2)
    console.log(inputValues['bulk'], inputValues['destinationLocation'], inputValues['remarks'], inputValues['acLocation'], "unitList", inputValues['unitList'], "here", filebase64Array2, "HELLO", JSON.stringify(filebase64Array2), 'HIIIIIIIIIIIIIIIIIIIIIIIIIIIi')


    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_SERVER}/unit/ep_unmark`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            bulk: inputValues['bulk'],
            destinationLocation: inputValues['destinationLocation'],
            unitIDs: inputValues['unitList'],
            acLocation: inputValues['acLocation'],
            remarks: inputValues['remarks'],
            courtorderdata: JSON.stringify(filebase64Array2)
          }),
          mode: "cors"
        }
      );

      console.log(response);
      console.log(JSON.stringify({ ...inputValues }));
      const data = await response.json();
      if (data.status == 200) {
        alert(data.message);
      } else {
        alert(data.message);
      }

      // alert('Submitted Successfully')
    } catch (err) {
      console.log(err);
    }

  };


  function ACNum() {
    return (
      <div className="mx-auto mb-8 flex w-3/4 flex-col text-left">
        <label className="mb-2 w-full text-base">
          AC Location<span className="text-red-600">*</span>
        </label>
        <div className="relative text-gray-800">
          <input
            className="h-10 w-full rounded-md bg-zinc-100 p-2 px-5 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
            name="acLocation"
            placeholder="AC Location"
            value={inputValues.acLocation}
            onChange={handleInputChange}
          />
        </div>
      </div>
    );
  }

  function UList() {
    return (
      <div className="mx-auto mb-8 flex w-3/4 flex-col text-left">
        <label className="mb-2 w-full text-base">
          Unit Lists<span className="text-red-600">*</span>
        </label>
        <div className="relative text-gray-800">
          <input
            className="h-10 w-full rounded-md bg-zinc-100 p-2 px-5 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
            name="unitList"
            placeholder="Unit Lists"
            value={inputValues.unitList}
            onChange={handleInputChange}
          />
        </div>
      </div>
    );
  }

  function UaCList(val) {
    switch (val) {
      case "Yes":
        return <ACNum />;
      case "No":
        return <UList />;
      default:
        return <div></div>;
    }
  }


  // const [baseImage, setBaseImage] = useState("")
  const navigate = useNavigate()
  const fileNameArray = [];
  const fileTypeArray = [];
  const filebase64Array = [];
  const [fileNameArray2, setFileName] = React.useState([]);
  const [fileTypeArray2, setFileType] = React.useState([]);
  const [filebase64Array2, setFileData] = React.useState([]);
  const [action, setAction] = useState("");

  const court_order_data = async (e) => {
    const files = e.target.files;
    console.log(files)

    const totalFiles = files.length;
    console.log(totalFiles)

    var fileNumber = 0;

    while (fileNumber < totalFiles) {
      var x = fileNumber + 1;
      console.log("fileNumber: " + x)

      const file = e.target.files[fileNumber];
      const fullFileName = file.name;

      var fileParts = fullFileName.split(".");

      console.log("full file" + fileParts.length)
      const fileArrayLength = fileParts.length;

      const indexDot = fullFileName.indexOf(".");
      // console.log("indexDot"+indexDot)

      const fileNameo = fullFileName.slice(0, indexDot);
      // console.log("fileName"+ fileNameo);




      window.fileType = fileParts[fileArrayLength - 1];

      const filePartsNew = fileParts.pop();
      // console.log(fileParts);
      const fileName = fileParts.join(".");
      // console.log("this file name: " + fileName);
      // console.log("fileParts New" + filePartsNew);
      // console.log("fileName = " + filePartsNew)
      console.log(file, 'FILE')
      const convertedFile = await convertBase64(file);

      var base64Converted = convertedFile;
      fileNumber += 1;

      fileNameArray.push(fileName);
      fileTypeArray.push(window.fileType);
      filebase64Array.push(base64Converted);

      setFileName(arr => [...arr, fileName])
      setFileType(arr => [...arr, window.fileType])
      setFileData(arr => [...arr, base64Converted])

    }
  }



  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      }

      fileReader.onerror = (error) => {
        reject(error);
      }
    })
  }


  return (
    <>
      {isVisible && (
        <div className={styles.unit_list_container}>
          <div className={styles.unit_list_header}>
            <h4>EP Unmark</h4>
          </div>
          <div className="mt-2 w-full bg-white p-6">
            <div className="grid grid-cols-3">
              <div className="mx-auto mb-8 flex w-3/4 flex-col text-left">
                <label className="mb-2 w-full text-base">
                  Bulk<span className="text-red-600">*</span>
                </label>
                <div className="relative text-[#494A59]">
                  <select
                    className="relative h-10 w-full rounded-md border p-2"
                    name="bulk"
                    placeholder="Select"
                    value={inputValues.bulk}
                    onChange={handleInputChange}
                  >
                    {" "}
                    <option hidden>Select</option>
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                  <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 -translate-x-1/2" />
                </div>
              </div>


              <div className="mx-auto mb-8 flex w-3/4 flex-col text-left">
                <label className="mb-2 w-full text-base">
                  Destination Location<span className="text-red-600">*</span>
                </label>
                <div className="relative text-gray-800">
                  <input
                    className="h-10 w-full rounded-md bg-zinc-100 p-2 px-5 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                    name="destinationLocation"
                    placeholder="Location"
                    value={inputValues.destinationLocation}
                    onChange={handleInputChange}
                  />
                </div>
              </div>


              {UaCList(inputValues.bulk)}
              <div className="mx-auto mb-8 flex w-3/4 flex-col text-left">
                <label className="mb-2 w-full text-base">
                  Remarks<span className="text-red-600">*</span>
                </label>
                <div className="relative text-gray-800">
                  <input
                    className="h-40 w-full rounded-md bg-zinc-100 p-2 px-5 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                    name="remarks"
                    placeholder="Remarks"
                    value={inputValues.remarks}
                    onChange={handleInputChange}
                  />
                </div>
              </div>


              <div className="mx-auto mb-8 flex w-3/4 flex-col text-left">
                <label className="mb-2 w-full text-base">Supporting Documents <span className="text-red-600">*</span></label>

                <input type="file" className="w-1/6"
                  disabled={action === "merge" ? true : false}
                  id="formDocuments"
                  multiple
                  onChange={(e) => {
                    court_order_data(e);
                  }}
                ></input>
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
// Unit Replacement Card
const ReplacementForm = ({ isVisible }) => {
  const initialInputValues = {
    replacedUnitID: "",
    replacingUnitID: "",
    replacementLevel: "",
    defectiveDstWarehouseID: "",
  };
  const [inputValues, setInputValues] = useState(initialInputValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    try {
      const response = await fetch(`${baseUrl}/replace_unit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ userID, ...inputValues }),
      });
      console.log(response);
      const data = await response.json();
      if (data.status == 200) {
        alert(data.message);
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert(`Error occured: ${err}`);
    }
    setInputValues(initialInputValues);
  };

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
                    name="replacedUnitID"
                    placeholder="Old Unit ID"
                    value={inputValues.replacedUnitID}
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
                    name="replacingUnitID"
                    placeholder="New Unit ID"
                    value={inputValues.replacingUnitID}
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
                    name="defectiveDstWarehouseID"
                    placeholder="Defective Location ID"
                    value={inputValues.defectiveDstWarehouseID}
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

// 1st Randomisation Card
const FirstRandomisationForm = ({ isVisible }) => {
  const warehouse_id = "TS08I1"; // calc from userId
  // const [assemblyData, setAssemblyData] = useState([
  //   {
  //     ac_name: "",
  //     cu_count: "",
  //     bu_count: "",
  //     vt_count: "",
  //   },
  // ]);
  const [assemblyData, setAssemblyData] = useState([
    {
      ac_name: "AC1",
      cu_count: 8,
      bu_count: 10,
      vt_count: 24,
    },
    {
      ac_name: "AC2",
      cu_count: 18,
      bu_count: 12,
      vt_count: 14,
    },
    {
      ac_name: "AC3",
      cu_count: 48,
      bu_count: 56,
      vt_count: 42,
    },
  ]);
  const [isFetching, setIsFetching] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, dataset } = e.currentTarget;
    const update = [...assemblyData];
    update[dataset.id][name] = value;
    setAssemblyData(update);
  };

  const handleAddButtonClick = (e) => {
    const id = parseInt(e.currentTarget.dataset.id);
    setAssemblyData([
      ...assemblyData.slice(0, id + 1),
      {
        ac_name: "",
        cu_count: "",
        bu_count: "",
        vt_count: "",
      },
      ...assemblyData.slice(id + 1),
    ]);
  };

  const handleSubtractButtonClick = (e) => {
    const id = parseInt(e.currentTarget.dataset.id);
    if (assemblyData.length > 1) {
      setAssemblyData(assemblyData.filter((a, i) => i !== id));
    }
  };

  const handleFormSubmit = async (e) => {
    const units_requirement = assemblyData
      .filter((d) => d.ac_name)
      .map((d) => {
        d.cu_count = d.cu_count ? parseInt(d.cu_count) : 0;
        d.bu_count = d.bu_count ? parseInt(d.bu_count) : 0;
        d.vt_count = d.vt_count ? parseInt(d.vt_count) : 0;
        return d;
      });
    // console.log(
    //   JSON.stringify({
    //     warehouse_id,
    //     units_requirement,
    //   })
    // );
    // fetch request
    setIsSubmitted(false);
    try {
      const response = await fetch(`${baseUrl}/executeRandomisation`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          warehouse_id,
          units_requirement,
        }),
      });
      const data = await response.json();
      if (data.status == 200) {
        console.log("Randomisation results: ", data);
        // setIsSubmitted(true);
        // useMemo and cache the output result
        // pass the data to child component & re-render
      } else {
        console.log("Could not fetch randomisation results");
      }
    } catch (err) {
      alert(`Error occured: ${err}`);
    }
    setIsSubmitted(true);
  };

  useEffect(() => {
    // Initial fetching of any previous available user inputs
    if (isVisible) {
      setIsFetching(true);
      (async () => {
        try {
          const response = await fetch(`${baseUrl}/fetchRandomisationInput/`);
          const data = await response.json();
          if (response.status == 200) {
            setAssemblyData(data.units_requirement);
          }
        } catch (err) {
          alert(`Error occured: ${err}`);
        }
      })();
      setIsFetching(false);
    }
  }, [isVisible]);

  return (
    <>
      {isVisible && (
        <div className="mb-10 flex h-auto w-full flex-col items-center justify-center overflow-hidden rounded-[25px] bg-white pb-[25px]">
          <div className={styles.unit_list_header}>
            <h4>First Randomisation</h4>
          </div>
          {!isFetching && (
            <div className="mt-2 w-full bg-white p-6">
              <div className="flex flex-col">
                <div className="mb-5 flex w-full flex-row justify-evenly">
                  <div className="flex w-3/8 flex-col text-left">
                    <label className="mb-2 w-full text-base">
                      Warehouse ID<span className="text-red-600">*</span>
                    </label>
                    <div className="relative text-gray-600">
                      <input
                        className="h-10 w-full cursor-not-allowed rounded-md bg-zinc-100 p-2 px-5 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                        name="warehouseId"
                        value={warehouse_id}
                        readOnly
                        disabled
                      />
                    </div>
                  </div>
                  {/* <div className="flex w-3/8 flex-col text-left">
                  <label className="mb-2 w-full text-base">
                    Unit Type<span className="text-red-600">*</span>
                  </label>
                  <div className="relative text-[#494A59]">
                    <select
                      className="relative h-10 w-full rounded-md border p-2"
                      name="unitType"
                      placeholder="Select"
                    >
                      {" "}
                      <option hidden>Select</option>
                      <option>CU</option>
                      <option>BU</option>
                      <option>TC</option>
                    </select>
                    <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 -translate-x-1/2" />
                  </div>
                </div> */}
                </div>
                {assemblyData.map((data, id) => (
                  <div
                    className="group mb-5 flex w-full justify-evenly"
                    key={id}
                  >
                    <div className="-mr-16 hidden w-10 flex-col items-center justify-end group-hover:flex">
                      <button
                        className="mb-0.5 inline-flex h-[22px] w-[22px] items-center justify-center !rounded-full border-[1px] border-rose-600 bg-white p-0.5 text-red-600 hover:border-dashed hover:bg-rose-50"
                        onClick={handleSubtractButtonClick}
                        data-id={id}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="h-6 w-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 12h-15"
                          />
                        </svg>
                      </button>
                      <button
                        className="inline-flex h-[22px] w-[22px] items-center justify-center !rounded-full border-[1px]  border-lime-600 bg-white p-0.5 text-lime-600 hover:border-dashed hover:bg-lime-50"
                        onClick={handleAddButtonClick}
                        data-id={id}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="h-6 w-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4.5v15m7.5-7.5h-15"
                          />
                        </svg>
                      </button>
                    </div>
                    <div className="-mr-16 w-10 group-hover:hidden"></div>
                    <div className="mr-8 flex w-3/8 flex-col text-left">
                      <label className="mb-2 w-full text-base">
                        Assembly ID {id + 1}
                        <span className="text-red-600"> *</span>
                      </label>
                      <div className="relative text-gray-800">
                        <input
                          className="h-10 w-full rounded-md bg-zinc-100 p-2 px-5 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                          name="ac_name"
                          placeholder={`Assembly ${id + 1}`}
                          value={data.ac_name.toUpperCase()}
                          onChange={handleInputChange}
                          data-id={id}
                        />
                      </div>
                    </div>
                    <div className="flex w-3/8 flex-col text-left">
                      <label className="mb-2 w-full text-base">
                        Unit Count {id + 1}
                        <span className="text-red-600"> *</span>
                      </label>
                      <div className="flex w-full justify-between gap-2 text-gray-800">
                        <input
                          className="h-10 w-1/3 rounded-md border-0 bg-zinc-100 p-2 px-5 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                          type="number"
                          name="cu_count"
                          placeholder="CU"
                          value={data.cu_count}
                          onChange={handleInputChange}
                          data-id={id}
                        />
                        <input
                          className="h-10 w-1/3 rounded-md border-0 bg-zinc-100 p-2 px-5 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                          type="number"
                          name="bu_count"
                          placeholder="BU"
                          value={data.bu_count}
                          onChange={handleInputChange}
                          data-id={id}
                        />
                        <input
                          className="h-10 w-1/3 rounded-md border-0 bg-zinc-100 p-2 px-5 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                          type="number"
                          name="vt_count"
                          placeholder="VT"
                          value={data.vt_count}
                          onChange={handleInputChange}
                          data-id={id}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          <button
            className="mb-8 font-semibold text-white"
            onClick={handleFormSubmit}
          >
            Randomise
          </button>
          {isSubmitted && <RandomisationOutput assemblyData={assemblyData} />}
        </div>
      )}
    </>
  );
};

const RandomisationOutput = ({ assemblyData }) => {
  const [iterationIndex, setIterationIndex] = useState(0);
  const rndResponse = {
    iteration_index: "1",
    alloted_units: {
      AC1: {
        cu: [
          "BCUM1000011",
          "BCUM1000011",
          "BCUM1000011",
          "BCUM1000011",
          "BCUM1000011",
        ],
        bu: ["BCUM1000011", "BCUM1000011", "BCUM1000011", "BCUM1000011"],
        vt: ["BCUM1000011", "BCUM1000011", "BCUM1000011"],
      },
      AC2: {
        cu: [
          "BCUM1000011",
          "BCUM1000011",
          "BCUM1000011",
          "BCUM1000011",
          "BCUM1000011",
        ],
        bu: ["BCUM1000011", "BCUM1000011", "BCUM1000011", "BCUM1000011"],
        vt: ["BCUM1000011", "BCUM1000011", "BCUM1000011"],
      },
    },
  };

  const response = useMemo(() => rndResponse.alloted_units, [rndResponse]);
  const data = useMemo(() => assemblyData, [assemblyData]);
  const columns = useMemo(
    () => [
      {
        Header: "Assembly Segment",
        accessor: "ac_name", // accessor is the "key" in the data
      },
      {
        Header: "CU Count",
        accessor: "cu_count",
      },
      {
        Header: "BU Count",
        accessor: "bu_count",
      },
      {
        Header: "VT Count",
        accessor: "vt_count",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  const iterationText = ["First", "Second", "Third"];

  return (
    <>
      {/* Iteration Count */}
      <div className="flex w-full flex-row items-center justify-between px-16">
        <button className="h-8 rounded-md border-2 border-solid border-zinc-300 bg-zinc-50 px-5 py-0 text-sm text-gray-800 hover:bg-zinc-100">
          {"< Prev"}
        </button>
        <h3 className="font-sans font-semibold">
          {iterationText[iterationIndex]} Iteration
        </h3>
        <button className="h-8 rounded-md border-2 border-solid border-zinc-300 bg-zinc-50 px-5 py-0 text-sm text-gray-800 hover:bg-zinc-100">
          {"Next >"}
        </button>
      </div>
      {/* Arrow Buttons */}
      <table {...getTableProps()} className="mb-8 w-11/12">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  className="border-b-2 border-solid border-gray-300 bg-white text-xl font-semibold !text-gray-900"
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <AssemblyTableRow
                row={row}
                unitData={response[row.cells[0].value]}
              />
            );
          })}
        </tbody>
      </table>
    </>
  );
};

const AssemblyTableRow = ({ row, unitData }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpander = (e) => {
    // if (e.target.type === 'checkbox') return;

    // if (!this.state.expanded) {
    //   this.setState(
    //     { expanded: true },
    //     () => {
    //       if (this.refs.expanderBody) {
    //         slideDown(this.refs.expanderBody);
    //       }
    //     }
    //   );
    // } else {
    //   slideUp(this.refs.expanderBody, {
    //     onComplete: () => { this.setState({ expanded: false }); }
    //   });
    // }
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <tr {...row.getRowProps()} onClick={toggleExpander}>
        {row.cells.map((cell) => {
          return (
            <td
              {...cell.getCellProps()}
              className="relative border-b border-solid border-gray-200 bg-white p-2 text-lg text-gray-600"
            >
              {cell.column.Header == "Assembly Segment" && (
                <ChevronDown
                  className={`absolute left-0 top-1/2 ml-7 h-5 w-5 -translate-y-1/2 translate-x-1/2 transition-transform ease-in-out ${
                    !isExpanded && "-rotate-90"
                  }`}
                />
              )}
              {cell.render("Cell")}
            </td>
          );
        })}
      </tr>
      {isExpanded && (
        <tr onClick={toggleExpander}>
          <td className="bg-zinc-50 py-2 px-6" colSpan={4}>
            <div className="px-4 text-left">
              <h6 className="text-lg">CU</h6>
              <div className="mx-auto mb-2 grid grid-cols-7 text-center font-sans text-base">
                {/* {unitData.cu.map((unit) => (
                  <p className="m-0 mr-2 text-base">{unit}</p>
                ))} */}
                {[...Array(row.values.cu_count).keys()].map((unit) => (
                  <p className="m-0">
                    BCUM1000{unit.toString().padStart(3, 0)}
                  </p>
                ))}
              </div>
              <h6 className="text-lg">BU</h6>
              <div className="mx-auto mb-2 grid grid-cols-7 text-center font-sans text-base">
                {/* {unitData.bu.map((unit) => (
                  <p className="m-0 mr-2 text-base">{unit}</p>
                ))} */}
                {[...Array(row.values.bu_count).keys()].map((unit) => (
                  <p className="m-0">
                    BCUM1000{unit.toString().padStart(3, 0)}
                  </p>
                ))}
              </div>
              <h6 className="text-lg">VT</h6>
              <div className="mx-auto mb-2 grid grid-cols-7 text-center font-sans text-base">
                {/* {unitData.vt.map((unit) => (
                  <p className="m-0 mr-2 text-base">{unit}</p>
                ))} */}
                {[...Array(row.values.vt_count).keys()].map((unit) => (
                  <p className="m-0">
                    BCUM1000{unit.toString().padStart(3, 0)}
                  </p>
                ))}
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

// 2nd Randomisation Card
const SecondRandomisationForm = ({ isVisible }) => {
  return (
    <>
      {isVisible && (
        <div className={styles.unit_list_container}>
          <div className={styles.unit_list_header}>
            <h4>Second Randomisation</h4>
          </div>
          <div className="mt-2 w-full bg-white p-6">
            <div className="grid grid-cols-3"></div>
          </div>
          <button className="font-semibold text-white">Randomise</button>
        </div>
      )}
    </>
  );
};
