import * as React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import {
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  Snackbar,
  Alert,
} from "@mui/material";
import Copyright from "../../components/Copyright";

import useAppSelector from "../../hooks/useAppSelector";
import useAppDispatch from "../../hooks/useAppDispatch";

import { Register } from "../../slices/register";
import { RegisterInput } from "../../interfaces/RegisterInput";

const SignUp = () => {
  const Router = useRouter();
  const dispatch = useAppDispatch();
  const { isRegister, hasError, msgError } = useAppSelector(
    (state) => state.register
  );

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [accept, setAccept] = useState<boolean>(false);

  const handleRegister = () => {
    const register_data: RegisterInput = {
      name: name,
      email: email,
      password: password,
      passwordConfirm: passwordConfirm,
    };

    dispatch(Register(register_data));
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

  useEffect(() => {
    if (msgError || msgError === undefined || hasError) {
      setOpen(true);
    }
  }, [msgError, hasError, Router]);

  useEffect(() => {
    if (isRegister) {
      Router.push("/auth/signin");
    }
  }, [Router, isRegister]);

  return (
    <>
      <Head>
        <title>Party Hub | Register</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            <b>สร้างบัญชีผู้ใช้</b>
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="ชื่อ-นามสกุล"
                  autoFocus
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="อีเมล"
                  name="email"
                  value={email}
                  autoComplete="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="รหัสผ่าน"
                  type="password"
                  id="password"
                  value={password}
                  autoComplete="new-password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  name="passwordConfirm"
                  label="ยืนยันรหัสผ่าน"
                  type="password"
                  id="passwordConfirm"
                  value={passwordConfirm}
                  autoComplete="new-passwordConfrim"
                  onChange={(e) => {
                    setPasswordConfirm(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  onChange={(e: any) => {
                    setAccept(e.target.checked);
                  }}
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="ฉันยอมรับเงื่อนไขและข้อตกลงในการใช้งาน"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!accept}
              onClick={() => {
                handleRegister();
              }}
            >
              ยืนยัน
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                  onClick={() => {
                    Router.push("/auth/signin");
                  }}
                  href="#"
                  variant="body2"
                >
                  มีสมาชิกแล้ว? เข้าสู่ระบบ
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />

        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={open}
          autoHideDuration={1500}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            {msgError ? msgError : "Something went wrong"}
          </Alert>
        </Snackbar>
      </Container>
    </>
  );
};

export default SignUp;
