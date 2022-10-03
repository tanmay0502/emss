import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup
} from "react-simple-maps";
import india from './topojsons/india.json';
import unitData from './units.json'

const MapChart = ({ show, closeModal2, setTooltipContent, setStateName, setShowDistrict, showInfo }) => {

  function showInfo2(state) {
    state = state.toUpperCase()
    showInfo(unitData[state])
    // console.log("this ",unitData[state])
 }

  // const [content2, setContent2] = useState("");
  // const [STName, setSTName] = useState("")
  // const [show, setShow] = useState(false);

  

  // const handleClose = () => setShow(false);
    return (
      
      <>
        {/* <MapDialog show={show} StateName={STName} closeModal={handleClose} /> */}
        <ComposableMap  data-tip="" projection="geoMercator" width={100} height={100} projectionConfig={{ scale:170 }}>
          <ZoomableGroup zoom={1} center={[81,23]}>
            <Geographies geography={india}>
              
              {({ geographies }) =>
                geographies.map(geo => (
                  <Geography  
                    stroke="#FFF"
                    strokeWidth={0.05}
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={() => {                      
                      const { ST_NM } = geo.properties;
                      setTooltipContent(`${ST_NM}`);
                      showInfo2(`${ST_NM}`)                                            
                    }}
                    onMouseLeave={() => {
                      setTooltipContent("");
                    }}
                    onClick = {() => {
                      const { ST_NM } = geo.properties;
                      setStateName(`${ST_NM}`);
                      setShowDistrict(true);
                      closeModal2();
                      // alert(`${ST_NM}`);
                    }}
                    style={{
                      default: {
                        fill: "#F78865",
                        opacity: 0.8,
                        outline: "none",
                        border: "10px"
                      },
                      hover: {
                        fill: "#F78865",
                        opacity: 1,
                        outline: "none"
                      },
                      pressed: {
                        fill: "#2E8B57",
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

export default MapChart;