import React, { useContext, useRef } from 'react'
import { userContext } from '../App';
import { useNavigate } from 'react-router-dom';



function Login() {

  const phoneRef = useRef(null);
  const passwordRef = useRef(null);

  const navigation = useNavigate();

  const {user,setUser,socket} = useContext(userContext);

  const handleLogin = (e) =>{
    const phone = phoneRef.current.value;
    const password = passwordRef.current.value;
    
    socket.emit('verify',{phone,password},(response)=>{
      e.preventDefault();
      if(response.success){
        setUser(response.user);
        navigation('/home');
      }
      else{
        alert("Login Failed!" + response.message);
      }
    });

  }

  return (
    <div>
      <div className="continer">
      <div className="padding2 width50 card">
        <h1>User Login</h1>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            Phone Number
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Enter contact number"
            aria-label="Username"
            aria-describedby="basic-addon1"
            ref={phoneRef}
          />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            Password
          </span>
          <input
            type="password"
            className="form-control"
            placeholder="Enter the password"
            aria-label="Username"
            aria-describedby="basic-addon1"
            ref={passwordRef}
          />
        </div>
        <button type="button" className="btn btn-primary" onClick={handleLogin}>Login</button>
      </div>
    </div>
    </div>
  )
}

export default Login
