import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import Card from "@material-ui/core/Card";
import { CardContent, Checkbox } from "@material-ui/core";
import { maxWidth } from "@mui/system";
import { Button } from "@mui/material";
import { useGlobalContext } from "../../context/GlobalContext";
import { useNavigate } from "react-router-dom";

const TicketChart = (props) => {
  const [tableData, setTableData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const { ticketComplete, ticketIncomplete } = useGlobalContext();
  const [selectedRows, setSelectedRows] = React.useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    getTable();
  }, []);

  const getTable = () => {
    axios.get("/api/ticket/current").then((res) => {
      setTableData(res.data.incomplete);
    });
  };

 

  const columns = [
    { field: "title", headerName: "Ticket Title", width: 150 },
    { field: "description", headrName: "Ticket Description", width: 500 },
    { field: "severity", headerName: "Ticket Sevrity", width: 300 },
    { field: "date", headerName: "Ticket Date", width: 110 },
  ];

  return (
    <Card
      style={{
        marginTop: 10,
        marginLeft: 250,
        minHeight: 400,
        marginRight: 50,
      }}
    >
      <CardContent>
        <DataGrid
          rows={tableData}
          columns={columns}
          pageSize={50}
          getRowId={(row) => row._id}
          style={{
            minHeight: 560,
            backgroundColor: "#3f51b5",
            color: "white",
          }}
          checkboxSelection
          onSelectionModelChange={itm => 
            axios.put(`/api/ticket/${itm}/complete`).then((res) => {
              ticketComplete(res.data);
              const confirmBox = window.confirm('Are you sure you want to mark this ticket as complete')
              navigate('/completedTickets')
            })
         
          }
        />
      </CardContent>
    </Card>
  );
};

export default TicketChart;
