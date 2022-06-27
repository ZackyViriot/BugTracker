import { React, useState, useEffect } from 'react'
import { render } from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button, Form, Container } from 'react-bootstrap';





export const TicketForm = () => {
    const [form, setForm] = useState({})
    const [errors, setErrors] = useState({})

    const setField = (field, value) => {
        setForm({
            ...form,
            [field]: value
        })

        if(!!errors[field])
        setErrors({
            ...errors,
            [field]:null
        })

    }
    const handleSubmit = e => {
        e.preventDefault()
        console.log(form)
    }



    return (
        <Container className='TicketContainerForm'>
            <Form>
                <Form.Group controlId='form.Title'>
                    <Form.Label>Ticket Title</Form.Label>
                    <Form.Control 
                        type='text'  
                        isInvalid={!!errors.TicketTitle} 
                        value = {form.TicketTitle} 
                        onChange = {(e) => setField('TicketTitle',e.target.value)} 
                    />
                    <Form.Control.Feedback type = 'invalid'>
                        {errors.TicketTitle}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId='form.Description'>
                    <Form.Label>Ticket Description</Form.Label>
                    <Form.Control 
                        as='textarea' 
                        placeholder='Please describe your ticket' 
                        rows={3}
                        isInvalid = {!!errors.TicketDescription}
                        value = {form.TicketDescription}
                        onChange = {(e) => setField('TicketDescroption',e.target.value)}
                      />
                </Form.Group>
                <Form.Group controlId='form.serverity' >
                    <Form.Label>Ticket severity</Form.Label>
                    <Form.Select aria-label="Default select example" value = {form.ticketSeverity} onChange = {(e) => setField('TicketSevrity',e.target.value)}>
                        <option>Open this select menu</option>
                        <option value="1">Low</option>
                        <option value="2">Medium</option>
                        <option value="3">High</option>
                        <option value="4">Urgent</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group controlId='form.date' >
                    <Form.Label>Date Created</Form.Label>
                    <Form.Control 
                        type='date' 
                        placeholder='Date Created for Ticket' 
                        className = {!!errors.location && 'red-border'}
                        value = {form.TicketDate}
                        onChangeCapture = {(selected) => {
                            console.log(selected)
                            setField('date',selected)
                        }}
                    />
                </Form.Group>
                <Button variant='dark' type='submit' className='mt-3' onClick = {handleSubmit}>Submit</Button>{' '}
            </Form>
        </Container>
    )
}