import * as React from "react";
import { useState, useCallback, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  CardActionArea,
} from "@mui/material";

import { Party } from "../../interfaces/Party";
import { getMeJoin } from "../../slices/join";

import useAppSelector from "../../hooks/useAppSelector";
const PartyMe = () => {
  const Router = useRouter();
  const { token } = useAppSelector((state) => state.auth);
  const [parties, setParties] = useState<Party[]>();

  const getParties = useCallback(async () => {
    const parties = await getMeJoin(token);
    setParties(parties);
  }, [token]);

  useEffect(() => {
    if (token) {
      getParties();
    }
  }, [getParties, token]);

  return (
    <>
      <Head>
        <title>Party Hub!</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Typography variant="h4" pb={3}>
        ปาร์ตี้ที่ฉันเข้าร่วม
      </Typography>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {parties?.map((party: Party, index) => (
          <Grid item xs={4} sm={4} md={4} key={index}>
            <Card>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={party.image}
                  alt={party.name}
                />
                <CardContent
                  onClick={() => {
                    Router.push(`/party/id/${party._id}`);
                  }}
                >
                  <Typography gutterBottom variant="h5" component="div">
                    {party.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {party.description}
                  </Typography>
                  <Typography
                    style={{ textAlign: "left", marginTop: "10px" }}
                    variant="subtitle2"
                    color="text.primary"
                  >
                    ยังขาดอีก {party.amount} คน
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default PartyMe;
