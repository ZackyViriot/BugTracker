import React from "react";
import LoginForm from "../forms/LoginForm";
import { makeStyles, Paper } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: "auto",
    marginTop: 50,
    padding: theme.spacing(3),
    maxWidth: 500,
    height: 600,
    borderRadius: 10,
  },
}));

const HomePage = () => {
  const classes = useStyles();
  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default HomePage;
