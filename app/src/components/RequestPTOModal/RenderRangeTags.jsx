import { Tag, TagCloseButton, TagLabel } from '@chakra-ui/react';
import styles from './RenderDates.styles';
import { formatDateRange } from '../../util';

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

  startDate = range[0];
  endDate = range[1];

  return (
    <Tag {...styles.rangeTag} variant={removable ? 'subtle' : 'outline'}>
      <TagLabel>{formatDateRange(startDate, endDate)}</TagLabel>
      {showClose && <TagCloseButton onClick={handleClose} />}
    </Tag>
  );
};
