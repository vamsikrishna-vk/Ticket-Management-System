import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Avatar, Paper, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import "./Home.css";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
//import tickets from '../data/ticketsList.json'
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { Container } from "@mui/system";
import DataTable from "./DataTable";

class ticketObject {
  constructor(id, ticketId, userId, title, status, withdrawnTimeStamp) {
    this.id = id
    this.ticketId = ticketId
    this.userId = userId
    this.title = title
    this.status = status
    this.withdrawnTimeStamp = withdrawnTimeStamp
  }
}

/*const columns = [
  { field: 'ticketId', headerName: 'REQUESTER', flex: 1 },
  { field: 'title', headerName: 'SUBJECT', flex: 1 },
  {
    field: 'status',
    headerName: 'STATUS',
    flex: 1,
    disableClickEventBubbling: true
  },
  { field: 'withdrawnTimeStamp', headerName: 'LAST REQUEST DATE', flex: 1 },

];*/

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
export function handleUserLogout(props) {
  console.log("user Logged out")
} 
//const ticketObjArray = rows

function ColoredLine({ color }) {
  return (
    <hr
      style={{
        color,
        backgroundColor: color,
        height: 0.5
      }} />
  );
}

axios.defaults.withCredentials = 'true';
axios.defaults.crossDomain = 'true';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['withCredentials'] = 'true';

const Home = () => {

  const [cookies, setCookie, removeCookie] = useCookies(['XSRF-TOKEN']);
  console.log(document.cookie);
  const baseurl = "http://localhost:8080/"
  const [role, setRole] = useState("")
  const [tickets, setTickets] = useState([])
  const [user, setUser] = useState()

  const columns = [
    { field: 'userId', headerName: 'REQUESTER', flex: 1 },
    { field: 'title', headerName: 'SUBJECT', flex: 1 },
    {
      field: 'status',
      headerName: 'STATUS',
      flex: 1,
      disableClickEventBubbling: true
    },
    { field: 'withdrawnTimeStamp', headerName: 'LAST REQUEST DATE', flex: 1 },

  ];

  useEffect(() => {
    axios.get(`${baseurl}getuserdetails`).then((response) => {
      console.log(response)
      setUser(response.data)
      setRole(response.data.role)
    }).catch((err) => {
      if(err.status !== 200)
      {axios.post(`${baseurl}setuserdetails`, {}).then((response) => {
        console.log(response)
        setUser(response.data)
      }).catch((err) => console.log(err))
      console.log(err)}
    })
  }, [])


  useEffect(() => {
    if(role === 'admin')
      {
        axios.get(`${baseurl}getalltickets`, {
        }).then(
          function (response) {
            /*setTickets(response.data.map((ticket, index) =>
              new ticketObject(index, ticket.ticketId, ticket.userID, ticket.title, ticket.status, ticket.withdrawnTimeStamp)
            ))*/
            const rowObjects = response.data.map((ticket, index) =>
              new ticketObject(index, ticket.ticketId, ticket.userId, ticket.title, ticket.status, ticket.openedTimeStamp)
            )
            setTickets(rowObjects)
            console.log("im not inside error")
            if (response.status === 401)
              window.open(`http://localhost:8080/oauth2/authorization/google`, "_self")
          }
        ).catch(
          function (error) {
            console.log(error)
            console.log("im inside error")
            if (error.response.status === 401) {
              console.log(error.response.status)
              console.log(window.open(`http://localhost:8080/oauth2/authorization/google`, "_self"))
            }
          }
        )
      }else {
        axios.get(`${baseurl}getUserTickets`, {
        }).then(
          function (response) {
            /*setTickets(response.data.map((ticket, index) =>
              new ticketObject(index, ticket.ticketId, ticket.userID, ticket.title, ticket.status, ticket.withdrawnTimeStamp)
            ))*/
            const rowObjects = response.data.map((ticket, index) =>
              new ticketObject(index, ticket.ticketId, ticket.userId, ticket.title, ticket.status, ticket.openedTimeStamp)
            )
            setTickets(rowObjects)
            console.log("im not inside error")
            if (response.status === 401)
              window.open(`http://localhost:8080/oauth2/authorization/google`,"_self")
          }
        ).catch(
          function (error) {
            console.log(error)
            console.log("im inside error")
            if (error.response.status === 401) {
              console.log(error.response.status)
              console.log(window.open(`http://localhost:8080/oauth2/authorization/google`,"_self"))
            }
          }
        )
      }
    console.log('i fire once')
  }, [role])


  const navigate = useNavigate();

  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState("")

  const handleCreateTicket = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleNewTicketSubjectChange = (event) => {
    setTitle(event.target.value)
  }

  const handleCreateButton = () => {
    const postObject = JSON.stringify({ "title": title })
    console.log(postObject)
    axios.post(`${baseurl}createticket`, postObject, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(
      (response) => {
        console.log(response)
      }
    ).catch(
      (error) => {
        console.log(error)
      }
    )
    handleClose()
  }

  //const [filterOptions, setFilterOptions] = React.useState(() => ['open', 'withdrawn', 'resolved']);

  // const handleFilter = (event, newFormats) => {
  //   setFilterOptions(newFormats);
  // };

  // const filter = () => {
  //   console.log(filterOptions)
  //   rows = ticketObjArray.filter((ticket) => {
  //     return filterOptions.includes(ticket.status.toLowerCase())
  //   })
  //   console.log(rows)
  // }
  //useEffect(filter, [filterOptions])



  const handleTicketClick = (props) => {
    console.log(props)
    navigate(`../conversation/${props.row.ticketId}/${user.userId}/${props.row.status}/${props.row.title}/${props.row.withdrawnTimeStamp}/${role}`)
  }

  


  return (

    <Container>
      <div className="divStyle">
        <div className="home_header">
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            All Tickets
          </Typography>
          {role==='user' ? <Button variant="contained" onClick={handleCreateTicket}  >Create Ticket</Button> : null}
        </div>
        <ColoredLine color="grey" />

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Create New Ticket</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              onChange={handleNewTicketSubjectChange}
              margin="dense"
              id="dialogbox-subject"
              label="Subject"
              type="text"
              fullWidth
              variant="standard"
            />
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleCreateButton}>Create</Button>
          </DialogActions>
        </Dialog>

        {/*&nbsp;&nbsp;<Button variant="outlined">Add Filter</Button> &nbsp; &nbsp;
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
  <ColoredLine color="grey" />–– */}

        <DataGrid className="gridStyle"
          onCellClick={handleTicketClick}
          rows={tickets}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          components={{ Toolbar: GridToolbar }}
        />
      </div>
    </Container>
  );
}

export default Home;