import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import Profile from '../assets/icons/profile.svg?react';
import Chat from '../assets/icons/chat.svg?react';
import Favourite from '../assets/icons/favourite.svg?react';
import Recent from '../assets/icons/recent.svg?react';
import Setting from '../assets/icons/setting.svg?react';

function BottomNav() {
  const [value, setValue] = useState<number>(0);
  const location = useLocation();
  const pathName = location.pathname;

  return (
    <>
      {
        pathName !== ('/sign-up' || '/') &&
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={0}>
          <BottomNavigation
            showLabels
            value={value}
            onChange={(event: any, newValue: number) => setValue(newValue)}
            className="bottom-nav-section"
          >
            <BottomNavigationAction
              className="min-width-60"
              label='Profile'
              icon={<Profile className="bottom-nav-icons" />}
            />
            <BottomNavigationAction
              className="min-width-60"
              label='Chats'
              icon={<Chat className="bottom-nav-icons" />}
            />
            <BottomNavigationAction
              className="min-width-60"
              label='Favourites'
              icon={<Favourite className="bottom-nav-icons" />}
            />
            <BottomNavigationAction
              className="min-width-60"
              label='Recent'
              icon={<Recent className="bottom-nav-icons" />}
            />
            <BottomNavigationAction
              className="min-width-60"
              label='Settings'
              icon={<Setting className="bottom-nav-icons" />}
            />
          </BottomNavigation>
        </Paper>
      }
    </>
  )
}

export default BottomNav;