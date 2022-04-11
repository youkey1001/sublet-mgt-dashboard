import React, { useRef, useEffect } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { db } from '../firebase';
import { getEmptyImage } from "react-dnd-html5-backend";
import { Card, MoveHandler, ItemTypes } from 'utils/Types';
import "styles/Draggable.css";

type DragItem = Card & { type: string; index: number; }

type Props = {
  index: number;
  card: Card;
  children: React.ReactNode;
  onMove: MoveHandler;
}

const Draggable: React.FC<Props> = ({ card, index, onMove, children }) => {
  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    hover(dragItem: DragItem, monitor) {
      if (!ref.current) return;
      const dragIndex = dragItem.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;
      if (card.listId === dragItem.listId) {
        const hoverRect = ref.current.getBoundingClientRect();
        const hoverMiddleY = (hoverRect.bottom - hoverRect.top) / 2;
        const mousePosition = monitor.getClientOffset();
        if (!mousePosition) return;
        const hoverClientY = mousePosition.y - hoverRect.top;
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY * 0.5) return;
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY * 1.5) return;
      }
      onMove(dragIndex, hoverIndex, card.listId);
      dragItem.index = hoverIndex;
      dragItem.listId = card.listId;
    }
  });

  const [{ isDragging }, drag] = useDrag({
    item: { ...card, index, type: ItemTypes.CARD },
    isDragging: monitor => monitor.getItem().id === card.id,
    collect: monitor => ({
      isDragging: monitor.isDragging()
    }),
    end: (item, monitor) => {
      console.log("drag end")
      const didDrop = monitor.didDrop();
      const batch = db.batch();
      const beforeListId = card.listId;
      const afterListId = item?.listId;
      const cardRef = db.collection("lists").doc(beforeListId).collection("cards").doc(item?.id);
      const listRef = db.collection("lists").doc(afterListId).collection("cards").doc(item?.id);
      batch.delete(cardRef);
      batch.set(listRef, item?.contents);
      if (didDrop && beforeListId !== afterListId) {
        batch.commit();
      }
    }
  })

  drag(drop(ref));

  const rect = ref.current?.getBoundingClientRect();
  const height = rect?.height;
  const width = rect?.width;
  return (
    <div
      ref={ref}
      className={isDragging ? "isDragging" : "noDragging"}
    >
      {
        isDragging ? (<div className="item" style={{ height, width }}></div>) : (children)
      }
    </div>
  )
};

export default Draggable;