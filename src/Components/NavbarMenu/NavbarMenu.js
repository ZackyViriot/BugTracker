import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css'
import { TicketRecord } from "../TicketRecord/TicketRecord";
import { SubmitTicket } from "../SubmitTicket/SubmitTicket";
import { TicketDashboard } from "../TicketDashBaord/TicketDashBoard";
import { Routes, Route, Link } from "react-router-dom";

export const NavbarMenu = () => {
    return (
            <div>
                <Navbar bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand href="#home">BugTracker</Navbar.Brand>
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to='/'>TicketDashboard</Nav.Link>
                            <Nav.Link as={Link} to='/SubmitTicket'>SubmitTicket</Nav.Link>
                            <Nav.Link as={Link} to='/TicketRecord'>TicketRecord</Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>
                <Routes>
                    <Route path='/' element={<TicketDashboard />} />
                    <Route path='/SubmitTicket' element={<SubmitTicket />} />
                    <Route path='/TicketRecord' element={<TicketRecord />} />
                </Routes>
            </div>
    )
}