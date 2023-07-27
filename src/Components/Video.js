import React from "react";
import ReactDOM from "react-dom";
import "./Video.css";

const Video = (props) => {
  const handleClick = (e) => {
    e.preventDefault();
    e.target.muted = !e.target.muted;
  };

  const handleScroll = (e) => {
    let next = ReactDOM.findDOMNode(e.target).parentNode.nextSibling;
    if (next) {
      next.scrollIntoView();
      e.target.muted = true;
    }
  };
  return (
    <video
      src={props.src}
      className="videos-styling"
      muted="muted"
      onEnded={handleScroll}
      onClick={handleClick}
      autoPlay={true}

    ></video>
  );
};

export default Video;
