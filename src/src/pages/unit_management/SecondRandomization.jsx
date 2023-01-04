import { useState, useEffect, useMemo } from "react";
import styles from "./styles/UnitList.module.css";
import { useTable } from "react-table";
import { DynamicDataTable } from "@langleyfoxall/react-dynamic-data-table";
import { getRealm, formatRealm, formatRealm2 } from '../../components/utils'
import {
    AiOutlineSortAscending,
    AiOutlineSortDescending,
} from "react-icons/ai";


import { ReactComponent as ChevronDown } from "../../assets/ChevronDown.svg";
const userID = sessionStorage.getItem("sessionToken");
const baseUrl = `${process.env.REACT_APP_API_SERVER}/unit`;
const URL = window.location.href;
const arr = URL.split("/");
const param = arr[arr.length - 2];
const arr1 = param.split("=");
const randomizationid = arr1[0];
const suppl = arr[arr.length - 1] == 'Yes' ? true : false;



export default function SecondRandomization() {

    const initialVisibilityValues = {
        secondRandomisationForm: true,
    };
    const [cardVisibility, setCardVisibility] = useState(initialVisibilityValues);

    const handleButtonClick = (e) => {
        const { name } = e.currentTarget;
        const update = { ...initialVisibilityValues };
        if (cardVisibility[name]) {
            update[name] = false;
        } else {
            update[name] = true;
        }
        setCardVisibility(update);
    };

    return (
        <>
            <SecondRandomisationForm isVisible={cardVisibility.secondRandomisationForm} />
        </>
    );
}

