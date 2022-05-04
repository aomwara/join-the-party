import * as React from "react";
import { useState, useCallback, useEffect } from "react";
import Head from "next/head";

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Button,
  CardActionArea,
  CardActions,
} from "@mui/material";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import { Party } from "../interfaces/Party";
import { getAllParty } from "../slices/party";

import useAppSelector from "../hooks/useAppSelector";

const Home = () => {
  const { token } = useAppSelector((state) => state.auth);
  const [parties, setParties] = useState<Party[]>();

  const getParties = useCallback(async () => {
    const parties = await getAllParty(token);
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
      <Button variant="contained" startIcon={<AddCircleOutlineIcon />}>
        สร้างปาร์ตี้
      </Button>

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
                <CardContent>
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
              <CardActions>
                <Button size="small" color="primary">
                  เข้าร่วม
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Home;
