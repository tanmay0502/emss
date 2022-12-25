import { useState, useEffect, useMemo } from "react";
import styles from "./styles/UnitList.module.css";
import { useTable } from "react-table";
import { DynamicDataTable } from "@langleyfoxall/react-dynamic-data-table";
import {
    AiOutlineSortAscending,
    AiOutlineSortDescending,
} from "react-icons/ai";


import { useNavigate } from "react-router-dom";
import { ReactComponent as OptionsIndicator } from "../../assets/Options_Indicator.svg";
import { ReactComponent as SearchInputElement } from "../../assets/searchInputIcon.svg";
import { ReactComponent as ChevronDown } from "../../assets/ChevronDown.svg";
import { expD } from "./Homepage";

const userID = sessionStorage.getItem("sessionToken");
const baseUrl = `${process.env.REACT_APP_API_SERVER}/unit`;



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


// Status Update Card
const ActionButton = ({ isActive, text, name, onClick }) => {
    return (
        <button
            className={`font-mediumisActive mx-auto mb-8 w-4/5 border-[1px] border-solid border-secondary hover:bg-secondary hover:text-white ${isActive ? "bg-secondary text-white" : "bg-white  text-secondary"
                }`}
            name={name ? name : text}
            onClick={onClick}
        >
            {text}
        </button>
    );
};