// 2nd Randomisation Card
const SecondRandomisationForm = ({ isVisible }) => {
    const [ACList, setACList] = useState({});
    const [ACCode, setACCode] = useState('');

    useEffect(() => {
        getACs();
    }, [])

    const getACs = async () => {
        try {
            const response = await fetch(`${baseUrl}/fetch-ac-pc?` +
                new URLSearchParams({
                    randomizationid: randomizationid,
                }),
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: 'include',
                });
            const data = await response.json();
            if (response.status === 200) {
                setACList(data['data'])
                // pass the data to child component & re-render
            } else {
                alert(data.message);
            }
        } catch (err) {
            alert(`Error occured: ${err}`);
        }
    }

    useEffect(() => {
        if (Object.keys(ACList).length > 0) {
            setACCode(Object.keys(ACList)[0])
        }
    }, [ACList])

    const [assemblyData, setAssemblyData] = useState([]);
    const [iterationIndex, setIterationIndex] = useState(0);
    const [isFetching, setIsFetching] = useState(true);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [randomisedData, setRandomisedData] = useState([]);
    const [assemblyList, setAssemblyList] = useState([]);
    const [assemblyDetails, setAssemblyDetails] = useState({});
    var secondForm = "";
    
    const handleInputChange = (e) => {
        const { name, value, dataset } = e.currentTarget;
        const update = [...assemblyData];
        update[dataset.id][name] = value;
	if (name === 'ps_no') {
            const tmp = assemblyList.find(obj => obj['ps_no'] == value);
            update[dataset.id]['ps_name'] = tmp['ps_name'];
        }

        setIsSubmitted(false);
        setAssemblyData(update);
    };

    const handleAddButtonClick = (e) => {
        const id = parseInt(e.currentTarget.dataset.id);
        setIsSubmitted(false);
        setAssemblyData([
            ...assemblyData.slice(0, id + 1),
            {
                ps_no: "",
                ps_name: "",
                cu_count: "0",
                bu_count: "0",
                vt_count: "0",
            },
            ...assemblyData.slice(id + 1),
        ]);
    };

    const handleSubtractButtonClick = (e) => {
        const id = parseInt(e.currentTarget.dataset.id);
        if (assemblyData.length > 1) {
            setIsSubmitted(false);
            setAssemblyData(assemblyData.filter((a, i) => i !== id));
        }
    };

    const handleFormSubmit = async (e) => {
        let confirmation = window.confirm("Are you sure you have selected all the Unit")
        if (confirmation === true) {
            setIsSubmitted(false);
            // const units_requirement = assemblyList
            //     .filter((d) => d.ps_no)
            //       .map((d) => {
            //         d['cu_count'] = assemblyData['cu_no'] ? assemblyData['cu_no'] : 1;
            //         d['bu_count'] = assemblyData['bu_no'] ? assemblyData['bu_no'] : 1;
            //         d['vt_count'] = assemblyData['vt_no'] ? assemblyData['vt_no'] : 1;
            //         return d;
            //     });

            // fetch request
            try {
                const response = await fetch(`${baseUrl}/second-randomization`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: 'include',
                    body: JSON.stringify({
                        "units_requirement": assemblyData,
                        "ac_no": ACCode,
                        randomizationid
                    }),
                });
                const data = await response.json();
                if (response.status === 200) {

                    setRandomisedData(data);
                    setIterationIndex(data.length);
		    // if (!suppl) {
		    // 	setAssemblyData(units_requirement);
		    // }
                    setIsSubmitted(true);
                    // pass the data to child component & re-render
                } else {
                    alert(data.message);
                }
            } catch (err) {
                alert(`Error occured: ${err}`);
            }
        }
        else { }
    };


    const [pollingStationDataMessage, setPollingStationDataMessage] = useState("Fetching Polling Station Data...")

    useEffect(() => {
        // Initial fetching of any previous available user inputsc
        if (isVisible && ACCode && ACCode !== '') {
            setIsFetching(true);
            (async () => {

                try {
                    const response = await fetch(`${baseUrl}/fetch-polling-stations`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        credentials: "include",
                        body: JSON.stringify({
                            ac_no: ACCode,
                            randomizationid: randomizationid
                        })
                    });
                    const data = await response.json();
                    if (response.status === 200) {
                        if (data.hasOwnProperty('data')) {
			    setAssemblyDetails({
				'bu_no': data['data'][ACCode]['bu_no'],
				'ac_name': data['data'][ACCode]['ac_name'],
				'randomized': data['data'][ACCode]['randomized']
			    });
			    if (!suppl) {
				const tempdata=[];
				const keys = Object.keys(data['data'][ACCode]['ps']);
				for (let i = 0; i < keys.length; i++) {
				    tempdata.push(
					{
					    ps_no:data['data'][ACCode]['ps'][keys[i]]['ps_no'],
					    ps_name:data['data'][ACCode]['ps'][keys[i]]['ps_name'],
					    cu_count: "1",
					    bu_count: assemblyDetails['bu_no'],
					    vt_count: "1"
					}
				    );
				}
				setAssemblyData(tempdata);
			    } else {
				setAssemblyData([{
				    ps_no:"",
				    ps_name:"",
				    bu_count:"0",
				    cu_count:"0",
				    vt_count:"0"
				}]);
			    }
                            setAssemblyList(data['data'][ACCode]['ps']);
                        }
                    }
                    else {
                        setAssemblyData([]);
                        setAssemblyList([]);
                        setPollingStationDataMessage(data.message)
                    }
                } catch (err) {

                    alert(`Error occured: ${err}`);
                }
            })();

            setIsFetching(false);
        }
    }, [isVisible, ACCode]);
    
    if (!suppl && !isFetching && assemblyList && assemblyList.length > 0) {
	secondForm = (
            <div className="group mb-5 flex w-full justify-evenly items-center">
                <div className="mr-8 flex w-3/8 flex-col text-left">
                    <label className=" w-full text-base">
                        Polling Station Count
                    </label>
                    <div className="flex w-full justify-between gap-2 text-gray-800">
                        <input
                            className="h-10 w-1/3 rounded-md border-0 bg-zinc-100 p-2 px-5 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                            type="number"
                            name="cu_count"
                            placeholder="CU"
                            value={assemblyList.length-1}
                            disabled
                        />
                    </div>
                </div>
                <div className="flex w-3/8 flex-col text-left">
                    <label className="mb-2 w-full text-base">
                        Total Units Count {"(BU  CU  VT)"}
                        <span className="text-red-600"> *</span>
                    </label>
                    <div className="flex w-full justify-between gap-2 text-gray-800">
                        <input
                            className="h-10 w-1/3 rounded-md border-0 bg-zinc-100 p-2 px-5 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                            type="number"
                            name="bu_count"
                            placeholder="BU"
                            title="Total BUs"
                            value={assemblyDetails['bu_no'] ? (assemblyList.length-1) * assemblyDetails['bu_no'] : 0}
                            disabled
                        />
                        <input
                            className="h-10 w-1/3 rounded-md border-0 bg-zinc-100 p-2 px-5 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                            type="number"
                            name="cu_count"
                            placeholder="CU"
                            title="Total CUs"
                            value={assemblyList.length-1}
                            disabled
                        />
                        <input
                            className="h-10 w-1/3 rounded-md border-0 bg-zinc-100 p-2 px-5 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                            type="number"
                            name="vt_count"
                            placeholder="VT"
                            title="Total VTs"
                            value={assemblyList.length-1}
                            disabled
                        />
                    </div>
                </div>
            </div>
        );
    }else if (suppl && !isFetching && assemblyList && assemblyList.length > 0) {
	console.log(assemblyData,"assemblyData");
	secondForm = (
	    assemblyData.map((data, id) => (
		<div
		    className="group mb-5 flex w-full justify-evenly"
		    key={id}
                >
		    <div className="-mr-16 hidden w-10 flex-col items-center justify-end group-hover:flex">
                        <button
			    className="mb-0.5 inline-flex h-[22px] w-[22px] items-center justify-center !rounded-full border-[1px] border-rose-600 bg-white p-0.5 text-red-600 hover:border-dashed hover:bg-rose-50"
			    onClick={handleSubtractButtonClick}
			    data-id={id}
                        >
			    <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="h-6 w-6"
			    >
                                <path
				    strokeLinecap="round"
				    strokeLinejoin="round"
				    d="M19.5 12h-15"
                                />
			    </svg>
                        </button>
                        <button
			    className="inline-flex h-[22px] w-[22px] items-center justify-center !rounded-full border-[1px]  border-lime-600 bg-white p-0.5 text-lime-600 hover:border-dashed hover:bg-lime-50"
			    onClick={handleAddButtonClick}
			    data-id={id}
                        >
			    <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="h-6 w-6"
			    >
                                <path
				    strokeLinecap="round"
				    strokeLinejoin="round"
				    d="M12 4.5v15m7.5-7.5h-15"
                                />
			    </svg>
                        </button>
		    </div>
		    <div className="-mr-16 w-10 group-hover:hidden"></div>
		    <div className="mr-8 flex w-1/6 flex-col text-left">
                        <label className="mb-2 w-full text-base">
			    Polling Station {id + 1}
			    <span className="text-red-600"> *</span>
                        </label>
                        <div className="relative text-gray-800">
			    <select
                                className="h-10 w-full rounded-md p-2 px-5 placeholder:text-gray-400 focus-within:border-primary focus:border-primary"
                                name="ps_no"
                                placeholder="Select"
                                value={data.ps_no}
                                onChange={handleInputChange}
                                data-id={id}
			    >
                                {" "}
                                <option hidden>Select</option>
                                {assemblyList.map((item) => (
				    <option value={item.ps_no}>{item.ps_name}  ({item.ps_no})</option>
                                ))}
			    </select>
			    <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 -translate-x-1/2" />
                        </div>
		    </div>
		    
		    <div className="flex w-3/8 flex-col text-left">
                        <label className="mb-2 w-full text-base">
			    Unit Count {"(BU  CU  VT)"}
			    <span className="text-red-600"> *</span>
                        </label>
                        <div className="flex w-full justify-between gap-2 text-gray-800">
			    <input
                                className="h-10 w-1/3 rounded-md border-0 bg-zinc-100 p-2 px-5 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                                type="number"
                                name="bu_count"
                                placeholder="BU"
                                value={data.bu_count}
                                onChange={handleInputChange}
                                data-id={id}
			    />
			    <input
                                className="h-10 w-1/3 rounded-md border-0 bg-zinc-100 p-2 px-5 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                                type="number"
                                name="cu_count"
                                placeholder="CU"
                                value={data.cu_count}
                                onChange={handleInputChange}
                                data-id={id}
			    />
			    <input
                                className="h-10 w-1/3 rounded-md border-0 bg-zinc-100 p-2 px-5 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                                type="number"
                                name="vt_count"
                                placeholder="VT"
                                value={data.vt_count}
                                onChange={handleInputChange}
                                data-id={id}
			    />
                        </div>
		    </div>
                </div>
	    )));
    }else{
	secondForm=<h4 style={{'textAlign': 'center'}}>{pollingStationDataMessage}</h4>
    }


    return (
        <>
            {isVisible && (
                <div className="mb-10 flex h-auto w-full flex-col items-center justify-center overflow-hidden rounded-[25px] bg-white pb-[25px]">
                    <div className={styles.unit_list_header}>
                        <h4>Second {suppl?"Supplementary ":""}Randomisation</h4>
                    </div>
                    <div className="mt-2 w-full bg-white p-6">
                        <div className="flex flex-col">
                            <div className="mb-5 flex w-full flex-row justify-evenly">
                                <div className="flex w-3/8 flex-col text-left">
                                    <label className="mb-2 w-full text-base">
                                        Assembly Segment<span className="text-red-600">*</span>
                                    </label>
                                    <select value={ACCode} onChange={(e) => setACCode(e.target.value)}>
                                        {
                                            ACList && Object.keys(ACList).map((val) => {
                                                return <option value={val}>
                                                    {val}&nbsp;({ACList[val]['ac_name']})
                                                </option>
                                            })
                                        }
                                    </select>
                                </div>

                            </div>
			    {secondForm}
                        </div>
                    </div>
                    <button
                        className="mb-8 font-semibold text-white"
                        onClick={handleFormSubmit}
                    >
                        Randomise
                    </button>
                    {isSubmitted && (
                        <SecondRandomisationOutput
                            assemblyData={assemblyData}
                            randomData={randomisedData[iterationIndex - 1]}
                            iterationIndex={iterationIndex}
                            fetchNewIterations={null}
                            ACCode={ACCode}

                        />
                    )}
                </div>
            )}
        </>
    );
};

