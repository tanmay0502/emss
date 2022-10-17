import React from "react";
import './styles/order.css';
import  Group  from "./Group";
import {FaSearch} from 'react-icons/fa';
import { ReactComponent as SearchIcon } from '../../assets/search.svg';
import { ReactComponent as SourceIcon } from '../../assets/SourceIcon.svg';

import { ReactComponent as DestIcon } from '../../assets/DestIcon.svg';

export default function FillAvailability(){
    return (
        <div className="MyContainer">
            <div className="myCard d-flex d-flex-column">
                <div className="myCardHeader myPadding">
                        Order Details
                </div>
                <div className="w-100 myCardBody myPadding">

                       <div className="d-flex d-flex-apart">
                            <Group LabelText = 'Order ID' value = 'OM12993455'  className='myFont'/>
                            <div className="serach d-flex">
                                <SearchIcon/>
                                <input type="text" placeholder="Search by Reference ID"/>
                            </div>
                       </div>

                       <div className="mt-3 mb-3 d-flex d-flex-apart">
                            <div className="OrderCard">
                                <Group LabelText = 'Referenced Order ID' value = 'XYZ/20'/>

                                <div className="w-100 source_dest d-flex d-flex-apart" style={{marginTop : '20px',marginBottom : '15px'}}>
                                    <div className="d-flex"><SourceIcon/><Group LabelText = 'Source' value = 'Delhi'/></div>
                                    <div className="d-flex"><DestIcon /><Group LabelText = 'Destination' value ='Haryana' custom={true}/></div>
                                </div>
                                <span style={{fontWeight : '550',fontSize : '18px'}} >Units Description</span>

                                <table className="w-100 UnitTable" cellPadding='12px 25px'>
                                    <thead className="HeadRow">
                                        <tr>
                                            <th>Type</th>
                                            <th>Quantity</th>
                                            <th>Model</th>
                                        </tr>
                                    </thead>
                                    <tbody className="BodyRow">
                                        <tr>
                                            <td>CU</td>
                                            <td>50</td>
                                            <td>M3</td>
                                        </tr>

                                        <tr>
                                            <td>CU</td>
                                            <td>50</td>
                                            <td>M3</td>
                                        </tr>

                                        <tr>
                                            <td>CU</td>
                                            <td>50</td>
                                            <td>M3</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="OrderCard">
                                <Group LabelText = 'Referenced Order ID' value = 'XYZ/20'/>

                                <div className="w-100 source_dest d-flex d-flex-apart" style={{marginTop : '20px',marginBottom : '15px'}}>
                                    <div className="d-flex"><SourceIcon/><Group LabelText = 'Source' value = 'Delhi'/></div>
                                    <div className="d-flex"><DestIcon /><Group LabelText = 'Destination' value ='Haryana' custom={true}/></div>
                                </div>
                                <span style={{fontWeight : '550',fontSize : '18px'}} >Units Description</span>

                                <table className="w-100 UnitTable" cellPadding='12px 25px'>
                                    <thead className="HeadRow">
                                        <tr>
                                            <th>Type</th>
                                            <th>Quantity</th>
                                            <th>Model</th>
                                        </tr>
                                    </thead>
                                    <tbody className="BodyRow">
                                        <tr>
                                            <td>CU</td>
                                            <td>50</td>
                                            <td>M3</td>
                                        </tr>

                                        <tr>
                                            <td>CU</td>
                                            <td>50</td>
                                            <td>M3</td>
                                        </tr>

                                        <tr>
                                            <td>CU</td>
                                            <td>50</td>
                                            <td>M3</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                       </div>
                </div>
            </div>
        </div>
    )
}