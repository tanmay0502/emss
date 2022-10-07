import React from "react";
import "./styles/createIssue.css";
import { ReactComponent as CreateIssueIcon } from '../../assets/create_issue_request.svg';
import { ReactComponent as SeverityIcon } from '../../assets/severity.svg';
import { ReactComponent as LevelIcon } from '../../assets/level.svg';
import { ReactComponent as TagIcon } from '../../assets/tag.svg';
import { ReactComponent as TypeIcon } from '../../assets/type.svg';



export default function CreateIssue() {
    return(
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
                    <p className="flex text-lg"> Type<span className="text-orange-600">*</span></p>
                    <div className="flex m-0 p-0">
                        <select 
                                //   required={!isTemporary}
                                name=""
                                id="input_Roles"
                                className=" selectBox"
                                //   onChange={(e) => setRoleFunc(e.target.value)}
                                >
                            <option value="" disabled selected>
                                Select
                            </option>
                                {/* {roles && roles.map((st) => (
                                    <option value={st} className="text-black">
                                    {st}
                                    </option>
                                ))} */}
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
                                id="input_Roles"
                                className=" selectBox"
                                //   onChange={(e) => setRoleFunc(e.target.value)}
                                >
                            <option value="" disabled selected>
                                Select
                            </option>
                                {/* {roles && roles.map((st) => (
                                    <option value={st} className="text-black">
                                    {st}
                                    </option>
                                ))} */}
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
                                id="input_Roles"
                                className=" selectBox"
                                //   onChange={(e) => setRoleFunc(e.target.value)}
                                >
                            <option value="" disabled selected>
                                Select
                            </option>
                                {/* {roles && roles.map((st) => (
                                    <option value={st} className="text-black">
                                    {st}
                                    </option>
                                ))} */}
                        </select>
                        <div className="pl-2 pt-1 scale-90"><SeverityIcon /></div>
                    </div>
                    </div>




                </div>
            </div>

            <div className="div3 borderStyle">
                <div className="w-full h-full div3Container">
                <p className="text-lg flex" > Remarks<span className="text-orange-600">*</span></p>
                <textarea className="textarea flex"  id="w3review" name="w3review" rows="" cols=""  placeholder="Text Input">
                    
                </textarea>
                </div>
            </div>

            <div class="div4 borderStyle flex">
                <div className="bottomDivs">
                    <p className="text-lg flex" >Supporting Documents  </p>   
                    <div>
                        <input
                            id="formUserDocument"
                            // required={isTemporary}
                            type="file"
                            placeholder="Choose Image (Upto 5 MB)"
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
                        // id="formUserMobileNumber"
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
                    <button className="submitBtn">
                        Submit
                    </button>
            </div>
        </div>
    )
  }