import React, { useState } from 'react';

import { Button, TextArea } from '@gravity-ui/uikit';

import { Container } from 'src/components/atoms/Container';

import type { Nullable } from 'src/shared/types/global';

type CommentReplyProps = {
  parentId: Nullable<number>;
  onCancel?: () => void;
};

export const CommentReply: React.FC<CommentReplyProps> = ({ parentId, onCancel }) => {
  const [replyContent, setReplyContent] = useState('');

  const handleSubmit = () => {
    console.log(`Comment with message was submit: ${replyContent}`);

    if (parentId) {
      console.log(`Parent ID: ${parentId}`);
    }
  };

  const handleCancel = () => {
    onCancel && onCancel();
    setReplyContent('');
  };

  return (
    <Container direction='column' gap={2}>
      <TextArea
        placeholder='Write a reply...'
        value={replyContent}
        onChange={e => setReplyContent(e.target.value)}
        rows={3}
        style={{ width: '100%' }}
      />
      <Container justifyContent='flex-end' gap={2}>
        <Button view='flat' size='s' onClick={handleCancel}>
          Cancel
        </Button>
        <Button view='action' size='s' onClick={handleSubmit}>
          Submit Reply
        </Button>
      </Container>
    </Container>
  );
};
