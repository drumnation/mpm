import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useReactTable, ColumnDef, getCoreRowModel, getSortedRowModel, flexRender } from '@tanstack/react-table';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Table, Container, Text, Badge } from '@mantine/core';
import { TrackMetadata } from '../../5-pages/MusicReviewDashboard/DummyMusicData';
import { FC } from 'react';
import { useTrack } from '../../../contexts';
import { DraggableHeader } from '../../1-atoms';
import { IconSortAscendingLetters, IconSortDescendingLetters } from '@tabler/icons-react';

interface TrackListProps {
  tracks: TrackMetadata[];
}

const generateRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const TrackList: FC<TrackListProps> = ({ tracks }) => {
  const { dispatch } = useTrack();
  const [selectedTrack, setSelectedTrack] = useState<TrackMetadata | null>(null);
  const genreColorMap = useRef<Record<string, string>>({});

  const getGenreColor = (genre: string) => {
    if (!genreColorMap.current[genre]) {
      genreColorMap.current[genre] = generateRandomColor();
    }
    return genreColorMap.current[genre];
  };

  const [columns, setColumns] = useState<ColumnDef<TrackMetadata>[]>([
    {
      accessorKey: 'trackName',
      header: 'Track',
    },
    {
      accessorKey: 'artistName',
      header: 'Artist',
    },
    {
      accessorKey: 'genre',
      header: 'Genre',
      cell: (info) => {
        const genre = info.getValue() as string;
        return <Badge color={getGenreColor(genre)}>{genre}</Badge>;
      },
    },
  ]);

  const data = useMemo(() => tracks, [tracks]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const handleSelectTrack = (track: TrackMetadata) => {
    if (selectedTrack?.filename === track.filename) {
      setSelectedTrack(null);
      dispatch({ type: 'CLEAR_SELECTED_TRACK' });
    } else {
      setSelectedTrack(track);
      dispatch({ type: 'SET_SELECTED_TRACK', payload: track });
    }
  };

  const moveColumn = (dragIndex: number, hoverIndex: number) => {
    const updatedColumns = [...columns];
    const [removed] = updatedColumns.splice(dragIndex, 1);
    updatedColumns.splice(hoverIndex, 0, removed);
    setColumns(updatedColumns);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Container>
        {table.getRowModel().rows.length === 0 ? (
          <Text>No tracks available</Text>
        ) : (
          <Table>
            <Table.Thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <Table.Tr key={headerGroup.id}>
                  <Table.Th style={{ textAlign: 'center' }}>#</Table.Th> {/* Add a header for the row number */}
                  {headerGroup.headers.map((header, index) => (
                    <DraggableHeader
                      key={header.id}
                      column={header}
                      index={index}
                      moveColumn={moveColumn}
                    >
                      <div
                        onClick={header.column.getToggleSortingHandler()}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: header.column.getCanSort() ? 'pointer' : 'default',
                        }}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getCanSort() && (
                          <>
                            {header.column.getIsSorted() === 'asc' && <IconSortAscendingLetters style={{ marginLeft: 4 }} />}
                            {header.column.getIsSorted() === 'desc' && <IconSortDescendingLetters style={{ marginLeft: 4 }} />}
                          </>
                        )}
                      </div>
                    </DraggableHeader>
                  ))}
                </Table.Tr>
              ))}
            </Table.Thead>
            <Table.Tbody>
              {table.getRowModel().rows.map((row, i) => {
                const isSelected = selectedTrack?.filename === row.original.filename;
                return (
                  <Table.Tr
                    key={row.id}
                    onClick={() => handleSelectTrack(row.original)}
                    style={{
                      backgroundColor: isSelected ? '#d0ebff' : i % 2 === 0 ? '#f5f5f5' : '#ffffff',
                      cursor: 'pointer',
                      textAlign: 'center',
                      padding: '10px 0',
                    }}
                  >
                    <Table.Td>{i + 1}.</Table.Td>
                    {row.getVisibleCells().map((cell) => (
                      <Table.Td key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </Table.Td>
                    ))}
                  </Table.Tr>
                );
              })}
            </Table.Tbody>
          </Table>
        )}
      </Container>
    </DndProvider>
  );
};

export default TrackList;
