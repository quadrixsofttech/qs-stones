const selectFloor = {
  width: 36,
  height: 8,
  color: 'gray.700',
  fontSize: 'sm',
  mr: 4,
};

const conferenceCard = {
  backgroundColor: 'white',
  flexDir: 'column',
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
  p: '5',
  gap: '4',
};

const capacityInfo = {
  fontSize: 'sm',
  color: 'gray.500',
  fontWeight: '500',
  lineHeight: '5',
};

const heading = {
  fontSize: 'lg',
  color: 'gray.700',
  fontWeight: 'bold',
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
const conferenceRoomGrid = {
  templateColumns: 'repeat(2, 1fr)',
  gap: 4,
  m: 4,
  mb: 0,
};

const modalBox = {
  backgroundColor: 'white',
  flexDir: 'column',
  width: '68vw',
  borderRadius: '6px',
  overflow: 'hidden',
};
const modalInfoContent = {
  flexDir: 'column',
  p: '8',
};
const modalHeading = {
  color: 'gray.700',
  size: 'xl',
};

const capacityBold = {
  fontSize: 'lg',
  fontWeight: '600',
  color: 'gray.500',
};
const iconGridItem = {
  flexDir: 'column',
  alignItems: 'center',
  width: '24',
};

const textUnderIcon = {
  color: 'gray.400',
  fontSize: 'sm',
  textAlign: 'center',
};

const capacityInfoBox = {
  mt: '4',
  ml: '20',
  flexDir: 'column',
};

const seeAvailabilityBoxButton = {
  backgroundColor: 'purple.500',
  color: 'white',
  width: '36',
  height: '12',
  _hover: {
    backgroundColor: 'purple.700',
  },
};

const styles = {
  selectFloor,
  conferenceCard,
  conferenceRoomImage,
  conferenceRoomInfo,
  capacityInfo,
  heading,
  seeAvailabilityBox,
  iconBox,
  seeAvailabilityText,
  conferenceRoomGrid,
  modalBox,
  modalInfoContent,
  modalHeading,
  capacityBold,
  iconGridItem,
  textUnderIcon,
  capacityInfoBox,
  seeAvailabilityBoxButton,
};

export default styles;
