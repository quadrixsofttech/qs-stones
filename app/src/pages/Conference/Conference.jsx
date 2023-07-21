import DashboardLayout from '../../layout/DashboardLayout/DashboardLayout';
import ConferenceNavbar from '../../components/ConferenceNavbar/ConferenceNavbar';
import React, { useState } from 'react';
import Timeline from '../../components/Timeline/Timeline';
import ConferenceCalendarNavbar from '../../components/ConferenceNavbar/ConferenceCalendarNavbar';
import { Divider, useDisclosure } from '@chakra-ui/react';
import ConferenceRoomReservationModal from '../../components/ConferenceRoomReservationModal';
import moment from 'moment';

const Conference = () => {
  const [timelineOrientation, setTimelineOrientation] = useState('vertical');
  const [timelineFilter, setTimelineFilter] = useState('');
  const modalDisclosure = useDisclosure();
  const [modalData, setModalData] = useState(null);
  const [date, setDate] = useState(moment());
  const [floor, setFloor] = useState('Upper floor');

  const Label = [
    {
      name: 'conference-room-1',
      number: '01',
      label: 'Conference Room 1',
    },
    { name: 'conference-room-2', label: 'Conference Room 2', number: '02' },
    { name: 'brainstorm-room', label: 'Brainstorm Room', number: '03' },
  ];

  const data = [
    {
      id: '123456',
      enabled: true,
      column: 'conference-room-1',
      start: '08:15',
      end: '08:30',
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
      enabled: true,
      column: 'conference-room-1',
      start: '09:00',
      end: '10:15',
      title: 'mDrafty Daily',
      description:
        'Refaktorisanje koda Definisanje marketing strategije za jun mesec, diskusija oko kampanjaDefinisanje marketing strategije za jun mesec, diskusija oko kampanjaDefinisanje marketing strategije za jun mesec, diskusija oko kampanja',
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
      start: '08:30',
      end: '09:45',
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
      start: '08:15',
      end: '10:00',
      title: 'Marketing',
      description:
        'Definisanje marketing strategije Definisanje marketing strategije za jun mesec, diskusija oko kampanjaDefinisanje marketing strategije za jun mesec, diskusija oko kampanjaDefinisanje marketing strategije za jun mesec, diskusija oko kampanjaza jun mesec, diskusija oko kampanja, Dogovor oko dizajna...',
      color: 'red.400',
      user: {
        image: 'https://i.pravatar.cc/24',
        name: 'Mark Chendler',
      },
    },
  ];
  const handleEdit = (id) => {
    console.log('Edit' + id);
  };
  const handleDelete = (id) => {
    console.log('Delete' + id);
  };
  const handleOpen = (id) => {
    const filteredData = data?.find((room) => room.id === id);
    setModalData(filteredData);
    modalDisclosure.onOpen();
  };

  return (
    <DashboardLayout Padding="0">
      <ConferenceNavbar />
      <ConferenceCalendarNavbar
        timelineOrientation={timelineOrientation}
        setTimelineOrientation={setTimelineOrientation}
        setTimelineFilter={setTimelineFilter}
        timelineFilter={timelineFilter}
        setDate={setDate}
        floor={floor}
        setFloor={setFloor}
      />
      <Divider />
      <Timeline
        type={timelineOrientation}
        title={Label}
        data={data}
        startHour="08:00"
        endHour="17:00"
        onOpen={handleOpen}
        onEdit={handleEdit}
        onDelete={handleDelete}
        timelineFilter={timelineFilter}
      />
      <ConferenceRoomReservationModal
        isOpen={modalDisclosure.isOpen}
        onClose={modalDisclosure.onClose}
        data={modalData}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </DashboardLayout>
  );
};

export default Conference;
