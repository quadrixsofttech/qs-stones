const calendarGridStyles = {
  display: 'grid',
  gridTemplateColumns: 'repeat(5, 1fr)',
};
const sixColumnGridStyles = {
  display: 'grid',
  gridTemplateColumns: 'repeat(6, 1fr)',
  justifyContent: 'center',
  alignItems: 'center',
};

const calendarContainerStyles = {
  width: '742px',
  marginBottom: '20px',
  backgroundColor: '#fff',
  borderRadius: '10px',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
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
};

const emptyStyles = {
  visibility: 'hidden',
};

const header = {
  backgroundColor: 'blackAlpha.50',
  borderRadius: '10px 10px 0 0',
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
