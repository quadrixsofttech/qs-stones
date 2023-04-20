import { Box, Flex, Heading, Icon, Stack, Text } from '@chakra-ui/react';
import styles from './SignupLayout.styles';
import { FaReact } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const SignupLayout = ({ title, subtitle, children }) => {
  return (
    <Flex {...styles.pageWrapper}>
      <Stack {...styles.contentWrapper}>
        <Stack align={'center'}>
          <Link to="/">
            <Icon as={FaReact} {...styles.logo}></Icon>
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
