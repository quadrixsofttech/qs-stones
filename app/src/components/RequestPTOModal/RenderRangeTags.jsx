import { Tag, TagCloseButton, TagLabel } from '@chakra-ui/react';
import React from 'react';
import styles from './RenderDates.styles';
import moment from 'moment';

export const RenderRangeTags = ({
  range,
  showClose = true,
  handleClose,
  removable = true,
}) => {
  if (range.length !== 2) {
    return null;
  }

  var startDate;
  var endDate;
  if (typeof range[0] == 'string') {
    startDate = moment(parseInt(range[0]));
    endDate = moment(parseInt(range[1]));
  } else {
    startDate = range[0];
    endDate = range[1];
  }
  return (
    <Tag {...styles.rangeTag} variant={removable ? 'subtle' : 'outline'}>
      <TagLabel>
        {startDate.format('YYYY/MM/DD') === endDate.format('YYYY/MM/DD')
          ? startDate.format('YYYY/MM/DD')
          : startDate.format('YYYY/MM/DD') + '-' + endDate.format('YYYY/MM/DD')}
      </TagLabel>
      {showClose && <TagCloseButton onClick={handleClose} />}
    </Tag>
  );
};
