import { useState, useEffect } from "react";
import styles from "./styles/UnitList.module.css";
import { DynamicDataTable } from "@langleyfoxall/react-dynamic-data-table";
import {
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from "react-icons/ai";
import { ReactComponent as OptionsIndicator } from "../../assets/Options_Indicator.svg";
import { ReactComponent as SearchInputElement } from "../../assets/searchInputIcon.svg";
import { ReactComponent as ChevronDown } from "../../assets/ChevronDown.svg";
import {expD} from "./Homepage";

const userID = sessionStorage.getItem("sessionToken");


export default function UnitList() {
  // console.log(expD);
  const [cardVisibility, setCardVisibility] = useState({
    replacementForm: false,
    epForm: false,
    firstRandomisationForm: false,
    secondRandomisationForm: false,
  });
  const [inputValue, setInputValue] = useState("");
  const [epValue,setEpValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputChange2 = (e) => {
    setEpValue(e.target.value);
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
        handleInputChange2={handleInputChange2}
        onButtonClick={handleButtonClick}
      />
      <EPForm isVisible={cardVisibility.epForm} unitID={epValue}/>
      <ReplacementForm
        isVisible={cardVisibility.replacementForm}
        unitID={inputValue}
      />
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
              elem["ID"].toLowerCase().includes(filter) ||
              elem["Location"].toLowerCase().includes(filter) ||
              elem["Status"].toLowerCase().includes(filter)
            );
          }
        })
        .map((val) => {
          return {
            ID: val["modelId"],
            Status_Hidden: val["modelStatus"],
            Status: <div className={styles.unit_status}>{val["modelStatus"]}</div>,
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
const StatusUpdate = ({ inputValue, handleInputChange, handleInputChange2 ,onButtonClick }) => {
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
            <ActionButton text="EP Mark" name="epForm" onClick={onButtonClick} />
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
            <ActionButton
              text="1st Randomisation"
              name="firstRandomisationForm"
              onClick={onButtonClick}
            />
            <ActionButton
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

const ActionButton = ({ active, text, name, onClick }) => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = (e) => {
    setIsActive(!isActive);
    onClick(e);
  };

  useEffect(() => {
    setIsActive(active);
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

// Unit Replacement Card
const ReplacementForm = ({ isVisible, unitID }) => {
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
      // console.log(data);
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

const EPForm = ({ isVisible, unitID }) => {
  const initialValues = {
    bulk: "",
    destinationLocation: "",
    acLocation: "",
    unitList: "",
    remarks: ""
  };
  const [inputValues, setInputValues] = useState(initialValues);

  const handleInputChange2 = (e) => {
    const { name, value } = e.target;
    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    const formData = {
      userID,
      bulk: inputValues.bulk,
      destinationLocation: inputValues.destinationLocation,
      acLocation: inputValues.acLocation,
      unitList: inputValues.unitList,
      remarks: inputValues.remarks
    };
    // console.log(formData);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };

    // const baseUrl = "http://localhost:8100/unit";
    // try {
    //   const response = await fetch(`${baseUrl}/replace_unit`, requestOptions);
    //   const data = await response.json();
    //   console.log(data);
    //   if (data.status == 200) {
    //     alert("Unit Replaced Successfully");
    //   } else {
    //     alert("Could not replace the unit");
    //   }
    // } catch (err) {
    //   alert(`Error occured: ${err}`);
    // }
    // setInputValues(initialValues);
  };

  useEffect(() => {
    setInputValues({ ...inputValues, replacedId: unitID });
  }, [unitID]);

  function ACNum() {
    return (
      <div className="mx-auto mb-8 flex w-3/4 flex-col text-left">
                <label className="mb-2 w-full text-base">
                  AC Location<span className="text-red-600">*</span>
                </label>
                <div className="relative text-gray-800">
                  <input
                    className="h-10 w-200 rounded-md bg-zinc-100 p-2 px-5 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                    name="acLocation"
                    placeholder="AC Location"
                    value={inputValues.acLocation}
                    onChange={handleInputChange2}
                  />
                </div>
              </div>
    );
  }

  function UList(){
    return  (
              <div className="mx-auto mb-8 flex w-3/4 flex-col text-left">
                <label className="mb-2 w-full text-base">
                  Unit Lists<span className="text-red-600">*</span>
                </label>
                <div className="relative text-gray-800">
                  <input
                    className="h-10 w-200 rounded-md bg-zinc-100 p-2 px-5 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                    name="unitList"
                    placeholder="Unit Lists"
                    value={inputValues.unitList}
                    onChange={handleInputChange2}
                  />
                </div>
              </div>
    );
  };

  function UaCList(val) {
    if(val==='Select')  return<div></div>
    else if(val==='Yes') return <ACNum/>
    else if(val==='No') return <UList/>
    else  return <div></div>
  }

  return (
    <>
      {isVisible && (
        <div className={styles.unit_list_container}>
          <div className={styles.unit_list_header}>
            <h4>EP Mark</h4>
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
                    onChange={handleInputChange2}
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
                    onChange={handleInputChange2}
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
                    onChange={handleInputChange2}
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
  const [assemblyData, setAssemblyData] = useState([
    {
      assemblyId: "",
      unitCount: "",
    },
  ]);

  const handleInputChange = (e) => {
    const { name, value, dataset } = e.target;
    const update = [...assemblyData];
    update[dataset.id][name] = value;
    setAssemblyData(update);
  };

  const handleAddButtonClick = () => {
    setAssemblyData([...assemblyData, { assemblyId: "", unitCount: "" }]);
  };

  const handleSubtractButtonClick = () => {
    if (assemblyData.length > 1) {
      setAssemblyData([...assemblyData].slice(0, -1));
    }
  };

  return (
    <>
      {isVisible && (
        <div className={styles.unit_list_container}>
          <div className={styles.unit_list_header}>
            <h4>First Randomisation</h4>
          </div>
          <div className="mt-2 w-full bg-white p-6">
            <div className="flex flex-col">
              <div className="flex w-full flex-row justify-evenly">
                <div className="mb-8 flex w-3/8 flex-col text-left">
                  <label className="mb-2 w-full text-base">
                    Warehouse ID<span className="text-red-600">*</span>
                  </label>
                  <div className="relative text-gray-800">
                    <input
                      className="h-10 w-full rounded-md bg-zinc-100 p-2 px-5 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                      name="warehouseId"
                      placeholder="TS08I1"
                    />
                  </div>
                </div>
                <div className="mb-8 flex w-3/8 flex-col text-left">
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
                </div>
              </div>
              {assemblyData.map((data, id) => (
                <div className="mb-8 flex w-full justify-evenly" key={id}>
                  <div className="flex w-3/8 flex-col text-left">
                    <label className="mb-2 w-full text-base">
                      Assembly ID {id + 1}
                      <span className="text-red-600"> *</span>
                    </label>
                    <div className="relative text-gray-800">
                      <input
                        className="h-10 w-full rounded-md bg-zinc-100 p-2 px-5 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                        name="assemblyId"
                        placeholder={`Assembly ${id + 1}`}
                        value={data.assemblyId.toUpperCase()}
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
                    <div className="relative text-gray-800">
                      <input
                        className="h-10 w-full rounded-md border-0 bg-zinc-100 p-2 px-5 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                        type="number"
                        name="unitCount"
                        placeholder={`Count ${id + 1}`}
                        value={data.unitCount}
                        onChange={handleInputChange}
                        data-id={id}
                      />
                    </div>
                  </div>
                </div>
              ))}
              <div className="w-full">
                <button
                  className="mr-5 inline-flex h-8 w-8 items-center justify-center !rounded-full border-[1px] border-dashed border-zinc-500 bg-white p-1.5 text-zinc-500 hover:bg-zinc-500 hover:text-white"
                  onClick={handleAddButtonClick}
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
                <button
                  className="inline-flex h-8 w-8 items-center justify-center !rounded-full border-[1px] border-dashed border-zinc-500 bg-white p-1.5 text-zinc-500 hover:bg-zinc-500 hover:text-white"
                  onClick={handleSubtractButtonClick}
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
              </div>
            </div>
          </div>
          <button className="font-semibold text-white">Randomise</button>
        </div>
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
