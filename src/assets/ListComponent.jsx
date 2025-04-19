import React from 'react';

function ListComponent({ room, user, handleOnClick }) {
  return (
    <div
      className="card margin16 list padding5"
      onClick={(e) => handleOnClick(e,room, user)}
    >
      <div className="image margin5">
        <img src={room.image} alt={room.name} />
      </div>
      <div className="margin5">
        <h3>{room.name}</h3>
      </div>
    </div>
  );
}

export default ListComponent;
