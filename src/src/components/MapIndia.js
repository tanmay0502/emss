import React, { useState } from 'react';
import ReactTooltip from 'react-tooltip';
import MapChart from './MapChart';

const MapIndia = props => {
    // const classes = useStyles();
    const [contentD, setContentD] = useState("");
    const [DTName, setDTName] = useState("");
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    return (
        <div className=''>  
            <div className='state-chart-container' style={{ height: 'calc(32.5vh)', width:'100%', backgroundColor: '' }}>
                <MapChart {...props} />
            </div>
        </div>
    )
};

export default MapIndia;
