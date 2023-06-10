import React, { useState } from 'react'
import axios from 'axios';
import {useCookies} from 'react-cookie'
import { useNavigate } from 'react-router-dom';

const Authentication = () => {
  return (
    <>
        <div className='auth'>
          <Login/>
          <Register/>
        </div>
    </>
  )
}

const Login =()=>{
  const [username , setUsername] = useState('')
  const [password , setPassword] = useState('')
  const [_,setCookies] = useCookies(["access_token"])
  const navigate = useNavigate();
  const onSubmit=async(e)=>{
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/auth/login",{
          username : username,
          password : password,
      });
      setCookies("access_token",response.data.token); // this is what coming from our backend and setting here..
      window.localStorage.setItem("userID",response.data.userID);  // we are storing the user into the local storage. so when ever the TAB is closed and reopened , user is set 
      console.log(response.data.token)
      alert("Now , you are logged in ^-^ ")
      // after login , display the Homepage.
      navigate('/')
    } catch (error) {
       console.error(error)
    }
}
  return <Form username={username} setUsername={setUsername} password={password} setPassword={setPassword} label={"Login"} onSubmit={onSubmit}/>
}
const Register =()=>{
  const [username , setUsername] = useState('')
  const [password , setPassword] = useState('')
  const onSubmit=async(e)=>{
      e.preventDefault();

      try {
        // await axios.post("http://localhost:3001/auth/register",{
        await axios.post("/auth/register",{
            username : username,
            password : password,
        })
        alert("User Registered Successfully !! Go and Login ^-^")
      } catch (error) {
         console.error(error)
      }
  }
  return <Form username={username} setUsername={setUsername} password={password} setPassword={setPassword} label={"Register"} onSubmit={onSubmit}/>
}

const Form =({ username , setUsername , password , setPassword , label ,onSubmit})=>{
  return (
    <>
        <div className='auth-container'>
            <form onSubmit={onSubmit}>
                <h2>{label}</h2>
                <div className='form-group'>
                    <label htmlFor='username'>Username:</label>
                    <input type='text' value ={username} id='username' onChange={(e)=>setUsername(e.target.value)}/>
                </div>
                <div className='form-group'>
                    <label htmlFor='password'>Password:</label>
                    <input type='password' value={password} id='password' onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                <button type='submit'>Submit</button>
            </form>
        </div>
      </>
  )
}


export default Authentication