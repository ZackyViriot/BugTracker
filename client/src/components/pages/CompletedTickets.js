import React from 'react'
import { Typography } from '@material-ui/core'
import SideNavigation from '../SideNavigation'
import { useGlobalContext } from '../../context/GlobalContext'
import { useNavigate } from 'react-router-dom'
import CompletedTicketChart from '../TicketStuff/CompletedTicketChart'


const CompletedTickets = () => {
    const {user} = useGlobalContext();
    const navigate = useNavigate();

    React.useEffect(() => {
        if(!user && navigate){
            navigate('/')
        }
    },[user,navigate])
    return(
        <div>
            <SideNavigation />
            <Typography
            variant = 'h2'
            style = {{
                marginLeft:700,
                marginTop:80
            }}
            >
                Completed Tickets 
            </Typography>
            <CompletedTicketChart />
        </div>
    )
}



export default CompletedTickets