export const getToastConfig = ({ status, description }) => {
  return {
    position: 'top-right',
    status: status,
    variant: 'subtle',
    duration: 3000,
    isClosable: true,
    description: description,
  };
};
