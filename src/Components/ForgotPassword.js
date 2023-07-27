import { Alert, Button, Card, CardActions, CardContent, TextField, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import insta from "../Assets/Instagram-name-logo-clipart-PNG.png";

const ForgotPassword = () => {
  const store = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [tog, setTog] = useState(true);
  const navigate = useNavigate();
  const { reset, user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  const handleClick = async () => {

    try {
      setError("");
      setLoading(true);
      let res = await reset(email);
      setLoading(false);
      setTog(false)
      // navigate("/login");
    } catch (err) {
      setError(err.message);
      setTimeout(() => {
        setError("");
      }, 2000);
      setLoading(false);
    }
  }
  return <div className="loginwrapper">
    <div className="loginCard">
      {
        tog ? (<> <Card variant="outlined">
          <div className="insta_logo">
            <img src={insta} alt="" />
          </div>
          <CardContent>
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


            <Typography
              color="primary"
              variant="subtitle1"
              onClick={() => navigate("/login")}
              sx={{ cursor: "pointer" }}
            >
              Password Yaad Aa Gaya ?
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              color="primary"
              fullWidth={true}
              disabled={loading}
              onClick={handleClick}
            >
              Reset Password
            </Button>
          </CardActions>
        </Card>

          <Card variant="outlined" className="card2">
            <CardContent>
              <Typography
                sx={{ color: "grey", textAlign: "center" }}
                variant="subtitle2"
              >
                Don't have an account ? <Link to="/signup">Signup</Link>
              </Typography>
            </CardContent>
          </Card></>) : <Card variant="outlined">
          <div className="insta_logo">
            <img src={insta} alt="" />
          </div>
          <CardContent>
            {<Alert severity="success">Email send to <em><strong>{email}</strong></em> email Address</Alert>}
            <Typography
              color="primary"
              variant="h6"
              sx={{ textAlign: "center" }}
              margin={"dense"}
            >
              Please Change Your Password !
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              color="primary"
              fullWidth={true}
              disabled={loading}
              onClick={() => navigate('/login')}
            >
              Back to Login Page
            </Button>
          </CardActions>
        </Card>
      }
    </div>
  </div>;
};

export default ForgotPassword;
