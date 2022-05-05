import { useState, useEffect } from "react";
import Head from "next/head";
import { Typography, CssBaseline, Box, Container } from "@mui/material";
import useAppSelector from "../hooks/useAppSelector";

const Profile = () => {
  const [profile, setProfile] = useState<any>();
  const { userData } = useAppSelector((state) => state.auth);

  useEffect(() => {
    setProfile(userData);
  }, [userData]);

  console.log(profile);

  return (
    <>
      <Head>
        <title>Party Hub</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Typography align="center" pb={4} pt={10} variant="h4" component="h4">
        ข้อมูลส่วนตัว
      </Typography>

      <Container component="main" maxWidth="xs">
        <CssBaseline />

        <Box style={{ padding: 40 }}>
          {profile && (
            <>
              <Typography>
                <b> ชื่อ: </b>
                {profile.name}
              </Typography>
              <Typography>
                <b>อีเมล:</b> {profile.email}
              </Typography>
            </>
          )}
        </Box>
      </Container>
    </>
  );
};

export default Profile;
