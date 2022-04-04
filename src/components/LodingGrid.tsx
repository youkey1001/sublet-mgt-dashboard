import React from 'react';
import {
  Grid,
} from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import ReactLoading from 'react-loading';

type LoadingType = "blank" | "balls" | "bars" | "bubbles" | "cubes" | "cylon" | "spin" | "spinningBubbles" | "spokes";

type Props = {
  type?: LoadingType;
  height: number | string;
  width: number | string;
  delay: number;
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  loadingGrid: {
    //height: "70%",
    display: "flex"
  },
  centerGrid: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
}));

const LodingGrid: React.VFC<Props> = ({ type, height, width, delay }) => {
  const classes = useStyles();

  return (
    <Grid
      container
      className={classes.loadingGrid}
    >
      <Grid item xs={12} className={classes.centerGrid}>
        <ReactLoading type={type} color="#1B5FA6" height={height} width={width} delay={delay} />
      </Grid>
    </Grid>
  );
};

export default LodingGrid;
