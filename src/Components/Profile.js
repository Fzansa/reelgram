import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { database } from "../firebase";
import {
  Avatar,
  Card,
  CircularProgress,
  Dialog,
  Typography,
} from "@mui/material";
import Navbar from "./Navbar";
import "./Profile.css";
import Video from "./Video";
import Like from "./Like";
import Comments from "./Comments";
import Like2 from "./Like2";
import AddComment from "./AddComment";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";

const Profile = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch user data from Firestore
    const unsubscribe = database.users.doc(id).onSnapshot((snap) => {
      setUserData(snap.data());
    });

    // Cleanup function to unsubscribe when the component unmounts
    return () => unsubscribe();
  }, [id]); // Add 'id' to the dependencies array

  useEffect(() => {
    const getPost = async () => {
      if (userData?.postIds?.length > 0) {
        let parr = [];
        for (let i = 0; i < userData.postIds.length; i++) {
          let postData = await database.posts.doc(userData.postIds[i]).get();
          parr.push({ ...postData.data(), postId: postData.id });
        }
        setPosts(parr);
      }
    };

    getPost();
  }, [userData]); // Add 'userData' to the dependencies array

  const [open, setOpen] = React.useState(null);

  const handleClickOpen = (id) => {
    setOpen(id);
  };

  const handleClose = () => {
    setOpen(null);
  };

  if (!userData || !posts) {
    return <CircularProgress />; // Show loading indicator until data is fetched
  }

  return (
    <>
      <Navbar userData={userData} />
      <div className="spacer"></div>
      <div className="container">
        <div className="upperPart">
          <div className="profileImage">
            <img src={userData.profileUrl} alt="" />
          </div>
          <div className="info">
            <Typography variant="h5">Email: {userData.email}</Typography>
            <Typography variant="h6">
              Post: {userData.postIds && userData.postIds.length}
            </Typography>
          </div>
        </div>

        <hr style={{ marginTop: "3rem", marginBottom: "3rem" }} />

        <div className="profileVideo">
          {posts &&
            posts.map((post, index) => (
              <React.Fragment key={index}>
                <div className="videos2">
                  <video
                    muted="mutetd"
                    // controls
                    onClick={() => handleClickOpen(post && post.pId)}
                  >
                    <source src={post && post.pUrl} />
                  </video>

                  <Dialog
                    open={open === (post && post.pId)}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    fullWidth={true}
                    maxWidth="md"
                  >
                    <div className="modal_container">
                      <div className="video_modal">
                        <video autoPlay={true} muted="mutetd" controls>
                          <source src={post && post.pUrl} />
                        </video>
                      </div>

                      <div className="comment_container">
                        <Card className="card1" style={{ padding: "1rem" }}>
                          <Comments postData={post} />
                        </Card>

                        <Card variant="outlined" className="card3">
                          <Typography style={{ padding: "1rem" }}>
                            {post?.likes?.length === 0
                              ? ""
                              : `Liked by ${post?.likes?.length} users`}
                          </Typography>
                          <div style={{ display: "flex" }}>
                            <Like2
                              postData={post}
                              userData={userData}
                              style={{
                                display: "flex",
                                alignItem: "center",
                                justifyContent: "center",
                              }}
                            />
                            <AddComment postData={post} userData={userData} />
                          </div>
                        </Card>
                      </div>
                    </div>
                  </Dialog>
                </div>
              </React.Fragment>
            ))}
        </div>
      </div>
    </>
  );
};

export default Profile;
