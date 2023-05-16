const calendarGridStyles = {
  backgroundColor: 'blackAlpha.50',
  display: 'grid',
  gridTemplateColumns: 'repeat(5, 1fr)',
};
const sixColumnGridStyles = {
  display: 'grid',
  backgroundColor: 'blackAlpha.50',
  gridTemplateColumns: 'repeat(6, 1fr)',
  justifyContent: 'center',
  alignItems: 'center',
};

const calendarContainerStyles = {
  width: '742px',
  marginBottom: '20px',
  borderRadius: '6px',
  border: '1px solid #E2E8F0',
  overflow: 'hidden',
};

const prevNextBox = {
  justifyContent: 'center',
  alignItems: 'center',
  gap: '15px',
  width: '48',
};

const calendarDayStyles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '8px',
  fontSize: 'xs',
  fontWeight: 'normal',
  color: '#333',
  border: '1px solid',
  borderColor: 'gray.200',
  backgroundColor: 'white',
};

const emptyStyles = {
  visibility: 'hidden',
};

const header = {
  backgroundColor: 'blackAlpha.50',
  borderRadius: '6px 6px 0 0',
  color: 'gray.700',
  alignItems: 'center',
};

const selectButton = {
  size: 'sm',
  width: '48',
  backgroundColor: 'white',
  borderRadius: '6px',
};

const onClickBox = {
  borderColor: 'purple.400',
};
const selectionBox = {
  justifyContent: 'space-around',
  alignItems: 'center',
  p: '10px',
};
const headingTitle = {
  p: '16px',
  size: 'sm',
  fontWeight: 'bold',
};
const popoverHeader = {
  fontSize: 'lg',
  fontWeight: 'bold',
  color: 'gray.700',
};

const popoverBox = {
  flexDirection: 'column',
  gap: '15px',
  paddingTop: '10px',
};
const calendarBox = {
  border: '1px',
  padding: '8px',
  _hover: {
    backgroundColor: 'gray.200',
  },
};
const calendarDateBox = {
  textColor: 'gray.700',
  fontWeight: 'semibold',
  marginBottom: '8px',
};
const avatarGroup = {
  gap: '2',
  size: 'sm',
  max: '2',
};

const styles = {
  calendarGridStyles,
  sixColumnGridStyles,
  calendarContainerStyles,
  prevNextBox,
  calendarDayStyles,
  emptyStyles,
  header,
  selectButton,
  onClickBox,
  selectionBox,
  headingTitle,
  popoverHeader,
  popoverBox,
  calendarBox,
  calendarDateBox,
  avatarGroup,
};

export default styles;
