import React, { useState, useCallback } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import useGroupedItems from 'hooks/useGroupedItems';
import Board from 'components/Board';
import { items as initial, MoveHandler, GroupTypes } from 'utils/Types';
import {
  Box
} from '@material-ui/core';
import 'styles/Kanban.css';

const KanbanBoard: React.VFC = () => {
  const [groupedItems, items, setItems] = useGroupedItems(initial);
  const moveItem: MoveHandler = useCallback((dragIndex, targetIndex, group) => {
    const item = items[dragIndex];
    if (!item) return;
    setItems(prevState => {
      const newItems = prevState.filter((_, idx) => idx !== dragIndex);
      newItems.splice(targetIndex, 0, { ...item, group });
      return newItems;
    })
  }, [items, setItems]);
  const [isHorizontal, setIsHorizontal] = useState(true);
  let index = 0;

  return (
    <Box className='kanban'>
      <div className={isHorizontal ? 'horizontal' : ''}>
        <DndProvider backend={HTML5Backend}>
          {GroupTypes.map(group => {
            const items = groupedItems[group];
            const firstIndex = index;
            if (items === undefined) return null;
            index = index + items.length;

            return (
              <section key={group} className={['group-section', isHorizontal ? 'horizontal' : ''].join(' ')}>
                <Board
                  items={items}
                  groupType={group}
                  firstIndex={firstIndex}
                  onMove={moveItem}
                />
              </section>
            )
          })}
        </DndProvider>
      </div>
    </Box>
  );
};

export default KanbanBoard;
