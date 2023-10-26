import MealReviewCard from './MealReviewCard';
import { Tag, Text, Flex } from '@chakra-ui/react';
import styles from './ReviewStep.styles';
import moment from 'moment';

const ReviewStep = ({ meal, salad, date, bread }) => {
  return (
    <>
      <Flex>
        <Text {...styles.dateText}>Date: </Text>
        <Tag {...styles.rangeTag}>
          {date === '' ? new moment().format('YYYY/MM/DD') : date}
        </Tag>
      </Flex>
      <MealReviewCard meal={meal} bread={bread} />
      {!!salad && <MealReviewCard meal={salad} />}
    </>
  );
};

export default ReviewStep;
