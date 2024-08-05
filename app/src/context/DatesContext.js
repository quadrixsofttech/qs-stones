import { createContext, useState } from 'react';

const DatesContext = createContext();
const { Provider } = DatesContext;

const DatesProvider = ({ children }) => {
  const [requestPTOId, setRequestPTOId] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [arrayOfGroupedDates, setArrayOfGroupedDates] = useState([]);

  const setId = (requestId) => {
    setRequestPTOId(requestId);
  };

  const setEditMode = () => {
    setIsEditMode((prevState) => !prevState);
  };

  const setArray = (arraysOfDates) => {
    setArrayOfGroupedDates(arraysOfDates);
  };

  return (
    <Provider
      value={{
        requestPTOId,
        setId,
        isEditMode,
        setEditMode,
        setArray,
        arrayOfGroupedDates,
      }}
    >
      {children}
    </Provider>
  );
};

export { DatesContext, DatesProvider };
