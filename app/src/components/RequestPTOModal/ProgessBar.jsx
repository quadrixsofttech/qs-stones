import { Box, Flex, Progress } from '@chakra-ui/react';
import styles from './RequestPTOModal.styles';

const ProgressBar = ({ isCurrentPageRemote }) => {
  const progress = isCurrentPageRemote
    ? {
        step: '1/2',
        procent: '45',
      }
    : {
        step: '2/2',
        procent: '95',
      };
  return (
    <Flex {...styles.progress}>
      <Box>{progress.step}</Box>
      <Progress
        hasStripe
        value={progress.procent}
        flex={1}
        colorScheme="purple"
      />
    </Flex>
  );
};
export default ProgressBar;
