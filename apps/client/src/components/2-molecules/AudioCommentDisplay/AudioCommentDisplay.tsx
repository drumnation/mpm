import { useTrack } from '@/contexts/TrackContext/TrackContext.js';
import { useWavesurfer } from '@/contexts/WavesurferContext/WavesurferContext.js';
import { formatTime, handleKeyDownPreventSpecificKeys } from '@/library/helpers.js';
import { ScrollArea, Table, Text, Textarea } from '@mantine/core';
import { IconCircleCheck, IconEdit, IconSquareX, IconTrash } from '@tabler/icons-react';
import React, { useState, memo } from 'react';


const AudioCommentDisplay: React.FC = () => {
  const { handleDeleteComment, handleEditComment } = useWavesurfer();
  const { state, dispatch } = useTrack();
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editedCommentText, setEditedCommentText] = useState<string>('');

  const onSeek = (time: number) => {
    console.log(`Seeking to: ${time}`);
    dispatch({ type: 'SET_SEEK_TIME', payload: time });
  };

  const onDeleteComment = (commentId: string) => {
    handleDeleteComment(commentId);
  };

  const onStartEditComment = (commentId: string, commentText: string) => {
    setEditingCommentId(commentId);
    setEditedCommentText(commentText);
  };

  const onSaveEditComment = () => {
    if (editingCommentId) {
      handleEditComment(editingCommentId, editedCommentText);
      setEditingCommentId(null);
      setEditedCommentText('');
    }
  };

  const onCancelEditComment = () => {
    setEditingCommentId(null);
    setEditedCommentText('');
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
      <Table.Td style={{ padding: 30, fontWeight: 700, position: 'relative' }}>
        <div style={{
          width: 30,
          height: 30,
          borderRadius: '50%',
          backgroundColor: '#e0e0e0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}>
          {comment.label}
        </div>
      </Table.Td>
      <Table.Td style={{ padding: 5, width: 110 }}>{`(${formatTime(comment.timeStart)} → ${formatTime(comment.timeEnd)})`}</Table.Td>
      <Table.Td style={{ padding: 10 }}>
        {editingCommentId === comment.id ? (
          <Textarea
            value={editedCommentText}
            autosize
            onKeyDown={handleKeyDownPreventSpecificKeys}
            onChange={(e) => setEditedCommentText(e.currentTarget.value)}
            autoFocus
          />
        ) : (
          <span>"{comment.text}"</span>
        )}
      </Table.Td>
      <Table.Td style={{ padding: 10 }}>
        {editingCommentId === comment.id ? (
          <>
            <IconSquareX color='red' onClick={onCancelEditComment} />
            <IconCircleCheck color='green' onClick={onSaveEditComment} />
          </>
        ) : (
          <>
            <IconEdit color='blue' onClick={() => onStartEditComment(comment.id, comment.text)} style={{ cursor: 'pointer' }} />
            <IconTrash color="red" onClick={() => onDeleteComment(comment.id)} style={{ cursor: 'pointer' }} />
          </>
        )}
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <ScrollArea ml='xs' mr='xs' mt='xs' style={{ height: '100%' }}>
      <Table striped={true} style={{ width: '100%', borderCollapse: 'collapse' }}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th></Table.Th>
            <Table.Th></Table.Th>
            <Table.Th></Table.Th>
            <Table.Th></Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
      {rows.length === 0 && <Text mt='md' ta='center'>There are no comments</Text>}
    </ScrollArea>
  );
};

export default memo(AudioCommentDisplay);
