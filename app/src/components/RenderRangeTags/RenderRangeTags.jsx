import { Tag, TagCloseButton, TagLabel } from '@chakra-ui/react';
import React from 'react';

export const RenderRangeTags = ({
  isCurrentPageRemote,
  range,
  styleChange = false,
  handleClose,
}) => {
  if (range.length !== 2) {
    return null;
  }

  const startDate = range[0];
  const endDate = range[1];
  return (
    <Tag
      size="sm"
      fontSize="12px"
      borderRadius="full"
      variant={styleChange || isCurrentPageRemote ? 'subtle' : 'outline'}
      colorScheme="gray"
    >
      <TagLabel>
        {startDate.format()} - {endDate.format()}
      </TagLabel>
      {(isCurrentPageRemote || styleChange) && (
        <TagCloseButton onClick={() => handleClose(range, styleChange)} />
      )}
    </Tag>
  );
};
