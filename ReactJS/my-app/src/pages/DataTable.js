import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import * as React from 'react'
import { useEffect } from 'react'
import handleTicketClick from './Home.js'

const DataTable = ({rows=[],columns}) => {
    

    return(
        <DataGrid className="gridStyle"
          onCellClick={handleTicketClick}
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          components={{ Toolbar: GridToolbar }}
        />
    )
}

export default DataTable