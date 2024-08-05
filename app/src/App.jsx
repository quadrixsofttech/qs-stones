import React, { Suspense } from 'react';

import { ChakraProvider } from '@chakra-ui/react';
import { AuthProvider } from './context/AuthContext';
import { FetchProvider } from './context/FetchContext';
import './styles/CustomCalendar.css';
import './styles/CustomCalendarHistory.css';

import AppRoutes from './routes';
import Loading from './components/Loading';
import { BrowserRouter as Router } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from 'react-query';

import theme from './theme';
import { DatesProvider } from './context/DatesContext';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <ChakraProvider theme={theme}>
          <Suspense fallback={<Loading />}>
            <AuthProvider>
              <FetchProvider>
                <DatesProvider>
                  <AppRoutes />
                </DatesProvider>
              </FetchProvider>
            </AuthProvider>
          </Suspense>
        </ChakraProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
