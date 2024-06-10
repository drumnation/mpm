
import { TrackMetadata } from '@/library/DummyMusicData.js';
import { Header } from '@tanstack/react-table';
import React, { FC, memo } from 'react';
import { useDrag, useDrop } from 'react-dnd';

interface DraggableHeaderProps {
  column: Header<TrackMetadata, unknown>;
  index: number;
  moveColumn: (dragIndex: number, hoverIndex: number) => void;
  children: React.ReactNode;
}

const DraggableHeader: FC<DraggableHeaderProps> = ({ column, index, moveColumn, children }) => {
  const ref = React.useRef<HTMLTableHeaderCellElement>(null);

  const [, drop] = useDrop({
    accept: 'column',
    hover(item: { index: number }) {
      if (!ref.current || item.index === index) {
        return;
      }
      moveColumn(item.index, index);
      item.index = index;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'column',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <th
      ref={ref}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
      }}
    >
      {children}
    </th>
  );
};

export default memo(DraggableHeader);
