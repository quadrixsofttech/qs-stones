import { Button, Flex, Text, useDisclosure, useToast } from '@chakra-ui/react';
import React from 'react';
import { RenderRangeTags } from '../../../RequestPTOModal/RenderRangeTags';
import styles from './PendingRequests.styles';
import moment from 'moment';
import { capitalizeFirstLetter } from '../../../../util';
import useEmployees from '../../../../hooks/useEmployees';
import RejectRequestModal from '../RejectRequestModal/RejectRequestModal';

const RequestComponent = ({
  type,
  range,
  createdAt,
  id,
  refetchPTO,
  refetchEmployees,
}) => {
  const { updatePaidTimeOff } = useEmployees();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handleRequst = async (id, status, comment) => {
    await updatePaidTimeOff(id, status, comment);
    refetchPTO();
    refetchEmployees();
    toast({
      position: 'top-right',
      status: status === 'approved' ? 'success' : 'warning',
      variant: 'subtle',
      description:
        status === 'approved'
          ? 'You have successfully approved a remote/vacation request'
          : 'You have rejected a remote/vacation request',
      isClosable: true,
      colorScheme: status === 'approved' ? 'green' : 'yellow',
    });
  };

  return (
    <Flex {...styles.requestBox}>
      <Flex {...styles.infoBox}>
        <Flex flexDir={'column'} gap="1">
          <Text fontWeight={'600'} color={'gray.700'}>
            {capitalizeFirstLetter(type)}
          </Text>
          <Flex flexWrap={'wrap'}>
            {range.map((x) => {
              return (
                <RenderRangeTags
                  range={x}
                  key={Math.random()}
                  showClose={false}
                />
              );
            })}
          </Flex>
        </Flex>
        <Flex gap="4">
          <Button
            {...styles.approveButton}
            onClick={() => handleRequst(id, 'approved')}
          >
            <Text color="white">Approve</Text>
          </Button>
          <Button {...styles.rejectButton} onClick={onOpen}>
            <RejectRequestModal
              isOpen={isOpen}
              onClose={onClose}
              handleRequst={handleRequst}
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
  );
};
export default RequestComponent;
