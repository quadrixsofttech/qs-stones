import DashboardLayout from '../../layout/DashboardLayout/DashboardLayout';
import ConferenceNavbar from '../../components/ConferenceNavbar/ConferenceNavbar';
import React, { useEffect, useState } from 'react';
import Timeline from '../../components/Timeline/Timeline';
import ConferenceCalendarNavbar from '../../components/ConferenceNavbar/ConferenceCalendarNavbar';
import ConferenceRoomReservationModal from '../../components/ConferenceRoomReservationModal';
import { Divider, Flex, Spinner, useDisclosure } from '@chakra-ui/react';
import DeleteAlertDialog from '../../components/DeleteAlertDialog/DeleteAlertDialog';
import moment from 'moment';
import ConferenceDrawer from '../../components/ConferenceDrawer/ConferenceDrawer';
import styles from './Conference.styles';
import useConference from '../../hooks/useConference';
import useReservations from '../../hooks/useReservations';
import useUser from '../../hooks/useUser';

const Conference = () => {
  const [timelineOrientation, setTimelineOrientation] = useState('vertical');
  const [timelineFilter, setTimelineFilter] = useState('');

  const modalDisclosure = useDisclosure();
  const drawerDisclosure = useDisclosure();
  const alertDialogDisclosure = useDisclosure();

  const [idToDelete, setIdToDelete] = useState();
  const [modalData, setModalData] = useState(null);
  const [date, setDate] = useState(moment());
  const [floor, setFloor] = useState('Upper Floor');
  const [reservationData, setReservationData] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);

  const { conferenceRooms, conferenceLoading, conferenceError } =
    useConference();
  const { user } = useUser();

  const {
    reservationsData,
    refetchReservations,
    reservationsLoading,
    reservationsError,
  } = useReservations(date);
  const btnRef = React.useRef();

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

  const selectedFloorConferenceRooms = conferenceRooms?.filter(
    (x) => x.floor === floor
  );

  const handleEdit = (id) => {
    const reservation = reservationsData?.find((room) => room._id === id);
    setIsEditMode(true);
    setReservationData(reservation);
    drawerDisclosure.onOpen();
  };
  const handleDelete = (id) => {
    setIdToDelete(id);
    alertDialogDisclosure.onOpen();
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
        user={user}
      />
      <DeleteAlertDialog
        isOpen={alertDialogDisclosure.isOpen}
        onClose={alertDialogDisclosure.onClose}
        idToDelete={idToDelete}
        timelineFilter={timelineFilter}
        user={user}
        refetchReservations={refetchReservations}
        closeModal={modalDisclosure.onClose}
      />
      <ConferenceRoomReservationModal
        isOpen={modalDisclosure.isOpen}
        onClose={modalDisclosure.onClose}
        data={modalData}
        onDelete={handleDelete}
        onEdit={handleEdit}
        user={user}
      />
      <Flex
        {...styles.buttonModal}
        ref={btnRef}
        onClick={() => {
          setIsEditMode(false);
          drawerDisclosure.onOpen();
        }}
      >
        <Flex mb={'1'}>+</Flex>
        <ConferenceDrawer
          btnRef={btnRef}
          isOpen={drawerDisclosure.isOpen}
          onClose={drawerDisclosure.onClose}
          reservationData={reservationData}
          isEditMode={isEditMode}
        />
      </Flex>
    </DashboardLayout>
  );
};

export default Conference;
