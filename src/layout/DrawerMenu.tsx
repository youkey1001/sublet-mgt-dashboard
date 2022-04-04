import React from 'react';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { selectUser } from 'features/userSlice';
import LinkAuthGuard from '../route/auth/LinkAuthGuard';
import LinkMenuItem from '../route/LinkMenuItem';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import {
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText

} from '@material-ui/core';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

type Props = {
  isOpen: Boolean;
}

const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) => createStyles({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap"
  },
  drawerOpen: {
    width: drawerWidth,
    top: "auto",
    zIndex: 0,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    top: "auto",
    zIndex: 0,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: theme.spacing(5) + 4 // 44px
  },
  listItem: {
    paddingLeft: 10,
    paddingRight: 10
  },
  listItemIcon: {

  },
  navlink: {
    textDecoration: 'none',
    color: '#000000DE'
  }
}));

const DrawerMenu: React.VFC<Props> = (props) => {
  const user = useSelector(selectUser);
  const classes = useStyles();
  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: props.isOpen,
        [classes.drawerClose]: !props.isOpen
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: props.isOpen,
          [classes.drawerClose]: !props.isOpen
        })
      }}
    >
      <List>
        <LinkMenuItem to="/" text="Home">
          <InboxIcon />
        </LinkMenuItem>
        <LinkAuthGuard to="/user" rule={user.role === "admin"} text="User">
          <MailIcon />
        </LinkAuthGuard>
        <LinkMenuItem to="/ftp" text="FTP">
          <InboxIcon />
        </LinkMenuItem>
        <LinkMenuItem to="/kanban" text="Kanban">
          <MailIcon />
        </LinkMenuItem>
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem button key={text} classes={{ root: classes.listItem }}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default DrawerMenu;
