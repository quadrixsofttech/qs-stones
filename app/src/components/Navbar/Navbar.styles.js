const wrapper = {
  bg: 'white',
  color: 'gray.600',
  minH: '60px',
  py: 2,
  paddingRight: 4,
  borderBottom: 1,
  borderStyle: 'solid',
  borderColor: 'gray.200',
  align: 'center',
  zIndex: 2,
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  justifyContent: 'space-between',
};

const logo = {
  textAlign: 'left',
  fontFamily: 'heading',
  color: 'blue.400',
  fontSize: '3xl',
  lineHeight: '1',
  alignItems: 'center',
  width: '48',
  justifyContent: 'center',
};

const logoText = {
  color: 'gray.700',
  fontWeight: 'black',
  ml: 2,
  mt: -1,
};

const buttonWrapper = {
  flex: { base: 0, md: 0, sm: 0 },
  justify: 'flex-end',
  direction: 'row',
  spacing: 6,
};

const loginButton = {
  fontSize: 'sm',
  fontWeight: 400,
  variant: 'link',
};

const signupButton = {
  display: 'inline-flex',
  fontSize: 'sm',
  fontWeight: 600,
  colorScheme: 'blue',
};

const avatarWrapper = {
  flex: { base: 1, md: 0 },
  justify: 'flex-end',
  direction: 'row',
  spacing: 6,
};

const styles = {
  wrapper,
  logo,
  logoText,
  buttonWrapper,
  loginButton,
  signupButton,
  avatarWrapper,
};

export default styles;
