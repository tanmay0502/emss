import React from 'react'
import { useState } from "react";

function UserList() {
	const f1 = {
		fontStyle: "Nunito Sans",

	};
	const data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
	return (
		<div className="">
			<div
				className="table h-full w-full p-10  w-3/5 right-16 bg-white box-border"
				style={{ marginTop: "10px", borderRadius: "var(--border-radius)" }}
			>
				<div className="flex justify-between">
					<p className="text-black" >Users</p>
					<p className="text-black text-sm">Logged in as: CEO Office</p>
				</div>
				<div className="table w-full">
					<div className="head flex justify-between w-full bg-f2 p-2 px-9 rounded-md mt-4">
						<p className="text-black font-semibold" style={f1}>
							User Id
						</p>
						<p className="text-black font-semibold " style={f1}>
							Name
						</p>
						<p className="text-black font-semibold" style={f1}>
							Role
						</p>
						<p className="text-black font-semibold" style={f1}>
							Type
						</p>
					</div>
					<div className="tableBody" style={{ overflow: "auto", maxHeight: "55vh" }}>
						{data.map((value) => (
							<div className="row flex justify-between w-full bg-f2 p-3 px-10 mt-2" style={{ background: "var(--background-gray)", borderRadius: "var(--border-radius)" }}>
								<p className="text-black text-sm" style={f1}>
									User Id
								</p>
								<p className="text-black text-sm " style={f1}>
									Name
								</p>
								<p className="text-black text-sm" style={f1}>
									Role
								</p>
								<p className="text-black text-sm" style={f1}>
									Type
								</p>
							</div>
						))}
					</div>
				</div>
			</div>
			<div className="w-full flex justify-end mt-2">
				<button onClick={ ()=>{
					window.location.href = "/usermanagement/createuser"
				} }>
					Add User
				</button>
			</div>
		</div>
	);
}
export default UserList