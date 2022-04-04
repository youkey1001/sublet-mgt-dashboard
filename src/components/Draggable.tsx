import React, { useRef, useEffect } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { getEmptyImage } from "react-dnd-html5-backend";
import { Item, ItemWithIndex, MoveHandler, ItemTypes } from 'utils/Types';
import "styles/Draggable.css";

type Props = {
  item: Item;
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
    accept: ItemTypes,
    hover(dragItem: ItemWithIndex, monitor) {
      if (!ref.current) return;
      const dragIndex = dragItem.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;

      if (item.group === dragItem.group) {
        const hoverRect = ref.current.getBoundingClientRect();
        const hoverMiddleY = (hoverRect.bottom - hoverRect.top) / 2;
        const mousePosition = monitor.getClientOffset();
        if (!mousePosition) return;
        const hoverClientY = mousePosition.y - hoverRect.top;
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY * 0.5) return;
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY * 1.5) return;
      }

      onMove(dragIndex, hoverIndex, item.group);
      dragItem.index = hoverIndex;
      dragItem.group = item.group;
    }
  });

  const [{ isDragging, canDrag }, drag, dragPreview] = useDrag({
    item: { ...item, index },
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
