import * as React from "react";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Box,
  Button,
} from "@mui/material";

import { PartyDetails } from "../interfaces/PartyDetails";
import useAppSelector from "../hooks/useAppSelector";
import { JoinInput } from "../interfaces/JoinInput";
import { joinParty } from "../slices/join";

const PartyDescriptionTable: React.FC<PartyDetails> = (props) => {
  const router = useRouter();
  const { userData, token } = useAppSelector((state) => state.auth);

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
              router.push(`/party/me`);
            }
          });
        }
      }
    });
  };

  return (
    <Box pt={3}>
      <Table aria-label="party-details-table">
        <TableBody>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell component="th" scope="row">
              <b>ชื่อปาร์ตี้</b>
            </TableCell>
            <TableCell align="left"> {props.name}</TableCell>
          </TableRow>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell component="th" scope="row">
              <b>วันที่จัด</b>
            </TableCell>
            <TableCell align="left"> {props.date}</TableCell>
          </TableRow>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell component="th" scope="row">
              <b>จำนวนที่ว่าง</b>
            </TableCell>
            <TableCell align="left"> {props.amount} คน</TableCell>
          </TableRow>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell component="th" scope="row">
              <b>รายละเอียดเพิ่มเติม</b>
            </TableCell>
            <TableCell align="left"> {props.description}</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      {userData && (
        <Button
          type="button"
          fullWidth
          variant="contained"
          sx={{ mt: 2, mb: 2 }}
          onClick={() => {
            handleJoinParty(props._id);
          }}
          disabled={userData.email === props.organizer}
        >
          {userData.email === props.organizer
            ? "คุณเป็นผู้จัดปาร์ตี้นี้"
            : "เข้าร่วมปาร์ตี้"}
        </Button>
      )}
    </Box>
  );
};

export default PartyDescriptionTable;
