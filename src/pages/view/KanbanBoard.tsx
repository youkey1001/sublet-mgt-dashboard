import React, { useState, useCallback, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import useGroupedItems from 'hooks/useGroupedItems';
import useGroupedBoard from 'hooks/useGroupedBoard';
import { db } from '../../firebase';
import Board from 'components/Board';
//import { items as initial, MoveHandler, GroupTypes } from 'utils/Types';
import {
  Box
} from '@material-ui/core';
import 'styles/Kanban.css';
import { AnyRecord } from 'dns';

type List = {
  id: number;
  cardId: string;
  listId: string;
  contents: {
    title: string;
    memo: string;
  }
};

type MoveHandler = (dragIndex: number, targetIndex: number, groupType: string) => void;

const KanbanBoard: React.VFC = () => {
  // const [lists, setLists] = useState<Lists[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  //const [groupedItems, items, setItems] = useGroupedItems(initial);
  const [groupedLists, boards, lists, setLists, setBoards] = useGroupedBoard([]);

  const moveItem: MoveHandler = useCallback((dragIndex, targetIndex, group) => {
    const item = lists[dragIndex];
    if (!item) return;
    setLists(prevState => {
      const newItems = prevState.filter((_, idx) => idx !== dragIndex);
      console.log("newItems: ", newItems);
      console.log("group: ", group);
      console.log("targetIndex", targetIndex);
      newItems.splice(targetIndex, 0, { ...item, listId: group });
      return newItems;
    })
    console.log("lists: ", lists);
  }, [lists, setLists]);

  const [isHorizontal, setIsHorizontal] = useState(true);
  let index = 0;
  useEffect(() => {

    const unsub = db.collectionGroup("cards").onSnapshot((snapshot) => {
      Promise.all(
        snapshot.docs.map((doc, index) => {
          return doc.ref.parent.parent?.get().then((parent) => ({
            id: index,
            cardId: doc.id,
            listId: parent.id,
            contents: {
              title: doc.data().title,
              memo: doc.data().memo,
            }
          }));
        })
      ).then((results: any) => {
        setLists(results);
        return setIsLoading(false);
      }).catch(err => console.log(err))
    });
    return () => unsub();
  }, []);

  useEffect(() => {

    const unsub = db.collection("lists").onSnapshot((snapshot) => {
      setBoards(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          archive: doc.data().archive,
          title: doc.data().title
        }))
      );
    });
    return () => unsub();
  }, [isLoading]);


  return (
    isLoading
      ? (<Box className='kanban'></Box>)
      : (
        <Box className='kanban'>
          <div className={isHorizontal ? 'horizontal' : ''}>
            <DndProvider backend={HTML5Backend}>
              {boards.map(board => {
                const items = groupedLists[board.id];
                const firstIndex = index;
                if (items === undefined) return null;
                index += items.lists.length;

                return (
                  <section key={board.id} className={['group-section', isHorizontal ? 'horizontal' : ''].join(' ')}>
                    <Board
                      items={items.lists}
                      title={board.title}
                      groupType={board.id}
                      firstIndex={firstIndex}
                      onMove={moveItem}
                    />
                  </section>
                )
              })}
            </DndProvider>
          </div>
        </Box>
      )
  );
};

export default KanbanBoard;
