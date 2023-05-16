import {
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
} from '@chakra-ui/react';
import styles from '../MyHistory/MyHistory.styles';

export const StatComponentMyHistory = (props) => {
  return (
    <Stat {...styles.stat}>
      <StatLabel pt={2}>{props.label}</StatLabel>
      <StatNumber>{props.working}</StatNumber>
      <StatHelpText>
        <StatArrow type={props.arrow} />
        {props.percent}{props.help_text}
      </StatHelpText>
    </Stat>
  );
};