const SecondRandomisationOutput = ({
    iterationIndex,
    assemblyData,
    randomData,
    fetchNewIterations,
    ACCode
}) => {
    const iterationText = ["Third Last", "Second Last", "Latest"];
    const [isRandomisationSaved, setIsRandomisationSaved] = useState(false);
    console.log(assemblyData,"assemblyData");
    const data = useMemo(() => assemblyData, [assemblyData]);
    console.log(data, "data")
    const columns = useMemo(
        () => [
            {
                Header: "Polling Station No.",
                accessor: "ps_no", // accessor is the "key" in the data
            },
            {
                Header: "Polling Station",
                accessor: "ps_name", // accessor is the "key" in the data
            },
            {
                Header: "BU Count",
                accessor: row => row.ps_no=="reserve" ? "-" :row.bu_count,
            },
            {
                Header: "CU Count",
                accessor: row => row.ps_no=="reserve" ? "-" :row.cu_count,
            },
            {
                Header: "VT Count",
                accessor: row => row.ps_no=="reserve" ? "-" :row.vt_count,
            },
        ],
        []
    );
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable({ columns, data });

    const handleButtonClick = (e) => {
        const { name } = e.currentTarget;
        let newIndex = iterationIndex;
        console.log(newIndex, 'newIndex')
        if (name == "prev" && iterationIndex > 1) {
            newIndex--;
        } else if (name == "next" && iterationIndex < 3) {
            newIndex++;
        } else {
            return;
        }
        fetchNewIterations(newIndex);
    };


    const handleRadomisationSave = async () => {
        try {
            const response = await fetch(
                `${baseUrl}/save-second-randomization`,
                // new URLSearchParams({
                //     iteration_index: iterationIndex,
                // }),
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify({
                        iteration_index: iterationIndex,
                        ac_no: ACCode,
                        randomizationid
                    }),
                }
            );
            const data = await response.json();
            if (response.status === 200) {
                alert("Second Randomization Saved")
                setIsRandomisationSaved(data.message === "Second Randomization Saved");
            }
        } catch (err) {
            alert(`Error occured: ${err}`);
        }
    };

    const handleGenerateReport = async () => {
        try {
            const response = await fetch(
                `${baseUrl}/generate-second-randomization-report?` +
                new URLSearchParams({
                    ac_no: ACCode,
                }),
                {
                    method: "POST",
                    credentials: "include",
                }
            );
            const isPDF = response.headers
                .get("content-type")
                ?.includes("application/pdf");
            const data = isPDF ? await response.blob() : null;

            if (response.status === 200 && isPDF) {
                let file = window.URL.createObjectURL(data);
                window.open(file, "Randomisation Report");
            }
        } catch (err) {
            alert(`Error occured: ${err}`);
        }
    };

    return (
        <>
            {/* Iteration Count */}
            <div className="flex w-full flex-row items-center justify-between px-16">
                <button
                    className="h-8 rounded-md border-2 border-solid border-zinc-300 bg-zinc-50 px-5 py-0 text-sm text-gray-800 hover:bg-zinc-100 disabled:cursor-not-allowed"
                    onClick={handleButtonClick}
                    name="prev"
                    disabled={iterationIndex === 1}
                >
                    {"< Prev"}
                </button>
                <h3 className="font-sans font-semibold">
                    {iterationText[iterationIndex - 1]} Iteration
                </h3>
                <button
                    className="h-8 rounded-md border-2 border-solid border-zinc-300 bg-zinc-50 px-5 py-0 text-sm text-gray-800 hover:bg-zinc-100 disabled:cursor-not-allowed"
                    onClick={handleButtonClick}
                    name="next"
                    disabled={iterationIndex === 3}
                >
                    {"Next >"}
                </button>
            </div>
            {/* Arrow Buttons */}
            <table {...getTableProps()} className="mb-8 w-11/12">
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th
                                    {...column.getHeaderProps()}
                                    className="border-b-2 border-solid border-gray-300 bg-white text-xl font-semibold !text-gray-900"
                                >
                                    {column.render("Header")}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row, id) => {
                        prepareRow(row);
                        return (
                            <>
                                <SecondAssemblyTableRow
                                    key={id}
                                    row={row}
                                    unitData={randomData != undefined ? randomData[row.cells[0].value] : []}
                                />
                            </>
                        );
                    })}
                </tbody>
            </table>
            {isRandomisationSaved ? (
                <button
                    className="rounded-md border-2 border-solid border-zinc-300 bg-zinc-50 px-4 py-1.5 text-base text-gray-800 hover:bg-zinc-100"
                    onClick={handleGenerateReport}
                >
                    Generate Report
                </button>
            ) : (
                <button
                    className="rounded-md border-2 border-solid border-zinc-300 bg-zinc-50 px-4 py-1.5 text-base text-gray-800 hover:bg-zinc-100"
                    onClick={handleRadomisationSave}
                >
                    Save Randomisation
                </button>
            )}
        </>
    );
};

