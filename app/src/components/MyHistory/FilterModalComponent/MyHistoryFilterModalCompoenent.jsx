import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Calendar } from "react-multi-date-picker";
import { RenderRangeTags } from "../../RequestPTOModal/RenderRangeTags";
import { LeaveTypes } from "../constants/constants";

const MyHistoryFilterModalCompoenent = ({
  isOpen,
  onClose,
  filters,
  setFilters,
}) => {
  const [tempFilters, setTempFilters] = useState({ ...filters });
  const [rangeDates, setRangeDates] = useState(filters.range);

  const handleRangeDates = (selectedDates) => {
    setRangeDates(selectedDates);
    setTempFilters((prev) => ({
      ...prev,
      range: selectedDates,
    }));
  };

  useEffect(() => {
    setTempFilters({ ...filters });
  }, [filters, isOpen]);

  const handleChange = (ev) => {
    const { name, value } = ev.target;
    setTempFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value || null,
    }));
  };

  const applyFilters = () => {
    setFilters(tempFilters);
    onClose();
  };

  const handleRemoveRangeDates = () => {
    setRangeDates([]);
    setTempFilters((prev) => ({
      ...prev,
      range: [],
    }));
  };

  const handleCloseModal = () => {
    setFilters({
      status: null,
      type: null,
      range: [],
    });
    setRangeDates([]);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>My History Filter</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Select
            name="type"
            value={tempFilters.type || ""}
            placeholder="Select type"
            onChange={handleChange}
          >
            {Object.values(LeaveTypes).map((type) => {
              return (
                <option key={type} value={type.toLowerCase()}>
                  {type}
                </option>
              );
            })}
          </Select>
          <Select
            name="status"
            value={tempFilters.status || ""}
            placeholder="Select status"
            onChange={handleChange}
            mt={4}
          >
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
          </Select>

          <Flex margin={2} height={"25px"} width={"100%"}>
            <Text marginRight={"2"}>Select range</Text>
            <RenderRangeTags
              range={rangeDates}
              key={Math.random()}
              handleClose={handleRemoveRangeDates}
            />
          </Flex>
          <Flex
            alignItems={"center"}
            justifyContent={"center"}
            flexDir={"column"}
          >
            <Calendar
              range
              numberOfMonths={1}
              onChange={handleRangeDates}
              value={rangeDates}
              className="custom-calendar"
            />
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={handleCloseModal}>
            Remove
          </Button>
          <Button colorScheme="blue" onClick={applyFilters}>
            Apply filters
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default MyHistoryFilterModalCompoenent;
