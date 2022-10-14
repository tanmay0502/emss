import React, {useEffect, useState} from "react";
import "./styles/actionIssue.css";
import { ReactComponent as CreateIssueIcon } from "../../assets/create_issue_request.svg";
import { ReactComponent as SeverityIcon } from "../../assets/severity.svg";
import { ReactComponent as LevelIcon } from "../../assets/level.svg";
import { ReactComponent as TagIcon } from "../../assets/tag.svg";
import { ReactComponent as TypeIcon } from "../../assets/type.svg";
import TextArea from "antd/lib/input/TextArea";

export default function ActionIssue() {
  const [Details,setDetails] = useState({});

  const issueId = () => {
    const URL = window.location.href;
    const arr = URL.split("/");
    const param = arr[arr.length - 1];
    const arr1 = param.split("=");
    return arr1[1];
  }

  const getDetails = async () => {
    const myId = issueId();
    try {
      const response = await fetch(
        `http://evm.iitbhilai.ac.in:8100/issue_requests/search_request/${myId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          mode: 'cors'
        }
      )
      const data = await response.json();
      console.log(data)
      setDetails(data);

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getDetails();
  }, [])
  

  function formatText(tag) {
    var selectedText = document.selection.createRange().text;

    if (selectedText != "") {
      var newText = "<" + tag + ">" + selectedText + "</" + tag + ">";
      document.selection.createRange().text = newText;
    }
  }
  return (
    <div className="p-3">
      <p className="text-left text-lg flex"><CreateIssueIcon className="mr-2" />Request ID : {issueId()}</p>
      <div className="rounded-lg shadow-md mt-5 bg-white">
        <div
          className="rounded-t-lg p-2 text-left "
          style={{ backgroundColor: "#84587C" }}
        >
          <span className="text-white text-lg ml-5">Request</span>
        </div>
        <div className="p-4 pl-10">
          <div className="flex mt-3 ">
            <p className="w-1/4 text-left">
              <span className="text-red-600">Lodger:</span> {Details.issue ? Details["issue"][0][1] : ""}
            </p>
            <p className="w-1/4 text-left">
              <span className="text-red-600">Recipient:</span> {Details.issue ? Details.issue[0][7] : ""}
            </p>
            <p className="w-1/4 text-left">
              <span className="text-red-600">Date/Time:</span>{" "}
              {Details.issue ? Details.issue[0][9] : ""}
            </p>
            <p className="w-1/4 text-left">
              <span className="text-red-600">Severity:</span> {Details.issue ? {'L': 'Low', 'M': 'Medium', 'H': 'High'}[Details.issue[0][5]] : ""}
            </p>
          </div>
          <p className="text-left mt-4">
            <span className="text-red-600">Remarks:</span>&nbsp; {Details.remarks ? Details.remarks[0][3] : ""}
          </p>
          <p className="text-left mt-4">
            <span className="text-red-600">Documents:</span>&nbsp;
            <span className="mr-3 ml-1">FileName.pdf</span>
            <span className="mr-3 ml-1">FileName.pdf</span>
            <span className="mr-3 ml-1">FileName.pdf</span>
          </p>
        </div>
      </div>
      <div className="rounded-lg shadow-md mt-5 bg-white">
        <div
          className="rounded-t-lg p-2 text-left "
          style={{ backgroundColor: "#84587C" }}
        >
          <span className="text-white text-lg ml-5">Take Action</span>
        </div>
        <form className="p-4 pl-10">
          <div className="flex justify-start">
            <div className="w-3/5 flex">
              <div className="text-left w-full">
                <label className="text-left ">
                  Remarks<span className="text-red-600">*</span>
                </label>
                <br />
                <textarea
                  className="w-5/6 h-4/5 p-2 border rounded-md mt-1"
                  placeholder="Text Input"
                ></textarea>
              </div>
            </div>
            <div className="w-2/5">
              <div className="text-left">
                <label className="text-left ">
                  Action<span className="text-red-600">*</span>
                </label>
                <br />
                <div className="flex">
                  <select
                    type="text"
                    className="w-4/5 h-10 mt-1 p-2 border rounded-md"
                  >
                    <option>Select</option>
                    <option>Option 1</option>
                    <option>Option 2</option>
                    <option>Option 3</option>
                  </select>

                  <TypeIcon className="ml-2" />
                </div>
              </div>
              <div className="text-left mt-4">
                <label className="text-left ">
                  Forwarded To<span className="text-red-600">*</span>
                </label>
                <br />
                <div className="flex">
                  <select
                    type="text"
                    className="w-4/5 h-10 mt-1 p-2 border rounded-md"
                  >
                    <option>Select</option>
                    <option>Option 1</option>
                    <option>Option 2</option>
                    <option>Option 3</option>
                  </select>

                  <TypeIcon className="ml-2" />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5 text-left w-1/3">
            <label className="text-left">Supporting Documents</label>
            <input type="file" className="w-1/6"></input>
          </div>
          <button
            type="submit"
            className="text-white h-10 p-0 pl-3 pr-3"
            style={{ backgroundColor: "#F56A3F" }}
          >
            Submit{" "}
          </button>
        </form>
      </div>
    </div>
  );
}
