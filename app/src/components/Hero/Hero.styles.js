const wrapper = {
  w: 'full',
  h: '100vh',
  mt: '-60px',
  backgroundImage:
    'url(https://images.unsplash.com/photo-1600267175161-cfaa711b4a81?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)',
  backgroundSize: 'cover',
  backgroundPosition: 'center center',
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
