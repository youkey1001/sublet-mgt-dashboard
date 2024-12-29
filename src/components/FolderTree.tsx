import React from 'react';
import {
  Grid
} from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import * as Icons from 'assets/img';

const useStyles = makeStyles((theme: Theme) => createStyles({
  gridContainer: {
    flexDirection: "column"
  },
  gridItem: {
    margin: "4px 0px 4px 40px",
    fontSize: "16px"
  },
  folderIcon: {
    margin: "0px 4px 0px auto",
    verticalAlign: "middle",
    width: "auto"
  },
  arrowRight: {
    margin: "0px 4px 0px auto",
    verticalAlign: "middle",
    width: "auto",
    padding: "2.5px 4.5px"
  }
}));

const items = [
  {
    name: ".pki",
    path: "/.pki"
  },
  {
    name: ".ssh",
    path: "/.ssh"
  },
  {
    name: "Maildir",
    path: "/Maildir"
  },
  {
    name: "Maildir.1",
    path: "/Maildir.1"
  },
  {
    name: "Maildir.2",
    path: "/Maildir.2"
  },
  {
    name: "Maildir.3",
    path: "/Maildir.3"
  },
  {
    name: "chietree.com",
    path: "/chietree.com"
  },
]

const FolderTree: React.VFC = () => {
  const classes = useStyles();
  return (
    <Grid container className={classes.gridContainer}>
      {items.map((item, index) => (
        <Grid item className={classes.gridItem} key={index}>
          <img src={Icons.ArrowRightIcon} className={classes.arrowRight} />
          <img src={Icons.FolderOffIcon} className={classes.folderIcon} />
          <span>{item.name}</span>
        </Grid>
      ))}
    </Grid>
  );
};

export default FolderTree;
