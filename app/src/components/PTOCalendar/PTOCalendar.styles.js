const calendarGridStyles = {
  display: 'grid',
  backgroundColor: 'blackAlpha.50',
  gridTemplateColumns: 'repeat(5, 1fr)',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '1px',
};
const sixColumnGridStyles = {
  display: 'grid',
  backgroundColor: 'blackAlpha.50',
  gridTemplateColumns: 'repeat(6, 1fr)',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '1px',
};

const calendarContainerStyles = {
  width: '59vw',
  marginBottom: '5',
  rounded: '3',
  border: '1px solid #E2E8F0',
  overflow: 'hidden',
};

const prevNextBox = {
  justifyContent: 'center',
  alignItems: 'center',
  gap: '4',
  width: '48',
};

const calendarDayStyles = {
  marginTop: '1px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '2',
  fontSize: 'xs',
  fontWeight: 'normal',
  color: '#333',
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
  rounded: '3',
};

const onClickBox = {
  borderColor: 'purple.400',
};
const selectionBox = {
  justifyContent: 'space-around',
  alignItems: 'center',
  p: '2.5',
};
const headingTitle = {
  p: '4',
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
  gap: '4',
  paddingTop: '2.5',
  zIndex: '50',
};
const calendarBox = {
  padding: '2',
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
