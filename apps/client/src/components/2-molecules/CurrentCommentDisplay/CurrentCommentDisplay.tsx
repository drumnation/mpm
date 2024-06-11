import React, { memo } from 'react';
import { Paper, Text } from '@mantine/core';
import { Comment } from '@components/3-organisms/Player/Player.types.js';
import { formatTime } from '@/library/helpers.js';
interface CurrentCommentDisplayProps {
  currentTime: number;
  comments: Comment[];
}

const CurrentCommentDisplay: React.FC<CurrentCommentDisplayProps> = ({ currentTime, comments }) => {
  const currentComment = comments.find(comment => currentTime >= comment.timeStart && currentTime <= comment.timeEnd);

  return (
    <Paper shadow='xs' withBorder style={{ padding: 20, textAlign: 'center' }}>
      {currentComment ? (
        <>
          <Text style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: 15, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 40,
              height: 40,
              borderRadius: '50%',
              backgroundColor: 'blue',
              color: 'white',
              fontSize: '16px',
              marginRight: 10
            }}>
              {currentComment.label}
            </span>
            <Text style={{ fontWeight: 'normal' }}>
              {` (${formatTime(currentComment.timeStart)} → ${formatTime(currentComment.timeEnd)})`}
            </Text>
          </Text>
          <Text style={{ fontSize: '20px', fontWeight: 'bold', fontStyle: 'italic' }}>
            "{currentComment.text}"
          </Text>
        </>
      ) : (
        <Text style={{ fontSize: '24px', fontWeight: 'bold' }}>
          No comments available at the current time.
        </Text>
      )}
    </Paper>
  );
};

export default memo(CurrentCommentDisplay);
