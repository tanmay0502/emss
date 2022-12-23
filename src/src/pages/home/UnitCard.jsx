import React from "react";
import { ReactComponent as ChevronRight } from '../../assets/chevron-right.svg';
import { useNavigate } from 'react-router-dom';

export default function UnitCard({title, statusData}){
    const navigate = useNavigate();
    let displayData = [['Ballot Units', 0, 0], ['Control Units', 0, 0], ['VVPAT', 0, 0]];
    // console.log(title, statusData)
    let data = statusData.filter(val=>(val.status===title))
    // console.log(data)
    for (let i = 0; i < data.length; i++) {
        const ele = data[i];
        for (let j = 0; j < ele.data.length; j++) {
            const e = ele.data[j];
            if (e.unit_type === "BU" && e.manufacturer === "E") displayData[0][1]+=e.count;
            if (e.unit_type === "BU" && e.manufacturer === "B") displayData[0][2]+=e.count;
            if (e.unit_type === "CU" && e.manufacturer === "E") displayData[1][1]+=e.count;
            if (e.unit_type === "CU" && e.manufacturer === "B") displayData[1][2]+=e.count;
            if (e.unit_type === "VT" && e.manufacturer === "E") displayData[2][1]+=e.count;
            if (e.unit_type === "VT" && e.manufacturer === "B") displayData[2][2]+=e.count;
        }
    }
    return (
        <div className="myCardSample hover:cursor-pointer transition delay-50 hover:scale-105"
        onClick={() => {
            navigate("/session/unitmanagement") }}>
        <div>
            <div className="card_title d-flex justify-content-start pd-custom">
                <span>Units</span> <ChevronRight className="chevron" /> <span>{title}</span> 
            </div>
            <table className='w-100 '>
                <thead>
                <tr>
                        <th>Units</th>
                        <th>ECIL</th>
                        <th>BEL</th>
                </tr>
                </thead>
                <tbody>
                    {displayData.map(val => (
                        <tr>
                            <td>{val[0]}</td>
                            <td>{val[1]}</td>
                            <td>{val[2]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
    </div>
    </div>
    )
}