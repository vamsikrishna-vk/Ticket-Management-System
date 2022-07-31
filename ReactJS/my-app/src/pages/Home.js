import React from "react";
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import { DataGrid } from '@mui/x-data-grid';
import { Avatar } from "@mui/material";
import "./Home.css";

const renderDetailsButton = (params) => {
        return (
           <Chip label="OPEN" />    
        )
    }

const renderRequester = (params) => {
    return (
        <div className="profile">
            <Avatar src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg/330px-Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg"/>
            <div>
                <p className="profile_name">Mark Zuckerberg</p>
                <p>mark@facebook.com</p>
            </div>
        </div>
    )
}

const columns = [
  { field: 'requester', headerName: 'Requester', width: 250, renderCell: renderRequester},
  { field: 'title', headerName: 'Title', width: 130 },
  { field: 'Satus',
        headerName: 'Status',
        width: 150,
        renderCell: renderDetailsButton,
        disableClickEventBubbling: true},
  { field: 'lastrequestdate', headerName: 'Last Request Date', width: 140 },

];


const rows = [
  { id: 1, requester: 'Dimple', title: 'new ticket', status: <Button variant="contained"Contained></Button>, lastrequestdate : '30-07-2022' },
  { id: 2, requester: 'Dimple', title: 'new ticket', status: 'open', lastrequestdate : '30-07-2022' },
  { id: 3, requester: 'Dimple', title: 'new ticket', status: 'open', lastrequestdate : '30-07-2022' },
  
];
const ColoredLine = ({ color }) => (
  <hr
    style={{
      color,
      backgroundColor: color,
      height: 1
    }}
  />
);
function Home() {
    return (
        
        <div style={{ height: 400, width: '100%' }} className = "divStyle">
            <div class="home_header">
                <h3>All Tickets</h3>
                <Button variant="contained" size="small" >Create Ticket</Button>
                
            </div>
            <ColoredLine color="grey" />
           
              
            &nbsp;&nbsp;<Button variant="outlined">Add Filter</Button> &nbsp; &nbsp;
              <Chip label="OPEN" />
            
         
          <ColoredLine color="grey" /> 
             
      <DataGrid className = "gridStyle"
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
    );
}

export default Home;