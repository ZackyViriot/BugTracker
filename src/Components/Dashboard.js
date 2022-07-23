import React from "react";
import { useGlobalContext } from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const {user,completeTicket,incompleteTicket} = useGlobalContext();
    const navigate = useNavigate();

    React.useEffect(() => {
        if(!user && navigate){
            navigate("/")
        }
    }, [user,navigate])
    return (
       <h1>klk</h1>
    )
}

export default Dashboard