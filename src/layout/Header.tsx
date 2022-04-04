import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { auth } from '../firebase';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Avatar,
  IconButton,
  Toolbar,
  Typography,

} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

type Props = {
  onClick: VoidFunction;
  isOpen: Boolean;
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  appBar: {
    backgroundColor: "#1B5FA6",
  },
  menuButtonIconOpen: {
    marginRight: theme.spacing(2),
    transition: theme.transitions.create("transform", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    transform: "rotate(180deg)"
  },
  menuButtonIconClosed: {
    marginRight: theme.spacing(2),
    transition: theme.transitions.create("transform", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    transform: "rotate(0deg)"
  },
  grow: {
    flexGrow: 1,
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up('md')]: {
      display: "flex",
    },
  },
  small: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  iconButton: {
    padding: theme.spacing(1),
  }
}));

const Header: React.VFC<Props> = (props) => {
  const user = useSelector(selectUser);
  const classes = useStyles();
  return (
    <>
      <AppBar position='relative' elevation={0} className={classes.appBar}>
        <Toolbar variant='dense'>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={props.onClick}
            edge='start'
            className={
              props.isOpen
                ? classes.menuButtonIconOpen
                : classes.menuButtonIconClosed
            }
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' noWrap>
            Mini variant drawer
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton
              className={classes.iconButton}
              edge="end"
              aria-label="account of current user"
              aria-controls='primary-search-account-menu-mobile'
              aria-haspopup="true"
              color="inherit"
              onClick={
                async () => {
                  await auth.signOut();
                }
              }
            >
              <Avatar
                src={user.photoUrl}
                alt={user.displayName}
                sizes="small"
                className={classes.small}
              />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Header;
