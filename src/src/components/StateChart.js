import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup
} from "react-simple-maps";

import andamannicobar from './topojsons/states/andamannicobar.json';
import andhrapradesh from './topojsons/states/andhrapradesh.json';
import arunachalpradesh from './topojsons/states/arunachalpradesh.json';
import assam from './topojsons/states/assam.json';
import bihar from './topojsons/states/bihar.json';
import chhattisgarh from './topojsons/states/chhattisgarh.json';
import delhi from './topojsons/states/delhi.json';
import goa from './topojsons/states/goa.json';
import gujarat from './topojsons/states/gujarat.json';
import haryana from './topojsons/states/haryana.json';
import himachalpradesh from './topojsons/states/himachalpradesh.json';
import jammukashmir from './topojsons/states/jammukashmir.json';
import jharkhand from './topojsons/states/jharkhand.json';
import karnataka from './topojsons/states/karnataka.json';
import kerala from './topojsons/states/kerala.json';
import lakshadweep from './topojsons/states/lakshadweep.json';
import madhyapradesh from './topojsons/states/madhyapradesh.json';
import maharashtra from './topojsons/states/maharashtra.json';
import manipur from './topojsons/states/manipur.json';
import meghalaya from './topojsons/states/meghalaya.json';
import mizoram from './topojsons/states/mizoram.json';
import nagaland from './topojsons/states/nagaland.json';
import odisha from './topojsons/states/odisha.json';
import punjab from './topojsons/states/punjab.json';
import rajasthan from './topojsons/states/rajasthan.json';
import sikkim from './topojsons/states/sikkim.json';
import tamilnadu from './topojsons/states/tamilnadu.json';
import telangana from './topojsons/states/telangana.json';
import tripura from './topojsons/states/tripura.json';
import uttarakhand from './topojsons/states/uttarakhand.json';
import uttarpradesh from './topojsons/states/uttarpradesh.json';
import westbengal from './topojsons/states/westbengal.json';

