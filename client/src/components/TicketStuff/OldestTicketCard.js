import React from "react";
import { useGlobalContext } from "../../context/GlobalContext";
import { CardContent, Typography } from "@material-ui/core";
import Card from "@mui/material/Card";
import { minHeight } from "@mui/system";
const OldestTicketCard = (props) => {
  const displayTicket = (props) => {
    const { menu, ticket } = props;

    if (ticket.length > 0) {
      return ticket.map((ticketInfo, index) => {
        return (
          //This is where we are going to diplay the newest Ticket 
          <div key={ticketInfo._id}>
            <Card
            style={{
              backgroundColor:'#3f51b5',
              borderRadius:"20px",
              minHeight:300
            }}
            >
              <CardContent>
                <Typography
                  sx={{ fontSize: 19, }}
                  color="textSecondary"
                  gutterBottom

                >
                  Ticket Title:
                </Typography>

                <Typography
                sx={{ fontSize: 19 }}
                color="textSecondary"
                gutterBottom
                style={{
                  marginLeft: 60,
                }}
                >
                  {ticketInfo.title}
                </Typography>

                <Typography
                  sx={{fontSize:19,}}
                  color='textSecondary'
                  gutterBottom
                >
                  Ticket Description:
                </Typography>
                <Typography
                sx={{ fontSize: 19 }}
                color="textSecondary"
                gutterBottom
                style={{
                  marginLeft: 60,
                }}
                >
                  {ticketInfo.description}
                </Typography>

                <Typography
                  sx={{fontSize:19,}}
                  color='textSecondary'
                  gutterBottom
                >
                  Ticket Severity:
                </Typography>
                <Typography
                sx={{ fontSize: 19 }}
                color="textSecondary"
                gutterBottom
                style={{
                  marginLeft: 60,
                }}
                >
                  {ticketInfo.severity}
                </Typography>
                <Typography
                  sx={{fontSize:19,}}
                  color='textSecondary'
                  gutterBottom
                >
                  Ticket Date:
                </Typography>
                <Typography
                sx={{ fontSize: 19 }}
                color="textSecondary"
                gutterBottom
                style={{
                  marginLeft: 60,
                }}
                >
                  {ticketInfo.date}
                </Typography>
              </CardContent>
            </Card>
          </div>
        );
      });
    } else {
      return <Typography>No Current Tickets</Typography>;
    }
  };
  return <div>{displayTicket(props)}</div>;
};

export default OldestTicketCard;