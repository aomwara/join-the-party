import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider as ReduxProvider } from "react-redux";
import { useRouter } from "next/router";
import store from "../store";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const Router = useRouter();

  if (Router.pathname === "/auth/login") {
    return (
      <ReduxProvider store={store}>
        {/* <Navbar /> */}
        <Component {...pageProps} />
      </ReduxProvider>
    );
  } else {
    return (
      <ReduxProvider store={store}>
        {/* <AuthProvider> */}
        {/* <Navbar /> */}
        <Component {...pageProps} />
        {/* </AuthProvider> */}
      </ReduxProvider>
    );
  }
};
export default App;
