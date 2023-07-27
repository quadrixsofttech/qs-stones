import DashboardLayout from '../../layout/DashboardLayout/DashboardLayout';
import ConferenceNavbar from '../../components/ConferenceNavbar/ConferenceNavbar';
import React, { useEffect, useState } from 'react';
import Timeline from '../../components/Timeline/Timeline';
import ConferenceCalendarNavbar from '../../components/ConferenceNavbar/ConferenceCalendarNavbar';
import { Divider, Flex, Spinner, useDisclosure } from '@chakra-ui/react';
import ConferenceRoomReservationModal from '../../components/ConferenceRoomReservationModal';
import moment from 'moment';
import useConference from '../../hooks/useConference';
import useReservations from '../../hooks/useReservations';
import useUser from '../../hooks/useUser';

const Conference = () => {
  const [timelineOrientation, setTimelineOrientation] = useState('vertical');
  const [timelineFilter, setTimelineFilter] = useState('');
  const modalDisclosure = useDisclosure();
  const [modalData, setModalData] = useState(null);
  const [date, setDate] = useState(moment());
  const [floor, setFloor] = useState('Upper Floor');

  const { conferenceRooms, conferenceLoading, conferenceError } =
    useConference();
  const { user } = useUser();

  const {
    reservationsData,
    refetchReservations,
    reservationsLoading,
    reservationsError,
  } = useReservations(date);

  useEffect(() => {
    refetchReservations();
  }, [date, refetchReservations]);

  if (
    reservationsLoading ||
    !reservationsData ||
    reservationsError ||
    conferenceLoading ||
    !conferenceRooms ||
    conferenceError ||
    !user
  ) {
    return (
      <Flex justifyContent={'center'}>
        <Spinner />
      </Flex>
    );
  }

  const selectedFloorConferenceRooms = conferenceRooms.filter(
    (x) => x.floor === floor
  );

  const handleEdit = (id) => {
    console.log('Edit' + id);
  };
  const handleDelete = (id) => {
    console.log('Delete' + id);
  };
  const handleOpen = (id) => {
    const filteredData = reservationsData?.find((room) => room._id === id);
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
        title={selectedFloorConferenceRooms}
        data={reservationsData}
        startHour="08:00"
        endHour="17:00"
        onOpen={handleOpen}
        onEdit={handleEdit}
        onDelete={handleDelete}
        timelineFilter={timelineFilter}
        user={user}
      />
      <ConferenceRoomReservationModal
        isOpen={modalDisclosure.isOpen}
        onClose={modalDisclosure.onClose}
        data={modalData}
        onDelete={handleDelete}
        onEdit={handleEdit}
        user={user}
      />
    </DashboardLayout>
  );
};

export default Conference;
