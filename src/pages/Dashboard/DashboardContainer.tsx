import React, { useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import Header from 'layout/Header';
import DashboardView from './DashboardView';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    height: "100%"
  }
}));

const DashboardContainer: React.VFC = () => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(true);

  const handleDrawerToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header
        onClick={handleDrawerToggle}
        isOpen={isOpen}
      />
      <DashboardView
        onClick={handleDrawerToggle}
        isOpen={isOpen}
      />
    </div>
  );
}

export default DashboardContainer;