import React from 'react';
import NewTicketForm from '../forms/NewTicketForm';
import SideNavigation from '../SideNavigation';
import { useGlobalContext } from '../../context/GlobalContext';
import { useNavigate } from 'react-router-dom';




const SubmitTicket = () => {
    const {user} = useGlobalContext();
    const navigate = useNavigate();

    React.useEffect(()=>{
        if(!user && navigate){
            navigate('/')
        }
    },[user,navigate])

    return(
        <div>
            <SideNavigation/>
            <NewTicketForm/>
        </div>
    )
}



export default SubmitTicket