import React from "react";
import "./styles/createIssue.css";
import { ReactComponent as CreateIssueIcon } from '../../assets/create_issue_request.svg';
import { ReactComponent as SeverityIcon } from '../../assets/severity.svg';
import { ReactComponent as LevelIcon } from '../../assets/level.svg';
import { ReactComponent as TagIcon } from '../../assets/tag.svg';
import { ReactComponent as TypeIcon } from '../../assets/type.svg';



export default function CreateIssue() {



    const onFormSubmit = async (e) => {
        e.preventDefault();
        console.log("submit button clicked")
        addRequest(); 
      };
    async function addRequest() {

        try {
        const response = await fetch(
            "http://evm.iitbhilai.ac.in:8100/issue_requests/register_issue",
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
                    tags: [
                        document.getElementById("formSubject").value,
                        document.getElementById("formTags").value
                    ],
                    SupportingDocuments: "files",
                    MMType: "MMType",
                    RecipientUserID: document.getElementById("formTo").value
                  
            }),
            }
        );

        console.log(response);
        const data2 = await response.json();
        console.log("data2"+ data2);
        console.log("Message"+ data2["message"])
        if (data2["message"] === "Issue created successfully") {
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
    const typeArray = ["Stock Entry-STE", "Scanning-SCN", "FLC Related-FLC", "Randomization-RND", "Recieving/Sending-RNS", "Confilct-CON", "Defective Machines-DEF", "EP Related-EPT", "Physical Verification-PHV", "User Related-USR", "Mobile App-APP", "Awareness-AWR","Status Marking-SRW", "Strong Room/Warehouse-APN", "Application-APN","Miscellaneous-MSC"]
    const levelArray = ["Unit-UN","Warehouse-WH","AC-AC","PC-PC","State-ST"];
    const severityArray = ["Low-L","Medium-M","High-H"];
    
    return(
        <form onSubmit={onFormSubmit} id="form">

        
        <div class="parent">
            <div class="div1 font-semibold "> 
                <p className="flex">
                    <CreateIssueIcon/>
                    <span className="text-xl  pl-4">Register Issue/Request</span>
                </p>
             </div>

            <div class="div2 borderStyle">
                <div className="div2Container pt-8 pb-12">
                <div className="rowElement">
                    <p className="flex text-lg"> To: <span className="text-orange-600">*</span></p>
                    <div className="flex m-0 p-0">
                        <input
                        // required
                        id="formTo"
                        // type={"number"}
                        // step="any"
                        className="tagInput p-2" 
                        placeholder="Type UserID "
                        />
                        {/* <div className="pt-1 pl-2 scale-90">
                            <TagIcon/>
                        </div> */}
                        
                    </div>
                    </div>
                    <div className="rowElement">
                    <p className="flex text-lg"> Type<span className="text-orange-600">*</span></p>
                    <div className="flex m-0 p-0">
                        <select 
                                //   required={!isTemporary}
                                name=""
                                id="formType"
                                className=" selectBox"
                                //   onChange={(e) => setRoleFunc(e.target.value)}
                                >
                            <option value="" disabled selected>
                                Select
                            </option>
                                {typeArray.map((st,index) => (
                                    <option value={st} className="text-black">
                                    {index+1}. {st}
                                    </option>
                                ))}
                        </select>
                        <div className="pl-2 pt-1 scale-90"><TypeIcon /></div>
                    </div>
                    </div>
                    <div className="rowElement">
                    <p className="flex text-lg pt-2"> Level<span className="text-orange-600">*</span></p>
                    <div className="flex">
                        <select 
                                //   required={!isTemporary}
                                name=""
                                id="formLevel"
                                className=" selectBox"
                                //   onChange={(e) => setRoleFunc(e.target.value)}
                                >
                            <option value="" disabled selected>
                                Select
                            </option>
                                {levelArray.map((st,index) => (
                                    <option value={st} className="text-black">
                                    {index+1}. {st}
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
                                id="formSeverity"
                                className=" selectBox"
                                //   onChange={(e) => setRoleFunc(e.target.value)}
                                >
                            <option value="" disabled selected>
                                Select
                            </option>
                                {severityArray.map((st,index) => (
                                    <option value={st} className="text-black">
                                    {index+1}. {st}
                                    </option>
                                ))}
                        </select>
                        <div className="pl-2 pt-1 scale-90"><SeverityIcon /></div>
                    </div>
                    </div>




                </div>
            </div>

            <div className="div3 borderStyle">
            <div className="w-full pt-8 div3Container1">
                <p className="text-lg flex" > Subject<span className="text-orange-600">*</span></p>
                <input
                        // required
                        id="formSubject"
                        // type={"number"}
                        // step="any"
                        className="subjectInput p-2" 
                        placeholder="Subject"
                        />
                        {/* <div className="pt-1 pl-2 scale-90">
                            <TagIcon/>
                        </div> */}
                </div>
                <div className="w-full div3Container">
                <p className="text-lg flex" > Remarks<span className="text-orange-600">*</span></p>
                <textarea className="textarea flex"  id="formRemarks" name="w3review" rows="" cols=""  placeholder="Text Input">
                    
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
                        />
                    </div>
                </div>
                       
            </div>
            <div class="div5 borderStyle flex">
                <div className="bottomDivs">
                    <p className="text-lg flex pb-2" >Tag Users  </p> 
                    <div className="tagInputDiv pb-4">
                        <input
                        // required
                        id="formTags"
                        // type={"number"}
                        // step="any"
                        className="tagInput p-2" 
                        placeholder="@DeoGwalior, @DEOBhopal"
                        />
                        <div className="pt-1 pl-2 scale-90">
                            <TagIcon/>
                        </div>
                        
                    </div>
                </div>
                
            </div>
            <div class="div6">
                    <button type={"submit"} className="submitBtn">
                        Submit
                    </button>
            </div>
        </div>
        </form>
    )
  }