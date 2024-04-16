import React, { useState } from 'react'
import style from "../Styles/Login.module.css"
import {useLogin} from "../Hooks/useLogin.js"
import {Link} from "react-router-dom";


const LogIn = () => {

  const { loading, login } = useLogin();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const onClickLogin = async (e)=>{
    e.preventDefault();
    await login(inputs);  
  }


  return (
    <div className={style.RegisterDiv} >
          
          <p className={style.heading} >Login to <span>SqareCircle</span></p>
        <form className={style.RegisterForm} onSubmit={onClickLogin} >

            <input 
            type="text" 
            placeholder='Enter Email Id' 
            value={inputs.email}
            onChange={(e) => setInputs({...inputs, email: e.target.value})}
             />

            <input 
            type="text" 
            placeholder='Enter Password' 
            value={inputs.password}
            onChange={(e) => setInputs({...inputs, password: e.target.value})}
            />
            
            <Link className={style.link} to={"/register"} >Don't have an account, please register first.</Link>
            <input className={style.submit} type="submit" value="Login" />
        </form>
    </div>
  )
}

export default LogIn