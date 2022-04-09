import React, { useRef, useEffect } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { getEmptyImage } from "react-dnd-html5-backend";
//import { Item, ItemWithIndex, MoveHandler, ItemTypes } from 'utils/Types';
import "styles/Draggable.css";
type MoveHandler = (dragIndex: number, targetIndex: number, groupType: string) => void;
type List = {
  id: number;
  cardId: string;
  listId: string;
  contents: {
    title: string;
    memo: string;
  }
};

type Props = {
  item: List;
  index: number;
  onMove: MoveHandler;
  children: React.ReactNode;
}

const Draggable: React.FC<Props> = ({ item, index, onMove, children }) => {
  const ref = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   dragPreview(getEmptyImage(), { captureDraggingState: true });
  // }, []);

  const [, drop] = useDrop({
    accept: "item",
    hover(dragItem: any, monitor) {
      if (!ref.current) return;
      const dragIndex = dragItem.id;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;

      if (item.listId === dragItem.listId) {
        const hoverRect = ref.current.getBoundingClientRect();
        const hoverMiddleY = (hoverRect.bottom - hoverRect.top) / 2;
        const mousePosition = monitor.getClientOffset();
        if (!mousePosition) return;
        const hoverClientY = mousePosition.y - hoverRect.top;
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY * 0.5) return;
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY * 1.5) return;
      }

      onMove(dragIndex, hoverIndex, item.listId);
      dragItem.id = hoverIndex;
      dragItem.listId = item.listId;
    }
  });

  const [{ isDragging, canDrag }, drag, dragPreview] = useDrag({
    item: { ...item, type: "item" },
    isDragging: monitor => monitor.getItem().id === item.id,
    collect: monitor => ({
      isDragging: monitor.isDragging(),
      canDrag: monitor.canDrag(),
    })
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
      {isDragging ? (<div className="item" style={{ height, width }}></div>) : (children)}
    </div >
  );
};

export default Draggable;
