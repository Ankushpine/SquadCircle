import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const serverUrl = import.meta.env.VITE_SERVER_PORT;

export const useRegister = () => {

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const register = async ({firstname,lastname,email,password,cnfPassword,}) => {
    const success = handleErrors({firstname,lastname,email,password,cnfPassword,});
    if (!success) {
      return ;
    }

    setLoading(true);
    try {
      const newUser = {
        firstname,
        lastname,
        email,
        password
      };

      const res = await fetch(`${serverUrl}/api/createuser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      const messages = await res.json();

      if(messages.error){
        throw new Error(messages.error)
      }
      toast.success("Successfully Signed Up!");
      navigate("/login");
    } catch (error) {
      toast.error(`${error}`)
    } finally {
      setLoading(false);
    }

  };

  return { loading, register };
};

const handleErrors = ({firstname,lastname,email,password,cnfPassword}) => {
  if (!firstname || !lastname || !email || !password || !cnfPassword) {
    toast.error("Please fill in all the feilds.");
    return false;
  }

  if (password !== cnfPassword) {
    toast.error("Password and confirm passwords are not same.");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must be at least 6 characters.");
    return false;
  }

  return true;
};
