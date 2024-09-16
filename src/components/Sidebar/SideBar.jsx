// import React from 'react';
// import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import ExploreIcon from '@mui/icons-material/Explore';
// import StarIcon from '@mui/icons-material/Star';
// import SendIcon from '@mui/icons-material/Send';
// import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
// import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
// import SettingsIcon from '@mui/icons-material/Settings';

// const Sidebar = () => {
//   const menuItems = [
//     { text: 'Overview', icon: <DashboardIcon /> },
//     { text: 'Explore', icon: <ExploreIcon /> },
//     { text: 'Favorites', icon: <StarIcon /> },
//     { text: 'Send', icon: <SendIcon /> },
//     { text: 'Swap', icon: <SwapHorizIcon /> },
//     { text: 'Earn', icon: <AttachMoneyIcon /> },
//     { text: 'Settings', icon: <SettingsIcon /> },
//   ];

//   return (
//     <List>
//       {menuItems.map((item, index) => (
//         <ListItem button key={index}>
//           <ListItemIcon>{item.icon}</ListItemIcon>
//           <ListItemText primary={item.text} />
//         </ListItem>
//       ))}
//     </List>
//   );
// };

// export default Sidebar;
import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox'; // Example icons
import MailIcon from '@mui/icons-material/Mail';

function SideBar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
      }}
    >
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <MailIcon /> : <InboxIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

export default SideBar;
