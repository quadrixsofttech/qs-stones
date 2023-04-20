import { Img, Td, Tr } from '@chakra-ui/react';
import defaultAvatar from '../../images/defaultAvatar.png';

const UserDetails = ({ user }) => (
  <Tr>
    <Td>
      <Img w="12" h="12" src={user.avatar || defaultAvatar} alt="avatar" />
    </Td>
    <Td>
      {user.firstName} {user.lastName}
    </Td>
    <Td>{user.email}</Td>
  </Tr>
);

export default UserDetails;
