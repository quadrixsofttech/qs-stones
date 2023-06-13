import DashboardLayout from '../../layout/DashboardLayout/DashboardLayout';
import ConferenceNavbar from '../../components/ConferenceNavbar/ConferenceNavbar';
import React from 'react';
import TimelineVertical from '../../components/TimelineVertical/TimelineVertical';
import { Box } from '@chakra-ui/react';

const Conference = () => {
  const Timeline = [
    { name: 'conference-room-1', label: 'Conference Room 1' },
    { name: 'conference-room-2', label: 'Conference Room 2' },
    { name: 'brainstorm-room', label: 'Brainstorm Room' },
  ];

  const data = [
    {
      id: '123456',
      enabled: true,
      column: 'conference-room-1',
      start: '08:00',
      end: '09:30',
      title: 'MAXP meeting',
      description: 'Sastanak sa partnerima, vezan za MAXP projekat',
      color: 'blue.400',
      user: {
        image: 'https://i.pravatar.cc/24',
        name: 'Mark Chendler',
      },
    },
    {
      id: '123457',
      enabled: true,
      column: 'conference-room-1',
      start: '11:00',
      end: '12:15',
      title: 'Branding meeting',
      description: 'This description should be hidden',
      color: 'blue.400',
      user: {
        image: 'https://i.pravatar.cc/24',
        name: 'Mark Chendler',
      },
    },
    {
      id: '123458',
      enabled: false,
      column: 'conference-room-1',
      start: '10:15',
      end: '11:00',
      title: 'mDrafty Daily',
      description: 'Refaktorisanje koda',
      color: 'blue.400',
      user: {
        image: 'https://i.pravatar.cc/24',
        name: 'Igor Stosic',
      },
    },
    {
      id: '123459',
      enabled: false,
      column: 'conference-room-2',
      start: '09:30',
      end: '11:00',
      title: 'HR meetings',
      description: 'Sastanci sa buducim praktikantima',
      color: 'blue.400',
      user: {
        image: 'https://i.pravatar.cc/24',
        name: 'Marija Stosic',
      },
    },
    {
      id: '123460',
      enabled: true,
      column: 'brainstorm-room',
      start: '09:00',
      end: '11:00',
      title: 'Marketing',
      description:
        'Definisanje marketing strategije za jun mesec, diskusija oko kampanja, Dogovor oko dizajna...',
      color: 'red.400',
      user: {
        image: 'https://i.pravatar.cc/24',
        name: 'Mark Chendler',
      },
    },
  ];
  return (
    <DashboardLayout Padding="0">
      <ConferenceNavbar />
      <TimelineVertical title={Timeline} data={data} />
    </DashboardLayout>
  );
};

export default Conference;