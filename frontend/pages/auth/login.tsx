import { useEffect, useState } from "react";
import useAppSelector from "../../hooks/useAppSelector";
import useAppDispatch from "../../hooks/useAppDispatch";

import { Credential } from "../../interfaces/Credential";
import { Login } from "../../slices/auth";
import { useRouter } from "next/router";

import Head from "next/head";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Party Hub
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const Signin = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useAppDispatch();
  const { loading, isLogin, token } = useAppSelector((state) => state.auth);
  const Router = useRouter();

  //   const login = () => {
  //     const credential: Credential = {
  //       username: username,
  //       password: password,
  //     };
  //     dispatch(Login(credential));
  //   };

  //   useEffect(() => {
  //     if (!loading && isLogin && token) {
  //       localStorage.setItem("_token", token);
  //       Router.push("/");
  //     }
  //   }, [loading, isLogin, Router, token]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <>
      <Head>
        <title>Party Hub | Login</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h1">🥳</Typography>
            <Typography component="h1" variant="h5">
              <b>Party Hub</b>
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="อีเมล"
                name="email"
                autoComplete="email"
                autoFocus
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
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                เข้าสู่ระบบ
              </Button>
              <Button
                type="submit"
                fullWidth
                variant="outlined"
                sx={{ mt: 1, mb: 2 }}
              >
                สร้างบัญชีผู้ใช้
              </Button>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    </>
  );
};

export default Signin;
