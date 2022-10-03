import React, { useState, useEffect, ReactComponent } from 'react'
import MyMap from "../../components/MyMap";
import "./styles/Home.css"
import "./styles/Newversion.css";
import Chart from "react-google-charts";
import SomeStats from '../../assets/someStats.svg'
import WarehouseStats from '../../assets/warehouseStats.svg'
import { ReactComponent as ArrowLeft } from '../../assets/ArrowLeft.svg'
import { ReactComponent as ArrowRight } from '../../assets/ArrowRight.svg'

function Home() {
  const [content, setContent] = useState("");
  if (typeof content === 'undefined') {
    setContent(",232389,236266,894373");
  }
  const compost = (typeof content === 'undefined') ? ",232389,236266,894373" : content;
  const st = compost.split(',')[0];
  const bu = Number(compost.split(',')[1]).toLocaleString();
  const cu = Number(compost.split(',')[2]).toLocaleString();
  const vvpat = Number(compost.split(',')[3]).toLocaleString();

  return (
    <div className='dashboard-grid'>
      <div className="card_header_noti">
        <div className="heading">Notifications</div>
        <ul className='li_noti hide-scroll-bar'>
          <li>
            <span>
              <span>
                First Randomisation completed in districts- Bhind, Gwalior, Indore, Bhopal
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
                First Randomisation completed in districts- Bhind, Gwalior, Indore, Bhopal
              </span>
              <span>3hrs ago</span>
            </span>
          </li>
          <li>
            <span>
              <span>
                First Randomisation completed in districts- Bhind, Gwalior, Indore, Bhopal
              </span>
              <span>3hrs ago</span>
            </span>
          </li>
          <li>
            <span>
              <span>
                First Randomisation completed in districts- Bhind, Gwalior, Indore, Bhopal
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
        {/* <BarChart className="bargraph" ylabel='Units' margin={{top: 20, right: 0, bottom: 20, left: 60}} height="250" width="250" data={compost ? [
          {
            text: "Ballot Units",
            value: parseInt(bu.replace(",", ""))
          },
          {
            text: "Control Units",
            value: parseInt(cu.replace(",", ""))
          },
          {
            text: "VVPAT",
            value: parseInt(vvpat.replace(",", ""))
          }
        ] : []} /> */}
        {/* <div className="grid grid-cols-3 text-center pt-8">
          <div>
            <p className="count5"> {bu}</p>
            <p> Ballot Units</p>
          </div>
          <div>
            <p className="count6"> {cu}</p>
            <p> Control Units</p>
          </div>
          <div>
            <p className="count7"> {vvpat}</p>
            <p> VVPAT</p>
          </div>
        </div> */}
      </div>
      <div className="card_header_warehouse">
        <div className="heading">Warehouse</div>
        <img style={{ height: "calc(100% - 36px)", width: "100%", "objectPosition": "center" }} src={WarehouseStats} />
      </div>
      <div className="card_header_district">
        <div className="heading">States</div>
        <div>
          <MyMap showInfo={setContent} />
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