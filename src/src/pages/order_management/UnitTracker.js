const UnitTraker = ({ body }) => {
  console.log(body)
  let data = {
    total_BU_M2:0,
    total_BU_M3:0,
    total_CU_M2:0,
    total_CU_M3:0,
    total_VVPAT_M2:0,
    total_VVPAT_M3:0,
  }
  let total_BU_M2 = 0
  let total_BU_M3 = 0
  let total_CU_M2 = 0
  let total_CU_M3 = 0
  let total_VVPAT_M2 = 0
  let total_VVPAT_M3 = 0
  for (let i = 0; i < body.details.length; i++) {
    const ele = body.details[i];
    for (let j = 0; j < ele.unitDetails.length; j++) {
      const e = ele.unitDetails[j];
      
    }
  }
  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow-lg mt-2 w-full m-4 ">
        <p className=" text-lg font-semibold text-center">Unit Tracker</p>
        <div className="rounded-lg shadow-md mt-5 bg-white">
          <div
            className="rounded-t-lg p-2 text-left "
            style={{ backgroundColor: "#84587C" }}
          >
            <span className="text-white text-lg ml-5">Ballot Units</span>
          </div>
          <div className="p-2">
            <table className="w-full mt-4 ">
              <tr className="text-red-400 border-b-2 ">
                <td className="">Model</td>
                <td>Quantity</td>
              </tr>
              <br />
              <tr className=" border-b-2 ">
                <td>M2</td>
                <td>{total_BU_M2}</td>
              </tr>
              <br />
              <tr className=" border-b-2 ">
                <td>M3</td>
                <td>{total_BU_M3}</td>
              </tr>
              <br />
            </table>
          </div>
        </div>
        <div className="rounded-lg shadow-md mt-5 bg-white">
          <div
            className="rounded-t-lg p-2 text-left "
            style={{ backgroundColor: "#84587C" }}
          >
            <span className="text-white text-lg ml-5">Control Units</span>
          </div>
          <div className="p-2">
            <table className="w-full mt-4 ">
              <tr className="text-red-400 border-b-2 ">
                <td className="">Model</td>
                <td>Quantity</td>
              </tr>
              <br />
              <tr className=" border-b-2 ">
                <td>M2</td>
                <td>{total_CU_M2}</td>
              </tr>
              <br />
              <tr className=" border-b-2 ">
                <td>M3</td>
                <td>{total_CU_M3}</td>
              </tr>
              <br />
            </table>
          </div>
        </div>
        <div className="rounded-lg shadow-md mt-5 bg-white">
          <div
            className="rounded-t-lg p-2 text-left "
            style={{ backgroundColor: "#84587C" }}
          >
            <span className="text-white text-lg ml-5">VVPAT</span>
          </div>
          <div className="p-2">
            <table className="w-full mt-4 ">
              <tr className="text-red-400 border-b-2 ">
                <td className="">Model</td>
                <td>Quantity</td>
              </tr>
              <br />
              <tr className=" border-b-2 ">
                <td>M2</td>
                <td>{total_VVPAT_M2}</td>
              </tr>
              <br />
              <tr className=" border-b-2 ">
                <td>M3</td>
                <td>{total_VVPAT_M3}</td>
              </tr>
              <br />
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default UnitTraker;
