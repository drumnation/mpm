import { Comment } from '@components/3-organisms/Player/Player.types.js';

export const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

export function isString(value: any): value is string {
  return typeof value === 'string';
}

export const regenerateLetters = (comments: Comment[]): Comment[] => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const sortedComments = [...comments].sort((a, b) => a.timeStart - b.timeStart);
  return sortedComments.map((comment, index) => ({
    ...comment,
    label: alphabet[index % 26],
  }));
};

export const handleKeyDownPreventSpecificKeys = (event: React.KeyboardEvent<HTMLElement>) => {
  const { key, shiftKey } = event;

  if (
    key === ' ' ||
    (!shiftKey && (key === 'a' || key === 'd')) ||
    key === 'ArrowLeft' ||
    key === 'ArrowRight'
  ) {
    event.stopPropagation();
  }
};
