import { useEffect, useState } from "react";
import useAppSelector from "../../hooks/useAppSelector";
import useAppDispatch from "../../hooks/useAppDispatch";

import { Credential } from "../../interfaces/Credential";
import { Login } from "../../slices/auth";
import { useRouter } from "next/router";

import Head from "next/head";
import {
  Button,
  CssBaseline,
  TextField,
  Box,
  Typography,
  Container,
  Snackbar,
  Alert,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Copyright from "../../components/Copyright";
import LinkNext from "next/link";

const theme = createTheme();

const Signin = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { loading, isLogin, token, hasError, msgError } = useAppSelector(
    (state) => state.auth
  );
  const Router = useRouter();

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const login = () => {
    const credential: Credential = {
      email: username,
      password: password,
    };
    dispatch(Login(credential));
  };

  useEffect(() => {
    if (!loading && isLogin && token) {
      localStorage.setItem("_token", token);
      Router.push("/");
    }
  }, [loading, isLogin, Router, token]);

  useEffect(() => {
    if (msgError || msgError === undefined || hasError) {
      setOpen(true);
    }
  }, [msgError, hasError]);

  return (
    <>
      <Head>
        <title>Party Hub!</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
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
            <Typography variant="h2">🥳</Typography>
            <Typography component="h1" variant="h5">
              <b>Party Hub</b>
            </Typography>
            <Box sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="อีเมล"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="รหัสผ่าน"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={login}
              >
                เข้าสู่ระบบ
              </Button>
              <LinkNext href="/auth/signup" passHref>
                <Button
                  type="button"
                  fullWidth
                  variant="outlined"
                  sx={{ mt: 1, mb: 2 }}
                >
                  สร้างบัญชีผู้ใช้
                </Button>
              </LinkNext>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
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
      </ThemeProvider>
    </>
  );
};

export default Signin;
