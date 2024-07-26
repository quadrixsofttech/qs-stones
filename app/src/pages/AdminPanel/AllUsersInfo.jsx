import { Flex, Spinner } from "@chakra-ui/react";
import ListOfEmployees from "../../components/ListOfEmployees/ListOfEmployees";
import EmployeeComponent from "../../components/EmployeeComponent";
import useGettingEmployees from "../../hooks/useGettigEmployees";
import { useEffect, useState } from "react";
import { usePaidTimeOff } from "../../hooks/usePTO";

export const AllUsersInfo = ({
  employees,
  employeesLoading,
  employeesError,
  refetchEmployees,
}) => {
  const [clickedRowIndex, setClickedRowIndex] = useState(null);
  const [employeeId, setEmployeeId] = useState(null);
  const [name, setName] = useState();

  const { paidTimeOffHistory, isError, isLoading, refetchPTO } =
    usePaidTimeOff(employeeId);

  useEffect(() => {
    refetchPTO(employeeId);
  }, [employeeId, refetchPTO]);

  if (
    employeesLoading ||
    employeesError ||
    !employees ||
    isError ||
    isLoading ||
    !paidTimeOffHistory
  ) {
    return <Spinner />;
  }

  const handleRowClick = (rowIndex) => {
    if (rowIndex === clickedRowIndex) {
      setClickedRowIndex(null);
    } else {
      setClickedRowIndex(rowIndex);
      setName(
        `${employees[rowIndex].firstName} ${employees[rowIndex].lastName}`
      );
      setEmployeeId(employees[rowIndex]._id);
    }
  };
  return (
    <Flex w={"100%"} gap={3}>
      <ListOfEmployees
        employees={employees}
        handleRowClick={(index) => handleRowClick(index)}
        clickedRowIndex={clickedRowIndex}
      />
      <EmployeeComponent
        isClicked={clickedRowIndex !== null}
        name={name}
        employeeId={employeeId}
        paidTimeOff={paidTimeOffHistory}
        refetchPTO={refetchPTO}
        refetchEmployees={refetchEmployees}
        refetchMyVacationInfo={employeeId}
      />
    </Flex>
  );
};
