import { Box } from '@chakra-ui/react';
import Icon from 'react-multi-date-picker/components/icon';

export default function CustomMultipleInput({ openCalendar, value, iconName }) {
  return (
    <Box onClick={openCalendar}>
      <input
        value={value}
        style={{
          border: '1px solid gray',
          borderRadius: '0.2em',
          width: '100%',
          padding: '2px',
        }}
      />
      <Icon
        as={iconName}
        boxSize={'4'}
        style={{ position: 'relative', bottom: '1.5rem', left: '14.5rem' }}
      />
    </Box>
  );
}
