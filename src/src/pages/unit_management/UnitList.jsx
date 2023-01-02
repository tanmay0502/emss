import { useState, useEffect, useMemo } from "react";
import styles from "./styles/UnitList.module.css";
import ReplacementStyles from './styles/UnitReplacementDropdown.module.css'
import { expD } from "./Homepage";
import { useNavigate } from "react-router-dom";
import { ReactComponent as ChevronDown } from "../../assets/ChevronDown.svg";
import { ReactComponent as Delete } from "../../assets/Delete.svg";
import UnitListCard from "./components/UnitListCard";
import scheduleStyles from './styles/ScheduleFlc.module.css'
import UnitListEpmarkEpUnmark from "./components/UnitListEpmarkEpUnmark";
const userID = sessionStorage.getItem("sessionToken");
const baseUrl = `${process.env.REACT_APP_API_SERVER}/unit`;



export default function UnitList() {


  const initialInputValuesReplace = {
    pollingstation: "",
    replacementlevel: "",
  };

  const [inputValuesReplace, setInputValuesReplace] = useState(initialInputValuesReplace);

  const handleInputChangeReplace = (e) => {
    const { name, value } = e.target;
    setInputValuesReplace({
      ...inputValuesReplace,
      [name]: value,
    });
  };


  const initialVisibilityValues = {
    replacementForm: false,
    epForm: false,
    epUnmarkForm: false,
  };
  const [ReplacedUnitID, setReplacedUnitID] = useState([]);
  const [ReplacingUnitID, setReplacingUnitID] = useState([]);
  const [Typeofdefect, settypeofdefect] = useState([]);
  const [isEdit_Dropdown_rows, setEdit_Dropdown_rows] = useState(-1);
  const [cardVisibility, setCardVisibility] = useState(initialVisibilityValues);
  const [Added, setAdded] = useState([]);
  const [bgColor, setBgColor] = useState("")
  const [data, setData] = useState(expD);
  const [data2, setData2] = useState(expD);
  const [data3, setData3] = useState(expD);
  const [isPageLoaded, setIsPageLoaded] = useState(0)


  const getData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_SERVER}/unit/listUnits/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          "status": "In Poll"
        }),
        credentials: "include",
      });

      let Input = await response.json();
      if (response.status == 200) {
        if (Input && Input["data"] && Input['data'].length) {
          setData(Input['data']);
        }
        else {
          setData([]);
        }
      }
    } catch (err) {
      console.log(err)
    }
  }


  useEffect(
    () => {
      let timer1 = setTimeout(() => getData(), 1 * 1000);
      return () => {
        clearTimeout(timer1);
      };
    },
    []
  );



  const getData2 = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_SERVER}/unit/listUnits/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          "status": "In Reserve"
        }),
        credentials: "include",
      });

      let Input = await response.json();
      if (response.status == 200) {
        if (Input && Input["data"] && Input['data'].length) {
          setData2(Input['data']);
        }
        else {
          setData2([]);
        }
      }
    } catch (err) {
      console.log(err)
    }
  }



  useEffect(
    () => {
      let timer1 = setTimeout(() => getData2(), 1 * 1000);
      return () => {
        clearTimeout(timer1);
      };
    },
    []
  );


  // const getData3 = async () => {
  //   try {
  //     const response = await fetch(`${process.env.REACT_APP_API_SERVER}/unit/listUnits/`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //       }),
  //       credentials: "include",
  //     });

  //     let Input = await response.json();
  //     if (response.status == 200) {
  //       if (Input && Input["data"] && Input['data'].length) {
  //         setData3(Input['data']);
  //       }
  //       else {
  //         setData3([]);
  //       }
  //     }
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  // useEffect(
  //   () => {
  //     let timer1 = setTimeout(() => getData3(), 1 * 1000);
  //     return () => {
  //       clearTimeout(timer1);
  //     };
  //   },
  //   []
  // );

  const [flag, setflag] = useState([]);
  const [isPageLoadedAll, setIsPageLoadedAll] = useState(0)


  const SetAll = () => {
    for (let k = 0; k < data.length; k++) {
      if (!ReplacedUnitID.includes(data[k]['unitid'])) {
        setBgColor('#e4e7f1')
        setReplacedUnitID((prev) => {
          let kk = [...prev]
          kk.push(data[k]["unitid"])
          return kk;
        })
        setReplacingUnitID(
          (prev) => {
            let kk = [...prev]
            kk.push("")
            return kk;
          }
        )
        settypeofdefect(
          (prev) => {
            let kk = [...prev]
            kk.push('')
            return kk;
          }
        )
        setAdded(
          (prev) => {
            let kk = [...prev]
            kk.push({
              "replacingUnitId": "",
              "replacedUnitId": data[k]['unitid'],
              "defectType": "",
              "": <div className="flex justify-end " style={{ marginLeft: "3%" }}><button type="button" className="text-white bg-orange-600 p-1 text-2xl w-8 h-8 -mt-4 " style={{ borderRadius: "50%", marginTop: "2%" }} >-</button></div>
            })
            return kk;
          }
        );
      }

    }
  }


  useEffect(() => {
    if (data != [] && inputValuesReplace['replacementlevel'] == "Actual Polling") {
      // if (Added != [] && Added[Added.length - 1]['replacedUnitId'] != '') {
      if (Added.length != 0 && Added[Added.length - 1]['replacedUnitId'].slice(1, 3) != 'VT') {
        SetAll()
      }
      // }
    }
  }, [Added, inputValuesReplace])

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
  const [update, setUpdate] = useState(0)
  const updateChecked = (Row, ID) => {
    if (!ReplacedUnitID.includes(ID) && inputValuesReplace['replacementlevel'] != '') {
      setBgColor('#e4e7f1')
      setReplacedUnitID([...ReplacedUnitID, ID])
      setReplacingUnitID([...ReplacingUnitID, ""])
      settypeofdefect([...Typeofdefect, ""])
      setAdded([
        ...Added,
        {
          "replacingUnitId": "",
          "replacedUnitId": ID,
          "defectType": "",
          "": <div className="flex justify-end " style={{ marginLeft: "3%" }}><button type="button" className="text-white bg-orange-600 p-1 text-2xl w-8 h-8 -mt-4 " style={{ borderRadius: "50%", marginTop: "2%" }} >-</button></div>
        },
      ]);
      setUpdate(prev => (prev + 1))
    }
    else if (inputValuesReplace['replacementlevel'] != '') {
      let i = -1;
      for (let k = 0; k < ReplacedUnitID.length; k++) {
        if (ReplacedUnitID[k] == ID) {
          i = k;
        }
      }
      if (window.confirm(`Are you sure ?`)) {
        const list_all = [...Added];
        list_all.splice(i, 1);
        const list_ReplacedUnitID = [...ReplacedUnitID];
        list_ReplacedUnitID.splice(i, 1);
        const list_ReplacingUnitID = [...ReplacingUnitID];
        list_ReplacingUnitID.splice(i, 1);
        const list_Typeofdefect = [...Typeofdefect];
        list_Typeofdefect.splice(i, 1);

        setAdded(list_all);
        setReplacedUnitID(list_ReplacedUnitID)
        setReplacingUnitID(list_ReplacingUnitID)
        settypeofdefect(list_Typeofdefect)
        setEdit_Dropdown_rows(-1);

      }
    }
  }


  const MakeitEmpty = () => {
    setAdded([]);
    setReplacedUnitID([]);
    setReplacingUnitID([]);
    settypeofdefect([]);
    let pp = {}
    for (let k = 0; k < data2.length; k++) {
      pp[data2[k]['unitid']] = {
        "flag": false,
        "id": -1
      }
    }
    setflag(pp)
  }



  useEffect(() => {
    MakeitEmpty()
  }, [inputValuesReplace])

  const handleEdit_Dropdown_rows = (i) => {
    setEdit_Dropdown_rows(i);
  };
  const handleRemoveClick_Dropdown_rows = (i) => {

    if (window.confirm(`Are you sure ?`)) {
      const list_all = [...Added];
      list_all.splice(i, 1);
      const list_ReplacedUnitID = [...ReplacedUnitID];
      list_ReplacedUnitID.splice(i, 1);
      const list_ReplacingUnitID = [...ReplacingUnitID];
      list_ReplacingUnitID.splice(i, 1);
      const list_Typeofdefect = [...Typeofdefect];
      list_Typeofdefect.splice(i, 1);

      setAdded(list_all);
      setReplacedUnitID(list_ReplacedUnitID)
      setReplacingUnitID(list_ReplacingUnitID)
      settypeofdefect(list_Typeofdefect)
      setEdit_Dropdown_rows(-1);

    }
  };


  const handleInputChange_ReplacedUnitID = (e, index) => {
    const { name, value } = e.target;
    const list = [...ReplacedUnitID];
    list[index] = value;
    const list1 = [...Added];
    list1[index][name] = value;
    setAdded(list1);
    setReplacedUnitID(list);
  };


  useEffect(() => {
    if (data2) {
      let pp = {}
      for (let k = 0; k < data2.length; k++) {
        pp[data2[k]['unitid']] = {
          "flag": false,
          "id": -1
        }
      }
      setflag(pp)
    }
  }, [data2])

  const handleInputChange_ReplacingUnitID = (e, index) => {

    const prevvalue = ReplacingUnitID[index];
    const { name, value } = e.target;
    const list = [...ReplacingUnitID];
    list[index] = value;
    const list1 = [...Added];
    list1[index][name] = value;

    const list2 = { ...flag };
    list2[value]['flag'] = true
    list2[value]['id'] = index;

    setAdded(list1);
    setReplacingUnitID(list);
    setflag(list2);

    if (flag[value]['id'] == index) {
      const list2 = { ...flag };
      list2[prevvalue]['flag'] = false
      list2[prevvalue]['id'] = -1
      setflag(list2);
    }
  };


  const handleInputChange_typeofdefect = (e, index) => {

    const { name, value } = e.target;
    const list = [...Typeofdefect];
    list[index] = value;
    const list1 = [...Added];
    list1[index][name] = value;
    setAdded(list1);
    settypeofdefect(list);
  };


  return (
    <>
      <StatusUpdate activeButtons={cardVisibility} onButtonClick={handleButtonClick} flag={flag} data2={data2} initialInputValuesReplace={initialInputValuesReplace} setInputValuesReplace={setInputValuesReplace} inputValuesReplace={inputValuesReplace} handleInputChangeReplace={handleInputChangeReplace} isVisible={cardVisibility.replacementForm} Added={Added} handleInputChange_ReplacedUnitID={handleInputChange_ReplacedUnitID} handleInputChange_ReplacingUnitID={handleInputChange_ReplacingUnitID} handleInputChange_typeofdefect={handleInputChange_typeofdefect} handleEdit_Dropdown_rows={handleEdit_Dropdown_rows} Typeofdefect={Typeofdefect} ReplacingUnitID={ReplacingUnitID} ReplacedUnitID={ReplacedUnitID} handleRemoveClick_Dropdown_rows={handleRemoveClick_Dropdown_rows} />
      <EPForm isVisible={cardVisibility.epForm} />
      <EPUnmarkForm isVisible={cardVisibility.epUnmarkForm} />
      {cardVisibility.replacementForm == true ?
        <UnitListCard updateChecked={updateChecked} bgColor={bgColor} ReplacedUnitID={ReplacedUnitID} data={data} />
        :
        <UnitListEpmarkEpUnmark data={data3} />
      }
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

const StatusUpdate = ({ activeButtons, onButtonClick, flag, data2, initialInputValuesReplace, setInputValuesReplace, inputValuesReplace, handleInputChangeReplace, isVisible, Added, handleInputChange_ReplacedUnitID, handleInputChange_ReplacingUnitID, handleInputChange_typeofdefect, handleEdit_Dropdown_rows, ReplacingUnitID, ReplacedUnitID, Typeofdefect, handleRemoveClick_Dropdown_rows }) => {
  return (

    <div className={styles.unit_list_container}>
      <div className={styles.unit_list_header}>
        <h4>Status Update</h4>
      </div>
      <div className="grid grid-cols-4 mt-4">
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

      <ReplacementForm flag={flag} data2={data2} initialInputValuesReplace={initialInputValuesReplace} setInputValuesReplace={setInputValuesReplace} inputValuesReplace={inputValuesReplace} handleInputChangeReplace={handleInputChangeReplace} isVisible={isVisible} Added={Added} handleInputChange_ReplacedUnitID={handleInputChange_ReplacedUnitID} handleInputChange_ReplacingUnitID={handleInputChange_ReplacingUnitID} handleInputChange_typeofdefect={handleInputChange_typeofdefect} handleEdit_Dropdown_rows={handleEdit_Dropdown_rows} Typeofdefect={Typeofdefect} ReplacingUnitID={ReplacingUnitID} ReplacedUnitID={ReplacedUnitID} handleRemoveClick_Dropdown_rows={handleRemoveClick_Dropdown_rows} />
    </div >

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
    const totalFiles = files.length;
    var fileNumber = 0;

    while (fileNumber < totalFiles) {
      var x = fileNumber + 1;

      const file = e.target.files[fileNumber];
      const fullFileName = file.name;

      var fileParts = fullFileName.split(".");
      const fileArrayLength = fileParts.length;
      const indexDot = fullFileName.indexOf(".");
      const fileNameo = fullFileName.slice(0, indexDot);
      window.fileType = fileParts[fileArrayLength - 1];

      const filePartsNew = fileParts.pop();
      const fileName = fileParts.join(".");
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
const ReplacementForm = ({ flag, data2, initialInputValuesReplace, setInputValuesReplace, inputValuesReplace, handleInputChangeReplace, isVisible, Added, handleInputChange_ReplacedUnitID, handleInputChange_ReplacingUnitID, handleInputChange_typeofdefect, handleEdit_Dropdown_rows, ReplacingUnitID, ReplacedUnitID, Typeofdefect, handleRemoveClick_Dropdown_rows }) => {


  const [assemblyList, setAssemblyList] = useState([]);
  const [data4, setData4] = useState();
  const [isPageLoaded1, setIsPageLoaded1] = useState(0)


  const getData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_SERVER}/unit/getDefectList/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const Input = await response.json();
      if (response.status == 200) {
        if (Input['data'].length) {
          setData4(Input['data']);
        }
        else {
          setData4([]);
        }
      }

    } catch (err) {
      console.log(err)
    }
  }


  useEffect(() => {
    // if (isPageLoaded == 0) {
    getData()
    //   setIsPageLoaded(1)
    // }
  }, [])

  function callpollingstation() {
    (async () => {
      try {
        const response = await fetch(`${baseUrl}/fetch-polling-stations/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include"
        });
        const Data = await response.json();
        // if (response.status === 200) {
        //   if (Data.hasOwnProperty(district_id)) {
        //     setAssemblyList(Data[district_id]);
        //   }
        // }
      } catch (err) {
        alert(`Error occured: ${err}`);
      }
    })();
  }

  useEffect(() => {
    if (isPageLoaded1 == 0) {
      callpollingstation()
      setIsPageLoaded1(1)
    }
  })


  const handleFormSubmit = async (e) => {
    let confirmation = window.confirm("Are you sure you have selected all the Unit")
    if (confirmation === true) {
      try {
        const response = await fetch(`${baseUrl}/replace_unit`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            "replacementLevel": inputValuesReplace['replacementlevel'],
            "lstReplacingUnits": [
              Added
            ]
          }
          ),
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
      setInputValuesReplace(initialInputValuesReplace);
    }
    else { }
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    handleFormSubmit()

  };

  return (
    <>
      <form onSubmit={onFormSubmit} className="w-full rounded-lg " styles={{ marginTop: "20%" }}>
        {isVisible && (
          <div styles={{ marginTop: "20%" }}>
            <div className="w-full flex justify-around">
              <div className="m-2 text-left w-1/3">
                <label className="mb-2 w-full text-base">
                  Polling Station<span className="text-red-600">*</span>
                </label>
                <div className="relative text-[#494A59]">
                  <select
                    className="relative h-10 w-full rounded-md border p-2"
                    name="pollingstation"
                    placeholder="Select"
                    value={inputValuesReplace.pollingstation}
                    onChange={handleInputChangeReplace}
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

              <div className="m-2 w-1/3 text-left">
                <label className="mb-2 w-full text-base">
                  Replacement Level<span className="text-red-600">*</span>
                </label>
                <div className="relative text-[#494A59]">
                  <select
                    className="relative h-10 w-full rounded-md border p-2"
                    name="replacementlevel"
                    placeholder="Select"
                    value={inputValuesReplace.replacementlevel}
                    onChange={handleInputChangeReplace}
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

            <div className={ReplacementStyles.Replacement_dropdown_table}>
              <table>
                <thead>
                  <tr>
                    <th style={{ color: "#f56a3f", padding: "20px" }}>Replaced Unit ID   </th>
                    <th style={{ color: "#f56a3f", padding: "20px" }}>Replacing Unit ID</th>
                    <th style={{ color: "#f56a3f", padding: "20px" }}>Type Of Defect</th>
                    <th style={{ color: "#f56a3f", padding: "20px" }}></th>
                  </tr>
                </thead>


                {Added.length > 0 ?
                  Added.map((val, id) => {
                    return (<>
                      <tr onDoubleClick={() => { handleEdit_Dropdown_rows(id) }}>
                        <td className="text-black text-sm">
                          <input
                            className="relative h-10 !w-80 rounded-md border p-2"
                            required
                            // type="text"
                            value={ReplacedUnitID[id]}
                            name="replacedUnitId"
                            placeholder="Replaced Unit ID"
                            disabled
                          />
                        </td>

                        <td className="text-black text-sm">
                          <select
                            required={(inputValuesReplace['replacementlevel'] == 'Actual Polling') ? true : false}
                            className="relative h-10 !w-80  rounded-md border p-2"
                            placeholder="Replacing Unit ID"
                            name="replacingUnitId"
                            value={ReplacingUnitID[id]}
                            onChange={(e) => handleInputChange_ReplacingUnitID(e, id)}
                          >
                            {" "}
                            <option hidden>Select</option>
                            {data2 &&
                              data2.map((st, index) => (
                                val['replacedUnitId'].slice(1, 3) == st['unitid'].slice(1, 3) && (flag[st['unitid']]['id'] == id || flag[st['unitid']]['flag'] == false) &&
                                <option value={st['unitid']} className="text-black">
                                  {st['unitid']}
                                </option>
                              ))}
                          </select>
                        </td>

                        <td className="text-black text-sm">
                          <select
                            required={true}
                            className="relative h-10 !w-80  rounded-md border p-2"
                            placeholder="Type Of Defect"
                            name="defectType"
                            value={Typeofdefect[id]}
                            onChange={(e) => handleInputChange_typeofdefect(e, id)}
                          >
                            {" "}
                            <option hidden>Select</option>
                            {data4 &&
                              data4.map((st) => (
                                <option value={st['defectId']} className="text-black">
                                  {st['defectName']}
                                </option>

                              ))}
                          </select>
                        </td>
                        <td className="text-black text-sm" onClick={() => handleRemoveClick_Dropdown_rows(id)}>{<Delete />}</td>
                      </tr>
                      <tr><td colSpan={4}><hr /></td></tr></>
                    )
                  }) :
                  <>
                    <tr >
                      <td className="text-black text-sm">
                        <input
                          className="relative h-10 !w-80 rounded-md border p-2"
                          required
                          // type="text"
                          name="replacedUnitId"
                          placeholder="Replaced Unit ID"
                          disabled
                        />
                      </td>

                      <td className="text-black text-sm">
                        <select
                          required
                          className="relative h-10 !w-80  rounded-md border p-2"
                          placeholder="Replacing Unit ID"
                          name="replacingUnitId"
                        >
                          {" "}
                          <option hidden>Select</option>
                        </select>
                      </td>

                      <td className="text-black text-sm">
                        <select
                          required
                          className="relative h-10 !w-80  rounded-md border p-2"
                          placeholder="Type Of Defect"
                          name="defectType"
                        >
                          {" "}
                          <option hidden>Select</option>

                        </select>
                      </td>
                    </tr>
                    <tr><td colSpan={4}><hr /></td></tr></>
                }
              </table>
            </div>
            {(inputValuesReplace['replacementlevel'] != '') && (Added.length > 0) && <button class={scheduleStyles.submitBtn} type='submit' style={{ marginBottom: "1%" }}> Submit </button>}
          </div>
        )
        }
      </form >
    </>
  );
};















