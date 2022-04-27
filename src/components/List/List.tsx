import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectBoard } from 'features/boardSlice';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import { Card } from 'components';

const useStyles = makeStyles((theme: Theme) => createStyles({
  ListStyle: {
    backgroundColor: "#ebecf0",
    borderRadius: "3px",
    width: "300px",
    height: "100%",
    padding: "8px 1px 8px 1px",
    margin: "8px 0px 0px 8px"
  },
  Title: {
    color: "#172b4d",
    fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Noto Sans,Ubuntu, Droid Sans, Helvetica Neue, sans-serif",
    fontSize: "14px",
    lineHeight: "20px",
    fontWeight: "bold",
    margin: "15px 15px 15px 22px",
    opacity: 0.7,
    display: "inline-block"
  },
  DroppableCards: {
    minHeight: "20px"
  },
  ListHeader: {
    justifyContent: "space-between",
    display: "inline-flex",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  ListOptions: {
    display: "inline-block",
    marginRight: "15px",
    borderRadius: "0.3rem",
    padding: "0.4rem 0.6rem 0.4rem 0.6rem",
    color: "#172b4d",
    opacity: "0.7",
    "&:hover": {
      backgroundColor: "#e1e2e6",
    }
  }
}));

const List: React.VFC<ListProps> = ({ index, title, listID, cards }) => {
  const dispatch = useDispatch();
  const board = useSelector(selectBoard);
  const classes = useStyles();
  return (
    <Draggable draggableId={listID} index={index} >
      {(provided) => (
        <div
          className={classes.ListStyle}
          {...provided.draggableProps}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
        >
          <div className={classes.ListHeader}>
            <div className={classes.Title}>{title}</div>
            <div className={classes.ListOptions}>
              <DeleteIcon />
            </div>
          </div>
          <Droppable droppableId={listID}>
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={classes.DroppableCards}
              >
                {cards != null
                  ? cards.map((card, index) => (
                    <Card
                      index={index}
                      text={card.text}
                      key={card.id}
                      id={card.id}
                      listID={listID}
                    />
                  ))
                  : null
                }
                {provided.placeholder}
              </div>
            )}
          </Droppable>

        </div>
      )}
    </Draggable>
  )
}

export default List;
