import React, { Suspense } from "react";

import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "./context/AuthContext";
import { FetchProvider } from "./context/FetchContext";

import AppRoutes from "./routes";
import Loading from "./components/Loading";
import { BrowserRouter as Router } from "react-router-dom";

import theme from "./theme";

function App() {
  return (
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
  );
}

export default App;
