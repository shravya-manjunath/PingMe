import React, { useContext, useRef } from "react";
import { userContext } from "../App";
import { useNavigate } from "react-router-dom";

function CreateRoom() {

  const navigate = useNavigate();

  const {socket} = useContext(userContext);

  const nameRef = useRef();
  const imageRef = useRef();

  const handleNewRoom = (e) =>{
    const name = nameRef.current.value;
    const image = imageRef.current.value;

    socket.emit('croom',{name,image},(response)=>{
      if(response.success){
        navigate('/home');
      }
      else{
        alert("All fields are compulsory.")
      }
    })
  }

  return (
    <div className="continer">
      <div className="padding2 width50 card">
        <h1>Create Room</h1>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            Room Name
          </span>
          <input
            type="text"
            ref={nameRef}
            className="form-control"
            placeholder="Enter name for room"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            Image
          </span>
          <input
            type="text"
            className="form-control"

            ref={imageRef}
            placeholder="Enter URL of the image"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </div>
        <button type="button" className="btn btn-primary" onClick={handleNewRoom}>Submit</button>
      </div>
    </div>
  )
}

export default CreateRoom

