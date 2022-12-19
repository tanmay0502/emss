
import { useState, useEffect, useMemo } from "react";
import styles from '../styles/TnaList.module.css';
import { ReactComponent as ChevronDown } from "../../../assets/ChevronDown.svg";

const userID = sessionStorage.getItem("sessionToken");
const baseUrl = `${process.env.REACT_APP_API_SERVER}/unit`;

const UnitReplacementForm = ({ isVisible }) => {
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
      let confirmation = window.confirm("Are you sure you have selected all the Unit")
      if (confirmation === true) {
        try {
          const response = await fetch(`${baseUrl}/replace_unit`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ userID, ...inputValues }),
          });
          console.log(response);
          const data = await response.json();
          if (data.status === 200) {
            alert(data.message);
          } else {
            alert(data.message);
          }
        } catch (err) {
          alert(`Error occured: ${err}`);
        }
        setInputValues(initialInputValues);
      }
      else { }
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

  export default UnitReplacementForm;