import * as React from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./Conversation.css";
import { Box } from '@mui/system';
import { useState, useEffect, useRef } from "react";
import { messageObject } from "../data/messageObject";
import { Divider, FormControl, Grid, List, ListItem, ListItemText, MenuItem, Paper, Select } from "@mui/material";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useCookies } from 'react-cookie';


axios.defaults.withCredentials = 'true';
axios.defaults.crossDomain = 'true';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['withCredentials'] = 'true';

function Conversation() {

    const {id, name, status, subject, date, role} = useParams()
    const [newMessages, setNewMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [currStatus, setCurrStatus] = useState(status.toLowerCase());
    const endRef = useRef(null)
    const [cookies] = useCookies(['XSRF-TOKEN']);
    const baseurl = "http://localhost:8080/"

    useEffect(() => {
        axios.get(`${baseurl}getconversation/${id}`).then((response) => {
            console.log(response)
            const messageHistory = response.data.map((data)=>
                new messageObject(data.fromUserId, data.messageContent)
            )
            setNewMessages(messageHistory)
        })
    }, [id])

    /*const scrollToBottom = () => {
        endRef.current.scrollIntoView({behavior:"smooth"})
    }

    useEffect(scrollToBottom, [newMessages])*/

    const handleStatus = (event) => {
        setCurrStatus(event.target.value)
        axios.put(`${baseurl}updatestatus/${id}/${event.target.value.toUpperCase()}`).then((response) => {
            console.log(response)
        }).catch((err) => console.log(err))
    }

    const handleMessageChange = (event) => {
        setMessage(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (message) {
            console.log(message)
            const data = JSON.stringify({
                "ticketId": id,
                "messageContent": message
            })
            console.log(data)
            axios.post(`${baseurl}sendmessage`,{data}, {
                headers: {
                  'Content-Type': 'application/json'
                }
              }).then(()=>{
                setNewMessages([...newMessages, new messageObject(name, message)])
            }).catch((error)=>{
                console.log(error)
            })
            setMessage('')
        }

    }

    

    const listMessages = newMessages.map((messageObject, index) =>
        <ListItem key={index} id="list-item">
            <Paper elevation={2} id="chat-paper" square>
                <ListItemText primary={`${messageObject.message}`} secondary={`${messageObject.sender}`} />
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
                            {role === 'user' ?<FormControl fullWidth>
                                <label style={{marginLeft: 10}}>status</label>
                                <Select
                                    style={{
                                        color: 'white',
                                        backgroundColor: (currStatus === 'withdrawn') ? '#F76E11' : (currStatus === 'open') ? '#346EEB' : '#2B8F32'
                                    }}
                                    labelId="simple-select-label"
                                    id="simple-select"
                                    value={currStatus}
                                    label="Status"
                                    onChange={handleStatus}
                                >
                                    <MenuItem value={"open"}>Open</MenuItem>
                                    <MenuItem value={"resolved"}>Resolved</MenuItem>
                                    <MenuItem value={"withdrawn"}>Withdrawn</MenuItem>
                                </Select>
                            </FormControl>: null}
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