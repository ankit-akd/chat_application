import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useSignUp = () => {
	const [loading, setLoading] = useState(false);
	const { setAuthUser } = useAuthContext();
	// console.log('user',setAuthUser);
	const signup1 = async ({ fullName, username, password, confirmPassword, gender }) => {
		console.log('inside')
		const success = handleInputErrors({ fullName, username, password, confirmPassword, gender });
		if (!success) return;
		console.log('success',success);
		setLoading(true);
		console.log('hii')
		try {
			const res = await fetch("/api/auth/signup", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ fullName, username, password, confirmPassword, gender }),
			});
			console.log('hello1');
			
			const data = await res.json();
			console.log('hello2');
			if (data.error) {
				throw new Error(data.error);
			}
			localStorage.setItem("user-info", JSON.stringify(data));
			console.log('1234',JSON.parse(localStorage.setItem("user-info", JSON.stringify(data))))
			console.log('hello3');
			setAuthUser(data);
			console.log('hello4')
		} catch (error) {
			toast.error(error.message);
		} 
		finally {
			setLoading(false);
		}
	};

	return { loading, signup1 };
};
export default useSignUp;


function handleInputErrors({ fullName, username, password, confirmPassword, gender }) {
	if (!fullName || !username || !password || !confirmPassword || !gender) {
		toast.error("Please fill in all fields");
		return false;
	}
	console.log('error');
	if (password !== confirmPassword) {
		toast.error("Passwords do not match");
		return false;
	}

	if (password.length < 6) {
		toast.error("Password must be at least 6 characters");
		return false;
	}

	return true;
}