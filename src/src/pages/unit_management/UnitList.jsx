import { useState, useEffect, useMemo } from "react";
import styles from "./styles/UnitList.module.css";
import ReplacementStyles from './styles/UnitReplacementDropdown.module.css'
import { expD } from "./Homepage";
import { useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai"
import { ReactComponent as ChevronDown } from "../../assets/ChevronDown.svg";
import { ReactComponent as Delete } from "../../assets/Delete.svg";
import UnitListCard from "./components/UnitListCard";
import scheduleStyles from './styles/ScheduleFlc.module.css'
import { TagsInput } from "react-tag-input-component";
import UnitListEpmarkEpUnmark from "./components/UnitListEpmarkEpUnmark";
import Unitcountingdefective from "./components/Unitcountingdefective";
import { List } from "antd/lib/form/Form";
import { getRealm, formatRealm2, formatRealm3 } from '../../components/utils'
import Orders from './Orders';
const userID = sessionStorage.getItem("sessionToken");
const baseUrl = `${process.env.REACT_APP_API_SERVER}/unit`;


export default function UnitList() {

  const User_ID = sessionStorage.getItem("sessionToken");
  const Role = User_ID.substring(8)
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
    block: false,
    unblock: false,
    dispatch: false,
    destroy: false,
    FLC_Assembly: false,
    FLC_Scan: false,
    destruction: false,
    underfir: false,
    pollingfinished: false,
    countingfinished: false,
    countingdefective: false,
    undertna: false,
    receivingscan: false,
    unmarkfir: false,
    underloan: false,
    unmarkloan: false
  };


  const [ReplacedUnitID, setReplacedUnitID] = useState([]);
  const [UnitID, setUnitID] = useState([]);
  const [ReplacingUnitID, setReplacingUnitID] = useState([]);
  const [Typeofdefect, settypeofdefect] = useState([]);
  const [isEdit_Dropdown_rows, setEdit_Dropdown_rows] = useState(-1);
  const [cardVisibility, setCardVisibility] = useState(initialVisibilityValues);
  const [Added, setAdded] = useState([]);
  const [bgColor, setBgColor] = useState("")
  const [data, setData] = useState(expD);
  const [data2, setData2] = useState(expD);
  const [data3, setData3] = useState(expD);
  const [data4, setData4] = useState(expD);


  const getcountinglist = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_SERVER}/unit/listUnits/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          "status": "Counting"
          // 'electionType': ((Role == 'ARO') ? 'P' : ((Role == 'RO') ? 'A' : ''))
        }),
        credentials: "include",
      });

      let Input = await response.json();
      if (response.status == 200) {
        setData4(Input['data']);
      }
      else {
        setData4([]);
      }
      // }
    } catch (err) {
      console.log(err)
    }
  }


  useEffect(
    () => {
      let timer1 = setTimeout(() => getcountinglist(), 1 * 2000);
      return () => {
        clearTimeout(timer1);
      };
    },
    []
  );

  // const getData = async () => {
  //   try {
  //     const response = await fetch(`${process.env.REACT_APP_API_SERVER}/unit/listUnits/`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         // "status": "In Poll"
  //       }),
  //       credentials: "include",
  //     });

  //     let Input = await response.json();
  //     if (response.status == 200) {
  //       setData(Input['data']);
  //     }
  //     else {
  //       setData([]);
  //     }
  //     // }
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }


  // useEffect(
  //   () => {
  //     let timer1 = setTimeout(() => getData(), 1 * 500);
  //     return () => {
  //       clearTimeout(timer1);
  //     };
  //   },
  //   []
  // );



  // const getData2 = async () => {
  //   try {
  //     const response = await fetch(`${process.env.REACT_APP_API_SERVER}/unit/listUnits/`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         "status": "In Reserve"
  //       }),
  //       credentials: "include",
  //     });

  //     let Input = await response.json();
  //     if (response.status == 200) {
  //       setData2(Input['data']);
  //     }
  //     else {
  //       setData2([]);
  //     }

  //   } catch (err) {
  //     console.log(err)
  //   }
  // }



  // useEffect(
  //   () => {
  //     let timer1 = setTimeout(() => getData2(), 1 * 1000);
  //     return () => {
  //       clearTimeout(timer1);
  //     };
  //   },
  //   []
  // );


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
  //     let timer1 = setTimeout(() => getData3(), 1 * 1500);
  //     return () => {
  //       clearTimeout(timer1);
  //     };
  //   },
  //   []
  // );

  const [flag, setflag] = useState([]);
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

            })
            return kk;
          }
        );
      }

    }
  }


  useEffect(() => {
    if (data != [] && inputValuesReplace['replacementlevel'] == "Actual Polling") {
      if (Added.length != 0 && Added[Added.length - 1]['replacedUnitId'].slice(1, 3) != 'VT') {
        SetAll()
      }
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

  const UnitChecked = (Row, ID) => {
    if (!UnitID.includes(ID)) {
      setBgColor('#e4e7f1')
      setUnitID([...UnitID, ID])
      setUpdate(prev => (prev + 1))
    }
    else {
      let i = -1;
      if (window.confirm(`Are you sure ?`)) {
        const list_UnitId = [...UnitID];
        list_UnitId.splice(i, 1);
        setUnitID(list_UnitId)
      }
    }
  }


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
          // "": <div className="flex justify-end " style={{ marginLeft: "3%" }}><button type="button" className="text-white bg-orange-600 p-1 text-2xl w-8 h-8 -mt-4 " style={{ borderRadius: "50%", marginTop: "2%" }} >-</button></div>
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


  const handleRemoveClick_Dropdown_rows = (i, val) => {

    if (window.confirm(`Are you sure ?`)) {
      const prevvalue = val;
      const list_all = [...Added];
      list_all.splice(i, 1);
      const list_ReplacedUnitID = [...ReplacedUnitID];
      list_ReplacedUnitID.splice(i, 1);
      const list_ReplacingUnitID = [...ReplacingUnitID];
      list_ReplacingUnitID.splice(i, 1);
      const list_Typeofdefect = [...Typeofdefect];
      list_Typeofdefect.splice(i, 1);

      const list_flag = { ...flag }

      if (prevvalue != '') {

        list_flag[prevvalue]['id'] = -1;
        list_flag[prevvalue]['flag'] = false;
      }

      setflag(list_flag)
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
    list2[value]['id'] = value;

    setAdded(list1);
    setReplacingUnitID(list);
    setflag(list2);



    if (flag[value]['id'] != prevvalue) {
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
      <StatusUpdate setUnitID={setUnitID} UnitID={UnitID} isVisibleunmarkloan={cardVisibility.unmarkloan} isVisibleunderloan={cardVisibility.underloan} isVisibleunmarkfir={cardVisibility.unmarkfir} isVisiblepollingfinished={cardVisibility.pollingfinished} isVisiblecountingfinished={cardVisibility.countingfinished} isVisiblecountingdefective={cardVisibility.countingdefective} isVisibleundertna={cardVisibility.undertna} isVisiblereceivingscan={cardVisibility.receivingscan}
        isVisibleunderfir={cardVisibility.underfir} isVisibledestruction={cardVisibility.destruction} isVisibleFLC_Scan={cardVisibility.FLC_Scan} isVisibleFLC_Assembly={cardVisibility.FLC_Assembly}
        isVisibleepUnmarkForm={cardVisibility.epUnmarkForm} isVisibledestroyed={cardVisibility.destroy} isVisibledispatch={cardVisibility.dispatch} isVisibleepForm={cardVisibility.epForm} isVisibleblock={cardVisibility.block}
        isVisibleunblock={cardVisibility.unblock} activeButtons={cardVisibility} onButtonClick={handleButtonClick} flag={flag} data2={data2} initialInputValuesReplace={initialInputValuesReplace}
        setInputValuesReplace={setInputValuesReplace} inputValuesReplace={inputValuesReplace} handleInputChangeReplace={handleInputChangeReplace} isVisible={cardVisibility.replacementForm} Added={Added}
        handleInputChange_ReplacedUnitID={handleInputChange_ReplacedUnitID} handleInputChange_ReplacingUnitID={handleInputChange_ReplacingUnitID} handleInputChange_typeofdefect={handleInputChange_typeofdefect}
        handleEdit_Dropdown_rows={handleEdit_Dropdown_rows} Typeofdefect={Typeofdefect} ReplacingUnitID={ReplacingUnitID} ReplacedUnitID={ReplacedUnitID} handleRemoveClick_Dropdown_rows={handleRemoveClick_Dropdown_rows} />
      {cardVisibility.replacementForm == true ?
        <UnitListCard updateChecked={updateChecked} bgColor={bgColor} ReplacedUnitID={ReplacedUnitID} data={data} />
        :
        ((cardVisibility.countingdefective == true) ?
          <Unitcountingdefective UnitChecked={UnitChecked} bgColor={bgColor} UnitID={UnitID} data={data4} />
          : <UnitListEpmarkEpUnmark data={data3} />)
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

const StatusUpdate = ({ setUnitID, UnitID, isVisiblecountingdefective, isVisiblecountingfinished, isVisiblepollingfinished, isVisibleunmarkloan, isVisibleunderloan, isVisibleunmarkfir, isVisibleundertna, isVisibleunderfir, isVisibledestruction, isVisibleFLC_Scan, isVisibleFLC_Assembly, isVisibleepUnmarkForm, isVisibledestroyed, isVisibledispatch, isVisibleepForm, isVisibleblock, isVisibleunblock, activeButtons, onButtonClick, flag, data2, initialInputValuesReplace, setInputValuesReplace, inputValuesReplace, handleInputChangeReplace, isVisible, Added, handleInputChange_ReplacedUnitID, handleInputChange_ReplacingUnitID, handleInputChange_typeofdefect, handleEdit_Dropdown_rows, ReplacingUnitID, ReplacedUnitID, Typeofdefect, handleRemoveClick_Dropdown_rows }) => {
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

        <ActionButton
          isActive={activeButtons.block}
          text="Unit Block"
          name="block"
          onClick={onButtonClick}
        />
        <ActionButton
          isActive={activeButtons.unblock}
          text="Unit Unblock"
          name="unblock"
          onClick={onButtonClick}
        />
        <ActionButton
          isActive={activeButtons.dispatch}
          text="Dispatch/Recieve Orders"
          name="dispatch"
          onClick={onButtonClick}
        />
        <ActionButton
          isActive={activeButtons.FLC_Assembly}
          text="FLC Assembly"
          name="FLC_Assembly"
          onClick={onButtonClick}
        />
        <ActionButton
          isActive={activeButtons.FLC_Scan}
          text="FLC Scan"
          name="FLC_Scan"
          onClick={onButtonClick}
        />
        <ActionButton
          isActive={activeButtons.destruction}
          text="Unit Destruction"
          name="destruction"
          onClick={onButtonClick}
        />
        <ActionButton
          isActive={activeButtons.underfir}
          text="Under FIR"
          name="underfir"
          onClick={onButtonClick}
        />
        <ActionButton
          isActive={activeButtons.unmarkfir}
          text="Unmark FIR"
          name="unmarkfir"
          onClick={onButtonClick}
        />
        <ActionButton
          isActive={activeButtons.underloan}
          text="Under loan"
          name="underloan"
          onClick={onButtonClick}
        />
        <ActionButton
          isActive={activeButtons.unmarkloan}
          text="Unmark Loan"
          name="unmarkloan"
          onClick={onButtonClick}
        />
        <ActionButton
          isActive={activeButtons.pollingfinished}
          text="Polling Finished"
          name="pollingfinished"
          onClick={onButtonClick}
        />
        <ActionButton
          isActive={activeButtons.countingfinished}
          text="Counting Finished"
          name="countingfinished"
          onClick={onButtonClick}
        />
        <ActionButton
          isActive={activeButtons.countingdefective}
          text="Counting Defective"
          name="countingdefective"
          onClick={onButtonClick}
        />
        <ActionButton
          isActive={activeButtons.undertna}
          text="Under T&A"
          name="undertna"
          onClick={onButtonClick}
        />
      </div>

      <EPUnmarkForm isVisible={isVisibleepUnmarkForm} />
      <EPForm isVisible={isVisibleepForm} />
      <ReplacementForm flag={flag} data2={data2} initialInputValuesReplace={initialInputValuesReplace} setInputValuesReplace={setInputValuesReplace} inputValuesReplace={inputValuesReplace} handleInputChangeReplace={handleInputChangeReplace} isVisible={isVisible} Added={Added} handleInputChange_ReplacedUnitID={handleInputChange_ReplacedUnitID} handleInputChange_ReplacingUnitID={handleInputChange_ReplacingUnitID} handleInputChange_typeofdefect={handleInputChange_typeofdefect} handleEdit_Dropdown_rows={handleEdit_Dropdown_rows} Typeofdefect={Typeofdefect} ReplacingUnitID={ReplacingUnitID} ReplacedUnitID={ReplacedUnitID} handleRemoveClick_Dropdown_rows={handleRemoveClick_Dropdown_rows} />
      <UnBlock isVisible={isVisibleunblock} />
      <Block isVisible={isVisibleblock} />
      <Orders isVisible={isVisibledispatch} />
      <FLC_Assembly isVisible={isVisibleFLC_Assembly} />
      <FLC_Scan isVisible={isVisibleFLC_Scan} />
      <Destruction isVisible={isVisibledestruction} />
      <Underfir isVisible={isVisibleunderfir} />
      <UnderTnA isVisible={isVisibleundertna} />
      <Unmarkfir isVisible={isVisibleunmarkfir} />
      <Underloan isVisible={isVisibleunderloan} />
      <Unmarkloan isVisible={isVisibleunmarkloan} />
      <Pollingfinished isVisible={isVisiblepollingfinished} />
      <CountingFinished isVisible={isVisiblecountingfinished} />
      <CountingDefective isVisible={isVisiblecountingdefective} UnitID={UnitID} setUnitID={setUnitID} />
    </div >
  );
};

const Destroy = ({ isVisible }) => {
}
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
  const [ListDefective_Warehouse, setListDefective_Warehouse] = useState([]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };


  async function getListJ() {

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_SERVER}/warehouse/listWarehouses`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            "Type": 'J'
          }),
        })

      const data = await response.json();
      if (response.status == 200)
        setListDefective_Warehouse(data["data"])
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(
    () => {
      let timer1 = setTimeout(() => getListJ(), 1 * 1500);
      return () => {
        clearTimeout(timer1);
      };
    },
    []
  );


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
              <div className="m-2 text-left w-1/3">
                <label className="mb-2 w-full text-base">
                  Destination Location<span className="text-red-600">*</span>
                </label>
                <div className="relative text-[#494A59]">
                  <select
                    className="relative h-10 w-full rounded-md border p-2"
                    placeholder="Select"
                    name="destinationLocation"
                    value={inputValues.destinationLocation}
                    onChange={handleInputChange}
                  >
                    {" "}
                    <option hidden>Select</option>
                    {ListDefective_Warehouse &&
                      ListDefective_Warehouse.map((val, ind) => {
                        return (<>
                          <option value={val['warehouseid']}>{val['warehouseid']}</option>
                        </>)
                      })}
                  </select>
                  <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 -translate-x-1/2" />
                </div>
              </div>
            </div>
            <div className="w-full flex justify-around" style={{ marginTop: "2%" }}>
              <div className="m-2 text-left w-1/3">
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
              <div className="m-2 text-left w-1/3">
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
            <button class={scheduleStyles.submitBtn} type='submit' style={{ marginBottom: "1%" }}> Submit </button>
          </div>
        )
        }
      </form >
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
  const [ListDefective_Warehouse, setListDefective_Warehouse] = useState([]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  async function getListC() {

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_SERVER}/warehouse/listWarehouses`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            "Type": 'C'
          }),
        })

      const data = await response.json();
      if (response.status == 200)
        setListDefective_Warehouse(data["data"])
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(
    () => {
      let timer1 = setTimeout(() => getListC(), 1 * 1500);
      return () => {
        clearTimeout(timer1);
      };
    },
    []
  );


  const handleFormSubmit = async (e) => {
    let confirmation = window.confirm("Are you sure you have selected all the Unit")
    if (confirmation === true) {

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
          setInputValues(initialValues)
        } else {
          alert(data.message);
          setInputValues(initialValues)
          setFileData('')
        }
      } catch (err) {
        console.log(err);
      }
    } else {
    }
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    handleFormSubmit()

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
      <form onSubmit={onFormSubmit} className="w-full rounded-lg " styles={{ marginTop: "20%" }}>
        {isVisible && (
          <div styles={{ marginTop: "20%" }}>
            <div className="w-full flex justify-around">
              <div className="m-2 text-left w-1/4">
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

              <div className="m-2 text-left w-1/4">
                <label className="mb-2 w-full text-base">
                  Destination Location<span className="text-red-600">*</span>
                </label>
                <div className="relative text-[#494A59]">
                  <select
                    className="relative h-10 w-full rounded-md border p-2"
                    placeholder="Select"
                    name="destinationLocation"
                    value={inputValues.destinationLocation}
                    onChange={handleInputChange}
                  >
                    {" "}
                    <option hidden>Select</option>
                    {ListDefective_Warehouse &&
                      ListDefective_Warehouse.map((val, ind) => {
                        return (<>
                          <option value={val['warehouseid']}>{val['warehouseid']}</option>
                        </>)
                      })}
                  </select>
                  <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 -translate-x-1/2" />
                </div>
              </div>
              <div className="m-2 text-left w-1/4">
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
            </div>
            <div className="w-full flex justify-around" style={{ marginTop: "2%" }}>
              <div className="m-2 text-left w-1/4">
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

              <div className="m-2 text-left w-1/4">
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
            <button class={scheduleStyles.submitBtn} type='submit' style={{ marginBottom: "1%" }}> Submit </button>
          </div>
        )
        }
      </form >
    </>
  );
};


