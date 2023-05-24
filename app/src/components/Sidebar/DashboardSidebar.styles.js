const sideBar = {
  width: '14.625vw',
  height: '100vh',
  borderRight: 1,
  borderStyle: 'solid',
  borderColor: 'gray.200',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  padding: '4',
  position: 'fixed',
  backgroundColor: 'white',
};

const sideBarButton = {
  width: '168px',
  height: '56px',
  borderRadius: '6px',
  color: 'gray.400',
  justifyContent: 'flex-start',
  alignItems: 'center',
  gap: '2',
  p: '4',
  _activeLink: {
    width: '168px',
    height: '56px',
    backgroundColor: 'purple.50',
    color: 'purple.700',
    borderRadius: '6px',
    p: '4',
  },
};

const styles = {
  sideBar,
  sideBarButton,
};

export default styles;
