import React, { createContext, useEffect, useState } from 'react'
import Index from './display/Index'
import Home from './display/Home'
import Login from './display/Login'
import Signup from './display/Signup'
import Room from './display/Room'
import CreateRoom from './display/CreateRoom'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import { io } from 'socket.io-client';

export const userContext = createContext();

function App() {

    const router = createBrowserRouter([
      { path: '/', element: <Index /> },
      { path: '/home', element: <Home /> },
      { path: '/login', element: <Login /> },
      { path: '/signup', element: <Signup /> },
      { path: '/room', element: <Room /> },
      { path: '/create', element: <CreateRoom />}
    ]
    )

    const [user,setUser] = useState(null);

    


    const SOCKET_URL = 'https://pingmebackend.onrender.com';

    const socket = io(SOCKET_URL);


  return (
    <>
      <userContext.Provider value={{user,setUser,socket}}>
        <RouterProvider router={router} />
      </userContext.Provider>
    </>
    
  )
}

export default App