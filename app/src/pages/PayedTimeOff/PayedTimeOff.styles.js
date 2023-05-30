import { FaRegCalendarPlus } from 'react-icons/fa';

const button = {
  leftIcon: <FaRegCalendarPlus style={{ fontSize: '12' }} />,
  colorScheme: 'purple',
  lineHeight: '28',
  fontSize: '18',
  size: 'lg',
  fontFamily: "'Inter', sans-serif",
  fontWeight: 500,
  paddingLeft: 6,
  paddingRight: 6,
  overflow: 'hidden',
};

const heading = {
  fontSize: '24',
  fontFamily: "'Inter',sans-serif",
  fontWeight: 700,
  paddingTop: '2',
  paddingLeft: '1',
};

const modalHeader = {
  fontFamily: 'Inter',
  fontWeight: '700',
};

const buttonNext = {
  colorScheme: 'purple',
  ml: 3,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '6rem',
};

const modalContent = {
  maxW:'700px',
  height:'600px',
  maxH:'600px'
}
const styles = {
  button,
  heading,
  modalHeader,
  buttonNext,
  modalContent
};

export default styles;