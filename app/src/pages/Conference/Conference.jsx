import DashboardLayout from '../../layout/DashboardLayout/DashboardLayout';
import ConferenceNavbar from '../../components/ConferenceNavbar/ConferenceNavbar';
import React from 'react';
import TimelineVertical from '../../components/TimelineVertical/TimelineVertical';

const Conference = () => {
  const Timeline = [
    { name: 'conference-room-1', label: 'Conference Room 1' },
    { name: 'conference-room-2', label: 'Conference Room 2' },
    { name: 'brainstorm-room', label: 'Brainstorm Room' },
  ];
  return (
    <DashboardLayout>
      <ConferenceNavbar />
      <TimelineVertical title={Timeline} />
    </DashboardLayout>
  );
};

export default Conference;
