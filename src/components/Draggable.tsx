import { type } from 'os';
import React, { useRef, useEffect } from 'react';
import { useDrag, useDrop } from 'react-dnd';
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
      const didDrop = monitor.didDrop();
      if (didDrop) console.log("dropped outside");
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