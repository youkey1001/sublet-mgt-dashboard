import React from 'react';
import { useDrop } from 'react-dnd';
import 'styles/Group.css';
import Card from './Card';
import Draggable from './Draggable';
//import { Item as _Item, GroupType, MoveHandler, ItemWithIndex, ItemTypes, TitleMap } from 'utils/Types';
import { CustomDragLayer } from 'components/CustomDragLayer';

type List = {
  id: number;
  cardId: string;
  listId: string;
  contents: {
    title: string;
    memo: string;
  }
};

type DragItem = List & {
  type: string;
}

type MoveHandler = (dragIndex: number, targetIndex: number, groupType: string) => void;


type Props = {
  items: List[];
  title: string;
  groupType: string;
  firstIndex: number;
  onMove: MoveHandler;
}

const Board: React.FC<Props> = ({ items, title, groupType, firstIndex, onMove }) => {
  // console.log(`Board > ${groupType} > firstIndex: `, firstIndex);
  console.log(firstIndex);
  const [, ref] = useDrop({
    accept: "item",
    hover(dragItem: DragItem) {
      console.log(dragItem);
      const dragIndex = dragItem.id;
      if (dragItem.listId === groupType) return;
      const targetIndex = dragIndex < firstIndex ?
        // forward
        firstIndex + items.length - 1 :
        // backward
        firstIndex + items.length;
      onMove(dragIndex, targetIndex, groupType);
      dragItem.id = targetIndex;
      dragItem.listId = groupType;
    }
  });

  return (
    <div className={['group', groupType].join(' ')}>
      <h2><span className='count'>{items.length}</span>{title}</h2>
      <ul className='list' ref={ref}>
        {items.map((item, i) => {
          return (
            <li key={item.id} className='item-wrapper'>
              {/* <CustomDragLayer /> */}
              <Draggable item={item} index={firstIndex + i} onMove={onMove}>
                <Card id={item.id} contents={item.contents} />
              </Draggable>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Board;