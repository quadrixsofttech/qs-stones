import { Tag, TagCloseButton, TagLabel } from '@chakra-ui/react';
import React from 'react';

export const RenderRangeTags = ({ remotePage, range, handleClose }) => {
  if (range.length !== 2) {
    return null;
  }

  const startDate = range[0];
  const endDate = range[1];
  return (
    <Tag size="sm" fontSize="12px" borderRadius="full" colorScheme="gray">
      <TagLabel>
        {startDate.format() === endDate.format()
          ? startDate.format()
          : startDate.format() + '-' + endDate.format()}
      </TagLabel>
      <TagCloseButton onClick={handleClose} />
    </Tag>
  );
};
