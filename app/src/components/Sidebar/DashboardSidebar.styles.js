const sideBar = {
  height: '100vh',
  borderRight: 1,
  borderStyle: 'solid',
  borderColor: 'gray.200',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  padding: '4',
  backgroundColor: 'white',
  position: 'relative',
};

const colapsedSidebar = {
  height: '100vh',
  borderRight: 1,
  borderStyle: 'solid',
  borderColor: 'gray.200',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  padding: '4',
  backgroundColor: 'white',
  position: 'relative',
};

const shrinker = {
  position: 'absolute',
  bottom: '3',
  right: '-4',
  w: '40px',
  h: '40px',
  justifyContent: 'end',
  alignItems: 'center',
  borderRadius: 'md',
  zIndex: '10',
};

const sideBarButton = {
  marginTop: '1',
  width: '40',
  height: '14',
  borderRadius: '6px',
  color: 'gray.600',
  justifyContent: 'flex-start',
  alignItems: 'center',
  gap: '2',
  p: '4',
  _activeLink: {
    width: '40',
    height: '14',
    backgroundColor: 'purple.50',
    color: 'purple.700',
    borderRadius: '6px',
    p: '4',
    _hover: {
      backgroundColor: 'purple.50',
    },
  },
  _hover: {
    backgroundColor: 'gray.50',
  },
};

const colapsedSideBarButton = {
  marginTop: '1',
  width: '15',
  height: '14',
  borderRadius: '6px',
  color: 'gray.600',
  justifyContent: 'flex-end',
  alignItems: 'center',
  gap: '2',
  p: '4',
  _activeLink: {
    width: '15',
    height: '14',
    backgroundColor: 'purple.50',
    color: 'purple.700',
    borderRadius: '6px',
    p: '4',
    _hover: {
      backgroundColor: 'purple.50',
    },
  },
  _hover: {
    backgroundColor: 'gray.50',
  },
};

const styles = {
  sideBar,
  sideBarButton,
  colapsedSidebar,
  colapsedSideBarButton,
  shrinker,
};

export default styles;
