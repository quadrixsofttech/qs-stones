import TimelineHorizontal from './TimelineHorizontal/TimelineHorizontal';
import TimelineVertical from './TimelineVertical/TimelineVertical';

const Timeline = ({ type = 'vertical', ...rest }) => {
  const TimelineComponents = {
    horizontal: TimelineHorizontal,
    vertical: TimelineVertical,
  };

  const TimelineComponent = TimelineComponents[type];

  return <TimelineComponent {...rest} />;
};

export default Timeline;
