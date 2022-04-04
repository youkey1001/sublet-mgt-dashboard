import React from 'react';
import clsx from 'clsx';
import { useDrag, DragPreviewImage, useDragLayer } from 'react-dnd';
import {
  Grid,
  Paper,
} from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

type Props = {
  id: number;
  color: string;
}

type StyleProps = {
  boxColor?: string;
}

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => createStyles({
  paper: {
    backgroundColor: (props) => props.boxColor,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    boxSizing: "border-box",
    "&.MuiPaper-root:hover": {
      backgroundColor: "#f4f5f9"
    }
  },
  paperNoDragging: {
    border: (props) => `3px solid ${props.boxColor}`,
  },
  paperDragging: {
    border: "3px dashed red",
  }
}));

const Boxes: React.VFC<Props> = ({ id, color }) => {
  const classes = useStyles({ boxColor: color });
  // const [{ isDragging, opacity }, drag, preview] = useDrag(() => ({
  //   type: "image",
  //   item: { id: id },
  //   collect: (monitor) => ({
  //     isDragging: monitor.isDragging(),
  //     opacity: monitor.isDragging() ? 0.4 : 1,
  //   }),
  // }));
  return (
    <Grid item xs={12}>
      {/*<DragPreviewImage connect={preview} src="https://placehold.jp/150x150.png" />
      <Paper ref={drag} className={clsx(classes.paper, {
        [classes.paperNoDragging]: !isDragging,
        [classes.paperDragging]: isDragging
      })}>
        {id}
    </Paper> */}
    </Grid>
  )
};

export default Boxes;
