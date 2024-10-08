import {
  Avatar,
  AvatarGroup,
  Box,
  Flex,
  Popover,
  PopoverTrigger,
} from "@chakra-ui/react";
import styles from "./PTOCalendar.styles";
import { useState } from "react";
import CalendarPopoverContent from "./CalendarPopoverContent";
import moment from "moment";

import { useTheme } from "@chakra-ui/react";

const CalendarBox = ({ date, employeesToday, type, holiday }) => {
  const [isOpen, setIsOpen] = useState(false);

  const theme = useTheme();
  const purple500 = theme.colors.purple[500];

  const isToday = () => {
    const currentDate = moment();
    const formattedDate = currentDate.format("YYYY-MM-DD");
    return date === formattedDate;
  };
  const getDay = () => {
    return moment(date).format("DD");
  };
  return (
    <Popover
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      onOpen={() => setIsOpen(true)}
    >
      <PopoverTrigger>
        <Flex
          {...styles.calendarBox}
          boxShadow={isOpen ? `inset 0px 0px 0px 1px ${purple500}` : ""}
          _hover={
            isOpen ? "" : { backgroundColor: holiday ? "red.200" : "gray.100" }
          }
          backgroundColor={
            holiday
              ? "red.100"
              : isOpen
              ? "gray.200"
              : isToday()
              ? "purple.100"
              : "white"
          }
        >
          <Flex flexDirection={"column"}>
            <Box {...styles.calendarDateBox}>{getDay()}</Box>
            <Box height={"8"}>
              <AvatarGroup {...styles.avatarGroup}>
                {employeesToday.map((x) => {
                  return (
                    <Avatar
                      src={x.userId.image}
                      key={x.id + Math.random().toString()}
                      name={x.user.firstName}
                      bg={"white"}
                    />
                  );
                })}
              </AvatarGroup>
            </Box>
          </Flex>
        </Flex>
      </PopoverTrigger>
      <CalendarPopoverContent
        date={date}
        employeesToday={employeesToday}
        type={type}
        holiday={holiday}
      />
    </Popover>
  );
};

export default CalendarBox;
