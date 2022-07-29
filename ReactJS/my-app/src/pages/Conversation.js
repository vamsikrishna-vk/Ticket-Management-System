import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function Conversation() {
    return (
        <div className='main'>
            <form>
                <TextField
                id="problem-text"
                label="Problem Text"
                placeholder="Enter your question"
                multiline
                variant="filled"
                />
                <br />
                <Button 
                    variant="contained"
                    type="submit"
                >
                    Submit
                </Button>
            </form>
            <form>
                <TextField
                    id="response-text"
                    label="Response Text"
                    placeholder="Enter your response"
                    multiline
                    variant="filled"
                />
                <br />
                <Button 
                    variant="contained"
                    type="submit"
                >
                    Submit
                </Button>
            </form>
      </div>
    );
}

export default Conversation;