// 2nd Randomisation Card
const SecondRandomisationForm = ({ isVisible }) => {



    console.log(userID, "userID")
    const district_id = userID.slice(5, 8); // calc from userId

    const [assemblyData, setAssemblyData] = useState([
        {
            ps_name: "",
            cu_count: "",
            bu_count: "",
            vt_count: "",
        },
    ]);
    const [iterationIndex, setIterationIndex] = useState(0);
    const [isFetching, setIsFetching] = useState(true);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [randomisedData, setRandomisedData] = useState([]);
    const [assemblyList, setAssemblyList] = useState([]);

    const handleInputChange = (e) => {
        const { name, value, dataset } = e.currentTarget;
        const update = [...assemblyData];
        update[dataset.id][name] = value;
        setIsSubmitted(false);
        setAssemblyData(update);
    };

    const handleAddButtonClick = (e) => {
        const id = parseInt(e.currentTarget.dataset.id);
        setIsSubmitted(false);
        setAssemblyData([
            ...assemblyData.slice(0, id + 1),
            {
                ps_name: "",
                cu_count: "",
                bu_count: "",
                vt_count: "",
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
            const units_requirement = assemblyData
                .filter((d) => d.ps_name)
                .map((d) => {
                    d.cu_count = d.cu_count ? parseInt(d.cu_count) : 0;
                    d.bu_count = d.bu_count ? parseInt(d.bu_count) : 0;
                    d.vt_count = d.vt_count ? parseInt(d.vt_count) : 0;
                    return d;
                });

            // fetch request
            try {
                const response = await fetch(`${baseUrl}/second-randomization`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: 'include',
                    body: JSON.stringify({
                        units_requirement,
                    }),
                });
                const data = await response.json();
                console.log("Randomisation results:data ", data);
                if (response.status === 200) {

                    console.log(data.length, "dataLength")
                    setRandomisedData(data);
                    setIterationIndex(data.length);
                    setAssemblyData(units_requirement);
                    setIsSubmitted(true);
                    // pass the data to child component & re-render
                } else {
                    console.log("Could not fetch randomisation results");
                    alert(data.message);
                }
            } catch (err) {
                alert(`Error occured: ${err}`);
            }
        }
        else { }
        setIsSubmitted(false);
        const units_requirement = assemblyData
            .filter((d) => d.ps_name)
            .map((d) => {
                d.cu_count = d.cu_count ? parseInt(d.cu_count) : 0;
                d.bu_count = d.bu_count ? parseInt(d.bu_count) : 0;
                d.vt_count = d.vt_count ? parseInt(d.vt_count) : 0;
                return d;
            });

        // fetch request
        try {
            const response = await fetch(`${baseUrl}/second-randomization`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: 'include',
                body: JSON.stringify({
                    units_requirement,
                }),
            });
            const data = await response.json();
            console.log("Randomisation results: ", data);

            if (response.status === 200) {

                setRandomisedData(data);
                setIterationIndex(3);
                setAssemblyData(units_requirement);
                setIsSubmitted(true);
                // pass the data to child component & re-render
            } else {
                console.log("Could not fetch randomisation results");
                alert(data.message);
            }
        } catch (err) {
            alert(`Error occured: ${err}`);
        }
    };

    const handleFetchingNewIterations = async (iteration_index) => {
        if (randomisedData[iteration_index - 1]) {
            setIterationIndex(iteration_index);
        } else {
            setIsSubmitted(false);
            console.log('Coming')
            // fetch request
            try {
                const response = await fetch(`${baseUrl}/second-randomization`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: 'include'
                });
                const data = await response.json();

                if (response.status === 200) {
                    setRandomisedData(data);
                    setIterationIndex(3);
                    setIsSubmitted(true);
                } else {
                    console.log("Could not fetch randomisation results");
                    alert(data.message);
                }
            } catch (err) {
                alert(`Error occured: ${err}`);
            }
        }
    };

    useEffect(() => {
        // Initial fetching of any previous available user inputs
        if (isVisible) {
            setIsFetching(true);
            (async () => {

                try {
                    const response = await fetch(`${baseUrl}/fetch-polling-stations`, {
                        method: "GET",
                        headers: { "Content-Type": "application/json" },
                        credentials: "include"
                    });
                    const data = await response.json();

                    if (response.status === 200) {
                        console.log("inside if")
                        if (data.hasOwnProperty(district_id)) {
                            setAssemblyList(data[district_id]);
                        }
                    }
                } catch (err) {

                    alert(`Error occured: ${err}`);
                }
            })();

            setIsFetching(false);
        }
    }, [isVisible]);



    return (
        <>
            {isVisible && (
                <div className="mb-10 flex h-auto w-full flex-col items-center justify-center overflow-hidden rounded-[25px] bg-white pb-[25px]">
                    <div className={styles.unit_list_header}>
                        <h4>Second Randomisation</h4>
                    </div>
                    {!isFetching && (
                        <div className="mt-2 w-full bg-white p-6">
                            <div className="flex flex-col">
                                <div className="mb-5 flex w-full flex-row justify-evenly">
                                    <div className="flex w-3/8 flex-col text-left">
                                        <label className="mb-2 w-full text-base">
                                            District ID<span className="text-red-600">*</span>
                                        </label>
                                        <div className="relative text-gray-600">
                                            <input
                                                className="h-10 w-full cursor-not-allowed rounded-md bg-zinc-100 p-2 px-5 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                                                name="districtId"
                                                value={district_id}
                                                readOnly
                                                disabled
                                            />
                                        </div>
                                    </div>

                                </div>
                                {assemblyData.map((data, id) => (
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
                                        <div className="mr-8 flex w-3/8 flex-col text-left">
                                            <label className="mb-2 w-full text-base">
                                                Assembly ID {id + 1}
                                                <span className="text-red-600"> *</span>
                                            </label>
                                            <div className="relative text-gray-800">
                                                <select
                                                    className="h-10 w-full rounded-md p-2 px-5 placeholder:text-gray-400 focus-within:border-primary focus:border-primary"
                                                    name="ps_name"
                                                    placeholder="Select"
                                                    value={data.ps_name}
                                                    onChange={handleInputChange}
                                                    data-id={id}
                                                >
                                                    {" "}
                                                    <option hidden>Select</option>

                                                    {assemblyList.map((item, _id) => (
                                                        <option key={_id}>{item}</option>
                                                    ))}
                                                </select>
                                                <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 -translate-x-1/2" />

                                            </div>
                                        </div>
                                        <div className="flex w-3/8 flex-col text-left">
                                            <label className="mb-2 w-full text-base">
                                                Unit Count {id + 1} {"(CU  BU  VT)"}
                                                <span className="text-red-600"> *</span>
                                            </label>
                                            <div className="flex w-full justify-between gap-2 text-gray-800">
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
                                                    name="bu_count"
                                                    placeholder="BU"
                                                    value={data.bu_count}
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
                                ))}
                            </div>
                        </div>
                    )}
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
                            fetchNewIterations={handleFetchingNewIterations}
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
}) => {
    const iterationText = ["Third Last", "Second Last", "Latest"];
    const [isRandomisationSaved, setIsRandomisationSaved] = useState(false);
    const data = useMemo(() => assemblyData, [assemblyData]);
    console.log(data, "data")
    console.log(randomData, "randomData")
    const columns = useMemo(
        () => [
            {
                Header: "Assembly Segment",
                accessor: "ps_name", // accessor is the "key" in the data
            },
            {
                Header: "CU Count",
                accessor: "cu_count",
            },
            {
                Header: "BU Count",
                accessor: "bu_count",
            },
            {
                Header: "VT Count",
                accessor: "vt_count",
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
                `${baseUrl}/save-second-randomization?` +
                new URLSearchParams({
                    iteration_index: iterationIndex,
                }),
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                }
            );
            const data = await response.json();
            if (response.status === 200) {
                console.log("Second Randomization Saved")
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
                `${baseUrl}/generate-second-randomization-report/`,
                {
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
                                {console.log(randomData, "randomData")}
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
                            {cell.column.Header === "Assembly Segment" && (
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

