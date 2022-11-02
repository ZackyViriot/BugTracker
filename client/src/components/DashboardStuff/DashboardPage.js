//point of the file is to be show the latest ticket that was posted as well as the old tickets that hasnt been coompleted
import React, { Component } from "react";
import { Card, Typography, CardContent, Paper } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import { useGlobalContext } from "../../context/GlobalContext";
import { Button } from "@material-ui/core";
import { Box } from "@material-ui/core";
import zIndex from "@material-ui/core/styles/zIndex";
import { styled } from "@mui/material/styles";
import MyTickets from "../pages/MyTickets";
import NewestTicketCard from "../TicketStuff/NewestTicketCard";
import OldestTicketCard from "../TicketStuff/OldestTicketCard";

const DashboardPage = () => {
  const [NewestTicket, setNewestTicket] = React.useState([]);
  const [OldestTicket,setOldestTicket] = React.useState([]);


  React.useEffect(() => {
    getNewestTicket();
    getOldestTicket();
  },[])




  const getNewestTicket = () => {
    axios
      .get("/api/ticket/current")
      .then((res) => {

        const NewTicketInfo = res.data.incomplete.slice(-1);

        // set the state 
        setNewestTicket(NewTicketInfo)
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getOldestTicket = () => {
    axios
      .get('/api/ticket/current')
      .then((res) => {
        const OldestTicketInfo = res.data.incomplete.slice(0,1)

        //set the state 
        setOldestTicket(OldestTicketInfo)
      }).catch((err) => {
        console.log(err);
      })
  }
  
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Card
            style={{
              maxWidth: 550,
              minHeight: 500,
              padding: "20px 5px",
              marginTop: 120,
              marginLeft: 250,
              borderRadius: "25px",
            }}
          >
            <CardContent>
              <Typography gutterBottom variant="h2" align="center">
                Newest Ticket Added
              </Typography>
              <NewestTicketCard ticket = {NewestTicket} />

            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card
            style={{
              maxWidth: 550,
              minHeight: 500,
              padding: "20px 5px",
              marginTop: 120,
              marginLeft: 100,
              borderRadius: "25px",
            }}
          >
            <CardContent>
              <Typography gutterBottom variant="h2" align="center">
                Oldest Incomplete Ticket
              </Typography>
                  <OldestTicketCard ticket = {OldestTicket} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default DashboardPage;
