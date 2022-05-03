import type { AppProps } from "next/app";
import { Provider as ReduxProvider } from "react-redux";
import { AuthProvider } from "../contexts/AuthContext";
import store from "../store";

import { useRouter } from "next/router";

const App: React.FC<any> = ({ Component, pageProps }) => {
  const Router = useRouter();
  //Define Unprotected Routes
  const unProtectedRoutes = ["/auth/signin", "/auth/signup"];

  if (unProtectedRoutes.includes(Router.pathname)) {
    return (
      <ReduxProvider store={store}>
        <Component {...pageProps} />
      </ReduxProvider>
    );
  } else {
    return (
      <ReduxProvider store={store}>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </ReduxProvider>
    );
  }
};
export default App;
