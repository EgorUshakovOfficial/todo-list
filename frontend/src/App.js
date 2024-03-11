import { HelmetProvider } from 'react-helmet-async';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import UserSignUp from './pages/UserSignUp';
import LogIn from './pages/LogIn';

export default function App(){
  return (
    <HelmetProvider>
      <Router>
        <Routes>
          <Route path='/sign-up' element={<UserSignUp />} />
          <Route path="/log-in" element={<LogIn />} />
        </Routes>
      </Router>
    </HelmetProvider>
  );
}