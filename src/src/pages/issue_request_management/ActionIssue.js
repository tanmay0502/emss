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
import Modal from 'react-modal';


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
Modal.setAppElement(document.getElementById('root'));




export default function ActionIssue() {

  function mystring(arr){
    let ans=""
    arr.map((v)=>{
        ans=ans+v+" ";
    })

    return ans
}
  const [baseImage, setBaseImage ] = useState("")
  const navigate = useNavigate()
  const fileNameArray = [];
  const fileTypeArray = [];
  const filebase64Array = [];
  const [modalImage, setModalImage] = useState('')
  const [Details, setDetails] = useState({});
  const [Documents, setDocuments] = useState([]);
  const [mergeInto, setmergeInto] = useState("");


  const [remarks, setRemarks] = useState("");
  const [action, setAction] = useState("");
  const [MMtype, setMMtype] = useState("");
  const [forwardedTo, setForwardedTo] = useState("");
  const [supportingDoc, setSupportingDoc] = useState("");
  const [users, setUsers] = useState([]);
  const [issue, setIssue] = useState([]);
      
  const [fileNameArray2, setFileName] = React.useState([]);
  const [fileTypeArray2, setFileType] = React.useState([]);
  const [filebase64Array2, setFileData] = React.useState([]);


// for showing document
    // let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);
  
    function openModal() {
      setIsOpen(true);
    }
  
    function afterOpenModal() {
      // references are now sync'd and can be accessed.
    //   subtitle.style.color = '#f00';
    }
  
    function closeModal() {
      setIsOpen(false);
    }

    function imageName(name){
        setModalImage(name)
    }
  
//END for showing documents

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
        `${process.env.REACT_APP_API_SERVER}/issue_requests/search_request`,
        {
          method: "POST" ,
          headers: {
            "Content-Type": "application/json",
          },
          credentials:'include',
          body: JSON.stringify({
              issueid : myId,
          }),
        }
      )
      const data1 = await response.json();
      const data = data1["data"];
      console.log(data)
      setDetails(data);

    } catch (error) {
      console.log(error);
    }
  }
  const getDocuments = async (docName) => {
    const myId = issueId();
    try {
        const response = await fetch(
            `${process.env.REACT_APP_API_SERVER}/issue_requests/getDocument/${myId}/${docName}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                mode: 'cors'
            }
        )
        const data = await response.json();

        // let connectorLength = data['remarks'].map((e, index) => {
        //     if (e[6] == "Y") return index != data['remarks'].length - 1 ? <ConnectorTwo /> : <ConnnectorOne />
        // })
        // connectorLength = connectorLength.filter((ele) => {
        //     return ele !== undefined;
        // })
        // console.log(connectorLength);
        // if (data['remarks'] != undefined && data['remarks'].length == 1 || data['remarks'].length == 0 || connectorLength.length == 1) connectorLength = '';

        // data['ConnectorLength'] = connectorLength;
        setDocuments(data);
        // console.log({Documents})

        
    } catch (error) {
        console.log(error);
    }
}


const getOpenIssues = async () => {
    
  const UserID = sessionStorage.getItem('sessionToken')
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_SERVER}/issue_requests/getOpenIssues/${UserID}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credantials: 'same-origin',
        mode: 'cors'
      }
    )
    const data = await response.json();
    console.log(data)
    setIssue(data);

  } catch (error) {
    console.log(error);
  }
}

// console.log(issue["data"][0][0])
// console.log(issue["data"][0][2])

  const getList = async () => {
    let token = localStorage.getItem("token");
        // console.log(decode)
    try {
      const response = await fetch(
				`${process.env.REACT_APP_API_SERVER}/user/listAllUsers`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
          credantials: 'include',
					mode: "cors"
				}
			);
      const data = await response.json();
      console.log(data[0]);
      let allUsers = []
      for (let i = 0; i < data[0]["data"].length; i++) {
        allUsers.push(data[0]["data"][i][0])
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
    getOpenIssues();
  }, [])

console.log(issue);
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
         `${process.env.REACT_APP_API_SERVER}/issue_requests/${action}_issue`,
         {
           method: "POST",
           headers: {
             "Content-Type": "application/json",
           },
           credentials: "include",
           body: JSON.stringify({
             issueID: parseInt(issueId()),
             remarks: remarks,
             SupportingDocuments: fileNameArray2,
             MMType: fileTypeArray2,
             SupportingDocumentsData: filebase64Array2,
             newrecipient: forwardedTo,
             mergingIssueID: parseInt(issueId()),
             mergingIntoIssueID: mergeInto.slice(0,3)
           }),
           mode:"cors"
         }
       );

      const data = await response.json();
      console.log(data)
      window.location.replace(`/session/issuemanagement/viewRequest}`);
    } catch (err) {
      console.log(err);
    }


  };
  console.log(mergeInto);

  const uploadImage = async (e) =>{
    const files = e.target.files;
    console.log(files)

    const totalFiles = files.length;
    console.log(totalFiles)
    
    var fileNumber = 0;
    
    while (fileNumber < totalFiles){
        var x = fileNumber +1;
        console.log("fileNumber: " + x)

        const file = e.target.files[fileNumber];
        const fullFileName = file.name;

        var fileParts = fullFileName.split(".");

        console.log("full file" + fileParts.length)
        const fileArrayLength = fileParts.length;

        const indexDot = fullFileName.indexOf(".");
        // console.log("indexDot"+indexDot)

        const fileNameo = fullFileName.slice(0, indexDot);
        // console.log("fileName"+ fileNameo);

        


        window.fileType = fileParts[fileArrayLength -1];
    
        const filePartsNew = fileParts.pop();
        console.log(fileParts);
        const fileName = fileParts.join(".");
        console.log("this file name: " + fileName);
        console.log("fileParts New" + filePartsNew);
        console.log("fileName = " + filePartsNew)
        const convertedFile = await convertBase64(file);
        setBaseImage(convertedFile)
        console.log("FILE" + convertedFile)
        // const indexC = convertedFile.indexOf(",")
        
        // var base64Converted = "";
        // if(window.fileType === "JPG" || window.fileType === "jpeg" ){
        //     var base64Converted = convertedFile.slice(indexC + 5)
        // }else{
         var base64Converted = convertedFile;
        // }
    
        // console.log("base64-1" + window.base64Converted)
        console.log("type:" + window.fileType)
        fileNumber += 1;

        fileNameArray.push(fileName);
        fileTypeArray.push(window.fileType);
        filebase64Array.push(base64Converted);

        setFileName(arr => [...arr, fileName])
        setFileType(arr => [...arr, window.fileType])
        setFileData(arr => [...arr, base64Converted])

        console.log("Arrays:-")
        console.log("fileNameArray: " +fileNameArray);
        console.log(fileTypeArray);
        console.log(filebase64Array);
        console.log(document.getElementById("formRemarks").value)
        console.log(JSON.stringify(fileNameArray))
    }
}
// console.log(uploadImage())
const convertBase64 = (file) =>{
    return new Promise((resolve,reject)=>{
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload = () =>{
            resolve(fileReader.result);
        }

        fileReader.onerror = (error) => {
            reject(error);
        }
    })
}



console.log(Documents["data"])
let currDoc = ''
if(Documents["data"] !== undefined){
    currDoc = currDoc + Documents["data"];
   
    // console.log("DOCUMENT"+ currDoc)
}else{
    currDoc = "loding";
    // console.log("DOCUMENT else"+ currDoc)
}
console.log("DOCUMENT else"+ currDoc)


console.log({Details});
let len = Details['remakrs'] !== undefined && Details['remarks'].length;


const document = Details['supportingDocuments']
console.log({document})
// var documentID = '';
var documentName = [];
var index = 0;

if (document !== undefined){
    for (const [key, value] of Object.entries(document)) {
        console.log("KEY: VALUE")
        console.log(  `${key}: ${value}`);
        // documentID = documentID + `${key}`;
        // documentName = documentName + `${value}`
        console.log(value.length)
        if(index === 0){
            for(const i in value){
                documentName.push(value[i])
                console.log(value[i])
            }
        }            

        index = index+1;
      }
}
else documentName = ['No Documents Found']

// 
// console.log("Document ID: " + documentID);
// console.log("Document Name: " + documentName[0]);
// var documentData2 = "data:" + Documents["data"].slice(5);
// var documentData2 = Documents["data"];

// var documentData2 = '';
// if(documentName.slice(-3) === "png"){
//     documentData2 = "data:image/png;base64," + Documents["data"];
// }else if(documentName.slice(-3) === "jpg"){
//     documentData2 = "data:image/jpeg;base64," + Documents["data"];
// }else if(documentName.slice(-3) === "pdf"){
//     documentData2 = "data:application/pdf;base64," + Documents["data"];
// }



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
          <div className="flex mt-3 justify-between ">
            <p className=" text-left">
              <span className="text-red-600">Lodger:</span>{" "}
              {Details.issue ? Details["issue"][0][1] : ""}
            </p>
            <p className=" text-left">
              <span className="text-red-600">Recipient:</span>{" "}
              {Details.issue ? Details.issue[0][7] : ""}
            </p>
            <p className=" text-left">
              <span className="text-red-600">Date/Time:</span>{" "}
              {Details.issue ? Details.issue[0][9] : ""}
            </p>
            <p className=" text-left">
              <span className="text-red-600">Severity:</span>{" "}
              {Details.issue
                ? { L: "Low", M: "Medium", H: "High" }[Details.issue[0][5]]
                : ""}
            </p>
          </div>
          <div className="flex justify-between">
          <p className="text-left mt-4">
            <span className="text-red-600" >Remarks:</span>&nbsp;{" "}
            {Details.issue ? Details.issue[0][2] : ""}
          </p>
          <p className="text-left mt-4">
            <span className="text-red-600" >Status:</span>&nbsp;{" "}
            {Details.issue ? (Details.issue[0][6]=="A"?"Active":"Closed") : "Status not found"}
          </p>
          </div>
          <p className="text-left mt-4">
            <span className="text-red-600" >Tagged Users:</span>&nbsp;{" "}
            {Details.tags && Details.tags.length ? mystring(Details.tags) : "No tags added"}
          </p>
          <p className="text-left mt-4">
            <span className="text-red-600">Documents:</span>&nbsp;
            {/* {Details.issue && Details.issue[0][8] && Details.issue[0][8]}
            {(!Details.issue || !Details.issue[0][8]) && " Data not found"} */}
                    
                    <div className='p-2 grid grid-cols-3'>
                        {documentName.map(
                            (name) => {
                               return( <> 
                               
                               <button onClick={() => {
                                    openModal();
                                    setModalImage(name); 
                                    getDocuments(name);

                               }} className='m-4 w-60 h-9' style={{ backgroundColor: "#F56A3F", color: "white", overflow:"hidden", display : 'flex',justifyContent : 'center', alignItems : 'center' }}>{name[0].length >= 20 ? name[0].slice(0,20)+"..." : name}</button>


                                </>

                               )
                                                              

                            
                            }
                            
                        )}
                        
                        </div>
                        <Modal        
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
        >
            <div id="root" className=''>
            <h4>{modalImage}</h4>
            <div className='flex justify-center items-center'>
                {/* <img className='p-10' src={currDoc} /> */}
                
                {   currDoc === "loding" ? <p className={`${styles.loader}`}></p>: <embed style={{width: "600px" ,height:"600px" , padding: "10px"}} src={`${currDoc.slice(0,-1)}`} />

                }
                {/* <img style={{width: "400px" , padding: "10px"}} src={`${currDoc}`} /> */}
                            
                

                {/* {console.log("This should be shown:" + currDoc.slice(0,-1))} */}

            </div>
            
            <button style={{  color: "white",}} onClick={closeModal}>Close</button>
            </div>
        </Modal>

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
                  Remarks<span className="text-red-600">{action !== "merge" ? "*" : ""}</span>
                </label>
                <br />

                <textarea
                  className="w-5/6 h-4/5 p-2 border rounded-md mt-1"
                  placeholder="Text Input"
                  value={remarks}
                  onChange={(e) => {
                    setRemarks(e.target.value);
                  }}
                  disabled = {action === "merge" ? true : false}

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
                {((Details && Details["issue"]) && Details["issue"][0][6]=="C") ?
                    (<select
                      type="text"
                      className="w-4/5 h-10 mt-1 p-2 border rounded-md"
                      value={action}
                      onChange={(e) => setAction(e.target.value)}
                      required
                    >
                     
                      <option value="">Select</option>
                      <option value="reopen">Reopen</option>
                    </select>):
                    (<select
                      type="text"
                      className="w-4/5 h-10 mt-1 p-2 border rounded-md"
                      value={action}
                      onChange={(e) => setAction(e.target.value)}
                      required
                    >
                     
                      <option value="">Select</option>
                      <option value="forward">Forward</option>
                      <option value="close">Close</option>
                      <option value="merge">Merge</option>
                    </select>)
                    }
                 

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
                    <input
                      type="text"
                      className="w-4/5 h-10 mt-1 p-2 border rounded-md"
                      value={forwardedTo}
                      onChange={(e) => (setForwardedTo(e.target.value))}
                      required
                    >
                    </input>

                    <TypeIcon className="ml-2" />
                  </div>
                </div>
              )}

              {action === "merge" && (

                <div className="text-left mt-4">
                  <label className="text-left ">
                    Merge Into? <span className="text-red-600">*</span>
                  </label>
                  <br />
                  <div className="flex">

                    <input
                      type="text"
                      className="w-4/5 h-10 mt-1 p-2 border rounded-md"
                      value={mergeInto}
                      onChange={(e) => (setmergeInto(e.target.value))}
                      required
                    >

                    </input>

                    <TypeIcon className="ml-2" />
                  </div>
                </div>

              )}

            </div>
          </div>
          <div className="mt-5 text-left w-1/3">
            <label className="text-left">Supporting Documents</label>

            <input type="file" className="w-1/6"
            disabled = {action === "merge" ? true : false}
            // value={supportingDoc}
            id="formDocuments"
            // required={isTemporary}
            multiple
            onChange={(e)=>{
                uploadImage(e);
            }}
            

            // required
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
