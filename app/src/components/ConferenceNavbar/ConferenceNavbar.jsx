import { Flex } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import styles from './ConferenceNavbar.styles';

const ConferenceNavbar = () => {
  return (
    <Flex {...styles.navbarBox}>
      <Flex as={NavLink} end to="/conference" {...styles.linkBox}>
        Calendar
      </Flex>
      <Flex as={NavLink} end to={'/conference/overview'} {...styles.linkBox}>
        Overview
      </Flex>
    </Flex>
  );
};

export default ConferenceNavbar;
