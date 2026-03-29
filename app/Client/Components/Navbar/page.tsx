"use client"
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authGetThunk } from '../../Thunks/authGetThunk/thunk';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { AppDispatch ,RootState} from '../../Redux/store/reduxStore/store';
import Drawer from '../Drawer/page';
interface propsType {
    Navbg? : string,
    Iconbg? : string,
    textColor? : string
}

export default function Navbar({Navbg,textColor}:propsType) {

    const dispatch = useDispatch<AppDispatch>()
    const router = useRouter()

  useEffect(() => {
    dispatch(authGetThunk());
  }, [dispatch]);

  const user = useSelector((state:RootState) => state.auth.user);
  const AuthStatus = useSelector((state :RootState) => state.auth.status)

  console.log(user);

const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [sidebarOpen,setSidebarOpen] = useState<boolean>(false)


const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
  setAnchorEl(event.currentTarget);
};

  const handleClose = () => {
    setAnchorEl(null);
  };

const handleHome = () => {
    setAnchorEl(null)
     router.push('/') 
  }

  const handleAccount = () => {
    setAnchorEl(null)
     router.push('/Client/Setting/Account') 
  }

    const handleLogin = () => {
    setAnchorEl(null)
   router.push('/Client/Auth/Login') 
  }

  const handleSidebar = () => {
    setSidebarOpen(true)
  }

  return (
    <>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed"  style={{background : `${Navbg}`,color : `${textColor}`}} className={`m-0 p-2`}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleSidebar}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Task Manager
          </Typography>

            <div>
            
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                
                <MenuItem onClick={handleHome} >Home</MenuItem>
                { !user ? <MenuItem onClick={handleLogin}>Login</MenuItem>:null}
                <MenuItem onClick={handleAccount}>Account</MenuItem>
              </Menu>
            </div>
          
        </Toolbar>
      </AppBar>
    </Box>
    <Drawer visible={sidebarOpen} hide={setSidebarOpen}/>
    <style>{`
    .premium-btn {
  background: linear-gradient(135deg, #0A1F44, #1E5BBF);
  color: #ffffff;
  padding: 12px 28px;
  font-size: 12px;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 6px 15px rgba(30, 91, 191, 0.4);
}

.premium-btn:hover {
  background: linear-gradient(135deg, #123C7A, #2970FF);
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(41, 112, 255, 0.5);
}

.premium-btn:active {
  transform: scale(0.98);
}
    `}</style>
    </>
  );
}