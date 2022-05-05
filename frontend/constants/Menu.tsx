import HomeIcon from "@mui/icons-material/Home";
import UserIcon from "@mui/icons-material/AccountCircle";
import CelebrationIcon from "@mui/icons-material/Celebration";
import AddIcon from "@mui/icons-material/Add";

const MenuList = [
  {
    label: "หน้าแรก",
    icon: <HomeIcon />,
    href: "/",
  },
  {
    label: "ข้อมูลส่วนตัว",
    icon: <UserIcon />,
    href: "/profile",
  },
  // {
  //   label: "ปาร์ตี้ของฉัน",
  //   icon: <CelebrationIcon />,
  //   href: "/profile/party",
  // },
  {
    label: "สร้างปาร์ตี้",
    icon: <AddIcon />,
    href: "/party/create",
  },
];

export default MenuList;
