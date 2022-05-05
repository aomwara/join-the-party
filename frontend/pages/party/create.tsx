import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  Button,
  CssBaseline,
  TextField,
  Box,
  Typography,
  Container,
  Snackbar,
  Alert,
  Grid,
} from "@mui/material";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import useAppSelector from "../../hooks/useAppSelector";
import { CreatePartyInput } from "../../interfaces/CreatePartyInput";

import { createParty } from "../../slices/party";
import Swal from "sweetalert2";

const CreateParty = () => {
  const Router = useRouter();
  const { token } = useAppSelector((state) => state.auth);
  const [name, setName] = useState<string>("");
  const [amount, setAmount] = useState<number>();
  const [date, setDate] = useState<string | null>(null);
  const [image, setImage] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const [open, setOpen] = useState<boolean>(false);
  const [errorMsg, setMsgError] = useState<string>("");

  const handleCreateParty = async () => {
    if (name && amount && date && description) {
      const party: CreatePartyInput = {
        name: name,
        amount: amount,
        date: date,
        description: description,
        image: image,
        token: token,
      };

      const resp = await createParty(party);
      console.log(resp);
      if (resp) {
        Swal.fire("สร้างปาร์ตี้สำเร็จ!", "", "success").then(() => {
          Router.push(`/party/id/${resp._id}`);
        });
      }
    } else {
      setMsgError("Please fill all the fields");
      setOpen(true);
    }
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const padTo2Digits = (num: number) => {
    return num.toString().padStart(2, "0");
  };

  const formatDate = (date: Date) => {
    return [
      padTo2Digits(date.getDate()),
      padTo2Digits(date.getMonth() + 1),
      date.getFullYear(),
    ].join("/");
  };

  return (
    <>
      <Head>
        <title>Party Hub | สร้างปาร์ตี้</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Typography align="center" pb={4} pt={10} variant="h4" component="h4">
        สร้างปาร์ตี้
      </Typography>

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                fullWidth
                id="name"
                label="ชื่อปาร์ตี้"
                name="name"
                autoComplete="name"
                autoFocus
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </Grid>

            <Grid item xs={4} sm={4}>
              <TextField
                type="number"
                required
                fullWidth
                id="amount"
                label="จำนวนคน"
                name="amount"
                autoComplete="amount"
                value={amount}
                onChange={(e) => {
                  setAmount(parseInt(e.target.value));
                }}
              />
            </Grid>

            <Grid item xs={8} sm={8}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="วันที่จัดปาร์ตี้"
                  value={date}
                  onChange={(newDate) => {
                    if (newDate) {
                      const _date: string = formatDate(new Date(newDate));
                      setDate(_date);
                    }
                  }}
                  renderInput={(params) => <TextField fullWidth {...params} />}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} sm={12}>
              <TextField
                type="link"
                required
                fullWidth
                id="image"
                label="ลิงก์รูป"
                name="image"
                autoComplete="image"
                value={image}
                onChange={(e) => {
                  setImage(e.target.value);
                }}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <TextField
                type="text"
                multiline
                required
                fullWidth
                rows={2}
                maxRows={4}
                id="description"
                label="รายละเอียดปาร์ตี้"
                name="description"
                autoComplete="description"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleCreateParty}
          >
            สร้างปาร์ตี้
          </Button>
        </Box>
      </Container>

      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={open}
        autoHideDuration={1500}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {errorMsg ? errorMsg : "Something went wrong"}
        </Alert>
      </Snackbar>
    </>
  );
};

export default CreateParty;
