import React, { useEffect, useState } from "react";
import styles from './styles/ViewUnit.module.css'
import { useNavigate } from "react-router-dom";


export default function Viewunit() {


  const navigate = useNavigate();
  const [UNITID, setUNITID] = useState();
  const [status, setstatus] = useState();
  const [location, setlocation] = useState();
  const [year, setyear] = useState();
  const [model, setmodel] = useState();
  const [version, setversion] = useState();
  const [updatedby, setupdatedby] = useState();
  const [remark, setremark] = useState();
  const [timestamp, settimestamp] = useState();
  const User_ID = sessionStorage.getItem("sessionToken");
  const Role = User_ID.substring(8)
  const unitId = () => {
    const URL = window.location.href;
    const arr = URL.split("/");
    const param = arr[arr.length - 1];
    const arr1 = param.split("=");
    return arr1[0];
  }
  console.log(unitId())

  async function getunitdetails() {
    setUNITID(unitId())
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_SERVER}/unit/viewUnit`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: 'include',
          body: JSON.stringify({
            unitid: UNITID
          }
          ),
        }
      );
      const data = await response.json();
      const data2 = data['data']
      if (response.status === 200) {
        setstatus(data2['status'])
        setlocation(data2['location'])
        setyear(data2['year'])
        setmodel(data2['model'])
        setremark(data2['remark'])
        setupdatedby(data2['updatedby'])
        setversion(data2['version'])
        settimestamp(data2['timestamp'].slice(8, 10) + "-" + data2['timestamp'].slice(5, 7) + "-" + data2['timestamp'].slice(0, 4) + "   " + data2['timestamp'].slice(11, 16))
      }

    } catch (err) {
      console.log({ err });
    }
  }
  useEffect(
    () => {
      let timer1 = setTimeout(() => getunitdetails(), 1 * 1000);
      return () => {
        clearTimeout(timer1);
      };
    },
    [UNITID]
  );

  const Statushistory = async (e) => {
    navigate('/session/unitmanagement/statushistory/' + UNITID)
  };

  return (
    <>


      <div className="shadow-lg mb-10 pb-10 bg-white" style={{ borderRadius: "2%" }}>
        <div className='MainHeader pd-5 ' style={{ display: "flex", "flexDirection": "row", "justifyContent": "space-between", "alignItems": "center" }}>
          <h4 className='text-white'>Unit </h4>
        </div>
        <div class={styles.parent}>
          <div class={styles.div1}>
            <p>Unit ID</p>
            <input
              type="text"
              class={styles.input}
              id="1"
              className="selectBox"
              placeholder='---'
              disabled
              defaultValue={UNITID}
            ></input>
          </div>
          <div class={styles.div2}>
            <p>Status</p>
            <input
              type="text"
              class={styles.input}
              id="1"
              className="selectBox"
              placeholder='---'
              disabled
              defaultValue={status}
            ></input>
          </div>
          <div class={styles.div3}>
            <p>Remark</p>
            <input
              type="text"
              class={styles.input}
              id="1"
              className="selectBox"
              placeholder='---'
              disabled
              defaultValue={remark}
            ></input>
          </div>
          <div class={styles.div4}>
            <p>Location</p>
            <input
              type="text"
              class={styles.input}
              id="1"
              className="selectBox"
              placeholder='---'
              disabled
              defaultValue={location}
            ></input>
          </div>
          <div class={styles.div5}>
            <p>Updated By</p>
            <input
              type="text"
              class={styles.input}
              id="1"
              className="selectBox"
              placeholder='---'
              disabled
              defaultValue={updatedby}
            ></input>
          </div>
          <div class={styles.div6}>
            <p>Time Stamp</p>
            <input
              type="text"
              class={styles.input}
              id="1"
              className="selectBox"
              placeholder='---'
              disabled
              defaultValue={timestamp}
            ></input>
          </div>
          <div class={styles.div7}>
            <p>Model</p>
            <input
              type="text"
              class={styles.input}
              id="1"
              className="selectBox"
              placeholder='---'
              disabled
              defaultValue={model}
            ></input>
          </div>
          <div class={styles.div8}>
            <p>Version</p>
            <input
              type="text"
              class={styles.input}
              id="1"
              className="selectBox"
              placeholder='---'
              disabled
              defaultValue={version}
            ></input>
          </div>
          <div class={styles.div9}>
            <p>Year</p>
            <input
              type="text"
              class={styles.input}
              id="1"
              className="selectBox"
              placeholder='---'
              disabled
              defaultValue={year}
            ></input>
          </div>
        </div>
      </div>
      {Role == 'ADM' && <button class={styles.submitBtn} onClick={Statushistory}> View History </button>}
    </>
  );
}