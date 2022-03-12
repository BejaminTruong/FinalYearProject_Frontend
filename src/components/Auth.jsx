import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import DateAdapter from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import enLocale from "date-fns/locale/en-US";
import DatePicker from "@mui/lab/DatePicker";
const cookies = new Cookies();
const initialState = {
  email: "",
  username: "",
  password: "",
  dateOfBirth: null,
};
const Auth = () => {
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const handleChange = async (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password, dateOfBirth } = form;
    const URL = "http://localhost:8000/auth";
    const {
      data: { token, userId, hashedPassword, email },
    } = await axios.post(`${URL}/${isSignup ? "signup" : "login"}`, {
      username,
      password,
      email: form.email,
      dateOfBirth,
    });
    cookies.set("userId", userId);
    cookies.set("token", token);
    cookies.set("email", email);
    if (isSignup) {
      cookies.set("username", username);
      cookies.set("dateOfBirth", dateOfBirth);
      cookies.set("hashedPassword", hashedPassword);
    }
    window.location.reload();
  };
  return (
    <LocalizationProvider dateAdapter={DateAdapter} locale={enLocale}>
      <Box className="auth">
        <Box
          className="form"
          component="form"
          sx={{
            bgcolor: "primary.quiteGray",
            color: "primary.light",
          }}
          onSubmit={handleSubmit}
        >
          <Typography variant="h5" sx={{ p: 0, mt: "30px", mb: "30px" }}>
            Create an account
          </Typography>
          <Grid container spacing={2} className="form_content">
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="filled"
                InputLabelProps={{
                  style: { color: "gray" },
                }}
                inputProps={{
                  style: { backgroundColor: "#23272a", color: "white" },
                }}
                name="email"
                label="EMAIL"
                onChange={handleChange}
              />
            </Grid>
            {isSignup && (
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant="filled"
                  InputLabelProps={{
                    style: { color: "gray" },
                  }}
                  inputProps={{
                    style: { backgroundColor: "#23272a", color: "white" },
                  }}
                  name="username"
                  label="USERNAME"
                  onChange={handleChange}
                />
              </Grid>
            )}
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="filled"
                InputLabelProps={{
                  style: { color: "gray" },
                }}
                inputProps={{
                  style: { backgroundColor: "#23272a", color: "white" },
                }}
                name="password"
                label="PASSWORD"
                onChange={handleChange}
              />
            </Grid>
            {isSignup && (
              <Grid item xs={12}>
                <DatePicker
                  inputFormat="dd/MM/yyyy"
                  label="DATE OF BIRTH"
                  value={form.dateOfBirth}
                  onChange={(value) =>
                    setForm({
                      ...form,
                      dateOfBirth: value.toLocaleDateString(),
                    })
                  }
                  renderInput={(params) => (
                    <TextField
                      name="dateOfBirth"
                      {...params}
                      fullWidth
                      variant="filled"
                      InputLabelProps={{
                        style: { color: "gray" },
                      }}
                      sx={{
                        input: {
                          color: "primary.light",
                          backgroundColor: "primary.dark",
                        },
                        svg: { color: "primary.light", pr: "7px" },
                      }}
                    />
                  )}
                />
              </Grid>
            )}
            <Grid item xs={12}>
              {isSignup ? (
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        sx={{
                          color: "primary.gray",
                          "&.Mui-checked": {
                            color: "button.main",
                          },
                          "& .MuiSvgIcon-root": { fontSize: 36 },
                        }}
                      />
                    }
                    label={
                      <Typography variant="h6" sx={{ fontSize: "12px" }}>
                        I have read and agree to Discord's Terms of Service and
                        Private Policy
                      </Typography>
                    }
                  />
                </FormGroup>
              ) : (
                <Typography
                  variant="h6"
                  sx={{
                    "&.MuiTypography-h6": {
                      fontSize: "12px",
                      color: "button.blue",
                    },
                  }}
                >
                  Forgot your password?
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <Button
                component="button"
                variant="contained"
                type="submit"
                sx={{
                  width: "100%",
                  bgcolor: "button.dark",
                  py: "10px",
                  ":hover": { bgcolor: "#5865F2" },
                }}
              >
                Continue
              </Button>
            </Grid>
            <Grid item>
              <Typography
                onClick={() => {
                  setIsSignup((prevState) => !prevState);
                }}
                variant="button"
                color="#00AFF4"
                sx={{ fontSize: "12px", cursor: "pointer" }}
              >
                {isSignup
                  ? "Already have an account?"
                  : "Need an account? Register"}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default Auth;
