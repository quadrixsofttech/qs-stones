import {
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
} from '@chakra-ui/react';
import styles from './MyHistory.styles';

export const MyHistoryStats = ({
  label,
  working,
  arrow,
  helpText,
  percent,
}) => {
  return (
    <Stat {...styles.stat}>
      <StatLabel pt={2}>{label}</StatLabel>
      <StatNumber>{working}</StatNumber>
      <StatHelpText>
        <StatArrow type={arrow} />
        {percent}
        {helpText}
      </StatHelpText>
    </Stat>
  );
};
