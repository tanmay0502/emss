import React from "react";
import DynamicDataTable from "@langleyfoxall/react-dynamic-data-table";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import styles from './styles/TnaList.module.css';
import { AiOutlineSortAscending, AiOutlineSortDescending } from "react-icons/ai";
import { ReactComponent as SearchInputElement } from '../../assets/searchInputIcon.svg';
import { ReactComponent as ChevronDown } from '../../assets/ChevronDown.svg';

export default function SecondRandCard() {


  const navigate = useNavigate()
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortBy, setSortBy] = useState("None");
  const [isDetail, setIsDetail] = useState(0);
  const [tableFilter, setTableFilter] = useState("");
  const [tableData, setTableData] = useState([])
  // const [secondrandomization_list, setsecondrandomization_list] = useState([])
  const [flcValue, setFlcValue] = useState([])
  const [isLoading, setIsLoading] = useState(0);

  const secondrandomization_list = [{ 'ID': 5, 'Election': 'GA 2022', 'Start_Date': '02-01-2022', 'End_Date': '20-02-2022' }, { 'ID': 5, 'Election': 'GA 2022', 'Start_Date': '02-01-2022', 'End_Date': '20-02-2022' }, { 'ID': 5, 'Election': 'GA 2022', 'Start_Date': '02-01-2022', 'End_Date': '20-02-2022' }]

  // async function getElectionList() {
  //   try {
  //     const response = await fetch(
  //       `${process.env.REACT_APP_API_SERVER}/unit/fetch-first-randamization-schedule`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         credentials: 'include'
  //       }
  //     );
  //     const data = await response.json();
  //     console.log(data, "listFLC")
  //     if (data.length) {
  //       setsecondrandomization_list(data)
  //     }
  //   } catch (err) {
  //     console.log({ err });
  //   }
  // }

  // useEffect(
  //   () => {

  //     setIsLoading(1);

  //     let timer1 = setTimeout(() => getElectionList(), 1 * 1000);

  //     return () => {
  //       clearTimeout(timer1);
  //     };
  //   },
  //   []
  // );

  useEffect(() => {
    if (secondrandomization_list) {
      var data = secondrandomization_list.filter((elem) => {
        if (tableFilter === "") {
          return true;
        }
        else {
          // const filter = tableFilter.toLowerCase();
          // return (elem["userid"].toLowerCase().includes(filter) || elem["name"].toLowerCase().includes(filter))
        }
      }).map((val) => {
        let st = ""
        let ed = ""
        try {
          // st = st + val['startdate'].slice(0, 10)
          // ed = ed + val["enddate"].slice(0, 10)
        } catch (err) {
          // st = ""
          console.log(err)
        }

        return {
          'ID': val['ID'],
          'Election': val['Election'],
          'Start Date': val['Start_Date'],
          'End Date': val['End_Date'],
        }
      })
      setTableData(data)

    }
    return () => {

    }
  }, [])



  return (
    <>

      {isDetail === 0 ?
        <>
          <DynamicDataTable
            // rows={tableData.length != 0 ? tableData : [{ "": "Not scheduled" }]}
            rows={tableData.length != 0 ? tableData : ''}
            fieldsToExclude={["ID"]}
            buttons={[]}
            onClick={(event, row) => {
              navigate('/session/unitmanagement/secondrandomization/' + row["ID"])
            }}
          />
        </>
        : <div className={styles.ListLoader}></div>
      }
    </>
  )
}
