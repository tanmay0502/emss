import { useState, useEffect } from "react";
import styles from "../styles/UnitList.module.css";
import { DynamicDataTable } from "@langleyfoxall/react-dynamic-data-table";
import {
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from "react-icons/ai";

import {GrClose}  from "react-icons/gr" 
import { ReactComponent as OptionsIndicator } from "../../../assets/Options_Indicator.svg";
import { ReactComponent as SearchInputElement } from "../../../assets/searchInputIcon.svg";
import { expD } from "../Homepage";
import Modal from "react-modal"


const UnitListCard = () => {

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


  const [modalIsOpen, setIsOpen] = useState(false);
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

  function openModal() {
    setIsOpen(true);
    // handleButtonClick()
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    //   subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  const customStyles = {
    content: {
      width: '50vh',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };




  const [mfg, setMFG] = useState('')
  const [unitType, setUnitType] = useState('');
  const [model, setModel] = useState('')
  const [filterapply, setFilterapply] = useState(0);
  const [Status, setStatus] = useState('')
  const [mfgECIL, setmfgECIL] = useState(false);
  const [mfgBEL, setmfgBEL] = useState(false)
  const [unitTypeCU, setunitTypeCU] = useState(false)
  const [unitTypeBU, setunitTypeBU] = useState(false)
  const [unitTypeVT, setunitTypeVT] = useState(false)
  const [modelM2, setmodelM2] = useState(false)
  const [modelM3, setmodelM3] = useState(false)

  function ResetFunction() {
    setMFG('');
    setUnitType('');
    setModel('');
    setFilterapply(0);
    setmfgECIL(false)
    setmfgBEL(false)
    setunitTypeCU(false)
    setunitTypeBU(false)
    setunitTypeVT(false)
    setmodelM2(false)
    setmodelM3(false)
  }




  const URL = `${process.env.REACT_APP_API_SERVER}/unit/listUnits/?status=FLC OK` + ((unitType != '') ? `&unitType=${unitType}` : ``) + ((mfg != '') ? `&mfg=${mfg}` : ``) + ((model != '') ? `&model=${model}` : '')
  const [data, setData] = useState(expD);


  useEffect(() => {

    const getData = async () => {
      try {
        const response = await fetch(
          URL,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: 'include'
          }
        );
        let data2 = await response.json();
        console.log(data2.data, "data2.data")
        if (data2.data.length) {
          console.log("data updated")
          setData(data2.data);
        }
        else {
          setData([]);
        }
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [URL])

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
              <div className={styles.unit_status}>{val["status"]}</div>
            ),
            Remarks: val["remark"],
            Location: val["location"],
            "Status Update Time": val["timestamp"].split('T')[0],
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


      setTableData(data_tmp);
    }
  }

  useEffect(() => {
    formatData();
  }, [tableFilter, sortBy, sortOrder, data]);

  function SETM3() {

    if (model == '') {
      setmodelM3(true)
      setmodelM2(false)
      setModel('M3')
    }
    else {
      if (model == "M2") {
        setmodelM3(true)
        setmodelM2(false)
        setModel('M3')
      }
      else {
        setmodelM3(false)
        setModel('')
      }
    }
  }


  function SETM2() {

    if (model == '') {
      setmodelM2(true)
      setmodelM3(false)
      setModel('M2')
    }
    else {
      if (model == "M3") {
        setmodelM2(true)
        setmodelM3(false)
        setModel('M2')
      }
      else {
        setmodelM2(false)
        setModel('')
      }
    }
  }

  function SETVT() {

    if (unitType == '') {
      setunitTypeVT(true)
      setunitTypeBU(false)
      setunitTypeCU(false)
      setUnitType('VT');
    }
    else {
      if (unitType == 'CU') {
        setunitTypeVT(true)
        setunitTypeBU(false)
        setunitTypeCU(false)
        setUnitType('VT');
      }
      else if (unitType == 'BU') {
        setunitTypeVT(true)
        setunitTypeBU(false)
        setunitTypeCU(false)
        setUnitType('VT');
      }
      else {
        setunitTypeVT(false)
        setUnitType('');
      }
    }
  }


  function SETBU() {

    if (unitType == '') {
      setunitTypeBU(true)
      setunitTypeCU(false)
      setunitTypeVT(false)
      setUnitType('BU');
    }
    else {
      if (unitType == 'CU') {
        setunitTypeBU(true)
        setunitTypeCU(false)
        setunitTypeVT(false)
        setUnitType('BU');
      }
      else if (unitType == 'VT') {
        setunitTypeBU(true)
        setunitTypeCU(false)
        setunitTypeVT(false)
        setUnitType('BU');
      }
      else {
        setunitTypeBU(false)
        setUnitType('');
      }
    }
  }


  function SETCU() {

    if (unitType == '') {
      setunitTypeCU(true)
      setunitTypeBU(false)
      setunitTypeVT(false)
      setUnitType('CU');
    }
    else {
      if (unitType == 'BU') {
        setunitTypeCU(true)
        setunitTypeBU(false)
        setunitTypeVT(false)
        setUnitType('CU');
      }
      else if (unitType == 'VT') {
        setunitTypeCU(true)
        setunitTypeBU(false)
        setunitTypeVT(false)
        setUnitType('CU');
      }
      else {
        setunitTypeCU(false)
        setUnitType('');
      }
    }
  }


  function SETECIL() {

    if (mfg == '') {
      setmfgECIL(true)
      setmfgBEL(false)
      setMFG('E');
    }
    else {
      if (mfg == 'B') {
        setMFG('E')
        setmfgECIL(true)
        setmfgBEL(false)
      }
      else {
        setmfgECIL(false)
        setMFG('')
      }
    }
  }

  function SETBEL() {

    if (mfg == '') {
      setmfgECIL(false)
      setmfgBEL(true)
      setMFG('B');
    }
    else {
      if (mfg == 'E') {
        setMFG('B')
        setmfgECIL(false)
        setmfgBEL(true)
      }
      else {
        setmfgBEL(false)
        setMFG('')
      }
    }
  }

  return (
    <>
      <div className={styles.unit_list_container}>
        <div className={styles.unit_list_header}>
          <h4>Unit List</h4>
          <div className={styles.unit_list_header_right}>

            <button className="text-white"
              onClick={() => { openModal(); }}
            >
              {(((mfg) ? 1 : 0) + ((unitType) ? 1 : 0) + ((model) ? 1 : 0)) ? (((mfg) ? 1 : 0) + ((unitType) ? 1 : 0) + ((model) ? 1 : 0)) + " Filter Applied" : "Filter"}
            </button>
            <Modal
              isOpen={modalIsOpen}
              onAfterOpen={afterOpenModal}
              onRequestClose={closeModal}
              style={customStyles}
            >
              <div id="root" className=''>
                <div className="grid grid-cols-3">
                  <div onClick={closeModal} className=" cursor-pointer hover:scale-110 flex items-center justify-center"  > <GrClose /> </div>

                  <div className='flex justify-center items-center'>
                    <h3>Filter </h3>
                  </div>
                  <button className="m-4 cursor-pointer flex justify-center text-white" onClick={ResetFunction}>Reset </button>
                  <Modal
                      isOpen={modalIsOpen}
                      onAfterOpen={afterOpenModal}
                      onRequestClose={closeModal}
                      style={customStyles}
                  >
                      <div id="root" className=''>
                          <div className="grid grid-cols-3">
                          <div onClick={closeModal} className=" cursor-pointer hover:scale-110 flex items-center justify-center"  > <GrClose /> </div>
                          
                          <div className='flex justify-center items-center'>
                              <h3>Filter</h3>
                          </div>
                          <div className="m-4 cursor-pointer flex justify-center"> Reset </div>
                          </div>
                            
                          <div>
                            <div className="flex flex-col"> 

                            
                              <label className="mb-2 w-full text-base font-bold pt-6">
                                  Manufacturer
                              </label>
                              <div className="flex flex-row gap-3 px-4" >

                                <ActionButton
                                    // isActive={activeButtons.firstRandomisationForm}
                                    text="ECIL"
                                    name="firstRandomisationForm"
                                    // onClick={onButtonClick}
                                  />
                                <ActionButton
                                    // isActive={activeButtons.firstRandomisationForm}
                                    text="BEL"
                                    name="firstRandomisationForm"
                                    // onClick={onButtonClick}
                                  />
                                  

                              </div>

                              <label className="mb-2 w-full text-base font-bold">
                                  Unit Type
                              </label>
                              <div className="flex flex-row gap-3 px-4">

                                  <ActionButton
                                    // isActive={activeButtons.firstRandomisationForm}
                                    text="CU"
                                    name="firstRandomisationForm"
                                    // onClick={onButtonClick}
                                  />
                                  <ActionButton
                                    // isActive={activeButtons.firstRandomisationForm}
                                    text="BU"
                                    name="firstRandomisationForm"
                                    // onClick={onButtonClick}
                                  />
                                  <ActionButton
                                    // isActive={activeButtons.firstRandomisationForm}
                                    text="VT"
                                    name="firstRandomisationForm"
                                    // onClick={onButtonClick}
                                  />
                                  {/* <ActionButton
                                    // isActive={activeButtons.firstRandomisationForm}
                                    text="SC"
                                    name="firstRandomisationForm"
                                    // onClick={onButtonClick}
                                  /> */}
        
                            </div>
                              <label className="mb-2 w-full text-base font-bold">
                                  Model
                              </label>
                              <div className="flex flex-row gap-3 px-4" >

                              <ActionButton
                                  // isActive={activeButtons.firstRandomisationForm}
                                  text="M2"
                                  name="firstRandomisationForm"
                                  // onClick={onButtonClick}
                                />
                              <ActionButton
                                  // isActive={activeButtons.firstRandomisationForm}
                                  text="M3"
                                  name="firstRandomisationForm"
                                  // onClick={onButtonClick}
                                />
                                

                              </div>


                              {/* <label className="mb-2 w-full text-base font-bold">
                                  Sort By AC/Polling Station
                              </label>
                              <div className="flex flex-row gap-3 px-4" >

                                <ActionButton
                                    // isActive={activeButtons.firstRandomisationForm}
                                    text="AC"
                                    name="firstRandomisationForm"
                                    // onClick={onButtonClick}
                                  />
                                <ActionButton
                                    // isActive={activeButtons.firstRandomisationForm}
                                    text="Polling"
                                    name="firstRandomisationForm"
                                    // onClick={onButtonClick}
                                  />
                                  

                              </div> */}
                              </div>
                          </div>

                      </div>

                  </Modal>

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

                </div>

                <div>
                  <div className="flex flex-col">
                    <label className="mb-2 w-full text-base font-bold pt-6">
                      Manufacturer
                    </label>
                    <div className="flex flex-row gap-3 px-4" >

                      <ActionButton
                        isActive={mfgECIL}
                        text="ECIL"
                        name="mfgECIL"
                        onClick={SETECIL}
                      />

                      <ActionButton
                        isActive={mfgBEL}
                        text="BEL"
                        name="mfgBEL"
                        onClick={SETBEL}
                      />

                    </div>

                    <label className="mb-2 w-full text-base font-bold">
                      Unit Type
                    </label>
                    <div className="flex flex-row gap-3 px-4">

                      <ActionButton
                        isActive={unitTypeCU}
                        text="CU"
                        name="unitTypeCU"
                        onClick={SETCU}
                      />

                      <ActionButton
                        isActive={unitTypeBU}
                        text="BU"
                        name="unitTypeBU"
                        onClick={SETBU}
                      />

                      <ActionButton
                        isActive={unitTypeVT}
                        text="VT"
                        name="unitTypeVT"
                        onClick={SETVT}
                      />

                    </div>
                    <label className="mb-2 w-full text-base font-bold">
                      Model
                    </label>
                    <div className="flex flex-row gap-3 px-4" >

                      <ActionButton
                        isActive={modelM2}
                        text="M2"
                        name="modelM2"
                        onClick={SETM2}
                      />

                      <ActionButton
                        isActive={modelM3}
                        text="M3"
                        name="modelM3"
                        onClick={SETM3}
                      />

                    </div>
                  </div>
                </div>

              </div>

            </Modal>

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
