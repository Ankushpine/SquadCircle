import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../Context/AuthContext";
const serverUrl = import.meta.env.VITE_SERVER_PORT;

export const useLogin = () => {

  const {setAuthUser} = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  

  const login = async ({email,password}) => {
    const success = handleErrors({email,password});
    if (!success) {
      return ;
    }

    setLoading(true);
    try {
      const User = {
        email,
        password
      };

      console.log(serverUrl);
      const res = await fetch(`${serverUrl}/api/loginuser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(User),
      });

      const messages = await res.json();

      if(messages.error){
        throw new Error(messages.error)
      }

      localStorage.setItem("user-info", JSON.stringify(messages));
      localStorage.setItem("token", messages.token);
      setAuthUser(messages);
      toast.success("Successfully Logged in!");
    } catch (error) {
      toast.error(`${error}`)
    } finally {
      setLoading(false);
    }

  };

  return { loading, login };
};

const handleErrors = ({email,password}) => {
  if (!email || !password ) {
    toast.error("Please fill in all the feilds.");
    return false;
  }

  return true;
};