import React, { useContext, useEffect, useRef, useState } from "react";
import Message from "../assets/Message";
import { useLocation, useNavigate } from "react-router-dom";
import { userContext } from "../App";
import InfoMessage from "../assets/InfoMessage";

function Room() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, room } = location.state;
  const { socket } = useContext(userContext);
  const [messages, setMessages] = useState([]);
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    socket.emit("getMessages", { roomId: room._id }, (response) => {
      if (response.success) {
        setMessages(response.messages);
      } else {
        alert(response.meessage);
      }
    });
  }, [messages]);

    socket.on("infoMessage", (message) => {
      setMessages([...messages, message]);
      scrollToBottom();
    });

    socket.on("newMessage", (message) => {
      setMessages([...messages, message]);
      scrollToBottom();
    });
  

  const scrollToBottom = () => {
    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  };

  const messageHandler = (e) => {
    e.preventDefault();
    const message = inputRef.current.value;
    socket.emit("sendMessage", { roomId: room._id, message, user });
    inputRef.current.value = "";
  };

  const handleDissconnect = () => {
    socket.emit("leaveRoom", { roomId: room._id, userId: user._id });
    socket.off("newMessage");
    socket.off("infoMessage");
    navigate("/home");
  };

  return (
    <div className="homediv borderRadius room padding5">
      <div className="card margin16 padding5 width100 nav">
        <div className="list">
          <div className="roomImage margin5">
            <img src={room.image} />
          </div>
          <div className="margin5">
            <h3>{room.name}</h3>
          </div>
        </div>
        <button
          type="button"
          className="btn btn-outline-danger"
          onClick={handleDissconnect}
        >
          Leave Room
        </button>
      </div>
      <div className="padding5 margin5 messageList" ref={containerRef}>
        {messages.map((message, index) => {
          if (message.type === "info") {
            return <InfoMessage key={index} message={message.message} />;
          } else if (message.user._id == user._id) {
            return (
              <Message
                key={index}
                message={message.message}
                user={message.user}
                type="self"
              />
            );
          } else {
            return (
              <Message
                key={index}
                message={message.message}
                user={message.user}
                type="other"
              />
            );
          }
        })}
      </div>
      <div className="padding5 d-flex message">
        <input
          className="form-control me-2 margin5"
          type="search"
          placeholder="Message"
          ref={inputRef}
          aria-label="Search"
        ></input>
        <button
          className="btn btn-outline-success margin5"
          type="submit"
          onClick={messageHandler}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Room;
