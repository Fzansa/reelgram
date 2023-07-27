import React, { useEffect, useState } from "react";
import { database } from "../firebase";
import {
  Avatar,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import Video from "./Video";
import "./Post.css";
import Like from "./Like";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions } from "@mui/material";
import Like2 from "./Like2";
import AddComment from "./AddComment";
import Comments from "./Comments";

const Post = ({ userData }) => {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    let parr = [];
    const unsub = database.posts
      .orderBy("createdAt", "desc")
      .onSnapshot((querySnapShot) => {
        parr = [];
        querySnapShot.forEach((doc) => {
          let data = { ...doc.data(), postId: doc.id };
          parr.push(data);
        });
        setPosts(parr);
      });
    return unsub;
  }, []);

  const [open, setOpen] = React.useState(null);

  const handleClickOpen = (id) => {
    setOpen(id);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const callback = (entries) => {
    entries.forEach((entry) => {
      let ele = entry.target.childNodes[0];
      let playPromise = ele.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          if (!ele.paused && !entry.isIntersecting) {
            ele.pause();
          }
        }).catch((err) => {
          console.log(err)
        });
      }
      // console.log(ele);
      // ele.play().then(() => {
      //   if (!ele.paused && !entry.isIntersecting) {
      //     ele.pause();
      //   }
      // });
    });
  };
  let observer = new IntersectionObserver(callback, { threshold: 0.6 });

  useEffect(() => {
    const elements = document.querySelectorAll(".videos");
    elements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
    }
  }, [posts]);



  return (
    <div>
      {posts === null || userData === null ? (
        <CircularProgress />
      ) : (
        <div className="video-container">
          {posts.map((post, index) => (
            <React.Fragment key={index}>
              <div className="videos">
                <Video src={post.pUrl} />

                <div className="fa" style={{ display: "flex" }}>
                  <Avatar src={userData && userData.profileUrl} />
                  <h4>{userData && userData.fullName}</h4>
                </div>

                <Like userData={userData} postData={post} />
                <ChatBubbleIcon
                  className="chat-styling"
                  onClick={() => handleClickOpen(post.pId)}
                />
                <Dialog
                  open={open === post.pId}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                  fullWidth={true}
                  maxWidth="md"
                >
                  <div className="modal_container">

                    <div className="video_modal">
                      <video autoPlay={true} muted="mutetd" controls>
                        <source src={post.pUrl} />
                      </video>
                    </div>

                    <div className="comment_container">
                      <Card className="card1" style={{ padding: ".1rem" }}>
                        <Comments postData={post} />
                      </Card>

                      <Card variant="outlined" className="card3">
                        <Typography style={{ padding: "1rem" }}>
                          {post.likes.length === 0
                            ? ""
                            : `Liked by ${post.likes.length}  users`}
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
      )}
    </div>
  );
};

export default Post;
