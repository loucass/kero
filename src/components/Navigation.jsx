import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Offcanvas, Button, Nav, Container } from 'react-bootstrap';
import { FaSun, FaMoon, FaGlobe, FaBars, FaTimes, FaHome, FaTachometerAlt, FaCogs, FaWallet, FaChartBar, FaSignOutAlt, FaUser, FaUsers, FaShieldAlt, FaMoneyBillWave, FaHandHoldingUsd } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import '../styles/navigation.css';

const Navigation = () => {
  const [show, setShow] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();
  const location = useLocation();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const isActive = (path) => location.pathname === path;

  const getNavItems = () => {
    const path = location.pathname;
    
    if (path.startsWith('/admin')) {
      return [
        { path: '/admin', icon: <FaShieldAlt />, label: t('dashboard') },
        { path: '/admin/user-reports', icon: <FaChartBar />, label: t('userReports') },
        { path: '/admin/marketing-reports', icon: <FaChartBar />, label: t('marketingReports') },
        { path: '/admin/payment-approval', icon: <FaMoneyBillWave />, label: 'Payment Approval' },
      ];
    } else if (path.startsWith('/marketing')) {
      return [
        { path: '/marketing', icon: <FaHome />, label: t('home') },
        { path: '/marketing/dashboard', icon: <FaTachometerAlt />, label: t('dashboard') },
        { path: '/marketing/reports', icon: <FaChartBar />, label: t('reports') },
        { path: '/marketing/withdrawal', icon: <FaHandHoldingUsd />, label: 'Withdrawal' },
      ];
    } else if (path.startsWith('/dashboard') || path.startsWith('/services') || path.startsWith('/wallet')) {
      return [
        { path: '/', icon: <FaHome />, label: t('home') },
        { path: '/dashboard', icon: <FaTachometerAlt />, label: t('dashboard') },
        { path: '/services', icon: <FaCogs />, label: t('services') },
        { path: '/wallet', icon: <FaWallet />, label: t('wallet') },
      ];
    } else {
      return [
        { path: '/', icon: <FaHome />, label: t('home') },
        { path: '/marketing', icon: <FaUsers />, label: t('marketing') },
      ];
    }
  };

  const navItems = getNavItems();

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top">
        <Container fluid>
          <Button
            variant="link"
            className="navbar-toggler d-lg-none"
            onClick={handleShow}
          >
            <FaBars className="text-white" />
          </Button>
          
          <Link className="navbar-brand" to="/">
            <span className="brand-text">AI Platform</span>
          </Link>
          
          <div className="navbar-nav ms-auto d-none d-lg-flex">
            <Button
              variant="link"
              className="nav-link text-white"
              onClick={toggleTheme}
            >
              {theme === 'light' ? <FaMoon /> : <FaSun />}
            </Button>
            
            <Button
              variant="link"
              className="nav-link text-white"
              onClick={toggleLanguage}
            >
              <FaGlobe />
              <span className="ms-1">{language.toUpperCase()}</span>
            </Button>
            
            {navItems.map((item) => (
              <Link
                key={item.path}
                className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
                to={item.path}
              >
                {item.icon}
                <span className="ms-1">{item.label}</span>
              </Link>
            ))}
          </div>
        </Container>
      </nav>

      <Offcanvas
        show={show}
        onHide={handleClose}
        placement={language === 'ar' ? 'end' : 'start'}
        className={`offcanvas-nav ${theme}`}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>AI Platform</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <div className="d-flex justify-content-around mb-4">
              <Button
                variant="outline-primary"
                className="d-flex align-items-center"
                onClick={toggleTheme}
              >
                {theme === 'light' ? <FaMoon className="me-2" /> : <FaSun className="me-2" />}
                {theme === 'light' ? 'Dark' : 'Light'}
              </Button>
              
              <Button
                variant="outline-primary"
                className="d-flex align-items-center"
                onClick={toggleLanguage}
              >
                <FaGlobe className="me-2" />
                {language === 'en' ? 'العربية' : 'English'}
              </Button>
            </div>
            
            {navItems.map((item) => (
              <Nav.Link
                key={item.path}
                as={Link}
                to={item.path}
                className={`mb-2 ${isActive(item.path) ? 'active' : ''}`}
                onClick={handleClose}
              >
                <span className="me-2">{item.icon}</span>
                {item.label}
              </Nav.Link>
            ))}
            
            <hr className="my-4" />
            
            <Nav.Link
              as={Link}
              to="/login"
              className="mb-2"
              onClick={handleClose}
            >
              <FaUser className="me-2" />
              {t('login')}
            </Nav.Link>
            
            <Nav.Link
              as={Link}
              to="/signup"
              className="mb-2"
              onClick={handleClose}
            >
              <FaUser className="me-2" />
              {t('signup')}
            </Nav.Link>
            
            <Nav.Link
              as={Link}
              to="/marketing/login"
              className="mb-2"
              onClick={handleClose}
            >
              <FaUsers className="me-2" />
              {t('marketing')} {t('login')}
            </Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Navigation;