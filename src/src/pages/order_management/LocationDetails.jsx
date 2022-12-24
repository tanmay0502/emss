import React, {useState, useEffect} from 'react'
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import styles from './styles/map.module.css'
import "leaflet/dist/leaflet.css"
import marker from '../../assets/marker.png'
import { HiOutlineLocationMarker } from 'react-icons/hi'
import L from 'leaflet';
import DynamicDataTable from "@langleyfoxall/react-dynamic-data-table";

export default function LocationDetails(){
    let DefaultIcon = L.icon({
        iconUrl: marker,
        iconAnchor: [50,100],
        popupAnchor: [0,-80]
        // shadowUrl: iconShadow
    });
    const phoneNumber = () => {
        const URL = window.location.href;
        const arr = URL.split("/");
        const param = arr[arr.length - 1];
        const arr1 = param.split("=");
        return arr1[0];
      }

      const [lat, setLat] = useState('')
      const [long, setLong] = useState('')
      const [location, setLocation] = useState([])

    async function getLocation() {
        let number = phoneNumber();
        // alert(number)
        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_SERVER}/order/getLocationHistory`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: 'include',
                    body: JSON.stringify(
                        {
                            mobile: number,
                        }
                    )
                }
            );
            const data = await response.json();
            // console.log(data['data'])
                setLocation(data['data']);       

            
        } catch (err) {
            console.log({err});
        }
    }

    useEffect(() => {
        getLocation();        
    }, []);

    function formatTime(props){
        console.log(props)
        let dd = props.slice(8,10)
        let mm = props.slice(5,7)
        let yy = props.slice(0,4)
        let hrs = props.slice(11,13)
        let min = props.slice(14,16)
        let sec = props.slice(17,19)
        console.log(dd+" "+mm+" "+yy+" "+hrs+" "+min+" "+sec+" ")
        return(
            <>
            {dd+"-"+mm+"-"+yy+", "+hrs+":"+min+":"+sec+"hrs"}
            </>
        )
    }

    console.log(location)
    useEffect(() => {
        try{
            if(location[0]["latitude"] === undefined){
                setLat(23.21)  
                setLong(72.68) 
            }else{
                setLat(location[0]["latitude"])  
                setLong(location[0]["longitude"]) 
            }
        }catch(err){
            setLat(23.21)  
            setLong(72.68) 
            console.log(err)
        }
        console.log({lat})
    }, [location]);

    return(
        <div className='grid grid-cols-2' >
            <div className={styles.mapContainer}>
            <p className='text-xl' >Order Location</p>
                <MapContainer style={{ width: "800px", height: "800px", paddingLeft:"35%", }} center={[23.21,72.68]} zoom={13} scrollWheelZoom={true}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[lat,long]} icon={DefaultIcon}>
                        <Popup>
                            Latitude: {lat} {" "}
                            Longitude:{long}
                        </Popup>
                    </Marker>
                </MapContainer>
            </div>
            <div className={styles.myWrapper1}>
            {location !== 0 ?
                <div class={styles.table}>
                    <p className='text-xl' >Past Locations</p>
                    <DynamicDataTable
                        rows={location !== undefined ? location : "No Data"}
                        // fieldsToExclude={["Flcid", "Status", "ECI Supervisor's Name", "No. Of Engineers"]}
                        buttons={[]}
                        onClick={(event, row) => {
                            setLat(row["latitude"])
                            setLong(row[["longitude"]])
                            // navigate('/session/unitmanagement/editFlc/' + row["Flcid"])
                        }}
                    />
                </div>
                : ''
            }
            </div>
        </div>
    )

}