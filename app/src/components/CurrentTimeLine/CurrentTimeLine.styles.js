const currentTimeBox = {
  width: 'calc(100% - 58px)',
  right: '0',
  backgroundColor: 'purple.500',
  height: '0.5',
  alignItems: 'center',
  position: 'absolute',
  zIndex: 10,
};
const currentTimeBoxVertical = {
  width: '0.5',
  backgroundColor: 'purple.500',
  height: 'calc(100% - 44px)',
  bottom: 0,
  alignItems: 'center',
  position: 'absolute',
  zIndex: 10,
};
const circle = {
  height: '2',
  width: '2',
  borderRadius: '50%',
  backgroundColor: 'purple.500',
  ml: '-1',
};
const time = {
  ml: '-14',
  fontSize: 'xs',
  color: 'purple.500',
  pl: '2',
};
const timeVertical = {
  mt: '-9',
  fontSize: 'xs',
  color: 'purple.500',
};

const circleVertical = {
  height: '2',
  width: '2',
  borderRadius: '50%',
  backgroundColor: 'purple.500',
  mt: '-1',
};
const styles = {
  currentTimeBox,
  circle,
  time,
  currentTimeBoxVertical,
  timeVertical,
  circleVertical,
};
export default styles;
