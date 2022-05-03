import Head from "next/head";
import Link from "next/link";
import useAppSelector from "../hooks/useAppSelector";
import {
  Button,
  CssBaseline,
  TextField,
  Box,
  Typography,
  Container,
} from "@mui/material";

const content = [
  {
    id: 1,
    title: "NextGen Profile",
    to: "profile",
  },
  {
    id: 2,
    title: "ใบสมัครของฉัน",
    to: "application",
  },
  {
    id: 3,
    title: "My Application",
    to: "application",
  },
];

const Home = () => {
  return (
    <>
      <Head>
        <title>Party Hub!</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Link href="/profile" passHref>
        <Button style={{ height: 120 }}>My Profile</Button>
      </Link>
      <Link href="/party/my" passHref>
        <Button style={{ height: 120 }}>My Party</Button>
      </Link>
      <Link href="/party/join" passHref>
        <Button style={{ height: 120 }}>Join Party</Button>
      </Link>
    </>
  );
};

export default Home;
