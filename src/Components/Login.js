import * as React from "react";
import { useContext, useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./Login.css";
import insta from "../Assets/Instagram-name-logo-clipart-PNG.png";
import Alert from "@mui/material/Alert";
import { TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import bg from "../Assets/android-app-banner.png";
import img1 from "../Assets/img1.jpg";
import img2 from "../Assets/img2.jpg";
import img3 from "../Assets/img3.jpg";
import img4 from "../Assets/img4.jpg";
import img5 from "../Assets/img5.jpg";
import { AuthContext } from "../context/AuthContext";

import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
  Image,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";

export default function Login() {
  const store = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login, user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  const handleClick = async () => {
    try {
      setError("");
      setLoading(true);
      let res = await login(email, password);
      setLoading(false);
      navigate("/");
    } catch (err) {
      setError(err.message);
      setTimeout(() => {
        setError("");
      }, 2000);
      setLoading(false);
    }
  };

  return (
    <div className="loginwrapper">
      <div
        className="imgCar"
        style={{ backgroundImage: "url(" + bg + ")", backgroundSize: "cover" }}
      >
        <div className="car">
          <CarouselProvider
            visibleSlides={1}
            naturalSlideWidth={238}
            naturalSlideHeight={493}
            totalSlides={5}
            step={3}
            hasMasterSpinner
            isPlaying={true}
            infinite={true}
            dragEnabled={false}
            touchEnabled={false}
          >
            <Slider>
              <Slide index={0}>
                <Image src={img1} />
              </Slide>
              <Slide index={1}>
                <Image src={img2} />
              </Slide>
              <Slide index={2}>
                <Image src={img3} />
              </Slide>
              <Slide index={3}>
                <Image src={img4} />
              </Slide>
              <Slide index={4}>
                <Image src={img5} />
              </Slide>
            </Slider>
          </CarouselProvider>
        </div>
      </div>

      <div className="loginCard">
        <Card variant="outlined">
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

            <Typography
              color="primary"
              variant="subtitle1"
              onClick={() => navigate("/reset")}
              sx={{cursor:"pointer"}}
            >
              Forgot Password?
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
              Login
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
        </Card>
      </div>
    </div>
  );
}
