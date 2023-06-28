const timelineCard = {
  position: 'relative',
  zIndex: '10',
  width: '100%',
  height: '100%',
  backgroundColor: 'white',
  flexDir: 'column',
  borderTop: '4px',
  borderRadius: ' 2px',
  p: '4',
  justifyContent: 'space-between',
  boxShadow: 'md',
};

const heading = {
  size: 'md',
  fontWeight: '600',
  color: 'gray.700',
};
const settingsButtonBox = {
  position: 'absolute',
  right: '4',
  top: '4',
};
const settingsButton = {
  size: 'xs',
  'aria-label': 'Options',
  borderRadius: '50px',
};
const styles = {
  timelineCard,
  heading,
  settingsButtonBox,
  settingsButton,
};

export default styles;
