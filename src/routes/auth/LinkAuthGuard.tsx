import React from 'react';
import { NavLink } from 'react-router-dom';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import {
  ListItem,
  ListItemIcon,
  ListItemText

} from '@material-ui/core';

type Props = {
  to: string;
  rule: boolean;
  text: string;
  children: React.ReactNode;
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  naviLink: {
    textDecoration: 'none',
    color: '#000000DE',
  },
  listItem: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  listItemIcon: {
    minWidth: 'auto',
    marginRight: '10px',
  },
}));

const LinkAuthGuard: React.VFC<Props> = (props) => {
  const { to, rule, text, children } = props;
  const classes = useStyles();
  if (rule) {
    return (
      <NavLink to={to} className={classes.naviLink} >
        <ListItem button classes={{ root: classes.listItem }}>
          <ListItemIcon className={classes.listItemIcon}>
            {children}
          </ListItemIcon>
          <ListItemText primary={text} />
        </ListItem>
      </NavLink>
    );
  }

  return <></>
}

export default LinkAuthGuard;