import { Typography } from "@material-ui/core";
import React from "react";
import SideNavigation from "../SideNavigation";
import TicketChart from "../TicketStuff/TicketChart";
import { useGlobalContext, } from "../../context/GlobalContext";
import { useNavigate } from "react-router-dom";

const MyTickets = () => {
  const {user} = useGlobalContext();
    const navigate = useNavigate();

    React.useEffect(()=>{
        if(!user && navigate){
            navigate('/')
        }
    },[user,navigate])
  return (
    <div>
      <SideNavigation />
      <Typography
        variant="h2"
        style={{
            marginLeft:700,
            marginTop:80
            
        }}

      
      >Your Tickets</Typography>
      <TicketChart />
    </div>
  );
};

export default MyTickets;
