import React from "react";
import { useState } from "react";
import "./styles/createIssue.css";
// import {decode as base64_decode, encode as base64_encode} from 'base-64';
import { ReactComponent as CreateIssueIcon } from '../../assets/create_issue_request.svg';
import { ReactComponent as SeverityIcon } from '../../assets/severity.svg';
import { ReactComponent as LevelIcon } from '../../assets/level.svg';
import { ReactComponent as TagIcon } from '../../assets/tag.svg';
import { ReactComponent as TypeIcon } from '../../assets/type.svg';
import { TagsInput } from "react-tag-input-component";
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { useNavigate } from "react-router-dom";

export default function CreateIssue() {
    const [baseImage, setBaseImage ] = useState("")

    const fileNameArray = [];
    const fileTypeArray = [];
    const filebase64Array = [];  
    
    const navigate = useNavigate();

    const [tags, setTags] = React.useState([]);
    
    const [fileNameArray2, setFileName] = React.useState([]);
    const [fileTypeArray2, setFileType] = React.useState([]);
    const [filebase64Array2, setFileData] = React.useState([]);

    const onFormSubmit = async (e) => {
        e.preventDefault();
        console.log("submit button clicked")
        // console.log("base64" + window.base64Converted)
        addRequest();
        console.log(tags)
        console.log("SUBMITTING ARRAYS:")
        console.log(fileNameArray2);
        console.log(fileTypeArray2);
    };

    async function addRequest() {

        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_SERVER}/issue_requests/register_issue`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        Severity: document.getElementById("formSeverity").value.slice(-1),
                        remarks: document.getElementById("formRemarks").value,
                        Subject: document.getElementById("formSubject").value,
                        Type: document.getElementById("formType").value.slice(-3),
                        IssueLevel: document.getElementById("formLevel").value.slice(-2),
                        LodgerUserID: window.sessionStorage.getItem("sessionToken"),
                        tags: tags,
                        // SupportingDocuments: ["Name" ] ,
                        SupportingDocuments: fileNameArray2,
                        MMType: fileTypeArray2,
                        SupportingDocumentsData: filebase64Array2,
                        RecipientUserID: document.getElementById("formTo").value

                    }),
                }
            );
  
            // var x = document.getElementById("formDocuments")
            // let encoded = base64_encode(x);
            // console.log("Encoded:- "+encoded +"x" +x);

            // alert(document.getElementById("formTags").value)

            console.log(response);
            const data = await response.json();
            console.log("data" + data);
            console.log("Message:" + data["message"])
            if (data["message"] === "Issue created successfully") {
                document.getElementById("form").reset();
                alert("Created Successfully");
                window.location.pathname = "/session/issuemanagement/createIssue";
            } else {
                alert("Failed!");
            
            }
        } catch (err) {
            console.log(err);
        }
    }
    const typeArray = ["Stock Entry-STE", "Scanning-SCN", "FLC Related-FLC", "Randomization-RND", "Recieving/Sending-RNS", "Confilct-CON", "Defective Machines-DEF", "EP Related-EPT", "Physical Verification-PHV", "User Related-USR", "Mobile App-APP", "Awareness-AWR", "Status Marking-SRW", "Strong Room/Warehouse-APN", "Application-APN", "Miscellaneous-MSC"]
    const levelArray = ["Unit-UN", "Warehouse-WH", "AC-AC", "PC-PC", "State-ST"];
    const severityArray = ["Low-L", "Medium-M", "High-H"];

    // const base64Converted = ''

    // const updatedFile = (file) => {

    // }
 
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


        // const file = e.target.files[0];
        // const fullFileName = file.name;
        // const indexDot = fullFileName.indexOf(".");
        // console.log("indexDot"+indexDot)
        // window.fileName = fullFileName.slice(0, indexDot);
        // console.log("fileName"+ window.fileName);
        // window.fileType = fullFileName.slice(indexDot+1);
        
        // window.base64Converted = await convertBase64(file);
        
        // console.log("base64-1" + window.base64Converted)
        // console.log("type:" + window.fileType)
        

        // const file2 = e.target.files[1];
        // window.base64Converted2 = await convertBase64(file2);
        // console.log("base64-2" + window.base64Converted2);

        // const file2 = e.target.files[1];
        // const fullFileName2 = file2.name;
        // const indexDot2 = fullFileName2.indexOf(".");
        // console.log("indexDot2"+indexDot2)
        // window.fileName2 = fullFileName2.slice(0, indexDot2);
        // console.log("fileName2"+ window.fileName2);
        // window.fileType2 = fullFileName.slice(indexDot2+1);
        
        // window.base64Converted2 = await convertBase64(file2);
        // console.log("base64-2" + window.base64Converted2)
        // console.log("type2:" + window.fileType2)
    }
    // console.log(uploadImage())
    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            }

            fileReader.onerror = (error) => {
                reject(error);
            }
        })
    }
    // const [value, setValue] = useState()

    // const tagValue = (e) => {

    //     // let currentLen = document.getElementById("formTags").value.length
    //     // console.log(currentLen)
    //     // var y =  document.getElementById("formTags").value
    //     // console.log("Value" + document.getElementById("formTags").value)
    //     // y.replace("sd",  "ss");
    //     // console.log("y" + y)
    //     // if(currentLen!=0 && currentLen%11 === 0){
    //     //     y.replace("sd",  "ss")

    //     // }


    //     let currValue = document.getElementById("formTags").value
    //     let currentLen = document.getElementById("formTags").value.length
    //     console.log(currentLen)
    //     if (currentLen != 0 && currentLen % 11 === 0) {


    //     }
    // }

    return (
        <div className="flex-col justify-center align-middle">
            <div className="PageTitle" style={{ marginLeft: '1%' }}>
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
                    <CreateIssueIcon />
                    <span>Register Issue/Request</span>
                </h4>
            </div>
            {/* <div class=" PageTitle">
                <button
                    className="flex justify-center rounded-full aspect-square "
                    onClick={() => {
                        navigate('/session/issuemanagement')
                    }}
                    style={{ "background": "#84587C", color: "white" }}
                >
                    <AiOutlineArrowLeft />
                </button>
                <p className="flex" >
                    <CreateIssueIcon />
                    <span className="text-xl  pl-4" >Register Issue/Request</span>
                </p>
            </div> */}
            <form class="parent" onSubmit={onFormSubmit} id="form">

                {/* Div2 Start */}
                <div class="div2 borderStyle">
                    <div className="div2Container">
                        <div className="rowElement">
                            <p className="flex text-lg"> To: <span className="text-orange-600">*</span></p>
                            <div className="flex m-0 p-0">
                                <input
                                    required
                                    id="formTo"
                                    className="tagInput p-2"
                                    placeholder="Type UserID "
                                />
                                <div className="pt-1 pl-2 scale-90">
                                    <TagIcon />
                                </div>
                            </div>
                        </div>
                        <div className="rowElement">
                            <p className="flex text-lg"> Type<span className="text-orange-600">*</span></p>
                            <div className="flex m-0 p-0">
                                <select
                                    //   required={!isTemporary}
                                    name=""
                                    required
                                    id="formType"
                                    className=" selectBox"
                                //   onChange={(e) => setRoleFunc(e.target.value)}
                                >
                                    <option value="" disabled selected>
                                        Select
                                    </option>
                                    {typeArray.map((st, index) => (
                                        <option value={st} className="text-black">
                                            {index + 1}. {st}
                                        </option>
                                    ))}
                                </select>
                                <div className="pl-2 pt-1 scale-90"><TypeIcon /></div>
                            </div>
                        </div>
                        <div className="rowElement">
                            <p className="flex text-lg"> Level<span className="text-orange-600">*</span></p>
                            <div className="flex">
                                <select
                                    //   required={!isTemporary}
                                    required
                                    name=""
                                    id="formLevel"
                                    className=" selectBox"
                                //   onChange={(e) => setRoleFunc(e.target.value)}
                                >
                                    <option value="" disabled selected>
                                        Select
                                    </option>
                                    {levelArray.map((st, index) => (
                                        <option value={st} className="text-black">
                                            {index + 1}. {st}
                                        </option>
                                    ))}
                                </select>
                                <div className="pl-2 pt-1 scale-90"><LevelIcon /></div>
                            </div>
                        </div>
                        <div className="rowElement">
                            <p className="flex text-lg pt-2 "> Severity<span className="text-orange-600">*</span></p>
                            <div className="flex">
                                <select
                                    //   required={!isTemporary}
                                    name=""
                                    required
                                    id="formSeverity"
                                    className=" selectBox"
                                //   onChange={(e) => setRoleFunc(e.target.value)}
                                >
                                    <option value="" disabled selected>
                                        Select
                                    </option>
                                    {severityArray.map((st, index) => (
                                        <option value={st} className="text-black">
                                            {index + 1}. {st}
                                        </option>
                                    ))}
                                </select>
                                <div className="pl-2 pt-1 scale-90"><SeverityIcon /></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Div2 End */}

                <div className="div3 borderStyle">
                    <div className="div3Container">
                        <p className="text-lg flex" > Subject<span className="text-orange-600">*</span></p>
                        <input
                            required
                            id="formSubject"
                            // type={"number"}
                            // step="any"
                            className="subjectInput p-2"
                            placeholder="Subject"

                        />
                        {/* <div className="pt-1 pl-2 scale-90">
                            <TagIcon/>
                        </div> */}
                        {/* </div>
                    <div className="w-full div3Container"> */}
                        <p className="text-lg flex" > Remarks<span className="text-orange-600">*</span></p>
                        <textarea required className="textarea flex" id="formRemarks" name="w3review" rows="" cols="" placeholder="Text Input">

                        </textarea>
                    </div>
                </div>

                <div class="div4 borderStyle flex">
                    <div className="bottomDivs">
                        <p className="text-lg flex" >Supporting Documents  </p>
                        <div>
                            <input
                                id="formDocuments"
                                // required={isTemporary}
                                type="file"
                                placeholder="Choose Image (Upto 5 MB)"
                                multiple
                                onChange={(e) => {
                                    uploadImage(e);
                                }}
                            />
                            {/* <img src={baseImage} height='2px'/> */}
                        </div>
                    </div>

                </div>
                <div class="div5 borderStyle flex">
                    <div className="bottomDivs">
                        <p className="text-lg flex pb-2" >Tag Users </p>
                        <div className=" pb-4">
                            {/* <div className="tagInputDiv pb-4"> */}
                            <div className="tagwrap">
                                <TagsInput

                                    // style={{ width: '100%' }}
                                    className='li_noti hide-scroll-bar tagInput p-2'
                                    value={tags}
                                    id="formTags"
                                    onChange={setTags}
                                    placeHolder="WB00000CEO, AP00000DEO"
                                />
                            </div>
                            {/* <div className="pt-1 pl-2 scale-90">
                            <TagIcon />
                        </div> */}
                        </div>
                    </div>

                </div>
                <div class="div6">
                    <button type={"submit"} className="submitBtn">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}