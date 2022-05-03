import { Typography, Link } from "@mui/material";

const Copyright = (props: any) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Party Hub
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};
export default Copyright;
