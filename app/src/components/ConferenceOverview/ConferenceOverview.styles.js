const selectFloor = {
  width: 36,
  height: 8,
  color: 'gray.700',
  fontSize: 'sm',
  mr: 4,
};

const conferenceRooms = {
  mt: '4',
  ml: '4',
  flexWrap: 'wrap',
  gap: 4,
};

const conferenceCard = {
  flexDir: 'column',
  width: 'calc(50% - 16px)',
  height: '37vh',
  borderRadius: '6px',
  border: '1px',
  borderColor: 'gray.200',
  overflow: 'hidden',
  _hover: {
    '& img': {
      transform: 'scale(1.2)',
    },
  },
};

const conferenceRoomImage = {
  transition: 'transform 0.3s',
  width: '100%',
  height: '100%',
  objectFit: 'cover',
};

const conferenceRoomInfo = {
  justifyContent: 'space-between',
  alignItems: 'center',
  p: '4',
  pl: '6',
  gap: '4',
  mt: '2',
  mb: '2',
};

const capacityInfo = {
  fontSize: 'sm',
  color: 'gray.500',
  fontWeight: '500',
};

const heading = {
  fontSize: 'xl',
  color: 'gray.700',
  fontWeight: '700',
};

const styles = {
  selectFloor,
  conferenceRooms,
  conferenceCard,
  conferenceRoomImage,
  conferenceRoomInfo,
  capacityInfo,
  heading,
};

export default styles;
