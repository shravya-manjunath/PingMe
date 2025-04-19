import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../App";
import ListComponent from "../assets/ListComponent";

function Home() {
  const [rooms, setRooms] = useState([]);
  const { user, socket } = useContext(userContext);
  const navigate = useNavigate();

  useEffect(() => {
    socket.emit("room", {}, (response) => {
      if (response.success) {
        setRooms(response.rooms);
      } else {
        alert("Something went wrong");
      }
    });
  }, [socket]);

  const handleOnClick = (e,room, user) => {
    const div = e.currentTarget;
    div.classList.add("disabled");
    socket.emit("join", { room, user }, (response) => {
      div.classList.remove("disabled");
      if(!user){
        alert("Please login to join the room");
        navigate("/login");
      }
      else if (response.success) {
        navigate("/room", { state: { user, room } });
      } else {
        alert(response.message);
      }
    });
  };

  return (
    <div className="homediv borderRadius">
      <nav className="bg-primary borderRadius nav">
        <h4 className="margin14 whiteFont">PingMe</h4>
        <Link to={"/create"} className="btn btn-light margin14">
          Create Room
        </Link>
      </nav>
      {rooms.map((room) => (
        <ListComponent
          key={room._id}
          room={room}
          user={user}
          handleOnClick={handleOnClick}
        />
      ))}
    </div>
  );
}

export default Home;
