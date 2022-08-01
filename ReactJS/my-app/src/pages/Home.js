import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import { DataGrid } from '@mui/x-data-grid';
import { Avatar } from "@mui/material";
import "./Home.css";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import axios from 'axios';


const renderDetailsButton = (params) => {
  return (
    <Chip label="OPEN" />
  )
}

const renderRequester = (params) => {
  return (
    <div className="profile">
      <Avatar src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg/330px-Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg" />
      <div>
        <p className="profile_name">Mark Zuckerberg</p>
        <p>mark@facebook.com</p>
      </div>
    </div>
  )
}

const columns = [
  { field: 'requester', headerName: 'REQUESTER', flex: 1, renderCell: renderRequester },
  { field: 'title', headerName: 'TITLE', flex: 1 },
  {
    field: 'Status',
    headerName: 'STATUS',
    flex: 1,
    renderCell: renderDetailsButton,
    disableClickEventBubbling: true
  },
  { field: 'lastrequestdate', headerName: 'LAST REQUEST DATE', flex: 1 },

];


const rows = [
  { id: 1, requester: 'Dimple', title: 'new ticket', status: <Button variant="contained" Contained></Button>, lastrequestdate: '30-07-2022' },
  { id: 2, requester: 'Dimple', title: 'new ticket', status: 'open', lastrequestdate: '30-07-2022' },
  { id: 3, requester: 'Dimple', title: 'new ticket', status: 'open', lastrequestdate: '30-07-2022' },

];
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

  const baseurl = "http://localhost:8080/"

  useEffect(() => {
    axios.get(`${baseurl}getalltickets`).then(
      function(response) {
        console.log(response);
      }
    ).catch(
      function (error) {
        console.log(error)
      }
    )
  }, [])

  const [open, setOpen] = useState(false)

  const handleCreateTicket = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false);
  };

  return (

    <div className="divStyle">
      <div class="home_header">
        <p className="pStyle">All Tickets</p>
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
      <Chip label="OPEN" />


      <ColoredLine color="grey" />

      <DataGrid className="gridStyle"
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      /*checkboxSelection*/
      />
    </div>
  );
}

export default Home;