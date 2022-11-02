import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Header";
import RegisterPage from './pages/RegisterPage'
import HomePage from "./pages/HomePage";
import { useGlobalContext } from "../context/GlobalContext";
import { Typography } from "@material-ui/core";
import Dashboard from './pages/Dashboard';
import SubmitTicket from './pages/SumbitTicket'
import MyTickets from "./pages/MyTickets";
import CompletedTickets from "./pages/CompletedTickets";



const Layout = () => {
  const { fetchingUser } = useGlobalContext();

  return  (
    <BrowserRouter>      
    
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path = '/dashboard' element = {<Dashboard />} />
        <Route path = '/submitTicket' element = {<SubmitTicket />} />
        <Route path = '/myTickets' element = {<MyTickets/>} />
        <Route path = '/completedTickets' element = {<CompletedTickets/>} />
      </Routes>
    </BrowserRouter>
  );
};


export default Layout