// Unit Replacement Card
const ReplacementForm = ({ flag, data2, initialInputValuesReplace, setInputValuesReplace, inputValuesReplace, handleInputChangeReplace, isVisible, Added, handleInputChange_ReplacedUnitID, handleInputChange_ReplacingUnitID, handleInputChange_typeofdefect, handleEdit_Dropdown_rows, ReplacingUnitID, ReplacedUnitID, Typeofdefect, handleRemoveClick_Dropdown_rows }) => {


  const [assemblyList, setAssemblyList] = useState([]);
  const [data4, setData4] = useState();
  const [isPageLoaded1, setIsPageLoaded1] = useState(0)

  console.log(flag, 'flag')

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


  useEffect(
    () => {
      let timer1 = setTimeout(() => getData(), 1 * 1000);
      return () => {
        clearTimeout(timer1);
      };
    },
    []
  );



  const callpollingstation = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_SERVER}/unit/fetch-polling-stations/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          ac_no: User_ID.slice(5, 8)
        })
      });

      const Input = await response.json();

      if (response.status == 200) {
        setAssemblyList(Input['data'][User_ID.slice(5, 8)]['ps'])
      }

    } catch (err) {
      console.log(err)
    }
  }



  useEffect(
    () => {
      let timer1 = setTimeout(() => callpollingstation(), 1 * 1000);
      return () => {
        clearTimeout(timer1);
      };
    },
    []
  );


  const handleFormSubmit = async (Finalanswer) => {
    try {
      const response = await fetch(`${baseUrl}/replace_unit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          "replacementLevel": inputValuesReplace['replacementlevel'],
          "lstReplacingUnits": Finalanswer

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
  };


  const User_ID = sessionStorage.getItem("sessionToken");
  const Role = User_ID.substring(8)

  const onFormSubmit = async (e) => {
    e.preventDefault();
    let Finalanswer = [];
    let total = 0;
    // let vt = 0;
    // let cu = 0;
    // let bu = 0;
    if (inputValuesReplace['replacementlevel'] != 'Actual Polling') {
      for (let k = 0; k < ReplacedUnitID.length; k++) {
        if (ReplacingUnitID[k] == '' || Typeofdefect[k] == '') {
          total = total + 1;
        }
        Finalanswer.push({
          "replacingUnitId": ReplacingUnitID[k],
          "replacedUnitId": ReplacedUnitID[k],
          "defectType": Typeofdefect[k],
        })
      }
      if (total == 0)
        handleFormSubmit(Finalanswer)
      else {
        alert('Fill all enteries')
      }
    }
    else {
      for (let k = 0; k < ReplacedUnitID.length; k++) {
        Finalanswer.push({
          "replacingUnitId": ReplacingUnitID[k],
          "replacedUnitId": ReplacedUnitID[k],
          "defectType": Typeofdefect[k],
        })
      }
      handleFormSubmit(Finalanswer)
    }
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
                    disabled={(Role == 'RO' || Role == 'PCRO') ? false : true}
                    className="relative h-10 w-full rounded-md border p-2"
                    name="pollingstation"
                    placeholder="Select"
                    value={inputValuesReplace.pollingstation}
                    onChange={handleInputChangeReplace}
                  >
                    {" "}
                    <option hidden>Select</option>

                    {assemblyList && assemblyList.map((val) => (
                      <option value={val['ps_no']}>{val['ps_name']}</option>
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
                    disabled={(Role == 'RO' || Role == 'PCRO') ? false : true}
                    className="relative h-10 w-full rounded-md border p-2"
                    name="replacementlevel"
                    placeholder="Select"
                    value={inputValuesReplace.replacementlevel}
                    onChange={handleInputChangeReplace}
                  >
                    {" "}
                    <option hidden>Select</option>
                    <option>Commissioning</option>
                    <option>Dispersal</option>
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
                                val['replacedUnitId'].slice(1, 3) == st['unitid'].slice(1, 3) && (flag && flag[st['unitid']]['id'] == ReplacingUnitID[id] || flag[st['unitid']]['flag'] == false) &&
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
                        <td className="text-black text-sm" onClick={() => handleRemoveClick_Dropdown_rows(id, ReplacingUnitID[id])}>{<Delete />}</td>
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
                          disabled
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
                          disabled
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


const Block = ({ isVisible }) => {
  const initialValues = {
    unitIDList: "",
    Location: "",
    remark: "",
  };
  const [inputValues, setInputValues] = useState(initialValues);
  const [ListDefective_Warehouse, setListDefective_Warehouse] = useState([]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };


  async function getListK() {

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_SERVER}/warehouse/listWarehouses`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            "Type": 'K'
          }),
        })

      const data = await response.json();
      if (response.status == 200)
        setListDefective_Warehouse(data["data"])
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(
    () => {
      let timer1 = setTimeout(() => getListK(), 1 * 1500);
      return () => {
        clearTimeout(timer1);
      };
    },
    []
  );


  const handleFormSubmit = async (e) => {

    try {
      const response = await fetch(`${baseUrl}/blockUnit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          "unitIDList": [inputValues['unitIDList']],
          "Location": inputValues['Location'],
          "remark": inputValues['remark']
        }),
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

  const onFormSubmit = async (e) => {
    handleFormSubmit()

  };


  return (
    <>
      <form onSubmit={onFormSubmit} className="w-full rounded-lg " styles={{ marginTop: "20%" }}>
        {isVisible && (
          <div styles={{ marginTop: "20%" }}>
            <div className="w-full flex justify-around">
              <div className="m-2 w-1/3 text-left">
                <label className="mb-2 w-full text-base">
                  Unit ID
                  <span className="text-red-600">*</span>
                </label>
                <div className="relative text-gray-800">
                  <input
                    required
                    className="h-10 w-full rounded-md bg-zinc-100 p-2 px-5 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                    name="unitIDList"
                    placeholder='Unit ID'
                    value={inputValues.unitIDList}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="m-2 w-1/3 text-left">
                <label className="mb-2 w-full text-base">
                  Warehouse<span className="text-red-600">*</span>
                </label>
                <div className="relative text-[#494A59]">
                  <select
                    required
                    className="relative h-10 w-full rounded-md border p-2"
                    name="Location"
                    placeholder="Select"
                    value={inputValues.Location}
                    onChange={handleInputChange}
                  >
                    {" "}
                    <option hidden>Select</option>
                    {ListDefective_Warehouse &&
                      ListDefective_Warehouse.map((val, ind) => {
                        return (<>
                          <option value={val['warehouseid']}>{val['warehouseid']}</option>
                        </>)
                      })}

                  </select>
                  <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 -translate-x-1/2" />
                </div>
              </div>

            </div>
            <div>
              <div className="m-2 w-1/3 text-left" style={{ marginLeft: '35%', marginTop: '2%' }}>
                <label className="mb-2 w-full text-base">
                  Remarks<span className="text-red-600">*</span>
                </label>
                <div className="relative text-gray-800">
                  <input
                    className="h-40 w-full rounded-md bg-zinc-100 p-2 px-5 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                    name="remark"
                    placeholder="Remarks"
                    value={inputValues.remark}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <button class={scheduleStyles.submitBtn} type='submit' style={{ marginBottom: "1%" }}> Submit </button>
          </div>
        )
        }
      </form >
    </>
  );
};


const UnBlock = ({ isVisible }) => {
  const initialValues = {
    unitIDList: "",
    Location: "",
    remark: "",
  };


  const [inputValues, setInputValues] = useState(initialValues);
  const [ListDefective_Warehouse, setListDefective_Warehouse] = useState([]);
  const [ids, setids] = useState([]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };


  async function getListK() {

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_SERVER}/warehouse/listWarehouses`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            "Type": 'C'
          }),
        })

      const data = await response.json();
      if (response.status == 200)
        setListDefective_Warehouse(data["data"])
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(
    () => {
      let timer1 = setTimeout(() => getListK(), 1 * 1500);
      return () => {
        clearTimeout(timer1);
      };
    },
    []
  );


  const handleFormSubmit = async (e) => {

    try {
      const response = await fetch(`${baseUrl}/unblock_unit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(
          {
            "unitIDList": ids,
            "Location": inputValues['Location'],
            "remark": inputValues['remark']

          }),
      });
      const data = await response.json();
      if (data.status === 200) {
        alert(data.message);
        setids([])
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert(`Error occured: ${err}`);
    }
    setInputValues(initialValues);
  };

  const onFormSubmit = async (e) => {
    handleFormSubmit()

  };


  return (

    <>
      <form onSubmit={onFormSubmit} className="w-full rounded-lg " styles={{ marginTop: "20%" }}>
        {isVisible && (
          <div styles={{ marginTop: "20%" }}>
            <div className="w-full flex justify-around">
              <div className="m-2 w-1/3 text-left">
                <label className="mb-2 w-full text-base">
                  Unit Id
                  <span className="text-red-600">*</span>
                </label>
                <div className="relative text-gray-800">
                  <TagsInput
                    className='li_noti hide-scroll-bar tagInput p-2'
                    value={ids}
                    id="formTags"
                    onChange={setids}
                    placeHolder="WB00000CEO, AP00000DEO"
                  />
                </div>
              </div>

              <div className="m-2 w-1/3 text-left">
                <label className="mb-2 w-full text-base">
                  Warehouse<span className="text-red-600">*</span>
                </label>
                <div className="relative text-[#494A59]">
                  <select
                    required
                    className="relative h-10 w-full rounded-md border p-2"
                    name="Location"
                    placeholder="Select"
                    value={inputValues.Location}
                    onChange={handleInputChange}
                  >
                    {" "}
                    <option hidden>Select</option>
                    {ListDefective_Warehouse &&
                      ListDefective_Warehouse.map((val, ind) => {
                        return (<>
                          <option value={val['warehouseid']}>{val['warehouseid']}</option>
                        </>)
                      })}

                  </select>
                  <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 -translate-x-1/2" />
                </div>
              </div>

            </div>
            <div>
              <div className="m-2 w-1/3 text-left" style={{ marginLeft: '37%', marginTop: '2%' }}>
                <label className="mb-2 w-full text-base">
                  Remarks<span className="text-red-600"></span>
                </label>
                <div className="relative text-gray-800">
                  <input
                    className="h-40 w-full rounded-md bg-zinc-100 p-2 px-5 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                    name="remark"
                    placeholder="Remarks"
                    value={inputValues.remark}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <button class={scheduleStyles.submitBtn} type='submit' style={{ marginBottom: "1%" }}> Submit </button>
          </div>

        )
        }
      </form >
    </>
  );
};


const FLC_Assembly = ({ isVisible }) => {



  const initialValues = {
    state: "",
    district: "",
    remark: "",
  };


  const [inputValues, setInputValues] = useState(initialValues);
  const [data, setdata] = useState(initialValues);
  const [State, setState] = useState([]);
  const [District, setDistrict] = useState([]);
  const [dataInput, setDataInput] = useState([""]);
  const [listElections, setListElections] = useState([])
  const [electionid, setelectionid] = useState(-1)

  async function getListElections() {

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_SERVER}/unit/listElections`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        })
      const data = await response.json();
      if (response.status == 200) {
        setListElections(data['data'])
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(
    () => {
      let timer1 = setTimeout(() => getListElections(), 1 * 1000);

      return () => {
        clearTimeout(timer1);
      };
    },
    []
  );

  const handleFormSubmit = async () => {
    try {
      const response = await fetch(`${baseUrl}/flc_assembly_scan`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          "unitIDs": dataInput,
          "electionID": Number(electionid),
          "state": inputValues['state'],
          "district": inputValues['district']
        }
        ),
      });
      const data = await response.json();
      if (data.status === 200) {
        alert(data.message);
      } else {
        alert(data.message);
        setInputValues(initialValues)
        setelectionid(-1);
        setDataInput('')
      }
    } catch (err) {
      alert(`Error occured: ${err}`);
    }

  };


  async function getRealm() {

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_SERVER}/user/getRealm`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: 'include',
          body: JSON.stringify({
            "module_name": "Unit",
            "operation": "FLCAssembly"
          }),
        }
      )

      const Input = await response.json();

      if (response.status === 200) {
        setdata(Input['data'])
        let state = formatRealm2(Input['data'], '', '', '', '');
        setState(state)
      }
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(
    () => {
      let timer1 = setTimeout(() => getRealm(), 1 * 1000);

      return () => {
        clearTimeout(timer1);
      };
    },
    []
  );


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues({
      ...inputValues,
      [name]: value,
    });

    if (name == "state") {
      let district = formatRealm2(data, value, '', '', '');
      setDistrict(district)
    }
  };

  const User_ID = sessionStorage.getItem("sessionToken");
  const Role = User_ID.substring(8)

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
                  Election<span className="text-red-600">*</span>
                </label>
                <div className="relative text-[#494A59]">
                  <select

                    className="relative h-10 w-full rounded-md border p-2"
                    name="setelectionid"
                    placeholder="Select"
                    value={electionid}
                    onChange={(e) => {
                      setelectionid(e.target.value)
                    }}
                  >
                    {" "}
                    <option hidden>Select</option>
                    {listElections &&
                      listElections.map((val, ind) => {
                        return (<>
                          <option value={val.election_id}>{`${val.electiontype} ${val.startdate.slice(6, 11)}`}</option>
                        </>)
                      })}
                  </select>
                  <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 -translate-x-1/2" />
                </div>
              </div>

              <div className="m-2 text-left w-1/3">
                <label className="mb-2 w-full text-base">
                  State<span className="text-red-600">*</span>
                </label>
                <div className="relative text-[#494A59]">
                  <select

                    className="relative h-10 w-full rounded-md border p-2"
                    name="state"
                    placeholder="Select"
                    value={inputValues.state}
                    onChange={handleInputChange}
                  >
                    {" "}
                    <option hidden>Select</option>
                    {State &&
                      State.map((val, ind) => {
                        return (<>
                          <option value={val['stCode']}>{val['stName']}</option>
                        </>)
                      })}
                  </select>
                  <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 -translate-x-1/2" />
                </div>
              </div>

            </div>
            <div className="w-full flex justify-around">
              <div className="m-2 w-1/3 text-left">
                <label className="mb-2 w-full text-base">
                  District<span className="text-red-600">*</span>
                </label>
                <div className="relative text-[#494A59]">
                  <select
                    disabled={inputValues['state'] != '' ? false : true}
                    className="relative h-10 w-full rounded-md border p-2"
                    placeholder="Select"
                    name="district"
                    value={inputValues.district}
                    onChange={handleInputChange}
                  >
                    {" "}
                    <option hidden>Select</option>
                    {District &&
                      District.map((val, ind) => {
                        return (<>
                          <option value={val['dtCode']}>{val['dtName']}</option>
                        </>)
                      })}
                  </select>
                  <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 -translate-x-1/2" />
                </div>
              </div>

              <div className="m-2 w-1/3 text-left" >
                <label className="mb-2 w-full text-base">
                  Unit ID's<span className="text-red-600">*</span>
                </label>
                <div className="relative text-[#494A59]">
                  <div className="w-full">
                    <textarea name="" id="" cols="60" className='p-2' rows={10}
                      style={{ width: '100%' }}
                      onChange={(e) => {
                        setDataInput(e.target.value)
                      }}
                      value={dataInput}

                    ></textarea>
                  </div>
                </div>
              </div>
            </div>

            <button class={scheduleStyles.submitBtn} type='submit' style={{ marginBottom: "1%" }}> Submit </button>
          </div>
        )
        }
      </form >
    </>
  );
};



const FLC_Scan = ({ isVisible }) => {



  const initialValues = {
    state: "",
    district: "",
    remark: "",
    type: '',
  };


  const [inputValues, setInputValues] = useState(initialValues);
  const [data, setdata] = useState(initialValues);
  const [State, setState] = useState([]);
  const [District, setDistrict] = useState([]);
  const [dataInput, setDataInput] = useState([""]);
  const [listElections, setListElections] = useState([])
  const [electionid, setelectionid] = useState(-1)

  async function getListElections() {

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_SERVER}/unit/listElections`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        })
      const data = await response.json();
      if (response.status == 200) {
        setListElections(data['data'])
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(
    () => {
      let timer1 = setTimeout(() => getListElections(), 1 * 1000);

      return () => {
        clearTimeout(timer1);
      };
    },
    []
  );

  const handleFormSubmit = async () => {
    try {
      const response = await fetch(`${baseUrl}/flc_scan`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          "type": inputValues['type'],
          "unitIDs": [dataInput],
          "electionID": Number(electionid),
          "state": inputValues['state'],
          "district": inputValues['district']
        }
        ),
      });
      const data = await response.json();
      if (data.status === 200) {
        alert(data.message);
      } else {
        alert(data.message);
        setInputValues(initialValues)
        setelectionid(-1);
        setDataInput('')
      }
    } catch (err) {
      alert(`Error occured: ${err}`);
    }

  };


  async function getRealm() {

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_SERVER}/user/getRealm`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: 'include',
          body: JSON.stringify({
            "module_name": "Unit",
            "operation": "FLCAssembly"
          }),
        }
      )

      const Input = await response.json();

      if (response.status === 200) {
        setdata(Input['data'])
        let state = formatRealm2(Input['data'], '', '', '', '');
        setState(state)
      }
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(
    () => {
      let timer1 = setTimeout(() => getRealm(), 1 * 1000);

      return () => {
        clearTimeout(timer1);
      };
    },
    []
  );


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues({
      ...inputValues,
      [name]: value,
    });

    if (name == "state") {
      let district = formatRealm2(data, value, '', '', '');
      setDistrict(district)
    }
  };

  const User_ID = sessionStorage.getItem("sessionToken");
  const Role = User_ID.substring(8)

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

              <div className="m-2 text-left w-1/4">
                <label className="mb-2 w-full text-base">
                  Election<span className="text-red-600">*</span>
                </label>
                <div className="relative text-[#494A59]">
                  <select

                    className="relative h-10 w-full rounded-md border p-2"
                    name="setelectionid"
                    placeholder="Select"
                    value={electionid}
                    onChange={(e) => {
                      setelectionid(e.target.value)
                    }}
                  >
                    {" "}
                    <option hidden>Select</option>
                    {listElections &&
                      listElections.map((val, ind) => {
                        return (<>
                          <option value={val.election_id}>{`${val.electiontype} ${val.startdate.slice(6, 11)}`}</option>
                        </>)
                      })}
                  </select>
                  <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 -translate-x-1/2" />
                </div>
              </div>

              <div className="m-2 text-left w-1/4">
                <label className="mb-2 w-full text-base">
                  State<span className="text-red-600">*</span>
                </label>
                <div className="relative text-[#494A59]">
                  <select

                    className="relative h-10 w-full rounded-md border p-2"
                    name="state"
                    placeholder="Select"
                    value={inputValues.state}
                    onChange={handleInputChange}
                  >
                    {" "}
                    <option hidden>Select</option>
                    {State &&
                      State.map((val, ind) => {
                        return (<>
                          <option value={val['stCode']}>{val['stName']}</option>
                        </>)
                      })}
                  </select>
                  <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 -translate-x-1/2" />
                </div>
              </div>

              <div className="m-2 w-1/4 text-left">
                <label className="mb-2 w-full text-base">
                  District<span className="text-red-600">*</span>
                </label>
                <div className="relative text-[#494A59]">
                  <select
                    disabled={inputValues['state'] != '' ? false : true}
                    className="relative h-10 w-full rounded-md border p-2"
                    placeholder="Select"
                    name="district"
                    value={inputValues.district}
                    onChange={handleInputChange}
                  >
                    {" "}
                    <option hidden>Select</option>
                    {District &&
                      District.map((val, ind) => {
                        return (<>
                          <option value={val['dtCode']}>{val['dtName']}</option>
                        </>)
                      })}
                  </select>
                  <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 -translate-x-1/2" />
                </div>
              </div>
            </div>

            <div className="w-full flex justify-around" >
              <div className="m-2 text-left w-1/4" >
                <label className="mb-2 w-full text-base">
                  Type<span className="text-red-600">*</span>
                </label>
                <div className="relative text-[#494A59]">
                  <select

                    className="relative h-10 w-full rounded-md border p-2"
                    name="type"
                    placeholder="Select"
                    value={inputValues.type}
                    onChange={handleInputChange}
                  >
                    {" "}
                    <option hidden>Select</option>
                    <option value={'true'}>FLC OK</option>
                    <option value={"false"}>FLC not OK</option>

                  </select>
                  <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 -translate-x-1/2" />
                </div>
              </div>


              <div className="m-2 text-left w-7/12" >
                <label className="mb-2 w-full text-base" >
                  Unit ID's<span className="text-red-600">*</span>
                </label>
                <div className="relative text-[#494A59]">
                  <div className="w-full">
                    <textarea name="" id="" cols="200" className='p-2' rows={10}
                      style={{
                        "width": "100%"
                      }}
                      onChange={(e) => {
                        setDataInput(e.target.value)
                      }}
                      value={dataInput}

                    ></textarea>
                  </div>
                </div>
              </div>
            </div>

            <button class={scheduleStyles.submitBtn} type='submit' style={{ marginBottom: "1%" }}> Submit </button>
          </div>
        )
        }
      </form >
    </>
  );
};



const Destruction = ({ isVisible }) => {

  const [dataInput, setDataInput] = useState([""]);

  const handleFormSubmit = async () => {
    try {
      const response = await fetch(`${baseUrl}/unitDestruction`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          "unitIDList": [dataInput],
        }
        ),
      });
      const data = await response.json();
      if (data.status === 200) {
        alert(data.message);
      } else {
        alert(data.message);
        setDataInput('')
      }
    } catch (err) {
      alert(`Error occured: ${err}`);
    }

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
            <div className="m-2 w-1/3 text-left" style={{ marginLeft: '34%' }}>
              <label className="mb-2 w-full text-base">
                Unit ID<span className="text-red-600">*</span>
              </label>
              <input
                className="h-10 w-full rounded-md bg-zinc-100 p-2 px-5 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Unit IDs"
                value={dataInput}
                onChange={(e) => {
                  setDataInput(e.target.value)
                }}
              />
            </div>

            <button class={scheduleStyles.submitBtn} type='submit' style={{ marginBottom: "1%" }}> Submit </button>
          </div>
        )
        }
      </form >
    </>
  );
};


const Underfir = ({ isVisible }) => {




  const [dataInput, setDataInput] = useState([""]);
  const [unitid, setunitid] = useState('')


  const handleFormSubmit = async () => {
    try {
      const response = await fetch(`${baseUrl}/markFIR`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          "unitIDList": [unitid],
          "remark": dataInput
        }
        ),
      });
      const data = await response.json();
      if (data.status === 200) {
        alert(data.message);
      } else {
        alert(data.message);
        setunitid('')
        setDataInput('')
      }
    } catch (err) {
      alert(`Error occured: ${err}`);
    }

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
              <div className="m-2 w-1/3 text-left">
                <label className="mb-2 w-full text-base">
                  Unit ID<span className="text-red-600">*</span>
                </label>
                <div className="relative text-gray-800">
                  <input
                    className="h-10 w-full rounded-md bg-zinc-100 p-2 px-5 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                    onChange={(e) => { setunitid(e.target.value) }}
                    value={unitid}
                    placeholder='Unit ID'
                  />
                </div>
              </div>

              <div className="m-2 w-1/3 text-left" >
                <label className="mb-2 w-full text-base">
                  Remarks<span className="text-red-600">*</span>
                </label>
                <div className="relative text-[#494A59]">
                  <div className="w-full">
                    <textarea name="" id="" cols="60" className='p-2' rows={10}
                      style={{ width: '100%' }}
                      onChange={(e) => {
                        setDataInput(e.target.value)
                      }}
                      value={dataInput}
                      placeholder='Remarks'
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>

            <button class={scheduleStyles.submitBtn} type='submit' style={{ marginBottom: "1%" }}> Submit </button>
          </div>
        )
        }
      </form >
    </>
  );
};


const UnderTnA = ({ isVisible }) => {



  const initialValues = {
    state: "",
    district: "",
    remark: "",
    type: '',
  };


  const [inputValues, setInputValues] = useState(initialValues);
  const [data, setdata] = useState(initialValues);
  const [State, setState] = useState([]);
  const [District, setDistrict] = useState([]);
  const [dataInput, setDataInput] = useState([""]);
  const [listElections, setListElections] = useState([])
  const [electionid, setelectionid] = useState(-1)

  async function getListElections() {

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_SERVER}/unit/listElections`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        })
      const data = await response.json();
      if (response.status == 200) {
        setListElections(data['data'])
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(
    () => {
      let timer1 = setTimeout(() => getListElections(), 1 * 1000);

      return () => {
        clearTimeout(timer1);
      };
    },
    []
  );

  const handleFormSubmit = async () => {
    try {
      const response = await fetch(`${baseUrl}/taScan`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          "unitIDs": dataInput,
          "district": inputValues['district'],
          "state": inputValues['state'],
          "electionID": electionid
        }
        ),
      });
      const data = await response.json();
      if (data.status === 200) {
        alert(data.message);
      } else {
        alert(data.message);
        setInputValues(initialValues)
        setelectionid(-1);
        setDataInput('')
      }
    } catch (err) {
      alert(`Error occured: ${err}`);
    }

  };


  async function getRealm() {

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_SERVER}/user/getRealm`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: 'include',
          body: JSON.stringify({
            "module_name": "Unit",
            "operation": "FLCAssembly"
          }),
        }
      )

      const Input = await response.json();

      if (response.status === 200) {
        setdata(Input['data'])
        let state = formatRealm2(Input['data'], '', '', '', '');
        setState(state)
      }
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(
    () => {
      let timer1 = setTimeout(() => getRealm(), 1 * 1000);

      return () => {
        clearTimeout(timer1);
      };
    },
    []
  );


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues({
      ...inputValues,
      [name]: value,
    });

    if (name == "state") {
      let district = formatRealm2(data, value, '', '', '');
      setDistrict(district)
    }
  };

  const User_ID = sessionStorage.getItem("sessionToken");
  const Role = User_ID.substring(8)

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

              <div className="m-2 text-left w-1/4">
                <label className="mb-2 w-full text-base">
                  Election<span className="text-red-600">*</span>
                </label>
                <div className="relative text-[#494A59]">
                  <select

                    className="relative h-10 w-full rounded-md border p-2"
                    name="setelectionid"
                    placeholder="Select"
                    value={electionid}
                    onChange={(e) => {
                      setelectionid(e.target.value)
                    }}
                  >
                    {" "}
                    <option hidden>Select</option>
                    {listElections &&
                      listElections.map((val, ind) => {
                        return (<>
                          <option value={val.election_id}>{`${val.electiontype} ${val.startdate.slice(6, 11)}`}</option>
                        </>)
                      })}
                  </select>
                  <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 -translate-x-1/2" />
                </div>
              </div>

              <div className="m-2 text-left w-1/4">
                <label className="mb-2 w-full text-base">
                  State<span className="text-red-600">*</span>
                </label>
                <div className="relative text-[#494A59]">
                  <select

                    className="relative h-10 w-full rounded-md border p-2"
                    name="state"
                    placeholder="Select"
                    value={inputValues.state}
                    onChange={handleInputChange}
                  >
                    {" "}
                    <option hidden>Select</option>
                    {State &&
                      State.map((val, ind) => {
                        return (<>
                          <option value={val['stCode']}>{val['stName']}</option>
                        </>)
                      })}
                  </select>
                  <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 -translate-x-1/2" />
                </div>
              </div>

              <div className="m-2 w-1/4 text-left">
                <label className="mb-2 w-full text-base">
                  District<span className="text-red-600">*</span>
                </label>
                <div className="relative text-[#494A59]">
                  <select
                    disabled={inputValues['state'] != '' ? false : true}
                    className="relative h-10 w-full rounded-md border p-2"
                    placeholder="Select"
                    name="district"
                    value={inputValues.district}
                    onChange={handleInputChange}
                  >
                    {" "}
                    <option hidden>Select</option>
                    {District &&
                      District.map((val, ind) => {
                        return (<>
                          <option value={val['dtCode']}>{val['dtName']}</option>
                        </>)
                      })}
                  </select>
                  <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 -translate-x-1/2" />
                </div>
              </div>
            </div>

            <div className="w-full flex justify-around" >
              <div className="m-2 text-left w-7/12" >
                <label className="mb-2 w-full text-base" >
                  Unit ID's<span className="text-red-600">*</span>
                </label>
                <div className="relative text-[#494A59]">
                  <div className="w-full">
                    <textarea name="" id="" cols="200" className='p-2' rows={10}
                      style={{
                        "width": "100%"
                      }}
                      onChange={(e) => {
                        setDataInput(e.target.value)
                      }}
                      value={dataInput}

                    ></textarea>
                  </div>
                </div>
              </div>
            </div>

            <button class={scheduleStyles.submitBtn} type='submit' style={{ marginBottom: "1%" }}> Submit </button>
          </div>
        )
        }
      </form >
    </>
  );
};

const Unmarkfir = ({ isVisible }) => {




  const [dataInput, setDataInput] = useState([""]);
  const [unitid, setunitid] = useState('')


  const handleFormSubmit = async () => {
    try {
      const response = await fetch(`${baseUrl}/UnmarkFIR`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          "unitIDList": [unitid],
          "remark": dataInput
        }
        ),
      });
      const data = await response.json();
      if (data.status === 200) {
        alert(data.message);
      } else {
        alert(data.message);
        setunitid('')
        setDataInput('')
      }
    } catch (err) {
      alert(`Error occured: ${err}`);
    }

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
              <div className="m-2 w-1/3 text-left">
                <label className="mb-2 w-full text-base">
                  Unit ID<span className="text-red-600">*</span>
                </label>
                <div className="relative text-gray-800">
                  <input
                    className="h-10 w-full rounded-md bg-zinc-100 p-2 px-5 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                    onChange={(e) => { setunitid(e.target.value) }}
                    value={unitid}
                    placeholder='Unit ID'
                  />
                </div>
              </div>

              <div className="m-2 w-1/3 text-left" >
                <label className="mb-2 w-full text-base">
                  Remarks<span className="text-red-600">*</span>
                </label>
                <div className="relative text-[#494A59]">
                  <div className="w-full">
                    <textarea name="" id="" cols="60" className='p-2' rows={10}
                      style={{ width: '100%' }}
                      onChange={(e) => {
                        setDataInput(e.target.value)
                      }}
                      value={dataInput}
                      placeholder='Remarks'
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>

            <button class={scheduleStyles.submitBtn} type='submit' style={{ marginBottom: "1%" }}> Submit </button>
          </div>
        )
        }
      </form >
    </>
  );
};


const Underloan = ({ isVisible }) => {




  const [dataInput, setDataInput] = useState([""]);
  const [unitid, setunitid] = useState([''])

  const handleFormSubmit = async () => {
    try {
      const response = await fetch(`${baseUrl}/UnderLoan`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          "unitIDList": unitid,
          "remark": dataInput
        }
        ),
      });
      const data = await response.json();
      if (data.status === 200) {
        alert(data.message);
      } else {
        alert(data.message);
        setunitid('')
        setDataInput('')
      }
    } catch (err) {
      alert(`Error occured: ${err}`);
    }

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
              <div className="m-2 w-1/3 text-left" >
                <label className="mb-2 w-full text-base">
                  Unit Id's<span className="text-red-600">*</span>
                </label>
                <div className="relative text-[#494A59]">
                  <div className="w-full">
                    <textarea name="" id="" cols="60" className='p-2' rows={10}
                      style={{ width: '100%' }}
                      onChange={(e) => {
                        setunitid(e.target.value)
                      }}
                      value={unitid}
                      placeholder='unitids'
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="m-2 w-1/3 text-left" >
                <label className="mb-2 w-full text-base">
                  Remarks<span className="text-red-600">*</span>
                </label>
                <div className="relative text-[#494A59]">
                  <div className="w-full">
                    <textarea name="" id="" cols="60" className='p-2' rows={10}
                      style={{ width: '100%' }}
                      onChange={(e) => {
                        setDataInput(e.target.value)
                      }}
                      value={dataInput}
                      placeholder='Remarks'
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>

            <button class={scheduleStyles.submitBtn} type='submit' style={{ marginBottom: "1%" }}> Submit </button>
          </div>
        )
        }
      </form >
    </>
  );
};


const Unmarkloan = ({ isVisible }) => {



  const [dataInput, setDataInput] = useState([""]);
  const [unitid, setunitid] = useState([''])
  const handleFormSubmit = async () => {
    try {
      const response = await fetch(`${baseUrl}/UnmarkLoan`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          "unitIDList": unitid,
          "remark": dataInput
        }
        ),
      });
      const data = await response.json();
      if (data.status === 200) {
        alert(data.message);
      } else {
        alert(data.message);
        setunitid('')
        setDataInput('')
      }
    } catch (err) {
      alert(`Error occured: ${err}`);
    }
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
              <div className="m-2 w-1/3 text-left" >
                <label className="mb-2 w-full text-base">
                  Unit Id's<span className="text-red-600">*</span>
                </label>
                <div className="relative text-[#494A59]">
                  <div className="w-full">
                    <textarea name="" id="" cols="60" className='p-2' rows={10}
                      style={{ width: '100%' }}
                      onChange={(e) => {
                        setunitid(e.target.value)
                      }}
                      value={unitid}
                      placeholder='unitids'
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="m-2 w-1/3 text-left" >
                <label className="mb-2 w-full text-base">
                  Remarks<span className="text-red-600">*</span>
                </label>
                <div className="relative text-[#494A59]">
                  <div className="w-full">
                    <textarea name="" id="" cols="60" className='p-2' rows={10}
                      style={{ width: '100%' }}
                      onChange={(e) => {
                        setDataInput(e.target.value)
                      }}
                      value={dataInput}
                      placeholder='Remarks'
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>

            <button class={scheduleStyles.submitBtn} type='submit' style={{ marginBottom: "1%" }}> Submit </button>
          </div>
        )
        }
      </form >
    </>
  );
};



// Unit Replacement Card
const Pollingfinished = ({ isVisible }) => {


  const handleFormSubmit = async (Finalanswer) => {
    try {
      const response = await fetch(`${baseUrl}/pollingFinished`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          "aclist": Finalanswer
        }
        ),
      });
      const data = await response.json();
      if (data.status === 200) {
        alert(data.message);
        setAc([])
        setwarehouse([])
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert(`Error occured: ${err}`);
    }
    // setInputValuesReplace(initialInputValuesReplace);
  };


  const User_ID = sessionStorage.getItem("sessionToken");
  const Role = User_ID.substring(8)
  const [Added, setAdded] = useState([])
  const [ListWarehouse, setListWarehouse] = useState([])
  const [ACList, setACList] = useState([])
  const [warehouse, setwarehouse] = useState([]);
  const [Ac, setAc] = useState([]);
  const [flag, setflag] = useState([]);
  const [State, setState] = useState([]);
  const [data, setdata] = useState([]);


  const handleInputChange_Warehouse = (e, index) => {

    const prevvalue = warehouse[index];
    const { name, value } = e.target;
    const list = [...warehouse];
    list[index] = value;
    const list1 = [...Added];
    list1[index][name] = value;
    setAdded(list1);
    setwarehouse(list);
  };

  const handleInputChange_Ac = (e, index) => {

    const prevvalue = Ac[index];
    const { name, value } = e.target;
    const list = [...Ac];
    list[index] = value;
    const list1 = [...Added];
    list1[index][name] = value;
    const list2 = { ...flag };
    list2[value]['flag'] = true
    list2[value]['id'] = value;

    setAdded(list1);
    setAc(list);
    setflag(list2);

    if (flag[value]['id'] != prevvalue) {
      const list2 = { ...flag };
      list2[prevvalue]['flag'] = false
      list2[prevvalue]['id'] = -1
      setflag(list2);
    }
  };

  const Addrow = () => {

    setwarehouse([...warehouse, ''])
    setAc([...Ac, ""])
    setAdded([
      ...Added,
      {
        "warehouse": "",
        "ac": '',
      }
    ]);
  }


  async function getRealm() {

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_SERVER}/user/getRealm`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: 'include',
          body: JSON.stringify({
            "module_name": "Unit",
            "operation": "MarkPollCompleted"
          }),
        }
      )

      const Input = await response.json();
      if (response.status === 200) {
        setACList(Input['data'])
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(
    () => {
      let timer1 = setTimeout(() => getRealm(), 1 * 1000);

      return () => {
        clearTimeout(timer1);
      };
    },
    []
  );

  async function getListH() {

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_SERVER}/warehouse/listWarehouses`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            "Type": 'H'
          }),
        })

      const data = await response.json();
      setListWarehouse(data["data"])
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(
    () => {
      let timer1 = setTimeout(() => getListH(), 1 * 1500);
      return () => {
        clearTimeout(timer1);
      };
    },
    []
  );

  const onFormSubmit = async (e) => {
    e.preventDefault();
    let Finalanswer = [];
    let total = 0;
    for (let k = 0; k < warehouse.length; k++) {
      if (warehouse[k] == '' || Ac[k] == '') {
        total = total + 1
      }
      Finalanswer.push({
        "ac": Ac[k],
        "strongRoom": warehouse[k]
      })
    }
    if (total == 0)
      handleFormSubmit(Finalanswer)
    else {
      alert('Fill all field')
    }
  };


  useEffect(() => {
    if (ACList) {
      let pp = {}
      for (let k = 0; k < ACList.length; k++) {
        pp[ACList[k][2][0]] = {
          "flag": false,
          "id": -1
        }
      }
      setflag(pp)
    }
  }, [ACList])



  const handleRemoveClick_Dropdown_rows = (i, val) => {
    if (window.confirm(`Are you sure ?`)) {
      const prevvalue = val;
      const list_all = [...Added];
      list_all.splice(i, 1);
      const list_warehouse = [...warehouse];
      list_warehouse.splice(i, 1);
      const list_ac = [...Ac];
      list_ac.splice(i, 1);
      const list_flag = { ...flag }

      if (prevvalue != '') {

        list_flag[prevvalue]['id'] = -1;
        list_flag[prevvalue]['flag'] = false;
      }

      setflag(list_flag)
      setAdded(list_all);
      setwarehouse(list_warehouse)
      setAc(list_ac)
    }
  };

  return (
    <>
      <form onSubmit={onFormSubmit} className="w-full rounded-lg " styles={{ marginTop: "20%" }}>
        {isVisible && (
          <div styles={{ marginTop: "20%" }}>

            <div className={ReplacementStyles.Replacement_dropdown_table}>
              <table>
                <thead>
                  <tr>
                    <th style={{ color: "#f56a3f", padding: "20px" }}></th>
                    <th style={{ color: "#f56a3f", padding: "20px" }}>AC's</th>
                    <th style={{ color: "#f56a3f", padding: "20px" }}>WareHouse</th>
                    <th style={{ color: "#f56a3f", padding: "20px" }}></th>
                  </tr>
                </thead>
                {Added &&
                  Added.map((val, id) => {
                    return (<>

                      <tr >
                        <td></td>
                        <td className="text-black text-sm">
                          <select
                            className="relative h-10 !w-80  rounded-md border p-2"
                            placeholder="select"
                            name="ac"
                            value={Ac[id]}
                            onChange={(e) => handleInputChange_Ac(e, id)}
                          >
                            {" "}
                            <option hidden>Select</option>
                            {ACList &&
                              ACList.map((st, index) => (
                                (flag && (flag[st[2][0]]['id'] == Ac[id] || flag[st[2][0]]['flag'] == false)) &&
                                <option value={st[2][0]} className="text-black">
                                  {st[2][1]}
                                </option>
                              ))}
                          </select>
                        </td>

                        <td className="text-black text-sm">
                          <select
                            className="relative h-10 !w-80  rounded-md border p-2"
                            placeholder="select"
                            name="warehouse"
                            value={warehouse[id]}
                            onChange={(e) => handleInputChange_Warehouse(e, id)}
                          >
                            {" "}
                            <option hidden>Select</option>
                            {ListWarehouse &&
                              ListWarehouse.map((st, index) => (
                                <option value={st['warehouseid']} className="text-black">
                                  {st['warehouseid']}
                                </option>
                              ))}
                          </select>
                        </td>
                        <td className="text-black text-sm" onClick={() => handleRemoveClick_Dropdown_rows(id, Ac[id])}>{<Delete />}</td>
                      </tr>
                      <tr><td colSpan={4}><hr /></td></tr></>
                    )
                  })
                }
                {Ac.length != ACList.length && <button type="button" className="text-white bg-orange-600 p-1 text-2xl w-8 h-8 -mt-4 " style={{ borderRadius: "50%", marginLeft: "100%", marginTop: "1%" }} onClick={() => { Addrow() }}>+</button>}
              </table>
            </div>
            {(Added.length > 0) && <button class={scheduleStyles.submitBtn} type='submit' style={{ marginBottom: "1%" }}> Submit </button>}
          </div>
        )
        }
      </form >
    </>
  );
};



const CountingFinished = ({ isVisible }) => {


  const handleFormSubmit = async (Finalanswer) => {
    try {
      const response = await fetch(`${baseUrl}/countingFinished`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          "aclist": Finalanswer
        }
        ),
      });
      const data = await response.json();
      if (data.status === 200) {
        alert(data.message);
        setAc([])
        setwarehouse([])
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert(`Error occured: ${err}`);
    }

  };


  const User_ID = sessionStorage.getItem("sessionToken");
  const Role = User_ID.substring(8)
  const [Added, setAdded] = useState([])
  const [ListWarehouse, setListWarehouse] = useState([])
  const [ACList, setACList] = useState([])
  const [warehouse, setwarehouse] = useState([]);
  const [Ac, setAc] = useState([]);
  const [flag, setflag] = useState([]);
  const [State, setState] = useState([]);
  const [data, setdata] = useState([]);


  const handleInputChange_Warehouse = (e, index) => {

    const prevvalue = warehouse[index];
    const { name, value } = e.target;
    const list = [...warehouse];
    list[index] = value;
    const list1 = [...Added];
    list1[index][name] = value;
    setAdded(list1);
    setwarehouse(list);
  };

  const handleInputChange_Ac = (e, index) => {

    const prevvalue = Ac[index];
    const { name, value } = e.target;
    const list = [...Ac];
    list[index] = value;
    const list1 = [...Added];
    list1[index][name] = value;
    const list2 = { ...flag };
    list2[value]['flag'] = true
    list2[value]['id'] = value;

    setAdded(list1);
    setAc(list);
    setflag(list2);

    if (flag[value]['id'] != prevvalue) {
      const list2 = { ...flag };
      list2[prevvalue]['flag'] = false
      list2[prevvalue]['id'] = -1
      setflag(list2);
    }
  };

  const Addrow = () => {

    setwarehouse([...warehouse, ''])
    setAc([...Ac, ""])
    setAdded([
      ...Added,
      {
        "warehouse": "",
        "ac": '',
      }
    ]);
  }


  async function getRealm() {

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_SERVER}/user/getRealm`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: 'include',
          body: JSON.stringify({
            "module_name": "Unit",
            "operation": "MarkCountCompleted"
          }),
        }
      )

      const Input = await response.json();
      if (response.status === 200) {
        setACList(Input['data'])
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(
    () => {
      let timer1 = setTimeout(() => getRealm(), 1 * 1000);

      return () => {
        clearTimeout(timer1);
      };
    },
    []
  );

  async function getListI() {

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_SERVER}/warehouse/listWarehouses`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            "Type": 'I'
          }),
        })

      const data = await response.json();
      setListWarehouse(data["data"])
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(
    () => {
      let timer1 = setTimeout(() => getListI(), 1 * 1500);
      return () => {
        clearTimeout(timer1);
      };
    },
    []
  );

  const onFormSubmit = async (e) => {
    e.preventDefault();
    let Finalanswer = [];
    let total = 0;
    for (let k = 0; k < warehouse.length; k++) {
      if (warehouse[k] == '' || Ac[k] == '') {
        total = total + 1
      }
      Finalanswer.push({
        "ac": Ac[k],
        "strongRoom": warehouse[k]
      })
    }
    if (total == 0)
      handleFormSubmit(Finalanswer)
    else {
      alert('Fill all field')
    }
  };


  useEffect(() => {
    if (ACList) {
      let pp = {}
      for (let k = 0; k < ACList.length; k++) {
        pp[ACList[k][2][0]] = {
          "flag": false,
          "id": -1
        }
      }
      setflag(pp)
    }
  }, [ACList])


  const handleRemoveClick_Dropdown_rows = (i, val) => {
    if (window.confirm(`Are you sure ?`)) {
      const prevvalue = val;
      const list_all = [...Added];
      list_all.splice(i, 1);
      const list_warehouse = [...warehouse];
      list_warehouse.splice(i, 1);
      const list_ac = [...Ac];
      list_ac.splice(i, 1);
      const list_flag = { ...flag }

      if (prevvalue != '') {

        list_flag[prevvalue]['id'] = -1;
        list_flag[prevvalue]['flag'] = false;
      }

      setflag(list_flag)
      setAdded(list_all);
      setwarehouse(list_warehouse)
      setAc(list_ac)
    }
  };



  return (
    <>
      <form onSubmit={onFormSubmit} className="w-full rounded-lg " styles={{ marginTop: "20%" }}>
        {isVisible && (
          <div styles={{ marginTop: "20%" }}>

            <div className={ReplacementStyles.Replacement_dropdown_table}>
              <table>
                <thead>
                  <tr>
                    <th style={{ color: "#f56a3f", padding: "20px" }}></th>
                    <th style={{ color: "#f56a3f", padding: "20px" }}>AC's</th>
                    <th style={{ color: "#f56a3f", padding: "20px" }}>WareHouse</th>
                    <th style={{ color: "#f56a3f", padding: "20px" }}></th>
                  </tr>
                </thead>
                {Added &&
                  Added.map((val, id) => {
                    return (<>

                      <tr >
                        <td></td>
                        <td className="text-black text-sm">
                          <select
                            className="relative h-10 !w-80  rounded-md border p-2"
                            placeholder="select"
                            name="ac"
                            value={Ac[id]}
                            onChange={(e) => handleInputChange_Ac(e, id)}
                          >
                            {" "}
                            <option hidden>Select</option>
                            {ACList &&
                              ACList.map((st, index) => (
                                (flag && (flag[st[2][0]]['id'] == Ac[id] || flag[st[2][0]]['flag'] == false)) &&
                                <option value={st[2][0]} className="text-black">
                                  {st[2][1]}
                                </option>
                              ))}
                          </select>
                        </td>

                        <td className="text-black text-sm">
                          <select
                            className="relative h-10 !w-80  rounded-md border p-2"
                            placeholder="select"
                            name="warehouse"
                            value={warehouse[id]}
                            onChange={(e) => handleInputChange_Warehouse(e, id)}
                          >
                            {" "}
                            <option hidden>Select</option>
                            {ListWarehouse &&
                              ListWarehouse.map((st, index) => (
                                <option value={st['warehouseid']} className="text-black">
                                  {st['warehouseid']}
                                </option>
                              ))}
                          </select>
                        </td>
                        <td className="text-black text-sm" onClick={() => handleRemoveClick_Dropdown_rows(id, Ac[id])}>{<Delete />}</td>
                      </tr>
                      <tr><td colSpan={4}><hr /></td></tr></>
                    )
                  })
                }
                {Ac.length != ACList.length && <button type="button" className="text-white bg-orange-600 p-1 text-2xl w-8 h-8 -mt-4 " style={{ borderRadius: "50%", marginLeft: "100%", marginTop: "1%" }} onClick={() => { Addrow() }}>+</button>}
              </table>
            </div>
            {(Added.length > 0) && <button class={scheduleStyles.submitBtn} type='submit' style={{ marginBottom: "1%" }}> Submit </button>}
          </div>
        )
        }
      </form >
    </>
  );
};


const CountingDefective = ({ isVisible, UnitID, setUnitID }) => {




  const handleFormSubmit = async () => {
    try {
      const response = await fetch(`${baseUrl}/countingDefective`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          "unitList": UnitID,
          "remark": dataInput,
          "warehouse": 'TSBDK119K01'
        }
        ),
      });
      const data = await response.json();
      if (data.status === 200) {
        alert(data.message);
        setUnitID([])
        setwarehouse([])
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert(`Error occured: ${err}`);
    }

  };

  const [dataInput, setDataInput] = useState([""]);
  const User_ID = sessionStorage.getItem("sessionToken");
  const Role = User_ID.substring(8)
  const [ListWarehouse, setListWarehouse] = useState([])
  const [warehouse, setwarehouse] = useState('');
  const [Ac, setAc] = useState([]);

  async function getListK() {

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_SERVER}/warehouse/listWarehouses`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            "Type": 'K'
          }),
        })

      const data = await response.json();
      setListWarehouse(data["data"])
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(
    () => {
      let timer1 = setTimeout(() => getListK(), 1 * 1500);
      return () => {
        clearTimeout(timer1);
      };
    },
    []
  );

  const onFormSubmit = async (e) => {
    e.preventDefault();
    handleFormSubmit()
  };



  const handleRemoveClick_unitid = (i) => {

    const listUnitId = [...UnitID];
    listUnitId.splice(i, 1);
    setUnitID(listUnitId)
  };

  return (
    <>
      <form onSubmit={onFormSubmit} className="w-full rounded-lg " styles={{ marginTop: "20%" }}>
        {isVisible && (
          <div styles={{ marginTop: "20%" }}>
            <div className="w-full flex justify-around">
              <div className="m-2 w-1/3 text-left">
                <label className="mb-2 w-full text-base">
                  Defective Warehouse<span className="text-red-600">*</span>
                </label>
                <div className="relative text-[#494A59]">
                  <select
                    className="relative h-10 w-full rounded-md border p-2"
                    name="replacementlevel"
                    placeholder="Select"
                    value={warehouse}
                    onChange={(e) => setwarehouse(e.target.value)}
                  >
                    {" "}
                    <option hidden>Select</option>
                    {ListWarehouse && ListWarehouse.map((val, index) => (
                      <option value={val['warehouseid']}>{val['warehouseid']}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 -translate-x-1/2" />
                </div>
              </div>
              <div className="m-2 w-1/3 text-left" >
                <label className="mb-2 w-full text-base">
                  Remarks<span className="text-red-600">*</span>
                </label>
                <div className="relative text-[#494A59]">
                  <div className="w-full">
                    <textarea name="" id="" cols="60" className='p-2' rows={5}
                      style={{ width: '100%' }}
                      onChange={(e) => {
                        setDataInput(e.target.value)
                      }}
                      value={dataInput}
                      placeholder='Remarks'
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full flex justify-around">
              <div className='flex flex-wrap w-full  items-center'>
                {UnitID && UnitID.map((val, index) => (
                  <div className='rounded-lg gap-1 m-1 p-2 flex align-middle shadow-md shadow-black'>{val}
                    <AiOutlineClose className='cursor-pointer text-red-400' onClick={() => {
                      handleRemoveClick_unitid(index)
                    }} /></div>
                ))}
              </div>
            </div>

            {(UnitID.length > 0) && <button class={scheduleStyles.submitBtn} type='submit' style={{ marginBottom: "1%" }}> Submit </button>}
          </div>
        )
        }
      </form >
    </>
  );
};