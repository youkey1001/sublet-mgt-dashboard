import React from 'react';
import {
  Grid,
  Toolbar,
  Typography,
  Button
} from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import FolderTree from 'components/FolderTree';

const useStyles = makeStyles((theme: Theme) => createStyles({
  girdContainer: {
    height: "100%",
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    border: "1px solid #DADEE0"
  },
  toolbar: {
    borderBottom: "1px solid #DADEE0",
    minHeight: "44px"
  },
  menuBar: {
    minHeight: "55px",
    borderBottom: "2px solid #DADEE0",
    backgroundColor: "#F4F5F9"
  },
  gridItem: {
    height: "calc(100% - 44px - 55px)",
    width: "100%",
    display: "flex",
  }
}));

const FtpManager: React.VFC = () => {
  const classes = useStyles();
  return (
    <Grid container className={classes.girdContainer}>
      <Grid item>
        <Toolbar variant="dense" className={classes.toolbar}>
          <Typography variant="h6" noWrap>
            FTP Client
          </Typography>
        </Toolbar>
      </Grid>
      <Grid item>
        <Toolbar variant="dense" className={classes.menuBar}>
          <Button>
            新規ファイル
          </Button>
          <Button>
            新規フォルダ
          </Button>
          <Button>
            コピー
          </Button>
          <Button>
            編集
          </Button>
          <Button>
            アップロード
          </Button>
        </Toolbar>
      </Grid>
      <Grid item className={classes.gridItem}>
        <Grid item style={{ width: "240px", height: "100%", backgroundColor: "#F0F0F0", borderRight: "2px solid #DADEE0" }} >
          <FolderTree />
        </Grid>
        <Grid item style={{ width: "calc(100% - 240px)", height: "100%", backgroundColor: "white" }}>

        </Grid>
      </Grid>

    </Grid>
  );
};

export default FtpManager;
