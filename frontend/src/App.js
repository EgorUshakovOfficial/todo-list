import { ChakraProvider } from '@chakra-ui/react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserProvider';
import { PrivateRoute } from './containers/wrappers';
import UserSignUp from './pages/UserSignUp';
import LogIn from './pages/LogIn';
import useApp from './hooks/useApp';

export default function App() {
  const {token, isRefreshToken} = useApp();

  if (token === '' && isRefreshToken){
    return <div>Loading...</div>;
  }

  return (
    <ChakraProvider>
      <HelmetProvider>
        <Router>
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route element={<UserProvider />}>
                <Route path='/dashboard' element={<div>Dashboard</div>} />
              </Route>
            </Route>
            <Route path='/sign-up' element={<UserSignUp />} />
            <Route path="/login" element={<LogIn />} />
          </Routes>
        </Router>
      </HelmetProvider>
    </ChakraProvider>
  );
}
