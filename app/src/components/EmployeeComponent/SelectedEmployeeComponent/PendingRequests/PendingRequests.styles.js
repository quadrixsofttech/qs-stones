const pendingRequestBox = {
  flex: '1',
  flexDir: 'column',
  p: '2',
  overflowY: 'auto',
  height: '100%',
};
const requestBox = {
  border: '1px',
  borderColor: 'gray.200',
  rounded: 'md',
  mb: '2',
  pt: '2',
  pl: 4,
  pr: 4,
  flexDir: 'column',
};
const infoBox = {
  flex: '1',
  justify: 'space-between',
  p: '0',
};
const approveButton = {
  width: '24',
  height: '10',
  rounded: 'md',
  colorScheme: 'green',
};
const rejectButton = {
  width: '24',
  height: '10',
  rounded: 'md',
  colorScheme: 'red',
};

const styles = {
  pendingRequestBox,
  requestBox,
  infoBox,
  approveButton,
  rejectButton,
};

export default styles;
