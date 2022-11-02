import axios from "axios";
import React from "react";
import { useState } from "react";
import { useGlobalContext } from "../../context/GlobalContext";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import {
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  Typography,
} from "@material-ui/core";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import { borderRadius } from "@mui/system";
import dayjs from "dayjs";
import Stack from "@mui/material/Stack";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

const NewTicketForm = () => {
  const { addTicket } = useGlobalContext();
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [severity, setSeverity] = React.useState("");
  const [date, setDate] = React.useState(dayjs("2022-01-01"));
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState({});
  const navigate = useNavigate();
  const [change, setChange] = React.useState(false);

  React.useEffect(()=> {
    if(change){
      navigate('/dashboard')
    }
  })
  const handleChange = (newValue) => {
    setDate(newValue);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading();

    let data = {};

    data = {
      title,
      description,
      severity,
      date,
    };
    axios
      .post("/api/ticket/new", data)
      .then(() => {
        addTicket(data);
        setChange(true);
        
      })
      .catch((err) => {
        setLoading(false);

        if (err?.response?.data) {
          setErrors(err.response.data);
        }
      });

      if(change) {
      navigate("/dashboard");
     }
  };

  return (
    <div>
      <Grid>
        <Card
          style={{
            maxWidth: 550,
            minHeight: 600,
            padding: "20px 5px",
            marginTop: 120,
            marginLeft: 600,
            borderRadius: "25px",
          }}
        >
          <CardContent>
            <Typography gutterBottom variant="h2" align="center">
              New Ticket
            </Typography>

            <form autoComplete="off" >
              <Grid container spacing={8} direction="column">
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    label="Ticket Title"
                    name="title"
                    fullWidth
                    required
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  {errors.title && <Typography>{errors.title}</Typography>}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    label="Ticket Description"
                    name="email"
                    fullWidth
                    required
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  {errors.description && (
                    <Typography>{errors.description}</Typography>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="select-severity">
                      Ticket Severity
                    </InputLabel>
                    <Select
                      labelId="select-severity"
                      id="severity"
                      label="Ticket Severity"
                      value={severity}
                      onChange={(e) => setSeverity(e.target.value)}
                    >
                      <MenuItem value="low">Low</MenuItem>
                      <MenuItem value="Medium">Medium</MenuItem>
                      <MenuItem value="High">High</MenuItem>
                      <MenuItem value="Urgent">Urgent</MenuItem>
                    </Select>
                  </FormControl>
                  {errors.severity && (
                    <Typography>{errors.severity}</Typography>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Stack spacing={3}>
                      <DesktopDatePicker
                        label="Date"
                        inputFormat="MM/DD/YYYY"
                        value={date}
                        onChange={handleChange}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </Stack>
                  </LocalizationProvider>
                  
                  {errors.date && <Typography>{errors.date}</Typography>}
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                    style={{ borderRadius: "10px", textTransform: "none" }}
                    onClick={onSubmit}
                  >
                    Submit
                  </Button>
                </Grid>
                {Object.keys(errors).length > 0 && (
                  <Typography
                    gutterBottom
                    variant="h6"
                    style={{ color: "red" }}
                    align="center"
                  >
                    There was a problem with your ticket entry
                  </Typography>
                )}
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
};

export default NewTicketForm;
