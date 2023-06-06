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
  backgroundColor: 'white',
  flexDir: 'column',
  width: 'calc(50% - 16px)',
  height: '37.5vh',
  borderRadius: '6px',
  border: '1px',
  borderColor: 'gray.200',
  overflow: 'hidden',
  _hover: {
    '& img': {
      transform: 'scale(1.2)',
    },
    '.see-availability': {
      visibility: 'visible',
      opacity: 1,
    },
    '.icon-box': {
      visibility: 'hidden',
    },
  },
};

const conferenceBigCard = {
  transition: 'transform 10s',
  backgroundColor: 'white',
  flexDir: 'column',
  width: 'calc(50% - 16px)',
  height: '37.5vh',
  borderRadius: '6px',
  border: '1px',
  borderColor: 'gray.200',
  overflow: 'hidden',
};

const conferenceRoomImage = {
  transition: 'transform 0.3s',
  width: '100%',
  height: '100%',
  objectFit: 'cover',
};

const conferenceRoomInfo = {
  position: 'relative',
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

const seeAvailabilityBox = {
  justifyContent: 'center',
  alignItems: 'center',
  width: 44,
  height: '100%',
  right: 6,
  top: 0,
  position: 'absolute',
  visibility: 'hidden',
  opacity: 0,
  transition: 'opacity 0.3s ease-in',
};

const iconBox = {
  gap: 4,
  flexWrap: 'wrap',
};

const seeAvailabilityText = {
  fontSize: 'lg',
  color: 'purple.500',
  fontWeight: 'semibold',
};

const bigCard = {
  transition: 'height 0.3s ease-out, width 0.3s ease-out',
  ml: '-4',
  mt: '-50px',
  zIndex: 14,
  position: 'absolute',
  height: '108%',
  width: '101%',
};

const styles = {
  selectFloor,
  conferenceRooms,
  conferenceCard,
  conferenceRoomImage,
  conferenceRoomInfo,
  capacityInfo,
  heading,
  seeAvailabilityBox,
  iconBox,
  seeAvailabilityText,
  bigCard,
  conferenceBigCard,
};

export default styles;
