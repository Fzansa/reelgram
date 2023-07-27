import React, { useState } from "react";
import { Alert, Button, LinearProgress } from "@mui/material";
import { Movie } from "@material-ui/icons";
import { v4 as uuidv4 } from "uuid";
import { database, storage } from "../firebase";
import { useNavigate } from "react-router-dom";

const UploadFile = ({ userData }) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = async (file) => {
    if (file === null) {
      setError("PLease select a file first");
      setTimeout(() => {
        setError("");
      }, 2000);
      return;
    }
    if (file.size / (1024 * 1024) > 100) {
      setError("This video size is bigger than 100mb");
      setTimeout(() => {
        setError("");
      }, 2000);
      return;
    }

    let uid = uuidv4();
    setLoading(true);

    const uploadTask = storage.ref(`/posts/${uid}/${file.name}`).put(file);
    uploadTask.on("state_changed", fn1, fn2, fn3);

    function fn1(snapshot) {
      let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(`upload is ${progress} done`);
    }

    function fn2(error) {
      console.log(error);
      setError(error.message);
      setTimeout(() => {
        setError("");
      }, 2000);
      setLoading(false);
      return;
    }

    async function fn3() {
      try {
        const url = await uploadTask.snapshot.ref.getDownloadURL();
    
        let obj = {
          likes: [],
          comments: [],
          pId: uid,
          pUrl: url,
          uName: userData.fullName !== null && userData.fullName,
          uProfile: userData.profileUrl !== null && userData.profileUrl,
          userId: userData.userId !== null && userData.userId,
          createdAt: database.getTimeStamp !== null && database.getTimeStamp,
        };
    
        const postRef = await database.posts.add(obj);
    
        if (userData.postIds && Array.isArray(userData.postIds)) {
          // If userData.postIds is an array, add the new post ID to it
          userData.postIds.push(postRef.id);
        } else {
          // If userData.postIds is not an array or does not exist, create a new array with the post ID
          userData.postIds = [postRef.id];
        }
    
        await database.users.doc(userData.userId).update({
          postIds: userData.postIds,
        });
    
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setTimeout(() => {
          setError("");
        }, 2000);
        setLoading(false);
      }
    }
    
    
  };

  return (
    <div>
      {error !== "" ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <>
          <input
            type="file"
            accept="video/*"
            id="upload-input"
            style={{ display: "none" }}
            onChange={(e) => handleChange(e.target.files[0])}
          />
          <label htmlFor="upload-input">
            <Button
              variant="outlined"
              color="secondary"
              disabled={loading}
              component="span"
              sx={{marginTop:"5%"}}
            >
              <Movie /> &nbsp; Upload Video
            </Button>
          </label>
          {loading && (
            <LinearProgress color="secondary" style={{ marginTop: "3%" }} />
          )}
        </>
      )}
    </div>
  );
};

export default UploadFile;
