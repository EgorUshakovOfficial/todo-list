import { ChakraProvider } from '@chakra-ui/react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import { PrivateRoute, PersistLogin } from './containers/wrappers';
import Dashboard from './pages/Dashboard';
import AccountDetails from './pages/AccountDetails';
import UserSignUp from './pages/UserSignUp';
import LogIn from './pages/LogIn';
import { LOGIN_ENDPOINT } from './constants';

export default function App() {
  return (
    <ChakraProvider>
      <HelmetProvider>
        <Router>
          <Routes>
            <Route element={
              <AuthProvider>
                <PersistLogin />
              </AuthProvider>
            }>
              {/* Public routes  */}
              <Route path='/sign-up' element={<UserSignUp />} />
              <Route path={LOGIN_ENDPOINT} element={<LogIn />} />
              {/* Private routes */}
              <Route element={<PrivateRoute />}>
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/profile' element={<AccountDetails />} />
              </Route>
            </Route>
          </Routes>
        </Router>
      </HelmetProvider>
    </ChakraProvider>
  );
}
