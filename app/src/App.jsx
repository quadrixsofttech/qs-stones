import React, { Suspense } from 'react';

import { ChakraProvider } from '@chakra-ui/react';
import { AuthProvider } from './context/AuthContext';
import { FetchProvider } from './context/FetchContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import AppRoutes from './routes';
import Loading from './components/Loading';
import { BrowserRouter as Router } from 'react-router-dom';

import theme from './theme';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <ChakraProvider theme={theme}>
          <Suspense fallback={<Loading />}>
            <AuthProvider>
              <FetchProvider>
                <AppRoutes />
              </FetchProvider>
            </AuthProvider>
          </Suspense>
        </ChakraProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
