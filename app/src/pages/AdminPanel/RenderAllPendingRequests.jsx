import React from "react";
import { Box, Spinner, Text } from "@chakra-ui/react";
import RequestComponent from "../../components/EmployeeComponent/SelectedEmployeeComponent/PendingRequests/RequestComponent";

export const RenderAllPendingRequests = ({
  employees,
  employeesLoading,
  employeesError,
  refetchEmployees,
}) => {
  if (employeesLoading) {
    return <Spinner />;
  }

  return (
    <Box>
      {employees.map((user) =>
        user.pendingRequests.map((request) => (
          <Box>
            <RequestComponent
              employee={user}
              singleRequest={true}
              key={request._id}
              type={request.type}
              range={request.dates}
              rangeInDays={request.days.length}
              createdAt={request.createdAt}
              id={request._id}
              refetchEmployees={refetchEmployees}
              paidLeaveType={request.paidLeaveType}
            />
          </Box>
        ))
      )}
    </Box>
  );
};
