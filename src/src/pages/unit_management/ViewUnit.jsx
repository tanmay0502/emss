import React, { useEffect, useState } from "react";

export default function Viewunit() {
  const [UNITID, setUNITID] = useState();
  const [status, setstatus] = useState();
  const [location, setlocation] = useState();
  const [year, setyear] = useState();
  const [model, setmodel] = useState();
  const [version, setversion] = useState();
  const [updatedby, setupdatedby] = useState();
  const [remark, setremark] = useState();
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
  return (
    <div className="shadow-lg mb-10 pb-10 bg-white" style={{ borderRadius: "2%" }}>
      <div className='MainHeader pd-5 ' style={{ display: "flex", "flexDirection": "row", "justifyContent": "space-between", "alignItems": "center" }}>
        <h4 className='text-white'>View Unit : {unitId()}</h4>
      </div>
      <div className='w-full flex justify-center gap-12 p-10'>
        <div className="form_group">
          <div className="form_label">
            <label htmlFor="">UnitID</label>
          </div>
          <div className="form_input">
            <input
              required
              type={"text"}
              id="input_lat"
              name=""
              className=""
              placeholder="---"
              value={UNITID}
            />
          </div>
        </div>
        <div className="form_group">
          <div className="form_label">
            <label htmlFor="">Status</label>
          </div>
          <div className="form_input">
            <input
              required
              type={"text"}
              id="input_lat"
              name=""
              className=""
              placeholder="---"
              value={status}
            />
          </div>
          <div className="form_label">
            <label htmlFor="">Location</label>
          </div>
          <div className="form_input">
            <input
              required
              type={"text"}
              id="input_lat"
              name=""
              className=""
              placeholder="---"
              value={location}
            />
          </div>
          <div className="form_label">
            <label htmlFor="">Remark</label>
          </div>
          <div className="form_input">
            <input
              required
              type={"text"}
              id="input_lat"
              name=""
              className=""
              placeholder="---"
              value={remark}
            />
          </div>
        </div>
      </div>
      <div className='w-full flex justify-center gap-12 p-10'>
        <div className="form_group">
          <div className="form_label">
            <label htmlFor="">Updated By</label>
          </div>
          <div className="form_input">
            <input
              required
              type={"text"}
              id="input_lat"
              name=""
              className=""
              placeholder="---"
              value={updatedby}
            />
          </div>
        </div>
        <div className="form_group">
          <div className="form_label">
            <label htmlFor="">Model</label>
          </div>
          <div className="form_input">
            <input
              required
              type={"text"}
              id="input_lat"
              name=""
              className=""
              placeholder="---"
              value={model}
            />
          </div>
          <div className="form_label">
            <label htmlFor="">Version</label>
          </div>
          <div className="form_input">
            <input
              required
              type={"text"}
              id="input_lat"
              name=""
              className=""
              placeholder="---"
              value={version}
            />
          </div>
          <div className="form_label">
            <label htmlFor="">Year</label>
          </div>
          <div className="form_input">
            <input
              required
              type={"text"}
              id="input_lat"
              name=""
              className=""
              placeholder="---"
              value={year}
            />
          </div>
        </div>
      </div>

    </div>
  );
}