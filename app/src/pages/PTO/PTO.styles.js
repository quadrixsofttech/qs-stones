import { FaRegCalendarPlus } from 'react-icons/fa';

const button = {
    leftIcon: <FaRegCalendarPlus style={{ fontSize: '12'}}  />,
    colorScheme: 'purple',
    lineHeight: '28',
    fontSize:'18',
    size : 'lg',
    fontFamily: "'Inter', sans-serif",
    fontWeight: 500,
    paddingLeft: 6,
    paddingRight: 6,
    overflow: 'hidden'
};

const heading = {
    fontSize: '24',
    fontFamily: "'Inter',sans-serif",
    fontWeight: 700,
    paddingTop: '2',
    paddingLeft: '1'
}


const styles = {
    button,
    heading,
}

export default styles;