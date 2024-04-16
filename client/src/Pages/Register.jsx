import React, { useState } from "react";
import style from "../Styles/Register.module.css";
import { useRegister } from "../Hooks/useRegister";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Register = () => {

  const navigate = useNavigate();
  const  {loading, register } = useRegister();
  const [inputs, setInputs] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    cnfPassword:"",
  });

  
  const onClickRegister = async (e)=>{
    e.preventDefault();
    await register(inputs);  

  }


  return (
    <div className={style.RegisterDiv}>

      <p className={style.heading} >Register to <span>SquadCircle</span></p>
      <form className={style.RegisterForm} onSubmit={onClickRegister}>
        <input
          type="text"
          placeholder="Enter First Name"
          value={inputs.firstname}
          onChange={(e) => setInputs({...inputs, firstname: e.target.value})}
        />

        <input
          type="text"
          placeholder="Enter last Name"
          value={inputs.lastname}
          onChange={(e) => setInputs({...inputs, lastname: e.target.value})}
        />

        <input
          type="text"
          placeholder="Enter Email Id"
          value={inputs.email}
          onChange={(e) => setInputs({...inputs, email: e.target.value})}
        />

        <input
          type="text"
          placeholder="Enter Password"
          value={inputs.password}
          onChange={(e) => setInputs({...inputs, password: e.target.value})}
        />

        <input 
        type="text" 
        placeholder="Enter Confirm Password" 
        value={inputs.cnfPassword}
        onChange={(e) => setInputs({...inputs, cnfPassword: e.target.value})}
        />

        <Link className={style.link} to={"/login"}>Already have account then login.</Link>
        <input className={style.submit} type="submit" value="Register" />
      </form>
    </div>
  );
};

export default Register;
