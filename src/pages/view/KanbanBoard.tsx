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

  useEffect(() => {
    const boardId = "-N-k1ZfxQUI682gb-R8u"
    // dispatch(loadBoard(boardId));
    dispatch(listenBoard(boardId));

  }, []);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId, type } = result;
    if (!destination) return;
    // console.log("draggableId: " + source.droppableId);
    // console.log("droppableIdEnd: " + destination.droppableId);
    // console.log("droppableIdStart: " + source.index.toString());
    // console.log("droppableIndexEnd: " + destination.index);
    // console.log("droppableIndexStart: " + draggableId);
    // console.log("type: " + type);

    // draggableId: 625a3c11ebe60beec8c8ca22
    // droppableIdEnd: 625a3c11ebe60beec8c8ca22
    // droppableIdStart: 1
    // droppableIndexEnd: 0
    // droppableIndexStart: 625a3c11ebe60beec8c8ca24
    // type: DEFAULT

    // draggableId: 0
    // droppableIdEnd: 0
    // droppableIdStart: 1
    // droppableIndexEnd: 0
    // droppableIndexStart: 625a3c02ebe60beec8c8ca22
    // type: DEFAULT
    dispatch(dragHappened({
      droppableIdStart: source.droppableId,
      droppableIdEnd: destination.droppableId,
      droppableIndexStart: source.index,
      droppableIndexEnd: destination.index,
      draggableId: draggableId,
      type
    }));
    dispatch(updateBoard(store.getState().board));
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
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