const SecondAssemblyTableRow = ({ row, unitData }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpander = (e) => {
        setIsExpanded(!isExpanded);
    };

    return (
        <>
            <tr {...row.getRowProps()} onClick={toggleExpander}>
                {row.cells.map((cell) => {
                    return (
                        <td
                            {...cell.getCellProps()}
                            className="relative border-b border-solid border-gray-200 bg-white p-2 text-lg text-gray-600"
                        >
                            {cell.column.Header === "Polling Station No." && (
                                <ChevronDown
                                    className={`absolute left-0 top-1/2 ml-7 h-5 w-5 -translate-y-1/2 translate-x-1/2 transition-transform ease-in-out ${!isExpanded && "-rotate-90"
                                        }`}
                                />
                            )}
                            {cell.render("Cell")}
                        </td>
                    );
                })}
            </tr>
            {isExpanded && (
                <tr onClick={toggleExpander}>
                    <td className="bg-zinc-50 py-2 px-6" colSpan={4}>
                        <div className="px-4 text-left">
                            <h6 className="text-lg">CU</h6>
                            <div className="mx-auto mb-2 grid grid-cols-7 text-center font-sans text-base">
                                {unitData.cu.map((unit, _id) => (
                                    <p className="m-0" key={_id}>
                                        {unit}
                                    </p>
                                ))}

                            </div>
                            <h6 className="text-lg">BU</h6>
                            <div className="mx-auto mb-2 grid grid-cols-7 text-center font-sans text-base">
                                {unitData.bu.map((unit, _id) => (
                                    <p className="m-0" key={_id}>
                                        {unit}
                                    </p>
                                ))}

                            </div>
                            <h6 className="text-lg">VT</h6>
                            <div className="mx-auto mb-2 grid grid-cols-7 text-center font-sans text-base">
                                {unitData.vt.map((unit, _id) => (
                                    <p className="m-0" key={_id}>
                                        {unit}
                                    </p>
                                ))}

                            </div>
                        </div>
                    </td>
                </tr>
            )}
        </>
    );
};

