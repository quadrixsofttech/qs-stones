import DashboardLayout from '../../layout/DashboardLayout/DashboardLayout';
import ConferenceNavbar from '../../components/ConferenceNavbar/ConferenceNavbar';
import React, { useState } from 'react';
import Timeline from '../../components/Timeline/Timeline';
import ConferenceCalendarNavbar from '../../components/ConferenceNavbar/ConferenceCalendarNavbar';
import { Divider, Flex, useDisclosure } from '@chakra-ui/react';
import ConferenceRoomReservationModal from '../../components/ConferenceRoomReservationModal';
import DeleteAlertDialog from '../../components/DeleteAlertDialog/DeleteAlertDialog';
import moment from 'moment';
import ConferenceDrawer from '../../components/ConferenceDrawer/ConferenceDrawer';
import styles from './Conference.styles';

const Conference = () => {
  const [timelineOrientation, setTimelineOrientation] = useState('vertical');
  const [timelineFilter, setTimelineFilter] = useState('');

  const modalDisclosure = useDisclosure();
  const drawerDisclosure = useDisclosure();
  const alertDialogDisclosure = useDisclosure();

  const [idToDelete, setIdToDelete] = useState();
  const [modalData, setModalData] = useState(null);
  const [date, setDate] = useState(moment());
  const [floor, setFloor] = useState('Upper floor');
  const [reservationData, setReservationData] = useState(null);

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
      id: '64abdc4407a59e172e853077',
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
      id: '64abdc4407a59e172e853078',
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
      id: '64abdc4407a59e172e853079',
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
      id: '64abdc4407a59e172e85307a',
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
      id: '64abe2797efc0819a3f203b7',
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

  const btnRef = React.useRef();

  const handleEdit = (id) => {
    const reservation = data.find((room) => room.id === id);
    setReservationData(reservation);
    drawerDisclosure.onOpen();
  };

  const handleDelete = (id) => {
    setIdToDelete(id);
    alertDialogDisclosure.onOpen();
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
      />
      <DeleteAlertDialog
        isOpen={alertDialogDisclosure.isOpen}
        onClose={alertDialogDisclosure.onClose}
        idToDelete={idToDelete}
        timelineFilter={timelineFilter}
      />
      <ConferenceRoomReservationModal
        isOpen={modalDisclosure.isOpen}
        onClose={modalDisclosure.onClose}
        data={modalData}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
      <Flex
        {...styles.buttonModal}
        ref={btnRef}
        onClick={drawerDisclosure.onOpen}
      >
        <Flex mb={'1'}>+</Flex>
        <ConferenceDrawer
          btnRef={btnRef}
          isOpen={drawerDisclosure.isOpen}
          onClose={drawerDisclosure.onClose}
          reservationData={reservationData}
        />
      </Flex>
    </DashboardLayout>
  );
};

export default Conference;
