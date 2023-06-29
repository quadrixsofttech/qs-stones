import TimelineHorizontal from './TimelineHorizontal/TimelineHorizontal';
import TimelineVertical from './TimelineVertical/TimelineVertical';

const Timeline = ({
  type = 'vertical',
  data,
  title,
  startHour,
  endHour,
  onOpen,
  onEdit,
  onDelete,
}) => {
  return type === 'horizontal' ? (
    <TimelineHorizontal
      data={data}
      title={title}
      startHour={startHour}
      endHour={endHour}
      onOpen={onOpen}
      onEdit={onEdit}
      onDelete={onDelete}
    />
  ) : (
    <TimelineVertical
      data={data}
      title={title}
      startHour={startHour}
      endHour={endHour}
      onOpen={onOpen}
      onEdit={onEdit}
      onDelete={onDelete}
    />
  );
};

export default Timeline;
