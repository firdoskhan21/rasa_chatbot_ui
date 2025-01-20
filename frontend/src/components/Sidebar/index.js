import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ListAltIcon from '@mui/icons-material/ListAlt';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const drawerWidth = 240;

function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        height: '100vh',
        overflow: 'auto',
        marginTop: '64px',
      }}
    >
      <List style={{marginTop:'64px'}}>
        <ListItem button component={RouterLink} to="/admin/dashboard">
          <ListItemIcon><DashboardIcon /></ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={RouterLink} to="/admin/manage">
          <ListItemIcon><ListAltIcon /></ListItemIcon>
          <ListItemText primary="Manage Experiment" />
        </ListItem>
        {/* <ListItem button component={RouterLink} to="/admin/results">
          <ListItemIcon><SettingsIcon /></ListItemIcon>
          <ListItemText primary="Results" />
        </ListItem> */}
      </List>
    </Drawer>
  );
}

export default Sidebar;
