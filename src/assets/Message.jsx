import React, { Profiler } from 'react'

function Message({message,user,type}) {
  return (
    <div className={`messageContiner padding5 margin5 ${type == 'self' ? 'self' : 'other'}`}>
      <div className={`headerContiner margin5`}>
        <img src={user.profilePhoto} className="mimage"/>
        <p className='header padding2'>{user.name}</p>
      </div>
      <div className='padding5'>
        <p className='body'>{message}</p>
      </div>
    </div>
  )
}

export default Message