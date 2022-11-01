import React from "react";
import { useState, useEffect } from "react";
import "./styles/order.css";
import Group from "./Group";
import "../home/styles/Newversion.css";

import { FaSearch } from "react-icons/fa";
import SomeStats from "../../assets/someStats.svg";
import { ReactComponent as SearchInputElement } from "../../assets/searchInputIcon.svg";
import {
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from "react-icons/ai";
import { ReactComponent as ArrowLeft } from "../../assets/ArrowLeft.svg";
import { ReactComponent as ArrowRight } from "../../assets/ArrowRight.svg";
import { ReactComponent as ChevronDown } from "../../assets/ChevronDown.svg";
import { ReactComponent as SearchIcon } from "../../assets/search.svg";
import { ReactComponent as SourceIcon } from "../../assets/SourceIcon.svg";

import { ReactComponent as DestIcon } from "../../assets/DestIcon.svg";

export default function FillAvailability() {
  const [tableFilter, setTableFilter] = useState("");
  const [sortBy, setSortBy] = useState("None");
  const [sortOrder, setSortOrder] = useState("asc");

  return (
    <div>
      <div className="MyContainer">
        <div className="myCard d-flex d-flex-column">
          <div className="myCardHeader myPadding">Order Details</div>
          <div className="w-100 myCardBody myPadding">
            <div className="d-flex d-flex-apart">
              <Group
                LabelText="Order ID"
                value="OM12993455"
                className="myFont"
              />
              <div className="serach d-flex">
                <SearchIcon />
                <input type="text" placeholder="Search by Reference ID" />
              </div>
            </div>

            <div className="mt-3 mb-3 d-flex d-flex-apart">
              <div className="OrderCard">
                <Group LabelText="Referenced Order ID" value="XYZ/20" />

                <div
                  className="w-100 source_dest d-flex d-flex-apart"
                  style={{ marginTop: "20px", marginBottom: "15px" }}
                >
                  <div className="d-flex">
                    <SourceIcon />
                    <Group LabelText="Source" value="Delhi" />
                  </div>
                  <div className="d-flex">
                    <DestIcon />
                    <Group
                      LabelText="Destination"
                      value="Haryana"
                      custom={true}
                    />
                  </div>
                </div>
                <span style={{ fontWeight: "550", fontSize: "18px" }}>
                  Units Description
                </span>

                <table className="w-100 UnitTable" cellPadding="12px 25px">
                  <thead className="HeadRow">
                    <tr>
                      <th>Type</th>
                      <th>Quantity</th>
                      <th>Model</th>
                    </tr>
                  </thead>
                  <tbody className="BodyRow">
                    <tr>
                      <td>CU</td>
                      <td>50</td>
                      <td>M3</td>
                    </tr>

                    <tr>
                      <td>CU</td>
                      <td>50</td>
                      <td>M3</td>
                    </tr>

                    <tr>
                      <td>CU</td>
                      <td>50</td>
                      <td>M3</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="OrderCard">
                <Group LabelText="Referenced Order ID" value="XYZ/20" />

                <div
                  className="w-100 source_dest d-flex d-flex-apart"
                  style={{ marginTop: "20px", marginBottom: "15px" }}
                >
                  <div className="d-flex">
                    <SourceIcon />
                    <Group LabelText="Source" value="Delhi" />
                  </div>
                  <div className="d-flex">
                    <DestIcon />
                    <Group
                      LabelText="Destination"
                      value="Haryana"
                      custom={true}
                    />
                  </div>
                </div>
                <span style={{ fontWeight: "550", fontSize: "18px" }}>
                  Units Description
                </span>

                <table className="w-100 UnitTable" cellPadding="12px 25px">
                  <thead className="HeadRow">
                    <tr>
                      <th>Type</th>
                      <th>Quantity</th>
                      <th>Model</th>
                    </tr>
                  </thead>
                  <tbody className="BodyRow">
                    <tr>
                      <td>CU</td>
                      <td>50</td>
                      <td>M3</td>
                    </tr>

                    <tr>
                      <td>CU</td>
                      <td>50</td>
                      <td>M3</td>
                    </tr>

                    <tr>
                      <td>CU</td>
                      <td>50</td>
                      <td>M3</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="status-carousel-controls">
              <button>
                <ArrowLeft />
              </button>
              <button>
                <ArrowRight />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------------------------------------------- */}
      <div className="MyContainer" style={{ paddingTop: "10px" }}>
        <div className="parent_2">
          <div className="myCard d-flex d-flex-column">
            <div className=" myCardHeader_2" style={{ textAlign: "center" }}>
              <span style={{ color: "#fff" }}>WareHouses List</span>
              <div
                className="serach_1 d-flex"
                style={{ marginLeft: "20px", width: "25%" }}
              >
                <SearchIcon />
                <input
                  type="text"
                  placeholder="Search"
                  style={{ fontSize: "15px" }}
                />
              </div>
              {/* <div style={{ display: "flex", "flexDirection": "row", alignItems: "center", justifyContent: "center", marginLeft: "10px", borderRadius: "10px", padding: "7.5px 15px 7.5px 0", fontSize: "0.8em" }}>
                                <span style={{ minWidth: "max-content", paddingInlineStart: "7.5px" }}>Sort by : &nbsp;</span>
                                <select
                                    style={{ textAlign: "center", outline: "none", background: "transparent", padding: "0px", border: "none" }}
                                    onChange={(e) => setSortBy(e.target.value)}>
                                    <option value={"None"}>Default</option>
                                    <option value={"Warehouse ID"}>Warehouse ID</option>
                                    <option value={"Room Type"}>Room Type</option>
                                    <option value={"Building Type"}>Building Type</option>
                                </select>
                                <ChevronDown />
                                <button className='sortOrderButton' onClick={() => {
                                    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
                                }}>
                                    {sortOrder === 'asc' ? <AiOutlineSortAscending /> : <AiOutlineSortDescending />}
                                </button>
                            </div> */}
            </div>

            <table className="UnitTable_2" cellPadding="12px 25px">
              <thead className="HeadRow">
                <tr>
                  <th>WareHouse ID</th>
                  <th>Room Type</th>
                  <th>Building Type</th>
                  <th>Model</th>
                </tr>
              </thead>
              <tbody className="BodyRow ">
                <tr>
                  <td>CU</td>
                  <td>50</td>
                  <td>M3</td>
                  <td>M3</td>
                </tr>
                <tr>
                  <td>CU</td>
                  <td>50</td>
                  <td>M3</td>
                  <td>M3</td>
                </tr>

                <tr>
                  <td>CU</td>
                  <td>50</td>
                  <td>M3</td>
                  <td>M3</td>
                </tr>

                <tr>
                  <td>CU</td>
                  <td>50</td>
                  <td>M3</td>
                  <td>M3</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="myCard d-flex d-flex-column">
            <div className="heading_1">Units Tracking</div>
            <img
              style={{
                height: "calc(100% - 36px)",
                width: "100%",
                objectPosition: "center",
              }}
              src={SomeStats}
            />
          </div>
        </div>
      </div>

      {/* --------------------------------------------------------------------------------------------------------------- */}
      <div className="MyContainer" style={{ paddingTop: "10px" }}>
        <div className="myCard d-flex d-flex-column">
          <div className=" w-100 myCardBody myPadding">
            <div className="d-flex d-flex-apart">
              <Group LabelText="Unit Count" value="AA1122" className="myFont" />
            </div>

            <div className="parent_1">
              <div className="myCard d-flex d-flex-column">
                <div
                  className=" myCardHeader_1"
                  style={{ textAlign: "center" }}
                >
                  Ballot Unit
                </div>

                <table className="UnitTable_1" cellPadding="12px 25px">
                  <thead className="HeadRow">
                    <tr>
                      <th style={{ color: "#f56a3f" }}>Type</th>
                      <th style={{ color: "#f56a3f" }}>Quantity</th>
                      <th style={{ color: "#f56a3f" }}>Model</th>
                    </tr>
                  </thead>
                  <tbody className="BodyRow ">
                    <tr>
                      <td>CU</td>
                      <td>50</td>
                      <td>M3</td>
                    </tr>

                    <tr>
                      <td>CU</td>
                      <td>50</td>
                      <td>M3</td>
                    </tr>

                    <tr>
                      <td>CU</td>
                      <td>50</td>
                      <td>M3</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="myCard d-flex d-flex-column">
                <div
                  className=" myCardHeader_1"
                  style={{ textAlign: "center" }}
                >
                  Control Unit
                </div>
                <table className=" UnitTable_1" cellPadding="12px 25px">
                  <thead className="HeadRow">
                    <tr>
                      <th style={{ color: "#f56a3f" }}>Type</th>
                      <th style={{ color: "#f56a3f" }}>Quantity</th>
                      <th style={{ color: "#f56a3f" }}>Model</th>
                    </tr>
                  </thead>
                  <tbody className="BodyRow ">
                    <tr>
                      <td>CU</td>
                      <td>50</td>
                      <td>M3</td>
                    </tr>

                    <tr>
                      <td>CU</td>
                      <td>50</td>
                      <td>M3</td>
                    </tr>

                    <tr>
                      <td>CU</td>
                      <td>50</td>
                      <td>M3</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="myCard d-flex d-flex-column">
                <div
                  className=" myCardHeader_1"
                  style={{ textAlign: "center" }}
                >
                  VVPAI
                </div>
                <table className="UnitTable_1" cellPadding="12px 25px">
                  <thead className="HeadRow">
                    <tr>
                      <th style={{ color: "#f56a3f" }}>Type</th>
                      <th style={{ color: "#f56a3f" }}>Quantity</th>
                      <th style={{ color: "#f56a3f" }}>Model</th>
                    </tr>
                  </thead>
                  <tbody className="BodyRow ">
                    <tr>
                      <td>CU</td>
                      <td>50</td>
                      <td>M3</td>
                    </tr>

                    <tr>
                      <td>CU</td>
                      <td>50</td>
                      <td>M3</td>
                    </tr>

                    <tr>
                      <td>CU</td>
                      <td>50</td>
                      <td>M3</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <center>
              <input
                type={"submit"}
                className="mySubmit"
                style={{ marginTop: "15px" }}
              ></input>
            </center>
          </div>
        </div>
      </div>
    </div>
  );
}