import React from 'react';
import { useDrop } from 'react-dnd';
import 'styles/Group.css';
import Card from './Card';
import Draggable from './Draggable';
import { Item as _Item, GroupType, MoveHandler, ItemWithIndex, ItemTypes, TitleMap } from 'utils/Types';
import { CustomDragLayer } from 'components/CustomDragLayer';

type Props = {
  items: _Item[];
  groupType: GroupType;
  firstIndex: number;
  onMove: MoveHandler;
}

const Board: React.FC<Props> = ({ items, groupType, firstIndex, onMove }) => {
  const [, ref] = useDrop({
    accept: ItemTypes,
    hover(dragItem: ItemWithIndex) {
      const dragIndex = dragItem.index;
      if (dragItem.group === groupType) return;
      const targetIndex = dragIndex < firstIndex ?
        // forward
        firstIndex + items.length - 1 :
        // backward
        firstIndex + items.length;
      onMove(dragIndex, targetIndex, groupType);
      dragItem.index = targetIndex;
      dragItem.group = groupType;
    }
  });

  return (
    <div className={['group', groupType].join(' ')}>
      <h2><span className='count'>{items.length}</span>{TitleMap[groupType]}</h2>
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