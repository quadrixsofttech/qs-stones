import { Tag, TagCloseButton, TagLabel } from '@chakra-ui/react';
import React from 'react';
import styles from './RenderDates.styles';

export const RenderRangeTags = ({ range, handleClose, removable = true }) => {
  if (range.length !== 2) {
    return null;
  }

  const startDate = range[0];
  const endDate = range[1];
  return (
    <Tag {...styles.rangeTag} variant={removable ? 'subtle' : 'outline'}>
      <TagLabel>
        {startDate.format() === endDate.format()
          ? startDate.format()
          : startDate.format() + '-' + endDate.format()}
      </TagLabel>
      {removable && <TagCloseButton onClick={handleClose} />}
    </Tag>
  );
};