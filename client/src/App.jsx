import React, { useEffect, useState } from "react";
import MainChat from "./Pages/MainChat";
import LogIn from "./Pages/LogIn";
import Register from "./Pages/Register";
import { Toaster } from "react-hot-toast";
import { AuthContext } from "./Context/AuthContext";
import { SocketContext } from "./Context/SocketContext";
import io from "socket.io-client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

const App = () => {
  const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("user-info")) || null);
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (authUser) {
      const socket = io(`http://localhost:5000`, {
        query: {
          userId: authUser.id,
        },
      });

      socket.on("newMessage", (newMessage) => {

        


        setMessages([newMessage, ...messages]);
      });

      socket.on("like", (newMessage) => {
        const updateLike = messages.map((ele) => {
          if (ele._id == newMessage._id) {
            ele.likes = newMessage.likes;
          }

          return ele;
        });
        setMessages(updateLike);
      });

      setSocket(socket);

      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser, messages]);

  const router = createBrowserRouter([
    {path: "/",element: authUser ? <MainChat /> : <Navigate to={"/login"} />,},
    {path: "/login", element: authUser ? <Navigate to={"/"} /> : <LogIn /> },
    {path: "/register",element: authUser ? <Navigate to={"/"} /> : <Register />,},
  ]);

  return (
    <div>
      <SocketContext.Provider value={{ socket }}>
        <AuthContext.Provider value={{ authUser, setAuthUser, messages, setMessages }}>
          <RouterProvider router={router} />
          <Toaster />
        </AuthContext.Provider>
      </SocketContext.Provider>
    </div>
  );
};

export default App;
