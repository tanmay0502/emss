import { useState, useEffect, useMemo } from "react";
import styles from "./styles/UnitList.module.css";
import ReplacementStyles from './styles/UnitReplacementDropdown.module.css'
import { useNavigate } from "react-router-dom";
import { ReactComponent as ChevronDown } from "../../assets/ChevronDown.svg";
import UnitListCard from "./components/UnitListCard";
const userID = sessionStorage.getItem("sessionToken");
const baseUrl = `${process.env.REACT_APP_API_SERVER}/unit`;

export default function UnitList() {
  const initialVisibilityValues = {
    replacementForm: false,
    epForm: false,
    epUnmarkForm: false,
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
      <StatusUpdate activeButtons={cardVisibility} onButtonClick={handleButtonClick} />
      <EPForm isVisible={cardVisibility.epForm} />
      <EPUnmarkForm isVisible={cardVisibility.epUnmarkForm} />
      <ReplacementForm isVisible={cardVisibility.replacementForm} />
      <UnitListCard />
    </>
  );
}

// Status Update Card
const ActionButton = ({ isActive, text, name, onClick }) => {
  return (
    <button
      className={`font-mediumisActive mx-auto mb-8 w-4/5 border-[1px] border-solid border-secondary hover:bg-secondary hover:text-white ${isActive ? "bg-secondary text-white" : "bg-white  text-secondary"
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

  // const baseUrl = "http://localhost:8100/unit";

  const handleFinalFormSubmit = async (e) => {
    try {
      const response = await fetch(`${baseUrl}/marking_complete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userID, ...inputValues }),
        credentials: "include",
      });
      const data = await response.json();
      if (data.status === 200) {
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
    let confirmation = window.confirm("Are you sure you have selected all the Unit")
    if (confirmation === true) {
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
        if (data.status === 200) {
          alert(data.message);
        } else {
          alert(data.message);
        }
      } catch (err) {
        alert(`Error occured: ${err}`);
      }
      setInputValues(initialValues);
    } else {
    }
  };
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
              <div className="mx-auto mb-8 flex w-3/4 flex-col text-left">
                <label className="mb-2 w-full text-base">
                  {inputValues.bulk === "Yes" ? "AC Number" : "Unit IDs"}
                  <span className="text-red-600">*</span>
                </label>
                <div className="relative text-gray-800">
                  <input
                    className="h-10 w-full rounded-md bg-zinc-100 p-2 px-5 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                    name={inputValues.bulk === "Yes" ? "acLocation" : "unitIDs"}
                    placeholder={
                      inputValues.bulk === "Yes" ? "AC Number" : "Unit IDs"
                    }
                    value={
                      inputValues.bulk === "Yes"
                        ? inputValues.acLocation
                        : inputValues.unitIDs
                    }
                    onChange={handleInputChange}
                  />
                </div>
              </div>
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

  const handleFormSubmit = async (e) => {
    let confirmation = window.confirm("Are you sure you have selected all the Unit")
    if (confirmation === true) {
      e.preventDefault();
      console.log(JSON.stringify(filebase64Array2));
      console.log(
        inputValues["bulk"],
        inputValues["destinationLocation"],
        inputValues["remarks"],
        inputValues["acLocation"],
        inputValues["unitIDs"],
        filebase64Array2,
        JSON.stringify(filebase64Array2)
      );
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
              bulk: inputValues["bulk"],
              destinationLocation: inputValues["destinationLocation"],
              unitIDs: inputValues["unitIDs"],
              acLocation: inputValues["acLocation"],
              remarks: inputValues["remarks"],
              courtorderdata: JSON.stringify(filebase64Array2),
            }),
            mode: "cors",
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
      } catch (err) {
        console.log(err);
      }
    } else {
    }
  };

  const navigate = useNavigate();
  const fileNameArray = [];
  const fileTypeArray = [];
  const filebase64Array = [];
  const [fileNameArray2, setFileName] = useState([]);
  const [fileTypeArray2, setFileType] = useState([]);
  const [filebase64Array2, setFileData] = useState([]);
  const [action, setAction] = useState("");

  const court_order_data = async (e) => {
    const files = e.target.files;
    console.log(files);

    const totalFiles = files.length;
    console.log(totalFiles);

    var fileNumber = 0;

    while (fileNumber < totalFiles) {
      var x = fileNumber + 1;
      console.log("fileNumber: " + x);

      const file = e.target.files[fileNumber];
      const fullFileName = file.name;

      var fileParts = fullFileName.split(".");

      console.log("full file" + fileParts.length);
      const fileArrayLength = fileParts.length;
      const indexDot = fullFileName.indexOf(".");
      const fileNameo = fullFileName.slice(0, indexDot);
      window.fileType = fileParts[fileArrayLength - 1];

      const filePartsNew = fileParts.pop();
      const fileName = fileParts.join(".");
      console.log(file, "FILE");
      const convertedFile = await convertBase64(file);

      var base64Converted = convertedFile;
      fileNumber += 1;

      fileNameArray.push(fileName);
      fileTypeArray.push(window.fileType);
      filebase64Array.push(base64Converted);

      setFileName((arr) => [...arr, fileName]);
      setFileType((arr) => [...arr, window.fileType]);
      setFileData((arr) => [...arr, base64Converted]);
    }
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

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
              <div className="mx-auto mb-8 flex w-3/4 flex-col text-left">
                <label className="mb-2 w-full text-base">
                  {inputValues.bulk === "Yes" ? "AC Number" : "Unit IDs"}
                  <span className="text-red-600">*</span>
                </label>
                <div className="relative text-gray-800">
                  <input
                    className="h-10 w-full rounded-md bg-zinc-100 p-2 px-5 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                    name={inputValues.bulk === "Yes" ? "acLocation" : "unitIDs"}
                    placeholder={
                      inputValues.bulk === "Yes" ? "AC Number" : "Unit IDs"
                    }
                    value={
                      inputValues.bulk === "Yes"
                        ? inputValues.acLocation
                        : inputValues.unitIDs
                    }
                    onChange={handleInputChange}
                  />
                </div>
              </div>
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
                <label className="mb-2 w-full text-base">
                  Supporting Documents <span className="text-red-600">*</span>
                </label>

                <input
                  type="file"
                  className="w-1/6"
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
    pollingstation: "",
    replacementlevel: "",
  };
  const [inputValues, setInputValues] = useState(initialInputValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name == "pollingstation") {
      setpolling([...polling, value])
    }
    if (name == 'replacementlevel') {
      setreplacementlevel([...replacementlevel, value])
    }
    setInputValues({ ...inputValues, [name]: value, });
  };


  const district_id = userID.slice(5, 8);
  const [assemblyList, setAssemblyList] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [polling, setpolling] = useState([]);
  const [replacementlevel, setreplacementlevel] = useState([]);
  const [Dropdown_rows, setDropdown_rows] = useState([]);
  const [isEdit_Dropdown_rows, setEdit_Dropdown_rows] = useState(-1);



  const handleEdit_Dropdown_rows = (i) => {
    if (i == -1 && replacementlevel[replacementlevel.length - 1] != "" && polling[polling.length - 1] != "") {
      setEdit_Dropdown_rows(i)
    }
    if (i != -1) {
      setEdit_Dropdown_rows(i);
    }
  };

  const row12 = {
    'Polling Station': 'Akoli',
    'Replacement Level': 'Commissioning',
    '': <div className="flex justify-end " style={{ marginLeft: "3%" }}><button type="button" className="text-white bg-orange-600 p-1 text-2xl w-8 h-8 -mt-4 " style={{ borderRadius: "50%", marginTop: "2%" }} >-</button></div>
  }

  const handleRemoveClick_Dropdown_rows = (i) => {

    if (window.confirm(`Are you sure you want to delete entry?`)) {
      const list_all = [...Dropdown_rows];
      list_all.splice(i, 1);
      const list_polling = [...polling];
      list_polling.splice(i, 1);
      const list_replacementlevel = [...replacementlevel];
      list_replacementlevel.splice(i, 1);

      setDropdown_rows(list_all);
      setpolling(list_polling)
      setreplacementlevel(list_replacementlevel)
      setEdit_Dropdown_rows(-1);

    }
  };

  useEffect(() => {

    // Initial fetching of any previous available user inputs
    if (isVisible) {
      setIsFetching(true);
      (async () => {
        try {
          const response = await fetch(`${baseUrl}/fetch-polling-stations`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include"
          });
          const data = await response.json();
          if (response.status === 200) {
            console.log("inside if")
            if (data.hasOwnProperty(district_id)) {
              setAssemblyList(data[district_id]);
            }
          }
        } catch (err) {
          alert(`Error occured: ${err}`);
        }
      })();

      setIsFetching(false);
    }
  }, [isVisible]);

  const handleInputChange_Polling = (e, index) => {

    const { name, value } = e.target;
    const list = [...polling];
    list[index] = value;
    const list1 = [...Dropdown_rows];
    list1[index][name] = value;
    setDropdown_rows(list1);
    setpolling(list);
  };


  useEffect(() => {
    if (Dropdown_rows != []) {

      const Temp_polling = [...polling]
      const Temp_replacementLevl = [...replacementlevel]
      Dropdown_rows.map((val, id) => {
        Temp_polling[id] = val['polling']
        Temp_replacementLevl[id] = val['replacementlevel']

      })
      setpolling(Temp_polling)
      setreplacementlevel(Temp_replacementLevl)
    }
  }, [Dropdown_rows]);

  const handleInputChange_ReplacementLevel = (e, index) => {

    const { name, value } = e.target;
    const list = [...replacementlevel];
    list[index] = value;
    const list1 = [...Dropdown_rows];
    list1[index][name] = value;
    setDropdown_rows(list1);
    setreplacementlevel(list);
  };

  const handleAdd_Dropdown_rows = () => {
    console.log('Hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii')
    if (polling[polling.length - 1] != "" && replacementlevel[replacementlevel.length - 1] != "") {
      console.log("byyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy")
      setpolling([...polling, ""])
      setreplacementlevel([...replacementlevel, ""])
      setDropdown_rows([
        ...Dropdown_rows,
        {
          polling: "",
          replacementlevel: "",
          "": <div className="flex justify-end " style={{ marginLeft: "3%" }}><button type="button" className="text-white bg-orange-600 p-1 text-2xl w-8 h-8 -mt-4 " style={{ borderRadius: "50%", marginTop: "2%" }} >-</button></div>
        },
      ]);

      setDropdown_rows(Dropdown_rows.length);
    }


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
            <div className="grid grid-cols-2">
              <div className="mx-auto mb-8 flex w-3/4 flex-col text-left">
                <label className="mb-2 w-full text-base">
                  Polling Station<span className="text-red-600">*</span>
                </label>
                <div className="relative text-[#494A59]">
                  <select
                    className="relative h-10 w-full rounded-md border p-2"
                    name="pollingstation"
                    placeholder="Select"
                    value={inputValues.pollingstation}
                    onChange={handleInputChange}
                  >
                    {" "}
                    <option hidden>Select</option>

                    {assemblyList.map((item, _id) => (
                      <option key={_id}>{item}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 -translate-x-1/2" />
                </div>
              </div>

              <div className="mx-auto mb-8 flex w-3/4 flex-col text-left">
                <label className="mb-2 w-full text-base">
                  Replacement Level<span className="text-red-600">*</span>
                </label>
                <div className="relative text-[#494A59]">
                  <select
                    className="relative h-10 w-full rounded-md border p-2"
                    name="replacementlevel"
                    placeholder="Select"
                    value={inputValues.replacementlevel}
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
            </div>
          </div>

          <div className={ReplacementStyles.Dropdown}>
            <div class={styles.ReplacementDropdown}>
              <table >
                <thead >
                  <tr>
                    <th style={{ color: "#f56a3f", padding: "20px" }}>Polling Station</th>
                    <th style={{ color: "#f56a3f", padding: "20px" }}>Replacement Level</th>
                  </tr>
                  {Dropdown_rows.length > 0 &&
                    Dropdown_rows.map((val, id) => {
                      return (isEdit_Dropdown_rows != id ?
                        <tbody >
                          <tr onDoubleClick={() => { handleEdit_Dropdown_rows(id) }}>
                            <td className="text-black text-sm">{polling[id]}</td>
                            <td className="text-black text-sm">{replacementlevel[id]}</td>
                            <td className="text-black text-sm" onClick={() => handleRemoveClick_Dropdown_rows(id)}>{row12['']}</td>
                          </tr>
                        </tbody>
                        :
                        <tbody >
                          <tr onDoubleClick={() => { handleEdit_Dropdown_rows(-1) }}>
                            <td >
                              <input
                                className={ReplacementStyles.Dropdown_tr}
                                required
                                type="text"
                                value={polling[id]}
                                name="polling"
                                placeholder="Polling"
                                onChange={(e) => handleInputChange_Polling(e, id)}
                              // disabled={manufacture_edit === true ? false : true}
                              />
                            </td >
                            <td >
                              <input
                                className={ReplacementStyles.Dropdown_tr}
                                value={replacementlevel[id]}
                                placeholder="Replacement Level"
                                type="text"
                                required
                                name="replacementlevel"
                                onChange={(e) => handleInputChange_ReplacementLevel(e, id)}
                              // disabled={manufacture_edit === true ? false : true}
                              />
                            </td>
                            <td className="text-black text-sm" onClick={() => handleRemoveClick_Dropdown_rows(id)}>{row12['']}</td>
                          </tr>
                        </tbody>
                      )
                    })
                  }
                </thead>
              </table>
              <button type="button" className="text-white bg-orange-600 p-1 text-2xl w-8 h-8 -mt-4 " style={{ borderRadius: "50%", marginLeft: "91%", marginTop: "1%" }} onClick={() => { handleAdd_Dropdown_rows() }}>+</button>
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
