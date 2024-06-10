import { Button, Paper, Textarea } from '@mantine/core';
import React, { memo, useState } from 'react';
import { handleKeyDownPreventSpecificKeys } from '../../../library/helpers';

interface AudioCommentInputProps {
  onAddComment: (timeStart: number, timeEnd: number, text: string) => void;
  currentTime: number;
}

const AudioCommentInput: React.FC<AudioCommentInputProps> = ({ onAddComment, currentTime }) => {
  const [comment, setComment] = useState('');


  const handleAddComment = () => {
    if (comment.trim()) {
      onAddComment(currentTime, currentTime + 1, comment.trim());
      setComment('');
    }
  };

  return (
    <Paper shadow='xs' style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }} withBorder>
      <Textarea
        placeholder="Leave a comment"
        value={comment}
        onChange={(e) => setComment(e.currentTarget.value)}
        onKeyDown={handleKeyDownPreventSpecificKeys}
        rows={3}
        style={{ padding: 35, flexGrow: 1 }}
      />
      <Button onClick={handleAddComment} variant='filled' style={{ marginRight: 35, marginBottom: 20, alignSelf: 'flex-end' }}>
        Add Comment
      </Button>
    </Paper>
  );
};

export default memo(AudioCommentInput);
