import React, { useEffect, useState } from "react";
import "./styles/actionIssue.css";
import { ReactComponent as CreateIssueIcon } from "../../assets/create_issue_request.svg";
import { ReactComponent as SeverityIcon } from "../../assets/severity.svg";
import { ReactComponent as LevelIcon } from "../../assets/level.svg";
import { ReactComponent as TagIcon } from "../../assets/tag.svg";
import { ReactComponent as TypeIcon } from "../../assets/type.svg";
import TextArea from "antd/lib/input/TextArea";
import * as mime from "react-native-mime-types";
import styles from './styles/issue.module.css'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { useNavigate } from "react-router-dom";
import { FaEdit } from 'react-icons/fa'

export default function ActionIssue() {
  const navigate = useNavigate();
  const [Details, setDetails] = useState({});

  const [remarks, setRemarks] = useState("");
  const [action, setAction] = useState("");
  const [MMtype, setMMtype] = useState("");
  const [forwardedTo, setForwardedTo] = useState("");
  const [supportingDoc, setSupportingDoc] = useState("");
  const [users, setUsers] = useState([]);


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

  const getList = async () => {
    let token = localStorage.getItem("token");
        // console.log(decode)
    	console.log(JSON.parse(token)["access_token"]);
		const access_token=JSON.parse(token)["access_token"];
    const myId = issueId();
    try {
      const response = await fetch(
				"http://evm.iitbhilai.ac.in:8100/user/listAllUsers",
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						'Authorization': 'Bearer ' + access_token,
					},
					mode: "cors"
				}
			);
      const data = await response.json();
      console.log(data);
      let allUsers = []
      for (let i = 0; i < data["data"].length; i++) {
        allUsers.push(data["data"][i][0])
      }
      console.log(allUsers)
      setUsers(allUsers)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDetails();
    getList();
  }, [])


  function formatText(tag) {
    var selectedText = document.selection.createRange().text;

    if (selectedText != "") {
      var newText = "<" + tag + ">" + selectedText + "</" + tag + ">";
      document.selection.createRange().text = newText;
    }
  }

  const onFormSubmit = async (e) => {
    e.preventDefault();
    console.log(remarks, action, forwardedTo, supportingDoc);
    setMMtype(mime.lookup(supportingDoc));


    try {
      const response = await fetch(
        `http://evm.iitbhilai.ac.in:8100/issue_requests/${action}_issue`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            issueID: parseInt(issueId()),
            remarks: remarks,
            supportingDocuments: supportingDoc,
            MMType: mime.lookup(supportingDoc),
            newrecipient: forwardedTo,
          }),
          mode: "cors"
        }
      );

      const data = await response.json();
      console.log(data)
      window.location.replace(`/session/issuemanagement/viewRequest/id=${issueId()}`);
    } catch (err) {
      console.log(err);
    }


  };


  return (
    <div className="p-3">
      <div className="PageTitle" >
        <h4>
          <button
            className="flex justify-center rounded-full aspect-square "
            onClick={() => {
              navigate('/session/issuemanagement')
            }}
            style={{ "background": "#84587C", color: "white" }}
          >
            <AiOutlineArrowLeft />
          </button>
          <div className={`${styles.RequestId} ${styles.myFlexBoxCenter}`} >
            <FaEdit /> <span> Request ID : {issueId()}</span>
          </div>
        </h4>
      </div>
      {/* <p className="text-left text-lg flex">
        <CreateIssueIcon className="mr-2" />
        Request ID : {issueId()}
      </p> */}
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
              <span className="text-red-600">Lodger:</span>{" "}
              {Details.issue ? Details["issue"][0][1] : ""}
            </p>
            <p className="w-1/4 text-left">
              <span className="text-red-600">Recipient:</span>{" "}
              {Details.issue ? Details.issue[0][7] : ""}
            </p>
            <p className="w-1/4 text-left">
              <span className="text-red-600">Date/Time:</span>{" "}
              {Details.issue ? Details.issue[0][9] : ""}
            </p>
            <p className="w-1/4 text-left">
              <span className="text-red-600">Severity:</span>{" "}
              {Details.issue
                ? { L: "Low", M: "Medium", H: "High" }[Details.issue[0][5]]
                : ""}
            </p>
          </div>
          <p className="text-left mt-4">
            <span className="text-red-600">Remarks:</span>&nbsp;{" "}
            {Details.issue ? Details.issue[0][2] : ""}
          </p>
          <p className="text-left mt-4">
            <span className="text-red-600">Documents:</span>&nbsp;
            {Details.issue && Details.issue[0][8] && Details.issue[0][8]}
            {(!Details.issue || !Details.issue[0][8]) && " Data not found"}
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
        <form className="p-4 pl-10" onSubmit={onFormSubmit}>
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
                  value={remarks}
                  onChange={(e) => {
                    setRemarks(e.target.value);
                  }}
                  required
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
                    value={action}
                    onChange={(e) => setAction(e.target.value)}
                    required
                  >
                    <option value="">Select</option>
                    <option value="forward">Forward</option>
                    <option value="reject">Reject</option>
                    <option value="reopen">Reopen</option>
                    <option value="resolve">Resolve</option>
                  </select>

                  <TypeIcon className="ml-2" />
                </div>
              </div>
              {action == "forward" && (
                <div className="text-left mt-4">
                  <label className="text-left ">
                    Forward To<span className="text-red-600">*</span>
                  </label>
                  <br />
                  <div className="flex">
                    <select
                      type="text"
                      className="w-4/5 h-10 mt-1 p-2 border rounded-md"
                      value={forwardedTo}
                      onChange={(e) => (setForwardedTo(e.target.value))}
                      required
                    >
                      <option value="">Select</option>
                      {users.map((userId) => (
                        <option>{userId}</option>
                      ))}

                    </select>

                    <TypeIcon className="ml-2" />
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="mt-5 text-left w-1/3">
            <label className="text-left">Supporting Documents</label>
            <input type="file" className="w-1/6"
              value={supportingDoc}
              onChange={(e) => setSupportingDoc(e.target.value)}
            ></input>
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
