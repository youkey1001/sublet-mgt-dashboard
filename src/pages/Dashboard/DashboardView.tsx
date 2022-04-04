import React from 'react';
import { Outlet } from 'react-router-dom';
import DrawerMenu from 'layout/DrawerMenu';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

type Props = {
  onClick: VoidFunction;
  isOpen: Boolean;
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  main: {
    display: "flex",
    flexDirection: "row",
    height: "calc(100vh - 48px)"
  },
  wrapper: {
    padding: theme.spacing(1) + 2,
    backgroundColor: "#EBEDF0",
    height: "100%",
    width: "100%"
  },
}));

const DashboardView: React.VFC<Props> = (props) => {
  const classes = useStyles();
  return (
    <main className={classes.main}>
      <DrawerMenu isOpen={props.isOpen} />
      <Box className={classes.wrapper}>
        <Outlet />
      </Box>
    </main>
  );
};

export default DashboardView;
