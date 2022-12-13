import React from "react";
import { useState, useEffect } from "react";
import "./styles/order.css";
import UnitDescription from "./Unit_description"
import WareHouseListUnitTrackerFillAvailability from "./warehouseListUnitTrackerfillavailability"
import "../home/styles/Newversion.css";
import { Fragment } from 'react';
import { useParams } from "react-router-dom";
import { FaCircle, FaFontAwesomeLogoFull } from 'react-icons/fa'
import { FaKey } from 'react-icons/fa'
import ToggleButton from '../../components/ToggleButton';


export default function FillAvailability() {


    // const data = useParams();
    // const orderById = JSON.parse(data["orderById"]);
    // console.log(JSON.parse(data["orderById"]), "order")

    return (
        <div>
            <UnitDescription  />
            <WareHouseListUnitTrackerFillAvailability />
        </div >
    );
}