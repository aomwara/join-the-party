import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { Typography, Container, CardMedia } from "@mui/material";

import useAppSelector from "../../../hooks/useAppSelector";
import { getPartyById } from "../../../slices/party";
import { Party } from "../../../interfaces/Party";
import PartyDescriptionTable from "../../../components/PartyDescriptionTable";

const PartyByID = () => {
  const router = useRouter();
  const { id } = router.query;
  const { token, userData } = useAppSelector((state) => state.auth);

  const [party, setParty] = useState<Party>();
  const partyID = id as string;

  const handleGetPartyById = useCallback(async () => {
    const party: Party | undefined = await getPartyById(partyID, token);
    if (party) {
      setParty(party);
    }
  }, [partyID, token]);

  useEffect(() => {
    if (token && id) {
      handleGetPartyById();
    }
  }, [handleGetPartyById, id, token]);

  return (
    <>
      <Head>
        <title>Party Hub | Party</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Container component="main" maxWidth="sm">
        {party && (
          <>
            <Typography
              align="center"
              pb={4}
              pt={5}
              variant="h4"
              component="h4"
            >
              {party.name}
            </Typography>
            <CardMedia
              style={{
                borderRadius: "15px",
                boxShadow:
                  "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
              }}
              component="img"
              height={250}
              image={party.image}
              alt={party.name}
            />
            <PartyDescriptionTable
              _id={party._id}
              name={party.name}
              description={party.description}
              amount={party.amount}
              date={party.date}
              organizer={party.organizer}
            />
          </>
        )}
      </Container>
    </>
  );
};

export default PartyByID;