const StateChart = ({ setTooltipContent, setDistrictName, selectedState }) => {
    let geoURL;
    let zoomMap = 1;
    let centerMap = [80, 22];
    let scaleMap = 100;
    if (selectedState === 'Andaman & Nicobar Island') {
        geoURL = andamannicobar;
        scaleMap = 500;
        centerMap = [93,10];
    } else if (selectedState === 'Andhra Pradesh') {
        geoURL = andhrapradesh;
        scaleMap = 700;
        centerMap = [80,17];
    } else if (selectedState === 'Arunachal Pradesh') {
        geoURL = arunachalpradesh;
        scaleMap = 1100;
        centerMap = [94.5,28];
    } else if (selectedState === 'Assam') {
        geoURL = assam;
        scaleMap = 1250;
        centerMap = [92.9,26];
    } else if (selectedState === 'Bihar') {
        geoURL = bihar;
        scaleMap = 1300;
        centerMap = [85.5,26];
    } else if (selectedState === 'Chhattisgarh') {
        geoURL = chhattisgarh;
        scaleMap = 1100;
        centerMap = [82,21];
    } else if (selectedState === 'NCT of Delhi') {
        geoURL = delhi;
        scaleMap = 11000;
        centerMap = [77.05,28.6];
    } else if (selectedState === 'Goa') {
        geoURL = goa;
        scaleMap = 6000;
        centerMap = [74,15.25];
    } else if (selectedState === 'Gujarat') {
        geoURL = gujarat;
        scaleMap = 1000;
        centerMap = [71.5,22];
    } else if (selectedState === 'Haryana') {
        geoURL = haryana;
        scaleMap = 1700;
        centerMap = [76,29];
    } else if (selectedState === 'Himachal Pradesh') {
        geoURL = himachalpradesh;
        scaleMap = 2000;
        centerMap = [77.4,31.8];
    } else if (selectedState === 'Jammu & Kashmir') {
        geoURL = jammukashmir;
        scaleMap = 1000;
        centerMap = [76.3,35];
    } else if (selectedState === 'Jharkhand') {
        geoURL = jharkhand;
        scaleMap = 1700;
        centerMap = [85.7,23.6];
    } else if (selectedState === 'Karnataka') {
        geoURL = karnataka;
        scaleMap = 1100;
        centerMap = [76.5,15];
    } else if (selectedState === 'Kerala') {
        geoURL = kerala;
        scaleMap = 1800;
        centerMap = [76,10.5];
    } else if (selectedState === 'Lakshadweep') {
        geoURL = lakshadweep;
        scaleMap = 2300;
        centerMap = [73,11];
    } else if (selectedState === 'Madhya Pradesh') {
        geoURL = madhyapradesh;
        scaleMap = 900;
        centerMap = [78.5,24];
    } else if (selectedState === 'Maharashtra') {
        geoURL = maharashtra;
        scaleMap = 1000;
        centerMap = [76.8,19.3];
    } else if (selectedState === 'Manipur') {
        geoURL = manipur;
        scaleMap = 3400;
        centerMap = [93.8,24.7];
    } else if (selectedState === 'Meghalaya') {
        geoURL = meghalaya;
        scaleMap = 2500;
        centerMap = [91.3,25.4];
    } else if (selectedState === 'Mizoram') {
        geoURL = mizoram;
        scaleMap = 2900;
        centerMap = [92.8,23.25];
    } else if (selectedState === 'Nagaland') {
        geoURL = nagaland;
        scaleMap = 4000;
        centerMap = [94.3,26.1];
    } else if (selectedState === 'Odisha') {
        geoURL = odisha;
        scaleMap = 1300;
        centerMap = [84.4,20.25];
    } else if (selectedState === 'Punjab') {
        geoURL = punjab;
        scaleMap = 2300;
        centerMap = [75.35,31.1];
    } else if (selectedState === 'Rajasthan') {
        geoURL = rajasthan;
        scaleMap = 900;
        centerMap = [74,26.3];
    } else if (selectedState === 'Sikkim') {
        geoURL = sikkim;
        scaleMap = 6000;
        centerMap = [88.45,27.6];
    } else if (selectedState === 'Tamil Nadu') {
        geoURL = tamilnadu;
        scaleMap = 1300;
        centerMap = [78.25,10.8];
    } else if (selectedState === 'Telangana') {
        geoURL = telangana;
        scaleMap = 1800;
        centerMap = [79.5,17.9];
    } else if (selectedState === 'Tripura') {
        geoURL = tripura;
        scaleMap = 4500;
        centerMap = [91.75,23.75];
    } else if (selectedState === 'Uttarakhand') {
        geoURL = uttarakhand;
        scaleMap = 2000;
        centerMap = [79.3,30];
    } else if (selectedState === 'Uttar Pradesh') {
        geoURL = uttarpradesh;
        scaleMap = 1000;
        centerMap = [80.8,27];
    } else if (selectedState === 'West Bengal') {
        geoURL = westbengal;
        scaleMap = 1200;
        centerMap = [87.7,24.2];
    }

    return (
      <>
        <ComposableMap  data-tip="" projection="geoMercator" width={150} height={150} projectionConfig={{ scale: scaleMap }}>
          <ZoomableGroup zoom={zoomMap} center={centerMap}>
            <Geographies geography={geoURL}>
              {({ geographies }) =>
                geographies.map(geo => (
                  <Geography  
                    stroke="#FFF"
                    strokeWidth={0.05}
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={() => {
                      const { district } = geo.properties;
                      setTooltipContent(`${district}`);
                    }}
                    onMouseLeave={() => {
                      setTooltipContent("");
                    }}
                    onClick = {() => {
                      const { district } = geo.properties;
                      setDistrictName(`${district}`);
                    }}
                    style={{
                      default: {
                        fill: "#F78865",
                        outline: "none",
                        opacity: 0.8,
                      },
                      hover: {
                        fill: "#F78865",
                        outline: "none",
                        opacity: 1,
                      },
                      pressed: {
                        fill: "#F78865",
                        outline: "none"
                      }
                    }}
                  />
                ))
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      </>
    );
};

export default StateChart;