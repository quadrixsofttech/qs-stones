import React, { createContext, useState } from 'react';

const MyVacationInfoContext = createContext();
const { Provider } = MyVacationInfoContext;

const MyVacationInfoProvider = ({ children }) => {
  const [myVacationInfoState, setMyVacationInfoState] = useState({
    id: '',
    VacationDaysToDate: '',
    VacationDaysLeft: '',
    NewVacationDaysFromThisYear: '',
    UnusedVacationDaysFromLastYear: '',
    TotalVacationDays: '',
  });

  const setVacationInfo = (data) => {
    setMyVacationInfoState((prevState) => ({
      ...prevState,
      ...data,
    }));
  };

  return (
    <Provider
      value={{
        myVacationInfoState,
        setVacationInfo,
      }}
    >
      {children}
    </Provider>
  );
};

export { MyVacationInfoContext, MyVacationInfoProvider };
