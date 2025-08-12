import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

// Landing Pages
import NormalUserLanding from './pages/NormalUserLanding';
import MarketingUserLanding from './pages/MarketingUserLanding';

// Auth Pages
import NormalLogin from './pages/auth/NormalLogin';
import NormalSignup from './pages/auth/NormalSignup';
import MarketingLogin from './pages/auth/MarketingLogin';
import MarketingSignup from './pages/auth/MarketingSignup';

// User Pages
import UserDashboard from './pages/user/UserDashboard';
import Services from './pages/user/Services';
import WalletRecharge from './pages/user/WalletRecharge';

// Marketing Pages
import MarketingDashboard from './pages/marketing/MarketingDashboard';
import MarketingReports from './pages/marketing/MarketingReports';
import Withdrawal from './pages/marketing/Withdrawal';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import UserReports from './pages/admin/UserReports';
import MarketingReportsAdmin from './pages/admin/MarketingReports';
import PaymentApproval from './pages/admin/PaymentApproval';

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Router>
          <div className="app">
            <Navigation />
            <main className="main-content">
              <Routes>
                {/* Landing Pages */}
                <Route path="/" element={<NormalUserLanding />} />
                <Route path="/marketing" element={<MarketingUserLanding />} />
                
                {/* Auth Routes */}
                <Route path="/login" element={<NormalLogin />} />
                <Route path="/signup" element={<NormalSignup />} />
                <Route path="/marketing/login" element={<MarketingLogin />} />
                <Route path="/marketing/signup" element={<MarketingSignup />} />
                
                {/* User Routes */}
                <Route path="/dashboard" element={<UserDashboard />} />
                <Route path="/services" element={<Services />} />
                <Route path="/wallet" element={<WalletRecharge />} />
                
                {/* Marketing Routes */}
                <Route path="/marketing/dashboard" element={<MarketingDashboard />} />
                <Route path="/marketing/reports" element={<MarketingReports />} />
                <Route path="/marketing/withdrawal" element={<Withdrawal />} />
                
                {/* Admin Routes */}
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/user-reports" element={<UserReports />} />
                <Route path="/admin/marketing-reports" element={<MarketingReportsAdmin />} />
                <Route path="/admin/payment-approval" element={<PaymentApproval />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;