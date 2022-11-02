import React from "react";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context/GlobalContext";
import SideNavigation from "../SideNavigation";
import DashboardPage from '../DashboardStuff/DashboardPage'



const Dashboard = () => {
    const {user} = useGlobalContext();
    const navigate = useNavigate();

    React.useEffect(()=>{
        if(!user && navigate){
            navigate('/')
        }
    },[user,navigate])
    return (
        <div>
            <SideNavigation/>
            <DashboardPage/>

        </div>
    )

}




export default Dashboard