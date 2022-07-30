import { Divider, Stack } from "@mui/material";
import React from "react";

function MessageHistory() {
    return (
        <Stack direction="row" divider={<Divider orientation="vertical" flexItem />} spacing={3}>
            <div className="info">
                <div className="sender">sender</div>
                <div className="time">time</div>
            </div>
            <div className="message">
                This is the message history. 
            </div>
        </Stack>
    );
}

export default MessageHistory;