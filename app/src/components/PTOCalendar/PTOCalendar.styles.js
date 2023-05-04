const calendarGridStyles = {
  display: 'grid',
  gridTemplateColumns: 'repeat(5, 1fr)',
  gridGap: '10px',
};
const sixColumnGridStyles = {
  display: 'grid',
  gridTemplateColumns: 'repeat(6, 1fr)',
  gap: '1rem',
  justifyContent: 'center',
  alignItems: 'center',
};

const calendarContainerStyles = {
  maxWidth: '800px',
  margin: '0 auto',
  padding: '20px',
  backgroundColor: '#fff',
  borderRadius: '10px',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
};

const calendarHeaderStyles = {
  justifyContent: 'space-between',
  alignItems: 'center',
};

const calendarDayStyles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '60px',
  borderRadius: '10px',
  fontSize: 'xs',
  fontWeight: 'bold',
  color: '#333',
};

const emptyStyles = {
  visibility: 'hidden',
};

const styles = {
  calendarGridStyles,
  sixColumnGridStyles,
  calendarContainerStyles,
  calendarHeaderStyles,
  calendarDayStyles,
  emptyStyles,
};

export default styles;
