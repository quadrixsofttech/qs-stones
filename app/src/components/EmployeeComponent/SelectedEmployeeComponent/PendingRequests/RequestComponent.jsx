import {
  Avatar,
  Button,
  Flex,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import React from 'react';
import { RenderRangeTags } from '../../../RequestPTOModal/RenderRangeTags';
import styles from './PendingRequests.styles';
import moment from 'moment';
import { capitalizeFirstLetter, formatTimestampToDate } from '../../../../util';
import useEmployees from '../../../../hooks/useEmployees';
import RejectRequestModal from '../RejectRequestModal/RejectRequestModal';
import useUser from '../../../../hooks/useUser';
import { useAzure } from '../../../../hooks/useAzure';

const RequestComponent = ({
  type,
  range,
  createdAt,
  id,
  refetchEmployees,
  paidLeaveType,
  rangeInDays,
  singleRequest,
  employee,
}) => {
  const { approvePaidTimeOff, rejectPaidTimeOff } = useEmployees();
  const { createCalendarEvent } = useAzure();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const { user } = useUser();

  const handleApproveRequst = async (id) => {
    await approvePaidTimeOff(id, user._id);
    await createCalendarEvent.mutateAsync({
      email: employee.email,
      eventData: {
        type: type.toUpperCase(),
        range: range,
      },
    });

    refetchEmployees();
    toast({
      position: 'top-right',
      status: 'success',
      variant: 'subtle',
      description: `You have successfully approved a ${type} request`,
      isClosable: true,
      colorScheme: 'green',
    });
  };

  const handleRejectRequst = async (id, comment) => {
    await rejectPaidTimeOff(id, comment, user._id);
    refetchEmployees();
    toast({
      position: 'top-right',
      status: 'warning',
      variant: 'subtle',
      description: `You have rejected a ${type} request`,
      isClosable: true,
      colorScheme: 'yellow',
    });
  };

  if (rangeInDays === 0) {
    return null;
  }

  return (
    <Flex flexDir={'column'} flex={1}>
      {singleRequest && (
        <Flex {...styles.singleRequestHeader}>
          {
            <Flex alignItems={'center'}>
              <Avatar src={employee.image} size={'sm'} marginRight={'4'} />
              <Text fontWeight={'bold'}>
                {employee.firstName + ' ' + employee.lastName}{' '}
              </Text>
            </Flex>
          }
        </Flex>
      )}

      <Flex rounded={singleRequest ? '' : 'md'} {...styles.requestBox}>
        <Flex {...styles.infoBox}>
          <Flex flexDir={'column'} gap="1">
            <Flex gap={2}>
              <Text fontWeight={'600'} color={'gray.700'}>
                {capitalizeFirstLetter(type)}
              </Text>
              <Text fontWeight={'500'} color={'purple.500'}>
                {paidLeaveType}
              </Text>
            </Flex>
            <Flex flexWrap={'wrap'}>
              {range.map((x) => {
                let startDate = x[0];
                let endDate = x[1];
                let dates = [];
                dates.push(formatTimestampToDate(startDate));
                dates.push(formatTimestampToDate(endDate));
                return (
                  <RenderRangeTags
                    range={dates}
                    key={Math.random()}
                    showClose={false}
                  />
                );
              })}
              {rangeInDays} {rangeInDays === 1 ? 'day' : 'days'}
            </Flex>
          </Flex>
          <Flex gap="4">
            <Button
              {...styles.approveButton}
              onClick={() => handleApproveRequst(id)}
            >
              <Text color="white">Approve</Text>
            </Button>
            <Button {...styles.rejectButton} onClick={onOpen}>
              <RejectRequestModal
                isOpen={isOpen}
                onClose={onClose}
                handleRequst={handleRejectRequst}
                range={range}
                id={id}
                type={type}
              />
              <Text color="white">Reject</Text>
            </Button>
          </Flex>
        </Flex>
        <Flex p="2" justify={'flex-end'}>
          <Text color="gray.400" fontSize={'xs'}>
            {moment(createdAt).format('YYYY-MM-DD HH:mm')}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default RequestComponent;
