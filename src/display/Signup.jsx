import React, { useContext, useRef } from "react";
import { userContext } from "../App";
import "./style.css";
import { useNavigate } from "react-router-dom";

function Signup() {

  const {socket} = useContext(userContext);

  const navigate = useNavigate();

  const nameRef = useRef();
  const phoneRef = useRef();
  const passwordRef = useRef();
  const photoRef = useRef();

  const handleSignup = (e) =>{
    const name = nameRef.current.value;
    const phone = phoneRef.current.value;
    const password = passwordRef.current.value;
    const photo = photoRef.current.value;

    socket.emit('signup',{name,phone,password,photo} ,(response)=>{
      if(response.success){
        navigate('/login');
      }else{
        alert(response.message);
      }
    })
  }


  return (
    <div className="continer">
      <div className="padding2 width50 card">
        <h1>User Registration form</h1>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            User Name
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Enter the username"
            aria-label="Username"
            aria-describedby="basic-addon1"
            ref={nameRef}
          />
        </div>
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
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            Profile Photo
          </span>
          <input
            type="text"
            className="form-control"
            aria-label="Username"
            placeholder="Enter the URL of image"
            aria-describedby="basic-addon1"
            ref={photoRef}
          />
        </div>
        <button type="button" className="btn btn-primary" onClick={handleSignup}>Submit</button>
      </div>
    </div>
  );
}

export default Signup;
