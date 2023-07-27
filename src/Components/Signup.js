import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./Signup.css";
import insta from "../Assets/Instagram-name-logo-clipart-PNG.png";
import Alert from "@mui/material/Alert";
import { TextField } from "@mui/material";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { database, storage } from "../firebase";

export default function Signup() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {signUp,user} = useContext(AuthContext);

  
  React.useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  const handleClick = async (e) => {
    e.preventDefault();
    if (file === null) {
      setError("Please Upload Profile Image First");
      setTimeout(() => {
        setError("");
      }, 2000);
      return;
    }

    try {
      setError("");
      setLoading(true);
      let userobj = await signUp(email, password);
      let uid = await userobj.user.uid;

      const uploadTask = storage.ref(`/users/${uid}/ProfileImage`).put(file);
      uploadTask.on("state_changed", fn1, fn2, fn3);

      function fn1(snapshot) {
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 30;
        console.log(`upload is ${progress} done`);
      }

      function fn2(error) {
        setError(error.message);
        setTimeout(() => {
          setError("");
        }, 2000);
        setLoading(false);
        return;
      }

      function fn3() {
        uploadTask.snapshot.ref.getDownloadURL().then((url) => {
          database.users.doc(uid).set({
            email: email,
            userId: uid,
            fullName: name,
            profileUrl: url,
            createdAt: database.getTimeStamp,
          });
        });
        setLoading(false);
        navigate("/");
      }

    } catch (error) {
      setError(error.message);
      setTimeout(() => {
        setError("");
      }, 2000);
    }
  };

  return (
    <div className="signupwrapper">
      <div className="signupCard">
        <Card variant="outlined">
          <div className="insta_logo">
            <img src={insta} alt="" />
          </div>
          <CardContent>
            <Typography
              sx={{ color: "grey", textAlign: "center" }}
              variant="subtitle2"
            >
              Sign up to see photos and videos from your friends
            </Typography>
            {error !== "" && <Alert severity="error">{error}</Alert>}
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              fullWidth={true}
              margin="dense"
              size="small"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              fullWidth={true}
              margin="dense"
              size="small"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Full Name"
              variant="outlined"
              fullWidth={true}
              margin="dense"
              size="small"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Button
              size="small"
              color="secondary"
              fullWidth="true"
              margin="dense"
              startIcon={<CloudUploadIcon />}
              component="label"
            >
              upload Profile Image
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => setFile(e.target.files[0])}
              />
            </Button>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              color="primary"
              fullWidth={true}
              disabled={loading}
              onClick={handleClick}
            >
              Sign Up
            </Button>
          </CardActions>
          <CardContent>
            <Typography
              sx={{ color: "grey", textAlign: "center" }}
              variant="subtitle2"
            >
              By siging up , you agree to our Terms , Data Policy and Cookies
              Policy.
            </Typography>
          </CardContent>
        </Card>

        <Card variant="outlined" className="card2">
          <CardContent>
            <Typography
              sx={{ color: "grey", textAlign: "center" }}
              variant="subtitle2"
            >
              Having an Account ? <Link to="/login">Login</Link>
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
