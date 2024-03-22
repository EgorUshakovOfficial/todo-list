import { ChakraProvider } from '@chakra-ui/react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PrivateRoute } from './containers/wrappers';
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
            <Route element={<PrivateRoute />}>
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/profile' element={<AccountDetails />} />
             </Route>
            <Route path='/sign-up' element={<UserSignUp />} />
            <Route path={LOGIN_ENDPOINT} element={<LogIn />} />
          </Routes>
        </Router>
      </HelmetProvider>
    </ChakraProvider>
  );
}
