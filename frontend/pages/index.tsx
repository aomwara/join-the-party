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
  Button,
  CardActionArea,
  CardActions,
} from "@mui/material";

import { Party } from "../interfaces/Party";
import { getAllParty } from "../slices/party";

import useAppSelector from "../hooks/useAppSelector";
import { joinParty } from "../slices/join";
import { JoinInput } from "../interfaces/JoinInput";

const Home = () => {
  const Router = useRouter();
  const { token, userData } = useAppSelector((state) => state.auth);
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

  const handleJoinParty = async (_id: string) => {
    Swal.fire({
      title: "คุณต้องการเข้าร่วมปาร์ตี้นี้ใช่หรือไม่",
      showDenyButton: true,
      confirmButtonText: "เข้าร่วม",
      denyButtonText: `ขอคิดอีกที`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const joinInput: JoinInput = {
          partyID: _id,
          token: token,
        };

        const resp = await joinParty(joinInput);
        if (resp && resp.status === "success") {
          Swal.fire("เข้าร่วมสำเร็จ", "", "success");
        } else {
          Swal.fire({
            title: "คุณเข้าร่วมปาร์ตี้นี้แล้ว",
            showCancelButton: true,
            confirmButtonText: "ดูปาร์ตี้ที่เข้าร่วม",
            cancelButtonText: "ปิด",
          }).then((result) => {
            if (result.isConfirmed) {
              Router.push(`/party/me`);
            }
          });
        }
      }
    });
  };

  return (
    <>
      <Head>
        <title>Party Hub!</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

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
              <CardActions>
                {userData && (
                  <Button
                    onClick={() => {
                      handleJoinParty(party._id);
                    }}
                    type="button"
                    variant="contained"
                    fullWidth
                    disabled={userData.email === party.organizer}
                  >
                    {userData.email === party.organizer
                      ? "คุณเป็นผู้จัด"
                      : "เข้าร่วม"}
                  </Button>
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Home;
