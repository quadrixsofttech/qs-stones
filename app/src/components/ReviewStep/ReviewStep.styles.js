const mealCard = {
  backgroundColor: 'white',
  flexDir: 'column',
  borderRadius: '6px',
  border: '1px',
  borderColor: 'gray.200',
  overflow: 'hidden',
  mt: '20px',
  mb: '20px',
  width: '50%',
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
  ml: '4'
};

const mealImage = {
  transition: 'transform 0.3s',
  width: '100%',
  height: '100%',
  objectFit: 'cover',
};

const modalHeading = {
  ml: '10px',
  color: 'gray.700',
  size: 'lg',
};

const heading = {
  fontSize: 'lg',
  color: 'gray.700',
  mt: '1',
};

const typeInfo = {
  fontSize: 'lg',
  color: 'gray.500',
  fontWeight: '500',
  lineHeight: '5',
  mb: '5px',
  ml: '10px',
};

const mealInfoBox = {
  mt: '5',
  ml: '0',
  flexDir: 'column',
  gap:'2'
};

const mealInfoBold = {
  fontSize: 'lg',
  fontWeight: '600',
  color: 'gray.500',
};

const rangeTag = {
  size: 'sm',
  fontSize: '18px',
  borderRadius: '6px',
  colorScheme: 'gray',
  marginRight: '2',
  marginTop: '5',
};

const dateText = {
  mt: '5',
  fontSize: '20',
  mr: '1',
  ml: '4'
}

const breadText = {
  fontSize: '18',
  fontWeight: '800',
  color: 'black',
  ml: '2',
  mt: '5'
};

const styles = {
  mealCard,
  mealImage,
  typeInfo,
  heading,
  modalHeading,
  mealInfoBold,
  mealInfoBox,
  rangeTag,
  dateText,
  breadText
};

export default styles;
