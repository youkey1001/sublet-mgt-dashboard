/* eslint-disable import/first */
import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listenBoard, loadBoard, dragHappened, updateBoard, selectBoard } from 'features/boardSlice';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import styles from './KanbanBoard.module.css';
import { List } from 'components';
import { store } from 'app/store';

const KanbanBoard: React.VFC = () => {
  const dispatch = useDispatch();
  const board = useSelector(selectBoard);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const boardId = "-N-k1ZfxQUI682gb-R8u"
    // dispatch(loadBoard(boardId));
    dispatch(listenBoard(boardId));

  }, []);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId, type } = result;
    if (!destination) return;
    dispatch(dragHappened({
      droppableIdStart: source.droppableId,
      droppableIdEnd: destination.droppableId,
      droppableIndexStart: source.index,
      droppableIndexEnd: destination.index,
      draggableId: draggableId,
      type
    }));
    dispatch(updateBoard(store.getState().board));
    setIsDragging(false);
  }

  const onDragStart = (event: any) => {
    setIsDragging(true);
    console.log("onDragUpdate");
  }

  const onDragUpdate = () => {
    console.log("onDragUpdate");
  }

  return (
    <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart} onDragUpdate={onDragUpdate} >
      <div style={{ position: 'absolute' }} >
        <Droppable droppableId="all-lists" direction="horizontal" type="list">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{ display: 'flex', flexDirection: 'row' }}
            >
              {board.lists != null
                ? board.lists.map((list, index) => (
                  <List
                    index={index}
                    listID={list.id}
                    title={list.title}
                    key={list.id}
                    cards={list.cards}
                  />
                ))
                : null}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;
