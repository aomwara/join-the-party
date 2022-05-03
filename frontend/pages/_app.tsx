import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { Provider as ReduxProvider } from "react-redux";
import { AuthProvider } from "../contexts/AuthContext";
import Navbar from "../components/Navbar";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import store from "../store";
const theme = createTheme();

const App: React.FC<any> = ({ Component, pageProps }) => {
  const Router = useRouter();
  //Define Unprotected Routes
  const unProtectedRoutes = ["/auth/signin", "/auth/signup"];

  if (unProtectedRoutes.includes(Router.pathname)) {
    return (
      <ReduxProvider store={store}>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </ReduxProvider>
    );
  } else {
    return (
      <ReduxProvider store={store}>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <Navbar>
              <Component {...pageProps} />
            </Navbar>
          </ThemeProvider>
        </AuthProvider>
      </ReduxProvider>
    );
  }
};
export default App;
