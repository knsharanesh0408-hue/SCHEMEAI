import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import EligibilityForm from './pages/EligibilityForm';
import OperatorPortal from './pages/OperatorPortal';
import GrievanceAssistant from './pages/GrievanceAssistant';
import Auth from './pages/Auth';
import StatusTracker from './pages/StatusTracker';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<EligibilityForm />} />
          <Route path="/operator" element={<OperatorPortal />} />
          <Route path="/grievance" element={<GrievanceAssistant />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/tracker" element={<StatusTracker />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
