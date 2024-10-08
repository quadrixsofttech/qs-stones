import { Button } from '@chakra-ui/react';
import React from 'react';
import styles from './styles/RequestPTOModal.styles';

export const Footer = ({
  isEditMode,
  onCloseEdit,
  onClose,
  setEditMode,
  handleSubmitOnEdit,
  submitTORequest,
  setVacationDates,
}) => {
  const handleClose = () => {
    if (isEditMode) {
      setEditMode();
    }
    isEditMode ? onCloseEdit() : onClose();
    !isEditMode && setVacationDates([]);
  };

  return (
    <>
      <Button onClick={handleClose} variant="outline">
        Cancel
      </Button>
      <Button
        onClick={isEditMode ? handleSubmitOnEdit : submitTORequest}
        {...styles.button}
      >
        Submit Request
      </Button>
    </>
  );
};
