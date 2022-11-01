import React from "react";
import { ReactComponent as ChevronRight } from '../../assets/chevron-right.svg';

export default function UnitCard(props){
    const data = props.data;
    return (
        <div className="myCardSample">
            <div className="card_title d-flex justify-content-start pd-custom">
                <span>Units</span> <ChevronRight className="chevron" /> <span>{props.title}</span> 
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
                    {data.map(val => (
                        <tr>
                            <td>{val[0]}</td>
                            <td>{val[1]}</td>
                            <td>{val[2]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
    </div>
    )
}