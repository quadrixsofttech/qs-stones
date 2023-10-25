const selectFloor = {
  width: 36,
  height: 8,
  color: 'gray.700',
  fontSize: 'sm',
  mr: 4,
};

const mealCard = {
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

const mealImage = {
  transition: 'transform 0.3s',
  width: '100%',
  height: '100%',
  objectFit: 'cover',
};

const mealInfo = {
  position: 'relative',
  justifyContent: 'space-between',
  alignItems: 'center',
  m: '4',
  ml: '6',
  pt: '2',
  pb: '1',
};

const typeInfo = {
  fontSize: 'sm',
  color: 'gray.500',
  fontWeight: '500',
  lineHeight: '5',
};

const heading = {
  fontSize: 'lg',
  color: 'gray.700',
  mt: "1"
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
const mealGrid = {
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
  size: 'lg',
};

const mealInfoBold = {
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

const mealInfoBox = {
  mt: '8',
  ml: '20',
  flexDir: 'column',
};

const seeChooseBoxButton = {
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

const buttonChooseMeal = {
  lineHeight: '28',
  fontSize: '18',
  size: 'lg',
  fontFamily: "'Inter', sans-serif",
  fontWeight: 500,
  paddingLeft: 6,
  paddingRight: 6,
  overflow: 'hidden',
};

const styles = {
  selectFloor,
  mealCard,
  mealImage,
  mealInfo,
  typeInfo,
  heading,
  seeAvailabilityBox,
  iconBox,
  seeAvailabilityText,
  mealGrid,
  modalBox,
  modalInfoContent,
  modalHeading,
  mealInfoBold,
  iconGridItem,
  textUnderIcon,
  mealInfoBox,
  seeChooseBoxButton,
  tag,
  closeButton,
  modalImageBox,
  conferenceNumber,
  buttonChooseMeal
};

export default styles;
