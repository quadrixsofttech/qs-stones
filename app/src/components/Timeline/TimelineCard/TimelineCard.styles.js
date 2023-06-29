const timelineCard = {
  overflow: 'hidden',
  zIndex: '10',
  width: '100%',
  backgroundColor: 'white',
  flexDir: 'column',
  borderTop: '4px',
  borderRadius: ' 2px',
  justifyContent: 'space-between',
  boxShadow: 'md',
};

const heading = {
  fontSize: 'md',
  fontWeight: '600',
  color: 'gray.700',
};
const settingsButtonBox = {
  position: 'absolute',
  right: '4',
};
const settingsButton = {
  size: 'xs',
  'aria-label': 'Options',
  borderRadius: '50px',
};
const description = {
  noOfLines: '2',
  fontSize: 'xs',
  color: 'gray.700',
};
const styles = {
  timelineCard,
  heading,
  settingsButtonBox,
  settingsButton,
  description,
};

export default styles;
