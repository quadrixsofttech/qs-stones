const timelineGrid = {
  templateRows: 'repeat(37, 1fr)',
  backgroundColor: 'gray.200',
  gap: '1px',
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
  pt: '4',
};
const timeIntervalBox = {
  templateRows: 'repeat(37, 1fr)',
  templateColumns: 'repeat(1, 1fr)',
  h: '100%',
  backgroundColor: 'gray.200',
};
const timeIntervalText = {
  color: 'gray.700',
  fontSize: 'sm',
};
const timelineColumn = {
  templateRows: 'repeat(37, 1fr)',
  templateColumns: 'repeat(1, 1fr)',
  gap: '1px',
  height: '100%',
  position: 'relative',
};
const timelineGridBox = {
  backgroundColor: 'gray.50',
  rowSpan: 1,
  p: 4,
};
const timelineCard = {
  position: 'absolute',
  mt: '1px',
  height: 'calc(100% - 2px)',
  width: 'calc(100% - 32px)',
  ml: '16px',
  backgroundColor: 'black',
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
};

export default styles;