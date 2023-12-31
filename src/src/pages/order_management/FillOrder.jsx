import react, { useEffect, useState } from "react";
import { UnitCount } from "./Utils";

export default function FillOrder({
  Order,
  setOrder,
  sources,
  sname,
  scode,
  destinations,
  dname,
  dcode,
  type
}) {
  // alert(type)
  
  const currID = () => {
    const URL = window.location.href;
    const arr = URL.split("/");
    const param = arr[arr.length - 1];
    // const arr1 = param.split("=");
    // console.log(param)
    return param;
  }

  const [currId,  setCurrID] = useState("")
  useEffect(()=> {
    setCurrID(currID())
    // alert(currId)
  },[])

  console.log(sources, destinations);
  const Template = {
    manufacturer: "select",
    model: "select",
    availableCU: "1000",
    filledCU: "0",
    availableBU: "1000",
    filledBU: "0",
    availableVVPAT: "1000",
    filledVVPAT: "0",
  };
  const Template2 = {
    source: "select",
    destination: "select",
    details: [],
  };

  const [Units, setUnits] = useState({});

  async function getUnits(oprnd) {
    let temp = ""
    if(type === "REP"){
        temp = "Manufacturer Under Repair"
    }else{
        temp = "Available For Use"
    }
    
    let body = {
      oprnd: oprnd,
      status: temp,
    };

    let data = await UnitCount(body);
    console.log(data);

    setUnits((prev) => {
      let ppp = { ...prev };
      let EM2CU = 0;
      let EM3CU = 0;
      let BM2CU = 0;
      let BM3CU = 0;
      let EM2BU = 0;
      let EM3BU = 0;
      let BM2BU = 0;
      let BM3BU = 0;
      let EM2VT = 0;
      let EM3VT = 0;
      let BM2VT = 0;
      let BM3VT = 0;
      data.map((val) => {
        let p = "";
        p += val["manufacturer"] + val["model"] + "BU";
        if (val["model"] !== "BU" && val["model"] !== "CU") {
          let pp = eval(p) + val["BU"];
          eval(p + " = " + pp);
        }
        p = "";
        p += val["manufacturer"] + val["model"] + "CU";
        if (val["model"] !== "BU" && val["model"] !== "CU") {
          let pp = eval(p) + val["CU"];
          eval(p + " = " + pp);
        }
        p = "";
        p += val["manufacturer"] + val["model"] + "VT";
        if (val["model"] !== "BU" && val["model"] !== "CU") {
          let pp = eval(p) + val["VT"];
          eval(p + " = " + pp);
        }
      });
      ppp[oprnd] = {
        EM2CU: EM2CU,
        EM3CU: EM3CU,
        BM2CU: BM2CU,
        BM3CU: BM3CU,
        EM2BU: EM2BU,
        EM3BU: EM3BU,
        BM2BU: BM2BU,
        BM3BU: BM3BU,
        EM2VVPAT: EM2VT,
        EM3VVPAT: EM3VT,
        BM2VVPAT: BM2VT,
        BM3VVPAT: BM3VT,
      };
      console.log(ppp);
      return ppp;
    });
  }

  return (
    <div>
      {sources.length == 0 && <h2>Loading. Please Wait...</h2>}
      {sources.length !== 0 && (
        <>
          {Order.map((val1, id1) => (
            <>
              <div className="p-10 rounded-md shadow-md bg-white ">
                <div className="flex justify-between mb-5">
                  <div className="w-1/3 text-left">
                    <label htmlFor="source" className="text-left ml-2">
                      Source
                    </label>
                    <select
                      name=""
                      id=""
                      className="w-full"
                      value={val1["source"]}
                      onChange={(e) => {
                        setOrder((prev) => {
                          let ppp = [...prev];
                          ppp[id1]["source"] = e.target.value;
                          let oprnd;
                          if (scode == "dtCode") {
                            oprnd =
                              sessionStorage
                                .getItem("sessionToken")
                                .substring(0, 2) +
                              e.target.value +
                              "000DEO";
                          } else {
                            oprnd = e.target.value + "ALL000CEO";
                          }

                          getUnits(oprnd);
                          return ppp;
                        });
                      }}
                    >
                      <option value="select">Select</option>
                      {sources.map((val) => (
                        <option value={val[scode]}>{val[sname]}</option>
                      ))}
                    </select>
                  </div>
                  <div className="w-1/3 text-left">
                    <label htmlFor="source" className="text-left ml-2">
                      Destination
                    </label>
                    <select
                      name=""
                      id=""
                      className="w-full"
                      value={val1["destination"]}
                      onChange={(e) => {
                        setOrder((prev) => {
                          let ppp = [...prev];
                          ppp[id1]["destination"] = e.target.value;
                          return ppp;
                        });
                      }}
                    >
                      <option value="select">Select</option>

                      {destinations.map((val) => (
                        <option value={val[dcode]}>{val[dname]}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <h4>Unit Description</h4>
                <div className="w-full flex ">
                  <div className="w-1/8 flex justify-center px-4">Manufacturer</div>
                  <div className="w-1/8 flex justify-center px-4">Model</div>
                  <div className={ currId !== "NEW" ? "justify-center w-2/8 px-6" :"justify-center w-1/6" }>
                    Filled BU{currId === "NEW" ? " " : "/Available BU"}
                  </div>
                  <div className={ currId !== "NEW" ? "justify-center w-2/8 px-6" :"justify-center w-1/6" }>Filled CU{currId === "NEW" ? " " : "/Available CU"}</div>
                  <div className={ currId !== "NEW" ? "justify-center w-2/8 px-4" :"justify-center w-1/6 pr-4" }>Filled VVPAT{currId === "NEW" ? " " : "/Available VVPAT"}</div>
                  <div className="w-1/8 opacity-0">.</div>
                </div>
                {val1["details"].map((val2, id2) => (
                  <div className="w-full flex">
                    <div className="w-1/8 m-2">
                      <select
                        value={Order[id1]["details"][id2]["manufacturer"]}
                        onChange={(e) => {
                          setOrder((prev) => {
                            let ppp = [...prev];
                            ppp[id1]["details"][id2]["manufacturer"] =
                              e.target.value;
                            console.log(ppp);
                            return ppp;
                          });
                        }}
                      >
                        <option value="select">select</option>
                        <option value="ECIL">ECIL</option>
                        <option value="BEL">BEL</option>
                      </select>
                    </div>
                    <div className="w-1/8 m-2">
                      <select
                        value={Order[id1]["details"][id2]["model"]}
                        onChange={(e) => {
                          setOrder((prev) => {
                            let ppp = [...prev];
                            ppp[id1]["details"][id2]["model"] = e.target.value;
                            console.log(ppp);
                            return ppp;
                          });
                        }}
                      >
                        <option value="select">select</option>
                        <option value="M2">M2</option>
                        <option value="M3">M3</option>
                      </select>
                    </div>

                    <div className={currId !== "NEW" ? "w-2/8 m-2" : "w-1/8 m-2"}>
                      <input
                        type="text"
                        className={currId !== "NEW" ? "border-1 border-black !border-b-0 !rounded-b-none text-center flex justify-center" :"border-1 border-black text-center flex justify-center"}
                        value={Order[id1]["details"][id2]["filledBU"]}
                        onChange={(e) => {
                          if (
                            (scode === "dtCode"
                              ? Units[
                                  sessionStorage
                                    .getItem("sessionToken")
                                    .substring(0, 2) +
                                    val1["source"] +
                                    "000DEO"
                                ]
                              : Units[val1["source"] + "ALL000CEO"]) &&
                            val2["model"] !== "select" &&
                            val2["manufacturer"]
                          ) {
                            setOrder((prev) => {
                              let ppp = [...prev];
                              if (
                                e.target.value <=
                                (scode == "dtCode"
                                  ? Units[
                                      sessionStorage
                                        .getItem("sessionToken")
                                        .substring(0, 2) +
                                        val1["source"] +
                                        "000DEO"
                                    ]
                                  : Units[val1["source"] + "ALL000CEO"])[
                                  val2["manufacturer"].substring(0, 1) +
                                    val2["model"] +
                                    "BU"
                                ]
                              ) {
                                ppp[id1]["details"][id2]["filledBU"] =
                                  e.target.value;
                              }
                              console.log(ppp);
                              return ppp;
                            });
                          }
                        }}
                      >
                      
                      </input>
                      {currId !== "NEW" ? 
                      <input
                        type="text"
                        className="border-1 border-black !border-t-0 !rounded-t-none text-center bg-gray-200"
                        value={
                          (scode == "dtCode"
                            ? Units[
                                sessionStorage
                                  .getItem("sessionToken")
                                  .substring(0, 2) +
                                  val1["source"] +
                                  "000DEO"
                              ]
                            : Units[val1["source"] + "ALL000CEO"]) &&
                          val2["model"] !== "select" &&
                          val2["manufacturer"]
                            ? (scode == "dtCode"
                                ? Units[
                                    sessionStorage
                                      .getItem("sessionToken")
                                      .substring(0, 2) +
                                      val1["source"] +
                                      "000DEO"
                                  ]
                                : Units[val1["source"] + "ALL000CEO"])[
                                val2["manufacturer"].substring(0, 1) +
                                  val2["model"] +
                                  "BU"
                              ]
                            : "-"
                        }
                      ></input>
                      : " "}
                    </div>

                    <div className={currId !== "NEW" ? "w-2/8 m-2" : "w-1/8 m-2"}>
                      <input
                        type="text"
                        className={currId !== "NEW" ? "border-1 border-black !border-b-0 !rounded-b-none text-center flex justify-center" :"border-1 border-black text-center flex justify-center"}
                        value={Order[id1]["details"][id2]["filledCU"]}
                        onChange={(e) => {
                          if (
                            (scode === "dtCode"
                              ? Units[
                                  sessionStorage
                                    .getItem("sessionToken")
                                    .substring(0, 2) +
                                    val1["source"] +
                                    "000DEO"
                                ]
                              : Units[val1["source"] + "ALL000CEO"]) &&
                            val2["model"] !== "select" &&
                            val2["manufacturer"]
                          ) {
                            setOrder((prev) => {
                              let ppp = [...prev];
                              if (
                                e.target.value <=
                                (scode == "dtCode"
                                  ? Units[
                                      sessionStorage
                                        .getItem("sessionToken")
                                        .substring(0, 2) +
                                        val1["source"] +
                                        "000DEO"
                                    ]
                                  : Units[val1["source"] + "ALL000CEO"])[
                                  val2["manufacturer"].substring(0, 1) +
                                    val2["model"] +
                                    "CU"
                                ]
                              ) {
                                ppp[id1]["details"][id2]["filledCU"] =
                                  e.target.value;
                              }
                              console.log(ppp);
                              return ppp;
                            });
                          }
                        }}
                      ></input>
                    {currId !== "NEW" ? 
                      <input
                        type="text"
                        className="border-1 border-black  !border-t-0 !rounded-t-none text-center flex justify-center bg-gray-200"
                        value={
                          (scode === "dtCode"
                            ? Units[
                                sessionStorage
                                  .getItem("sessionToken")
                                  .substring(0, 2) +
                                  val1["source"] +
                                  "000DEO"
                              ]
                            : Units[val1["source"] + "ALL000CEO"]) &&
                          val2["model"] !== "select" &&
                          val2["manufacturer"]
                            ? (scode == "dtCode"
                                ? Units[
                                    sessionStorage
                                      .getItem("sessionToken")
                                      .substring(0, 2) +
                                      val1["source"] +
                                      "000DEO"
                                  ]
                                : Units[val1["source"] + "ALL000CEO"])[
                                val2["manufacturer"].substring(0, 1) +
                                  val2["model"] +
                                  "CU"
                              ]
                            : "-"
                        }
                      ></input>
                      : " "}
                    </div>

                    <div className={currId !== "NEW" ? "w-2/8 m-2" : "w-1/8 m-2"}>
                      <input
                        type="text"
                        className={currId !== "NEW" ? "border-1 border-black !border-b-0 !rounded-b-none text-center flex justify-center" :"border-1 border-black text-center flex justify-center"}
                        value={Order[id1]["details"][id2]["filledVVPAT"]}
                        onChange={(e) => {
                          if (
                            (scode == "dtCode"
                              ? Units[
                                  sessionStorage
                                    .getItem("sessionToken")
                                    .substring(0, 2) +
                                    val1["source"] +
                                    "000DEO"
                                ]
                              : Units[val1["source"] + "ALL000CEO"]) &&
                            val2["model"] !== "select" &&
                            val2["manufacturer"]
                          ) {
                            setOrder((prev) => {
                              let ppp = [...prev];
                              if (
                                e.target.value <=
                                (scode == "dtCode"
                                  ? Units[
                                      sessionStorage
                                        .getItem("sessionToken")
                                        .substring(0, 2) +
                                        val1["source"] +
                                        "000DEO"
                                    ]
                                  : Units[val1["source"] + "ALL000CEO"])[
                                  val2["manufacturer"].substring(0, 1) +
                                    val2["model"] +
                                    "VVPAT"
                                ]
                              ) {
                                ppp[id1]["details"][id2]["filledVVPAT"] =
                                  e.target.value;
                              }
                              console.log(ppp);
                              return ppp;
                            });
                          }
                        }}
                      ></input>
                    {currId !== "NEW" ? 
                      <input
                        type="text"
                        className="border-1 border-black !border-t-0 !rounded-t-none text-center bg-gray-200"  
                        value={
                          (scode == "dtCode"
                            ? Units[
                                sessionStorage
                                  .getItem("sessionToken")
                                  .substring(0, 2) +
                                  val1["source"] +
                                  "000DEO"
                              ]
                            : Units[val1["source"] + "ALL000CEO"]) &&
                          val2["model"] !== "select" &&
                          val2["manufacturer"]
                            ? (scode == "dtCode"
                                ? Units[
                                    sessionStorage
                                      .getItem("sessionToken")
                                      .substring(0, 2) +
                                      val1["source"] +
                                      "000DEO"
                                  ]
                                : Units[val1["source"] + "ALL000CEO"])[
                                val2["manufacturer"].substring(0, 1) +
                                  val2["model"] +
                                  "VVPAT"
                              ]
                            : "-"
                        }
                      ></input>
                      : " "}
                    </div>

                    <div className="w-1/8 m-2 flex pt-14">
                      <button
                        className="text-white !rounded-full flex"
                        onClick={() => {
                          let ppp = [...Order];

                          let pp = ppp[id1]["details"];
                          console.log(ppp, pp);

                          let newpp = [];
                          console.log("hdhdh");
                          for (let id3 = 0; id3 < pp.length; id3++) {
                            console.log(id3, id2);
                            if (id3 !== id2) {
                              newpp.push(pp[id3]);
                            }
                          }
                          console.log(ppp, pp);

                          ppp[id1]["details"] = newpp;

                          setOrder(ppp);
                        }}
                      >
                        -
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  className="text-white"
                  onClick={() => {
                    setOrder((prev) => {
                      let ppp = [...prev];
                      console.log(ppp);
                      console.log(id1);
                      console.log(ppp[id1]);
                      console.log(Template, ppp[id1][ppp[id1].length - 1]);
                      if (
                        ppp[id1]["details"].length == 0 ||
                        ppp[id1]["details"][ppp[id1]["details"].length - 1] !==
                          Template
                      )
                        ppp[id1]["details"].push(Template);

                      return ppp;
                    });
                  }}
                >
                  Add row
                </button>
              </div>
              <div className="text-right">
                <button
                  className="text-white  mb-5 -mt-10 p-5"
                  style={{ borderRadius: "50%" }}
                  onClick={() => {
                    let ppp = [...Order];

                    let pp = ppp;
                    console.log(ppp, pp);

                    let newpp = [];
                    console.log("hdhdh");
                    for (let id3 = 0; id3 < pp.length; id3++) {
                      console.log(id3, id1);
                      if (id3 !== id1) {
                        newpp.push(pp[id3]);
                      }
                    }
                    console.log(ppp, pp);

                    ppp = newpp;

                    setOrder(ppp);
                  }}
                >
                  -
                </button>
              </div>
              <br />
            </>
          ))}
          <button
            className="text-white mt-1"
            onClick={() => {
              setOrder((prev) => {
                let ppp = [...prev];
                console.log(ppp);
                if (ppp.length == 0 || ppp.length - 1 !== Template2)
                  ppp.push(Template2);

                return ppp;
              });
            }}
          >
            Add Order
          </button>
        </>
      )}
    </div>
  );
}
