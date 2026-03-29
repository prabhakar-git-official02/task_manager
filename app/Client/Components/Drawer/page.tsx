"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch ,useSelector} from "react-redux";
import { authGetThunk } from "../../Thunks/authGetThunk/thunk";
import { AppDispatch } from "../../Redux/store/reduxStore/store";
import { Divider } from "@mui/material";
import AddBoxIcon from '@mui/icons-material/AddBox';
import EditNoteIcon from '@mui/icons-material/EditNote';
import PageviewIcon from '@mui/icons-material/Pageview';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { RootState } from "../../Redux/store/reduxStore/store";


interface props {
  visible: boolean,
  hide: (value: boolean) => void
}
function Drawer({ visible, hide }:props){
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>();

  const toggleDrawer = (newOpen : boolean) => () => {
    hide(newOpen);
  };

  useEffect(() => {
    dispatch(authGetThunk());
  }, [dispatch]);

    const user = useSelector((state:RootState) => state.auth.user);
    const name = user?.email?.split("@")[0] ?? "User";
    console.log(name);

      const DrawerList = (
    <>
      <Box
        sx={{ width: 250 }}
        role="presentation"
        onClick={toggleDrawer(false)}
        className="smooth"
        style={{ transition: `0.3s ease` }}
      >
        <div className="d-flex justify-content-center mt-4">
          <div>
          <div
           style={{
            width:"100px",
            height : "100px",
            background:"#396f80",
            color : "white",
            borderRadius : "50%",
            }} 
            className="d-flex justify-content-center  align-items-center"
            ><h1>{name?.charAt(0).toUpperCase()}</h1></div>
          <h5 className="mt-3 text-center">{name}</h5>
          </div>
        </div>
        <List onClick={() => router.push("/")}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon className="text-dark">
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary={`Home`} />
            </ListItemButton>
          </ListItem>
        </List>

         <List onClick={() => router.push("/Client/Protected/AddTask")}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon className="text-dark">
                <AddBoxIcon/>
              </ListItemIcon>
              <ListItemText primary={`Add Task`} />
            </ListItemButton>
          </ListItem>
        </List>

            <List onClick={() => router.push("/Client/Protected/ManageTasks")}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon className="text-dark">
                <EditNoteIcon/>
              </ListItemIcon>
              <ListItemText primary={`Manage Tasks`} />
            </ListItemButton>
          </ListItem>
        </List>

                 <List onClick={() => router.push("/Client/Protected/ViewTasks")}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon className="text-dark">
                <PageviewIcon/>
              </ListItemIcon>
              <ListItemText primary={`View Tasks`} />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider/>
                 <List onClick={() => router.push("/Client/Setting/Account")}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon className="text-dark">
                <ManageAccountsIcon/>
              </ListItemIcon>
              <ListItemText primary={`Account`} />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </>
  );
  return (
    <div>
      <MuiDrawer open={visible} onClose={toggleDrawer(false)}>
        {DrawerList}
      </MuiDrawer>


    </div>
  );
}

export default Drawer