import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import Card from "@material-ui/core/Card";
import { CardContent } from "@material-ui/core";
import { maxWidth } from "@mui/system";
import { useGlobalContext } from "../../context/GlobalContext";
import { useNavigate } from "react-router-dom";

const columns = [
  { field: "title", headerName: "Ticket Title", width: 150 },
  { field: "description", headrName: "Ticket Description", width: 400 },
  { field: "severity", headerName: "Ticket Sevrity", width: 300 },
  { field: "date", headerName: "Ticket Date", width: 110 },
];

const TicketChart = () => {
  const [tableData, setTableData] = useState([]);
  const { ticketComplete, ticketIncomplete } = useGlobalContext();
  const navigate = useNavigate();

  React.useEffect(() => {
    axios.get("api/ticket/current").then((res) => {
      setTableData(res.data.complete);
    });
  });

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
          onSelectionModelChange={(itm) =>
            axios.put(`/api/ticket/${itm}/incomplete`).then((res) => {
              ticketIncomplete(res.data);
              const confirmBox = window.confirm(
                "Are you sure you want to mark this ticket as Incomplete"
              );
              navigate("/myTickets");
            })
          }
        />
      </CardContent>
    </Card>
  );
};

export default TicketChart;
