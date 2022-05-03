import { useState, useEffect } from "react";
import Image from "next/image";
import Head from "next/head";
import useAppSelector from "../hooks/useAppSelector";

import axios from "axios";
import Header from "next/head";

import { Heading, Box, Text, Container, Divider } from "@chakra-ui/react";

interface Profile {
  userId: string;
  pictureUrl: string;
  displayName: string;
}
const Home = () => {
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
      <Container style={{ paddingTop: 20 }} maxW="container.xl">
        <Heading>My Profile</Heading>
        <Divider style={{ paddingTop: 20 }}></Divider>

        <Box style={{ padding: 40 }}>
          {profile && (
            <>
              <Text>
                ชื่อ:
                {profile.name}
              </Text>
              <Text>อีเมล: {profile.email}</Text>
            </>
          )}
        </Box>
      </Container>
    </>
  );
};

export default Home;
