import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../layout/DashboardLayout';
import ListOfEmployees from '../../components/ListOfEmployees/ListOfEmployees';
import EmployeeComponent from '../../components/EmployeeComponent';
import { Flex, Spinner } from '@chakra-ui/react';
import useUser from '../../hooks/useUser';
import { usePaidTimeOff } from '../../hooks/usePTO';

const AdminPanel = () => {
  const { employees, employeesLoading, employeesError, refetchEmployees } =
    useUser();
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
    <DashboardLayout>
      <Flex gap="4" height={'100%'}>
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
        />
      </Flex>
    </DashboardLayout>
  );
};

export default AdminPanel;
