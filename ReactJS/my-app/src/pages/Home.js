import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Avatar, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import "./Home.css";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import tickets from '../data/ticketsData.json'

class ticketObject {
  constructor(id, requester, title, status, lastrequestdate) {
    this.id = id
    this.requester = requester
    this.title = title
    this.status = status
    this.lastrequestdate = lastrequestdate
  }
}

const renderDetailsButton = (params) => {
  return (
    <Chip label="OPEN" />
  )
}

const renderRequester = (params) => {
  return (
    <div className="profile">
      <Avatar />
      <div>
        <p className="profile_name"></p>
        <p></p>
      </div>
    </div>
  )
}

const columns = [
  { field: 'requester', headerName: 'REQUESTER', flex: 1 },
  { field: 'title', headerName: 'SUBJECT', flex: 1 },
  {
    field: 'status',
    headerName: 'STATUS',
    flex: 1,
    disableClickEventBubbling: true
  },
  { field: 'lastrequestdate', headerName: 'LAST REQUEST DATE', flex: 1 },

];

let rows = tickets.map((ticket) => 
new ticketObject(ticket.id, ticket.name, ticket.subject, ticket.status, ticket.date)
)

const ticketObjArray = rows

const ColoredLine = ({ color }) => (
  <hr
    style={{
      color,
      backgroundColor: color,
      height: 0.5
    }}
  />
);

function Home() {

  const [open, setOpen] = useState(false)

  const handleCreateTicket = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false);
  };

  const [filterOptions, setFilterOptions] = React.useState(() => ['open','withdrawn','resolved']);

  const handleFilter = (event, newFormats) => {
    setFilterOptions(newFormats);
  };

  const filter = () => {
    console.log(filterOptions)
    rows = ticketObjArray.filter((ticket) => {
      return filterOptions.includes(ticket.status.toLowerCase())
    })
    console.log(rows)
  }

  useEffect(filter, [filterOptions])

  return (

    <div className="divStyle">
      <div className="home_header">
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: "bold" }}>
          All Tickets
        </Typography>
        <Button variant="contained" onClick={handleCreateTicket}  >Create Ticket</Button>
      </div>
      <ColoredLine color="grey" />

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create New Ticket</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="dialogbox-subject"
            label="Subject"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="dialogbox-message"
            label="Message"
            type="text"
            fullWidth
            variant="filled"
            maxRows={5}
            multiline
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Create</Button>
        </DialogActions>
      </Dialog>

      &nbsp;&nbsp;<Button variant="outlined">Add Filter</Button> &nbsp; &nbsp;
      <ToggleButtonGroup
        value={filterOptions}
        onChange={handleFilter}
        aria-label="text formatting"
      >
        <ToggleButton value="open" aria-label="open">
          OPEN
        </ToggleButton>
        <ToggleButton value="withdrawn" aria-label="withdrawn">
            WITHDRAWN
        </ToggleButton>
        <ToggleButton value="resolved" aria-label="resolved">
            RESOLVED
        </ToggleButton>
      </ToggleButtonGroup>
      <ColoredLine color="grey" />

      <DataGrid className="gridStyle"
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        components={{ Toolbar: GridToolbar }}
      /*checkboxSelection*/
      />
    </div>
  );
}

export default Home;