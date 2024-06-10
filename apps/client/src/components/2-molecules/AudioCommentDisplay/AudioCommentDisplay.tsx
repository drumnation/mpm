import { ScrollArea, Table, Text } from '@mantine/core';
import React from 'react';
import { formatTime } from '../../../library/helpers';
import { useTrack } from '../../../contexts';

const AudioCommentDisplay: React.FC = () => {
  const { state, dispatch } = useTrack();

  const onSeek = (time: number) => {
    console.log(`Seeking to: ${time}`);
    dispatch({ type: 'SET_SEEK_TIME', payload: time });
  };

  const rows = state.comments.map((comment, index) => (
    <Table.Tr
      key={comment.id}
      style={{
        backgroundColor: state.currentTime >= comment.timeStart && state.currentTime < comment.timeEnd ? 'lightblue' : index % 2 === 0 ? '#f8f9fa' : 'transparent',
        textAlign: 'center',
      }}
      onClick={() => onSeek(comment.timeStart)}
    >
      <Table.Td style={{ padding: 10, fontWeight: 700 }}>{comment.label}</Table.Td>
      <Table.Td style={{ padding: 5 }}>{`(${formatTime(comment.timeStart)} - ${formatTime(comment.timeEnd)})`}</Table.Td>
      <Table.Td style={{ padding: 10 }}>"{comment.text}"</Table.Td>
    </Table.Tr>
  ));

  return (
    <ScrollArea ml='xs' mr='xs' mt='xs' style={{ height: '100%' }}>
      <Table striped={true} style={{ width: '100%', borderCollapse: 'collapse' }}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th style={{ textAlign: 'center' }}></Table.Th>
            <Table.Th style={{ textAlign: 'center' }}></Table.Th>
            <Table.Th style={{ textAlign: 'center' }}>Comment</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
      {rows.length === 0 && <Text mt='md' ta='center'>There are no comments</Text>}
    </ScrollArea>
  );
};

export default AudioCommentDisplay;
