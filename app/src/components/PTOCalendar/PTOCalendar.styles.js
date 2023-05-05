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
  width: '200px',
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
  width: '200px',
  backgroundColor: 'white',
  borderRadius: '6px',
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
};

export default styles;
