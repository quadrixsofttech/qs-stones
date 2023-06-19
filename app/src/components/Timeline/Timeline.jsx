import TimelineHorizontal from '../TimelineHorizontal/TimelineHorizontal';
import TimelineVertical from '../TimelineVertical/TimelineVertical';

const Timeline = ({ type = 'vertical', data, title }) => {
  return type === 'horizontal' ? (
    <TimelineHorizontal data={data} title={title} />
  ) : (
    <TimelineVertical data={data} title={title} />
  );
};

export default Timeline;
