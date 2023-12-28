import { Stat, StatLabel, StatNumber } from '@chakra-ui/react';
import styles from './MyHistory.styles';

export const MyHistoryStats = ({ label, userCount }) => {
  return (
    <Stat {...styles.stat}>
      <StatLabel pt={2}>{label}</StatLabel>
      <StatNumber>{userCount}</StatNumber>
    </Stat>
  );
};
