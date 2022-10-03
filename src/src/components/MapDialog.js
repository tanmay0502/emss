import React, { useState } from 'react';
import ReactTooltip from 'react-tooltip';
import StateChart from './StateChart';

const MapDialog = props => {
    // const classes = useStyles();
    const [contentD, setContentD] = useState("");
    const [DTName, setDTName] = useState("");
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    return (
        <div className=''>  
            <button className='pt-2 text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2' color="inherit" onClick={props.closeModal} aria-label="close" style={{  }}>
                Back
            </button>
            <div open={props.show} onClose={props.closeModal} style={{ height: '250px', width:'250px', backgroundColor: '' }}>
                <StateChart setTooltipContent={setContentD} setDistrictName={setDTName} selectedState={props.StateName} />
                <ReactTooltip>{contentD}</ReactTooltip>
            </div>
        </div>
    )
};

export default MapDialog;
