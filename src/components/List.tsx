import React, { useState, useEffect, useCallback } from 'react';
import update from 'immutability-helper';
import { db } from '../firebase';
import { useDrop } from 'react-dnd';
import 'styles/Group.css';
import Draggable from './Draggable';
import { Card as _Card, MoveHandler, ItemTypes, GroupType } from 'utils/Types';
import Card from './Card'

type DragItem = _Card & {
  type: string;
}

type Props = {
  listId: string;
  title: string;
  groupList: GroupType;
  setCards: React.Dispatch<React.SetStateAction<_Card[]>>;
  firstIndex: number;
}

const List: React.FC<Props> = ({ listId, title, groupList, setCards, firstIndex }) => {
  const moveCard: MoveHandler = useCallback((dragIndex, targetIndex, targetListId) => {
    setCards(prevState => {
      const newCards = prevState.filter((_, idx) => idx !== dragIndex);
      newCards.splice(targetIndex, 0, { ...prevState[dragIndex], listId: targetListId });
      return newCards;
    })

  }, [groupList]);

  const [, ref] = useDrop({
    accept: ItemTypes.CARD,
    hover(dragItem: DragItem) {
      const dragIndex = dragItem.index;
      if (dragItem.listId === listId) return;
      const targetIndex = dragIndex < firstIndex ?
        // forward
        firstIndex + groupList.cards.length - 1 :
        // backend
        firstIndex + groupList.cards.length;
      moveCard(dragIndex, targetIndex, listId);
      dragItem.index = targetIndex;
      dragItem.listId = listId;

    }
  })

  return (
    <div className='group'>
      <h2><span className='count'>{groupList.cards.length}</span>{title}</h2>
      <ul className='list' ref={ref}>
        {groupList.cards
          .sort((a, b) => {
            if (a.order < b.order) return -1;
            if (a.order > b.order) return 1;
            return 0;
          })
          .map((card, i) => {
            return (
              <li key={card.id} className='item-wrapper'>
                <Draggable card={card} index={Number(firstIndex) + i} onMove={moveCard}>
                  <Card contents={card.contents} />
                </Draggable>
              </li>
            )
          })}
      </ul>
    </div>
  );
};

export default List;