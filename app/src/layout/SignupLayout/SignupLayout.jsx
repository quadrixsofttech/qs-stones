import { Box, Flex, Heading, Icon, Stack, Text } from '@chakra-ui/react';
import styles from './SignupLayout.styles';
import { Link } from 'react-router-dom';
import { QuadrixSoftLogoSmall } from '../../components/QuadrixSoftLogo';

const SignupLayout = ({ title, subtitle, children }) => {
  return (
    <Flex {...styles.pageWrapper}>
      <Stack {...styles.contentWrapper}>
        <Stack align={'center'}>
          <Link to="/">
            <Icon as={QuadrixSoftLogoSmall} {...styles.logo}></Icon>
          </Link>
          <Heading fontSize={'4xl'}>{title}</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            {subtitle}
          </Text>
        </Stack>
        <Box {...styles.card}>{children}</Box>
      </Stack>
    </Flex>
  );
};

export default SignupLayout;
