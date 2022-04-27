import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectBoard, deleteCard, updateBoard } from 'features/boardSlice';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { default as MuiCard } from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme: Theme) => createStyles({
  CustomDiv: {
    marginBottom: "8px",
    marginLeft: "8px",
    marginRight: "8px",
    fontSize: "14px",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
    color: "#172b4d",
  },
  StyledCardContent: {
    display: "inline-block",
  },
  CardOptions: {
    visibility: "hidden",
    display: "inline-block",
    marginRight: "15px",
    borderRadius: ".3rem",
    padding: "0.4rem 0.6rem 0.4rem 0.6rem",
    color: "#172b4d",
    opacity: 0.7,
    "&:hover": {
      backgroundColor: "#e1e2e6",
    }
  },
  StyledCard: {
    justifyContent: "space-between",
    display: "inline-flex",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    "&:hover": {
      backgroundColor: "rgb(240, 240, 240)",

    },
    " &:hover $CardOptions": {
      visibility: "visible",
    }
  }
}));

const Card: React.VFC<CardProps> = ({ text, id, index, listID }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const board = useSelector(selectBoard);
  return (
    <Draggable draggableId={String(id)} index={index} >
      {(provided) => (
        <div
          className={classes.CustomDiv}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <MuiCard className={classes.StyledCard} >
            <CardContent className={classes.StyledCardContent}>
              {text}
            </CardContent>
          </MuiCard>
        </div>
      )}
    </Draggable>
  );
};

export default Card;
