import React, { useState } from "react";
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";

const Register = () => {
	const [showPassword, setShowPassword] = useState(false);
	return (
		<div className="bg-[#a7bcff] h-[100vh] w-[100%] flex items-center justify-center">
			<div className="bg-white py-4 px-20 rounded-lg flex flex-col gap-3 items-center">
				<span className="text-[#5d5d8d] font-bold text-2xl">Chat-Firebase</span>
				<span className="text-[#5d5d8d] font-bold text-lg">Register</span>
				<form className="flex flex-col gap-5 relative">
					<input
						className="p-2 border-b border-b-[#a7bcff] outline-none placeholder:text-slate-300 w-[300px]"
						type="text"
						placeholder="Display name"
					/>
					<input
						className="p-2 border-b border-b-[#a7bcff] outline-none placeholder:text-slate-300"
						type="email"
						placeholder="Email"
					/>
					<input
						className="p-2 border-b border-b-[#a7bcff] outline-none placeholder:text-slate-300"
						type={showPassword ? "text" : "password"}
						placeholder="Password"
					/>
					<span
						onClick={() => setShowPassword(!showPassword)}
						className="w-[20px] h-[20px] absolute top-[48%] left-[90%] text-[#a7bcff]">
						{showPassword ? <FiEyeOff /> : <FiEye />}
					</span>
					<input
						className="p-2 border-b border-b-[#a7bcff] outline-none placeholder:text-slate-300 hidden"
						type="file"
						id="file"
					/>
					<label htmlFor="file" className="flex items-center relative">
						<img
							className="w-[30px] cursor-pointer"
							src="/img/addAvatar.png"
							alt=""
						/>
						<span className="text-[#7b96ec] cursor-pointer absolute left-[15%]">
							Add an avatar
						</span>
					</label>
					<button className="bg-[#7b96ec] p-3 rounded-lg text-white text-lg cursor-pointer">
						Sign up
					</button>
				</form>
				<p className="text-[#5d5d8d] text-sm mt-2">
					You have an account? Login
				</p>
			</div>
		</div>
	);
};

export default Register;
