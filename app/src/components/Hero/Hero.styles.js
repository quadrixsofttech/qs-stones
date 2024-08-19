const wrapper = {
  w: 'full',
  mt: '-60px',
  backgroundImage: 'url(../../../../../public/images/qs-stones-HOME.jpg)',
  backgroundSize: 'contain',
  backgroundPosition: 'center',
};

const vStack = {
  w: 'full',
  justify: 'center',
  px: { base: 4, md: 8 },
  bgGradient: 'linear(to-r, blackAlpha.600, transparent)',
};

const content = {
  maxW: '2xl',
  align: 'flex-start',
  spacing: 6,
};

const title = {
  color: 'white',
  fontWeight: 700,
  lineHeight: 1.2,
  fontSize: { base: '3xl', md: '4xl' },
};

const button = {
  px: 8,
  colorScheme: 'blue',
  rounded: 'full',
  color: 'white',
};

const styles = {
  wrapper,
  vStack,
  content,
  title,
  button,
};

export default styles;
