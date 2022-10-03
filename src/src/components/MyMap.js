import React, { Component } from "react"
import IndiaStates from "./india-states.json"
import "leaflet/dist/leaflet.css"
import mapData from "./india-states.json"
import unitData from "./units.json"
import { MapContainer, TileLayer, useMap, GeoJSON } from 'react-leaflet'

//const url = "https://raw.githubusercontent.com/atul-mane01/India-Coordinates/main/INDIA/INDIA_STATES.geojson" 


class MyMap extends Component{
    state = {};
    
    mapStyle = {
        fillColor: "red",
        height: "30vh",
        width: "100%"
    }

     innerStyle = {
         weight: 1

     }

    stateClick = (event) => {
        console.log("clicked")
    }
    showInfo(state) {
        this.props.showInfo(unitData[state])
    }

    onEachState = (state, layer) => {
        const stateName = state.properties.STNAME;
        //layer.bindPopup(stateName)
        // console.log(state)
        layer.on({
            mouseover: (event) => {
                event.target.setStyle(
                    {      
                        fillColor:"red",
                        fillOpacity: 0.2,
                    }
                );
		this.showInfo(stateName);
            },
            mouseout: (event) => {
                event.target.setStyle(
                    {      
                        fillColor:"#3388ff",
                        fillOpacity: 0.2,
                    }
                );
		this.showInfo("India,274724,894843,43984");
            }
        })
    }

    render(){
        return(
            <div className="map-container">
                <MapContainer style={this.mapStyle} zoom={2.5} center={[23,83]}>
                    <GeoJSON style= {this.innerStyle} data={IndiaStates.features} onEachFeature={this.onEachState}/>
                </MapContainer>
            </div>
        )
    }

}
export default MyMap;
