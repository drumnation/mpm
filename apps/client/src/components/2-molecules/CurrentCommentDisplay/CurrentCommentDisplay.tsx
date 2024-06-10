import React from 'react';
import { Box, Paper, Text } from '@mantine/core';
import { Comment } from '../../3-organisms/Player/Player.types';
import { formatTime } from '../../../library/helpers';

interface CurrentCommentDisplayProps {
  currentTime: number;
  comments: Comment[];
}

const CurrentCommentDisplay: React.FC<CurrentCommentDisplayProps> = ({ currentTime, comments }) => {
  const currentComment = comments.find(comment => currentTime >= comment.timeStart && currentTime <= comment.timeEnd);

  return (
    <Paper shadow='xs' withBorder style={{ padding: '20px', marginLeft: 20, marginRight: 20, textAlign: 'center' }}>
      {currentComment ? (
        <>
          <Text style={{ fontSize: '24px', fontWeight: 'bold' }}>
            <span style={{ color: 'blue' }}>{currentComment.label}</span>
            <span style={{ fontWeight: 'normal' }}>
              {` (${formatTime(currentComment.timeStart)} - ${formatTime(currentComment.timeEnd)})`}
            </span>
          </Text>
          <Text style={{ fontSize: '24px', fontWeight: 'bold', fontStyle: 'italic' }}>
            "{currentComment.text}"
          </Text>
        </>
      ) : (
        <Text style={{ fontSize: '24px', fontWeight: 'bold' }}>
          No comment for the current time
        </Text>
      )}
    </Paper>
  );
};

export default CurrentCommentDisplay;
