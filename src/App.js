import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import PatientSignup from './pages/Patients/PatientSignup';
import DoctorSignup from './pages/Doctors/DoctorSignup';
import Landing from './pages/Landing';
import PatientDashboard from './pages/Patients/Dashboard';
import DoctorDashboard from './pages/Doctors/Dashboard';
// import './bootstrap.min.css';

function App() {
  const [error, setError] = useState('');

  return (
    <Router>
      <Navbar setError={setError} />
      <main className='container pt-3'>
        {error && (
          <div className='container text-center p-5'>
            <h1>{error}</h1>
          </div>
        )}
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/register/patient' element={<PatientSignup />} />
          <Route path='/register/doctor' element={<DoctorSignup />} />
          <Route path='/dashboard/patient' element={<PatientDashboard />} />
          <Route path='/dashboard/doctor' element={<DoctorDashboard />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
