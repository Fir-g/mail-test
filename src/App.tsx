import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import LoadingSpinner from './components/common/LoadingSpinner';

// Lazy-loaded pages
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Home = lazy(() => import('./pages/Home'));
const EmailThread = lazy(() => import('./pages/EmailThread'));
const BulkEmail = lazy(() => import('./pages/BulkEmail'));
const RuleSetup = lazy(() => import('./pages/RuleSetup'));
const RuleDefinition = lazy(() => import('./pages/RuleDefinition'));
const Settings = lazy(() => import('./pages/Settings'));

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/home" element={<Home />} />
            <Route path="/email-thread/:companyId" element={<EmailThread />} />
            <Route path="/bulk-email" element={<BulkEmail />} />
            <Route path="/rule-setup" element={<RuleSetup />} />
            <Route path="/rule-definition/:ruleId" element={<RuleDefinition />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Suspense>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;