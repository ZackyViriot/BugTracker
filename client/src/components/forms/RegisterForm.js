import React from "react";
import { useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { Card, CardContent, Typography } from "@material-ui/core";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context/GlobalContext";
import Header from "../Header";
import axios from "axios";

const RegisterForm = () => {
  const { getCurrentUser, user } = useGlobalContext();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
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
    setLoading();

    let data = {};

    data = {
      name,
      email,
      password,
      confirmPassword,
    };

    axios
      .post("/api/auth/register", data)
      .then(() => {
        getCurrentUser();
      })
      .catch((err) => {
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
            <form autoComplete="off">
              <Grid container spacing={8} direction="column">
                <Grid item xs={12}>
                  <Typography gutterBottom variant="h2" align="center">
                    Register
                  </Typography>
                  <TextField
                    variant="outlined"
                    label="Name"
                    name="name"
                    fullWidth
                    required
                    onChange={(e) => setName(e.target.value)}
                  />
                  {errors.name && <Typography>{errors.name}</Typography>}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    label="Email"
                    name="email"
                    fullWidth
                    required
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
                    onChange={(e) => setPassword(e.target.value)}
                    type='password'
                  />
                  {errors.password && (
                    <Typography>{errors.password}</Typography>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    label="Confirm Password"
                    name="confirmPassword"
                    fullWidth
                    required
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    type='password'
                  />
                  {errors.confirmPassword && (
                    <Typography>{errors.confirmPassword}</Typography>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                    style={{ borderRadius: "10px", textTransform: "none" }}
                    onClick={onSubmit}
                  >
                    Register
                  </Button>
                  
                </Grid>
                {Object.keys(errors).length > 0 && (
                    <Typography
                      gutterBottom
                      variant="h6"
                      style={{ color: "red" }}
                      align="center"
                    >
                      There was a problem with your registration creditials
                    </Typography>
                  )}

                <Typography variant="h6" gutterBottom align="center">
                  Already a Member
                </Typography>
                <Grid item xs={12}>
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
                    to="/"
                  >
                    Login
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
};

export default RegisterForm;
