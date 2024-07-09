import { styled } from "@mui/material";

const DrawerHeader = () => {
  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  }));
  return <DrawerHeader />;
};

export default DrawerHeader;
