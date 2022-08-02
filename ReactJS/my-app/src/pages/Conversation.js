import * as React from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./Conversation.css";
import { Box } from '@mui/system';
import tickets from '../data/ticketsData.json'
import { useState, useEffect, useRef } from "react";
import { messageObject } from "../data/messageObject";
import { Divider, FormControl, Grid, List, ListItem, ListItemText, MenuItem, Paper, Select } from "@mui/material";
import { useParams } from 'react-router-dom';



function Conversation() {

    const {id, name, status, subject, date} = useParams()
    const ticket = tickets.find(item => item.id === id)
    const [newMessages, setNewMessages] = useState(ticket.messages);
    const [message, setMessage] = useState("");
    const [currStatus, setCurrStatus] = useState(status);
    const endRef = useRef(null)

    const scrollToBottom = () => {
        endRef.current.scrollIntoView({behavior:"smooth"})
    }

    useEffect(scrollToBottom, [newMessages])

    const handleStatus = (event) => {
        setCurrStatus(event.target.value)
    }

    const handleMessageChange = (event) => {
        setMessage(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (message) {
            console.log(message)
            setNewMessages([...newMessages, new messageObject(name, message)])
            setMessage('')
        }

    }

    const listMessages = newMessages.map((messageObject, index) =>
        <ListItem key={index} id="list-item">
            <Paper elevation={2} id="chat-paper" square>
                <ListItemText primary={`${messageObject.sender}: ${messageObject.message}`} />
            </Paper>
            <div ref={endRef} />
        </ListItem>
    );

    return (
        <div className='conversation'>
            <Paper elevation={4} id="conversation-paper">
                <Stack spacing={2} id="conversation-stack">
                    <Grid container spacing={2}>
                        <Grid item xs={8}>
                            <Box>
                                <div className='subject'>Subject: {subject}</div>
                                <div className='createdOn'>Created On: {date}</div>
                                <div className='status'>Status: {status}</div>
                            </Box>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl fullWidth>
                                <label style={{marginLeft: 10}}>status</label>
                                <Select
                                    style={{
                                        color: 'white',
                                        backgroundColor: (currStatus === 'Withdrawn') ? '#F76E11' : (currStatus === 'Open') ? '#346EEB' : '#2B8F32'
                                    }}
                                    labelId="simple-select-label"
                                    id="simple-select"
                                    value={currStatus}
                                    label="Status"
                                    onChange={handleStatus}
                                >
                                    <MenuItem value={"Open"}>Open</MenuItem>
                                    <MenuItem value={"Resolved"}>Resolved</MenuItem>
                                    <MenuItem value={"Withdrawn"}>Withdrawn</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Divider />

                    <Box>
                        <Grid container spacing={4} alignItems="center">
                            <Grid id="chat-window" xs={12} item>
                                <List id="chat-window-messsages">
                                    {listMessages}
                                </List>
                            </Grid>
                        </Grid>
                    </Box>

                    <form>
                        <TextField
                            onChange={handleMessageChange}
                            id="response-text"
                            label="Message here"
                            value={message}
                            placeholder="Enter your message"
                            multiline
                            variant="filled"
                        />
                        <br />
                        <Box pt={2.5}>
                            <Button
                                onClick={handleSubmit}
                                id="submit-button"
                                variant="contained"
                                type="submit"
                            >
                                Submit
                            </Button>
                        </Box>
                    </form>
                </Stack>
            </Paper>
        </div>
    );
}

export default Conversation;