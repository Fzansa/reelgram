import React, { useEffect, useState } from "react";

import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import UploadFile from "./UploadFile";
import { database } from "../firebase";
import Post from "./Post";
import Navbar from "./Navbar";

const Feed = () => {
  const { logOut, user } = useContext(AuthContext);
  const [userData, setUserData] = useState()
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  useEffect(() => {
    let me = user && user.uid;
    const unsub = database.users.doc(me).onSnapshot((snapShot) => {
      setUserData(snapShot.data())
    })
    return () => {
      unsub()
    }
  }, [user])



  return (

    <>

      <Navbar userData={userData} />
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>

        <UploadFile userData={userData} />
        <Post userData={userData} />
      </div >
    </>
  );
};

export default Feed;
