import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { Card, CardContent, Typography } from "@material-ui/core";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context/GlobalContext";
import { red } from "@material-ui/core/colors";
import Header from "../Header";
import axios from "axios";


const LoginForm = () => {
  const { getCurrentUser, user } = useGlobalContext();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState({});

  React.useEffect(() => {
    if (user && navigate) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    let data = {};

    data = {
      email,
      password,
    };

    axios.post("/api/auth/login", data).then(() => {
        getCurrentUser();
      }).catch((err) => {
        setLoading(false);

        if (err?.response?.data) {
          setErrors(err.response.data);
        }
      });
  };

  
  return (
    <div>
      <Header/>
      <Grid>
        <Card
          style={{
            maxWidth: 550,
            minHeight: 600,
            padding: "20px 5px",
            margin: "0 auto",
            borderRadius: "25px",
          }}
        >
          <CardContent>
            <form autoComplete="off" onSubmit={onSubmit}>
              <Grid container spacing={10} direction="column">
                <Grid item xs={12}>
                  <Typography gutterBottom variant="h2" align="center">
                    Login
                  </Typography>
                  <TextField
                    variant="outlined"
                    label="Email"
                    name="email"
                    fullWidth
                    required
                    // value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {errors.email && <Typography>{errors.email}</Typography>}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    label="Password"
                    name="password"
                    fullWidth
                    required
                    // value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                  />
                  {errors.password && (
                    <Typography>{errors.password}</Typography>
                  )}
                </Grid>

                {Object.keys(errors).length > 0 && (
                  <Typography
                    gutterBottom
                    variant="h6"
                    style={{ color: "red" }}
                    align="center"
                  >
                    Password or Email is Incorrect
                  </Typography>
                )}
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    type="submit"
                    color="primary"
                    size="large"
                    fullWidth
                    style={{ borderRadius: "10px", textTransform: "none" }}
                    // onClick={onSubmit}
                  >
                    Login
                  </Button>
                </Grid>
                <Typography variant="h6" gutterBottom align="center">
                  Need to sign up
                </Typography>
                <Grid item xs={12}></Grid>
              </Grid>
            </form>
            <Button
              variant="contained"
              size="large"
              fullWidth
              style={{
                borderRadius: "10px",
                textTransform: "none",
                backgroundColor: "#f50057",
              }}
              component={Link}
              to="/register"
            >
              Register Here
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
};

export default LoginForm;
