import React from 'react';
import {
  Grid,
  Toolbar,
  Typography
} from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

type Props = {
  uid: string;
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  gridItem: {
    width: "340px",
    border: "1px solid #DADEE0",
    backgroundColor: "white",
  },
  toolbar: {
    borderBottom: "1px solid #DADEE0",
    minHeight: "44px",
  }
}));

const UserInfomation: React.VFC<Props> = (props) => {
  const classes = useStyles();

  return (
    <Grid item className={classes.gridItem}>
      <Toolbar variant="dense" className={classes.toolbar}>
        <Typography variant="h6" noWrap>
          User Infomation
        </Typography>
      </Toolbar>
      <Typography>{props.uid}</Typography>
    </Grid>
  )
}

export default UserInfomation;
