const mainBox = {
  flexDir: 'column',
  height: '100%',
  overflowY: 'auto',
  pl: 4,
  pr: 4,
  pt: 2,
};
const requestHistoryBox = {
  borderBottom: '1px ',
  // borderTop: '1px ',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: 8,
  _hover: {
    backgroundColor: 'gray.100',
  },
};
const createdAt = {
  fontSize: 'sm',
  color: 'gray.700',
  whiteSpace: 'nowrap',
};
const divider = {
  orientation: 'vertical',
  height: '80%',
  m: '1',
};
const dates = {
  noOfLines: '1',
  fontSize: 'sm',
  fontWeight: '600',
};
const statusBox = {
  alignItems: 'center',
  gap: '1',
  ml: '5',
};
const styles = {
  mainBox,
  requestHistoryBox,
  createdAt,
  divider,
  dates,
  statusBox,
};

export default styles;
