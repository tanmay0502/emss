import React from "react";
import { AiOutlineArrowLeft, AiOutlineEdit } from 'react-icons/ai'
import { createSearchParams, useNavigate } from "react-router-dom";
import { ReactComponent as PermanentWarehouses } from '../../assets/PermanentWarehouses.svg';
import { ReactComponent as TemporaryWarehouses } from '../../assets/TemporaryWarehouses.svg';

function WarehouseDetail(props) {
  const navigate = useNavigate();

  return (
    <div className="user-details">
      <div className="flex justify-between">
        <button
          className="flex justify-center rounded-full aspect-square "
          onClick={props.close}
          style={{"background" : "#84587C", color: "white"}}
        >
          <AiOutlineArrowLeft />
        </button>
        <button
          className="flex justify-center rounded-full aspect-square "
          style={{"background" : "#16c09861", color: "#008767"}}
        onClick={()=>{
          navigate({
            pathname: `/session/warehousemanagement/modifywarehouse/id=${props.detail['warehouseid']}`
          })
        }}
        >
          <AiOutlineEdit />
        </button>
      </div>
      <div className="rounded-full justify-center flex"  >
        <div style={{ display: "flex", alignItems: "center", "justifyContent": "center", height: "15vh", aspectRatio: "1", backgroundColor: "#FDE1D9", borderRadius: "50%" }}>
          {props.detail &&
            (props.detail[2] === 'P' ? <PermanentWarehouses /> : <TemporaryWarehouses />)
          }
        </div>
      </div>
      {props.detail && (
        <div className="w-full px-2 py-8">
          <div className="warehouse-details-grid">
              <b>Warehouse ID : </b>
              <p className="px-2 text-md">
                {props.detail["warehouseid"]}
              </p>
              <b>Room Type : </b>
              <p className="px-2 text-md">
                {props.warehouseMapping["data"][props.detail["warehousetype"]]}
              </p>
              <b>Building Type : </b>
              <p className="px-2 text-md">
                {props.detail["warehousebuildingtype"] === 'P' ? "Permanent" : "Temporary"}
              </p>
            
              <b>Status : </b>
              <p className="px-2 text-md">
                {props.detail["warehousestatus"] === "A" ? "Active" : "Inactive"}
              </p>

            
              <b>State : </b>
              <p className="px-2 text-md">
                {props.detail["warehousestate"]}
              </p>

            
              <b>Address : </b>
              <p className="px-2 text-md">
                {props.detail["warehouseaddress"]}
              </p>


              <b>Lat Long :</b>
              <p className="px-2 text-md">
                {props.detail["warehouselatlong"]}
              </p>


              <b>Updated By : </b>
              <p className="px-2 text-md">
                {props.detail["updatedbyuid"]}
              </p>

              <b>Double Locked : </b>
              <p className="px-2 text-md">
                {props.detail["doublelock"] ? "Yes" : "No"}
              </p>
            
              <b>First Key Holder : </b>
              <p className="px-2 text-md">
                {props.detail["uidkey1"]}
              </p>
            
              <b>Second Key Holder : </b>
              <p className="px-2 text-md">
                {props.detail["uidkey2"] !== "" ? props.detail["uidkey2"] : "N/A"}
              </p>
          </div>
        </div>
      )}
    </div>
  );
}
export default WarehouseDetail;
