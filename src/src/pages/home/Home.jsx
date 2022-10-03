import React, { useState, useEffect, ReactComponent } from 'react'
import "./styles/Home.css"
import "./styles/Newversion.css";
import Chart from "react-google-charts";
import SomeStats from '../../assets/someStats.svg'
import WarehouseStats from '../../assets/warehouseStats.svg'
import { ReactComponent as ArrowLeft } from '../../assets/ArrowLeft.svg'
import { ReactComponent as ArrowRight } from '../../assets/ArrowRight.svg'
import MapDialog from '../../components/MapDialog';
import MapChart from "../../components/MapChart"

function Home() {
  const [content, setContent] = useState();

  if (typeof content === 'undefined') {
      setContent(",232389,236266,894373");
  }
  const compost=(typeof content==='undefined')? ",232389,236266,894373":content;
  // const st = compost.split(',')[0];
  const bu = Number(compost.split(',')[1]).toLocaleString();
  const cu = Number(compost.split(',')[2]).toLocaleString();
  const vvpat = Number(compost.split(',')[3]).toLocaleString();
  console.log("compost: " + compost);

    
  const [content2, setContent2] = useState("");
  const [STName, setSTName] = useState("")
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(true);
  

  const handleClose = () => setIndiaMap(1);
  const handleOpen = () => setIndiaMap(0);


  const [indiaMap, setIndiaMap] = useState(1);

  return (
    <div className='dashboard-grid'>
      <div className="card_header_noti">
        <div className="heading">Notifications</div>
        <ul className='li_noti hide-scroll-bar'>
          <li>
            <span>
              <span>
                First Randomisation completed in districts - Bhind, Gwalior, Indore, Bhopal
              </span>
              <span>3hrs ago</span>
            </span>
          </li>
          <li>
            <span>
              <span>
                <span></span>
                Request Ticket raised by DEO Gwalior regarding movement of units.
              </span>
              <span>3hrs ago</span>
            </span>
          </li>
          <li>
            <span>
              <span>
                <span></span>
                Request Ticket raised by DEO Gwalior regarding movement of units.
              </span>
              <span>3hrs ago</span>
            </span>
          </li>
          <li>
            <span>
              <span>
                First Randomisation completed in districts - Bhind, Gwalior, Indore, Bhopal
              </span>
              <span>3hrs ago</span>
            </span>
          </li>
          <li>
            <span>
              <span>
                First Randomisation completed in districts - Bhind, Gwalior, Indore, Bhopal
              </span>
              <span>3hrs ago</span>
            </span>
          </li>
          <li>
            <span>
              <span>
                First Randomisation completed in districts - Bhind, Gwalior, Indore, Bhopal
              </span>
              <span>3hrs ago</span>
            </span>
          </li>
        </ul>
      </div>
      <div className="card_header_status">
        <div className="hide-scroll-bar">
          <div className="heading">Status</div>
          <div className="card-status-grid">
            <div className="count active">
              <p className="NUMBER">51</p>
              <p className="TEXT">Loaned to SEC</p>
            </div>
            <div className="count">
              <p className="NUMBER">34</p>
              <p className="TEXT">Election Petition</p>
            </div>
            <div className="count">
              <p className="NUMBER">34</p>
              <p className="TEXT">Election Petition</p>
            </div>
            <div className="count">
              <p className="NUMBER">34</p>
              <p className="TEXT">Election Petition</p>
            </div>
          </div>
          <div className='status-carousel-controls'>
            <button><ArrowLeft /></button>
            <button><ArrowRight /></button>
          </div>
        </div>
      </div>

      <div className="card_header_units">
        <div className="heading">Units</div>
        <Chart
          chartType="ColumnChart"
          width="100%"
          height="calc(100% - 30px)"
          data={[
            ["Units", "Quantity", { role: "style" }],
            ["Ballot Units", parseInt(bu.replace(",", "")), "#000000"], // RGB value
            ["Control Units", parseInt(cu.replace(",", "")), "#D9D9D9"], // English color name
            ["VVPAT", parseInt(vvpat.replace(",", "")), "#000000"],
          ]}
          options={{
            title: "",
            hAxis: { title: "" },
            vAxis: { title: "Quantity" },
            legend: "none"
          }}
        />
      </div>
      <div className="card_header_warehouse">
        <div className="heading">Warehouse</div>
        <img style={{ height: "calc(100% - 36px)", width: "100%", "objectPosition": "center" }} src={WarehouseStats} />
      </div>

      <div className="card_header_district">
        <span className="heading" style={{maxWidth: "100%", display: "block", "textOverflow" : "ellipsis", "whiteSpace" :"nowrap" }}> India: {content2}</span>
        <div className='flex justify-center map'>
            {indiaMap == 0 && <MapDialog show={show} StateName={STName} closeModal={handleClose} />}
            {indiaMap == 1 && <MapChart show2={show2} closeModal2={handleOpen} setTooltipContent={setContent2} setStateName={setSTName} setShowDistrict={setShow} showInfo={setContent}/>}
        </div>
      </div>

      <div className="card_header_somestat">
        <div className="heading">Some Stat</div>
        <img style={{ height: "calc(100% - 36px)", width: "100%", "objectPosition": "center" }} src={SomeStats} />
      </div>
    </div>
  );
}

export default Home


{/*  */ }