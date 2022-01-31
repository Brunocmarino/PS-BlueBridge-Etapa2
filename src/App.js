import React from 'react';
import Signup from "./components/Signup"
import { Container } from "react-bootstrap"
import { AuthProvider } from "./contexts/AuthContexts"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard"
import Login from "./components/Login"
import PrivateRoute from "./components/PrivateRoute"
import ForgotPassword from "./components/ForgotPassword"
import UpdateProfile from "./components/UpdateProfile"

function App() {
  return (
    
      <Container 
        className="d-flex align-items-center justify-content-center"
        style={{minHeight:"100vh"}}         
      >
        <div className="w-100" style={{maxWidth: '400px'}}>
          <Router>
            <AuthProvider>
              <Routes>
                {/*Páginas de Login*/}
                <Route path="/login" element={<Login/>}/>
                <Route path="/forgot-password" element={<ForgotPassword/>}/>
                <Route path="/signup" element={<Signup/>}/>
                {/*Sistema*/}
                <Route path="/" element={<PrivateRoute/>}>
                  <Route path="/" element={<Dashboard/>}/>
                </Route>
                <Route path="/update-profile" element={<PrivateRoute/>}>
                  <Route path="/update-profile" element={<UpdateProfile/>}/>
                </Route>
              </Routes>
            </AuthProvider>
          </Router>
        </div>
      </Container>
         
  );
}

export default App;
