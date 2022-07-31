import React from "react";
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import { DataGrid } from '@mui/x-data-grid';

const renderDetailsButton = (params) => {
        return (
           <Chip label="OPEN" />
        )
    }

const columns = [
  { field: 'requester', headerName: 'Requester', width: 130 },
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
            <h3>&nbsp;&nbsp;&nbsp;All Tickets</h3>
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