import { useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../Context/AuthContext";

const useLogout = () => {
	const [loading, setLoading] = useState(false);
	const { setAuthUser } = useContext(AuthContext);

	const logout = async () => {
		setLoading(true);
		try {
	  
			localStorage.removeItem("user-info");
			localStorage.removeItem("token");
			setAuthUser(null);
	  
			toast.success("Successfully Logged Out!");
		  } catch (error) {
			toast.error(error.messages)
		  } finally {
			setLoading(false);
		  }
	};

	return { loading, logout };
};
export default useLogout;
