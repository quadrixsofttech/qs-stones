const timelineGrid = {
  backgroundColor: 'gray.200',
  gap: '1px',
  position: 'relative',
};
const timelineTitleBox = {
  rowSpan: 1,
  backgroundColor: 'white',
};
const titleBox = {
  backgroundColor: 'white',
  textAlign: 'center',
};
const label = {
  fontSize: 'md',
  fontWeight: '700',
  color: 'gray.700',
};
const timeIntervalBox = {
  templateColumns: 'repeat(1, 1fr)',
  h: '100%',
  backgroundColor: 'gray.200',
};
const timeIntervalText = {
  color: 'gray.700',
  fontSize: 'xs',
};
const timelineColumn = {
  templateColumns: 'repeat(1, 1fr)',
  gap: '1px',
  height: '100%',
  position: 'relative',
};
const timelineGridBox = {
  backgroundColor: 'gray.50',
  rowSpan: 1,
  p: 7,
};
const timelineCard = {
  position: 'absolute',
  zIndex: 10,
  mt: '2px',
  height: 'calc(100% - 4px)',
  width: 'calc(100% - 32px)',
  ml: '4',
};
const underlineNumber = {
  as: 'span',
  borderBottom: '2px',
  borderColor: 'gray.700',
};
const styles = {
  timelineGrid,
  timelineTitleBox,
  titleBox,
  label,
  timeIntervalBox,
  timeIntervalText,
  timelineColumn,
  timelineGridBox,
  timelineCard,
  underlineNumber,
};

export default styles;
