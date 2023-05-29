import React, { Suspense } from 'react';

import { ChakraProvider } from '@chakra-ui/react';
import { AuthProvider } from './context/AuthContext';
import { FetchProvider } from './context/FetchContext';
import "./styles/CustomCalendar.css"

import AppRoutes from './routes';
import Loading from './components/Loading';
import { BrowserRouter as Router } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from 'react-query';
import { MyVacationInfoProvider } from './context/MyVacationInfoContext';

import theme from './theme';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <ChakraProvider theme={theme}>
          <Suspense fallback={<Loading />}>
            <MyVacationInfoProvider>
              <AuthProvider>
                <FetchProvider>
                  <AppRoutes />
                </FetchProvider>
              </AuthProvider>
            </MyVacationInfoProvider>
          </Suspense>
        </ChakraProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
