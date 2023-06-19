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
  m: '4',
  ml: '6',
  pt: '2',
  pb: '1',
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
const tag = {
  position: 'absolute',
  ml: '4',
  mt: '4',
  backgroundColor: 'purple.100',
  color: 'purple.800',
};
const closeButton = {
  right: '0',
  mr: '4',
  mt: '4',
  position: 'absolute',
  backgroundColor: 'blackAlpha.500',
  color: 'white',
  _hover: {
    backgroundColor: 'blackAlpha.700',
  },
};
const modalImageBox = {
  position: 'relative',
  overflow: 'hidden',
  sx: { aspectRatio: '16/6' },
};
const conferenceNumber = {
  borderBottom: '2px',
  borderColor: 'gray.700',
  marginRight: '1',
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
  tag,
  closeButton,
  modalImageBox,
  conferenceNumber,
};

export default styles;
