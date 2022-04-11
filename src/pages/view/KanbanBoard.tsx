import React, { useState, useCallback, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import useGroupedLists from 'hooks/useGroupedLists';
import { db } from '../../firebase';
import List from 'components/List';
import { } from 'utils/Types';
import {
  Box
} from '@material-ui/core';
import 'styles/Kanban.css';

const KanbanBoard: React.VFC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [groupedLists, lists, setLists, setCards] = useGroupedLists();

  useEffect(() => {
    const unsub = db.collection("lists").onSnapshot((snapshot) => {
      console.log("lists");
      setLists(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          archive: doc.data().archive,
          title: doc.data().title
        }))
      );
      setIsLoading(false);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    const unsub = db.collectionGroup("cards").onSnapshot((snapshot) => {
      console.log("cards");
      setCards(
        snapshot.docs.map((doc, index) => ({
          id: doc.id,
          index: index,
          listId: doc.ref.parent.parent?.id,
          contents: {
            title: doc.data().title,
            memo: doc.data().memo
          }
        }))
      )
    });
    return () => unsub();
  }, []);

  let index = 0;
  return (
    isLoading
      ? (<Box className='kanban'></Box>)
      : (
        <Box className='kanban'>
          <div className='horizontal'>
            <DndProvider backend={HTML5Backend}>
              {lists.map((list) => {
                const groupList = groupedLists[list.id];
                const firstIndex = index;
                if (groupList === null) return null;
                index += groupList.cards.length;

                return (
                  <List key={list.id} listId={list.id} title={list.title} groupList={groupList} setCards={setCards} firstIndex={firstIndex} />
                )
              })}
            </DndProvider>
          </div>
        </Box>
      )
  );
};

export default KanbanBoard;
