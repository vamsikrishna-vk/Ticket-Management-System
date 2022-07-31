import * as React from 'react';
import MessageHistory from './MessageHistory';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./Conversation.css";
import { Box } from '@mui/system';
import tickets from '../data/ticketsData.json'

const ticket = tickets[0]

function Conversation() {
    return (
        <div className='maindiv'>
            <Stack spacing={3}>
                <Box>
                    <div className='subject'>Subject: {ticket.subject}</div>
                    <div className='createdOn'>Created On: {ticket.date}</div>
                    <div className='status'>Status: {ticket.status}</div>
                </Box>

                <Box>
                    <MessageHistory />
                </Box>

                <form>
                    <TextField
                        id="response-text"
                        label="Message here"
                        placeholder="Enter your message"
                        multiline
                        variant="filled"
                    />
                    <br />
                    <Box pt={2.5}>
                    <Button 
                        variant="contained"
                        type="submit"
                    >
                        Submit
                    </Button>
                    </Box>
                </form>
            </Stack>
      </div>
    );
}

export default Conversation;