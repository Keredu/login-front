import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginComponent from './Components/Login';
import RegisterComponent from './Components/Register';
import ForgottenComponent from './Components/ForgottenPassword';
import ResetPasswordComponent from './Components/ResetPassword';
import HelloComponent from './Components/Hello';
import ProtectedRoute from './Components/ProtectedRoute'; // Keep the ProtectedRoute component
import ErrorComponent from './Components/Error';

const App = () => {

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate replace to="/login" />} />
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/hello" element={<ProtectedRoute component={HelloComponent} />} />
          <Route path="/register" element={<RegisterComponent />} />
          <Route path="/forgotten-password" element={<ForgottenComponent />} />
          <Route path="/reset-password" element={<ResetPasswordComponent />} />
          <Route path="*" element={<ErrorComponent message={"Not Found"} errorCode={404}/>}/>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
