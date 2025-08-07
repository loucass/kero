import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LanguageToggle from '../components/common/LanguageToggle';
import '../styles/landing.css';
import useLanguage from '../hooks/useLanguage';
import useTheme from '../hooks/useTheme';
import ThemeToggle from '../components/common/ThemeToggle';

// const LandingPage = () => {
//   const { t, language } = useLanguage();
//   const [currentTestimonial, setCurrentTestimonial] = useState(0);
//   const [_ , setScrollPosition] = useState(0);
//   const [isScrolled, setIsScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       const position = window.pageYOffset;
//       setScrollPosition(position);
//       setIsScrolled(position > 50);
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentTestimonial((prev) => (prev + 1) % 3);
//     }, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   const testimonials = [
//     {
//       text: t('landingNewTestimonial1'),
//       author: t('landingNewTestimonial1Author')
//     },
//     {
//       text: t('landingNewTestimonial2'),
//       author: t('landingNewTestimonial2Author')
//     },
//     {
//       text: t('landingNewTestimonial3'),
//       author: t('landingNewTestimonial3Author')
//     }
//   ];

//   const features = [
//     {
//       icon: '🔒',
//       title: t('landingNewFeatureSecurity'),
//       description: t('landingNewFeatureSecurityDesc')
//     },
//     {
//       icon: '⚡',
//       title: t('landingNewFeatureSpeed'),
//       description: t('landingNewFeatureSpeedDesc')
//     },
//     {
//       icon: '📊',
//       title: t('landingNewFeatureAnalytics'),
//       description: t('landingNewFeatureAnalyticsDesc')
//     },
//     {
//       icon: '🌍',
//       title: t('landingNewFeatureGlobal'),
//       description: t('landingNewFeatureGlobalDesc')
//     },
//     {
//       icon: '🛠️',
//       title: t('landingNewFeatureAPI'),
//       description: t('landingNewFeatureAPIDesc')
//     },
//     {
//       icon: '📞',
//       title: t('landingNewFeatureSupport'),
//       description: t('landingNewFeatureSupportDesc')
//     }
//   ];

//   const steps = [
//     {
//       step: '01',
//       title: t('landingNewStep1'),
//       description: t('landingNewStep1Desc')
//     },
//     {
//       step: '02',
//       title: t('landingNewStep2'),
//       description: t('landingNewStep2Desc')
//     },
//     {
//       step: '03',
//       title: t('landingNewStep3'),
//       description: t('landingNewStep3Desc')
//     }
//   ];

//   const pricingPlans = [
//     {
//       name: t('landingNewPricingBasic'),
//       price: t('landingNewPricingBasicPrice'),
//       description: t('landingNewPricingBasicDesc'),
//       features: [
//         t('landingNewPricingFeature1'),
//         t('landingNewPricingFeature2'),
//         t('landingNewPricingFeature3')
//       ],
//       cta: t('landingNewPricingGetStarted')
//     },
//     {
//       name: t('landingNewPricingPro'),
//       price: t('landingNewPricingProPrice'),
//       description: t('landingNewPricingProDesc'),
//       features: [
//         t('landingNewPricingFeature1'),
//         t('landingNewPricingFeature2'),
//         t('landingNewPricingFeature3'),
//         t('landingNewPricingFeature4'),
//         t('landingNewPricingFeature5'),
//         t('landingNewPricingFeature6')
//       ],
//       cta: t('landingNewPricingGetStarted'),
//       popular: true
//     },
//     {
//       name: t('landingNewPricingEnterprise'),
//       price: t('landingNewPricingEnterprisePrice'),
//       description: t('landingNewPricingEnterpriseDesc'),
//       features: [
//         t('landingNewPricingFeature1'),
//         t('landingNewPricingFeature2'),
//         t('landingNewPricingFeature3'),
//         t('landingNewPricingFeature4'),
//         t('landingNewPricingFeature5'),
//         t('landingNewPricingFeature6'),
//         t('landingNewPricingFeature7'),
//         t('landingNewPricingFeature8'),
//         t('landingNewPricingFeature9')
//       ],
//       cta: t('landingNewPricingContactUs')
//     }
//   ];

//   const faqs = [
//     {
//       question: t('landingNewFAQ1'),
//       answer: t('landingNewFAQ1Answer')
//     },
//     {
//       question: t('landingNewFAQ2'),
//       answer: t('landingNewFAQ2Answer')
//     },
//     {
//       question: t('landingNewFAQ3'),
//       answer: t('landingNewFAQ3Answer')
//     },
//     {
//       question: t('landingNewFAQ4'),
//       answer: t('landingNewFAQ4Answer')
//     }
//   ];

//   // Add this inside the LandingPage component before the return statement
// useEffect(() => {
//   // FAQ Accordion functionality
//   const faqItems = document.querySelectorAll('.faq-item');
  
//   const toggleFaq = (index) => {
//     faqItems.forEach((item, i) => {
//       if (i === index) {
//         item.classList.toggle('active');
//       } else {
//         item.classList.remove('active');
//       }
//     });
//   };
  
//   faqItems.forEach((item, index) => {
//     const question = item.querySelector('.faq-question');
//     question.addEventListener('click', () => toggleFaq(index));
//   });
  
//   // Cleanup event listeners
//   return () => {
//     faqItems.forEach((item, index) => {
//       const question = item.querySelector('.faq-question');
//       question.removeEventListener('click', () => toggleFaq(index));
//     });
//   };
// }, []);

//   return (
//     <div className={`landing-page ${language === 'ar' ? 'rtl' : ''}`}>
//       {/* Navigation */}
//       <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
//         <div className="container">
//           <div className="navbar-content">
//             <div className="navbar-logo">
//               <Link to="/" className="logo">
//                 <span className="logo-text">ServicePay</span>
//               </Link>
//             </div>
//             <div className="navbar-menu">
//               <Link to="/login" className="navbar-link">{t('login')}</Link>
//               <Link to="/signup" className="navbar-link navbar-signup">{t('landingNewGetStarted')}</Link>
//               <LanguageToggle />
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <section className="hero">
//         <div className="container">
//           <div className="hero-content">
//             <div className="hero-text">
//               <div className="hero-badge">{t('landingNewTagline')}</div>
//               <h1 className="hero-title">{t('landingNewSubtitle')}</h1>
//               <div className="hero-buttons">
//                 <Link to="/signup" className="btn btn-primary btn-lg">
//                   {t('landingNewGetStarted')}
//                 </Link>
//                 <button className="btn btn-outline btn-lg">
//                   {t('landingNewWatchDemo')}
//                 </button>
//               </div>
//             </div>
//             <div className="hero-visual">
//               {/* <div className="floating-card card-1">
//                 <div className="card-icon">💳</div>
//                 <div className="card-text">{t('landingNewFeatureSecurity')}</div>
//               </div>
//               <div className="floating-card card-2">
//                 <div className="card-icon">📱</div>
//                 <div className="card-text">{t('landingNewFeatureSpeed')}</div>
//               </div>
//               <div className="floating-card card-3">
//                 <div className="card-icon">🌐</div>
//                 <div className="card-text">{t('landingNewFeatureGlobal')}</div>
//               </div> */}
//               <div className="hero-graphic">
//                 <div className="graphic-line"></div>
//                 <div className="graphic-circle"></div>
//                 <div className="graphic-dots"></div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="hero-waves">
//           <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
//             <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
//           </svg>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="features">
//         <div className="container">
//           <div className="section-header">
//             <h2 className="section-title">{t('landingNewFeaturesTitle')}</h2>
//             <p className="section-subtitle">Everything you need to streamline your payment process</p>
//           </div>
//           <div className="features-grid">
//             {features.map((feature, index) => (
//               <div className="feature-card" key={index}>
//                 <div className="feature-icon">{feature.icon}</div>
//                 <h3 className="feature-title">{feature.title}</h3>
//                 <p className="feature-description">{feature.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* How It Works Section */}
//       <section className="how-it-works">
//         <div className="container">
//           <div className="section-header">
//             <h2 className="section-title">{t('landingNewHowItWorks')}</h2>
//             <p className="section-subtitle">Get started in three simple steps</p>
//           </div>
//           <div className="steps-container">
//             {steps.map((step, index) => (
//               <div className="step-card" key={index}>
//                 <div className="step-number">{step.step}</div>
//                 <h3 className="step-title">{step.title}</h3>
//                 <p className="step-description">{step.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Testimonials Section */}
//       <section className="testimonials">
//         <div className="container">
//           <div className="section-header">
//             <h2 className="section-title">{t('landingNewTestimonials')}</h2>
//             <p className="section-subtitle">Hear from our satisfied customers</p>
//           </div>
//           <div className="testimonials-container">
//             <div className="testimonial-card active">
//               <div className="testimonial-content">
//                 <p>"{testimonials[currentTestimonial].text}"</p>
//               </div>
//               <div className="testimonial-author">
//                 <div className="author-avatar"></div>
//                 <div className="author-info">
//                   <div className="author-name">{testimonials[currentTestimonial].author}</div>
//                 </div>
//               </div>
//             </div>
//             <div className="testimonial-dots">
//               {testimonials.map((_, index) => (
//                 <button 
//                   key={index} 
//                   className={`dot ${currentTestimonial === index ? 'active' : ''}`}
//                   onClick={() => setCurrentTestimonial(index)}
//                 ></button>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Pricing Section */}
//       <section className="pricing">
//         <div className="container">
//           <div className="section-header">
//             <h2 className="section-title">{t('landingNewPricingTitle')}</h2>
//             <p className="section-subtitle">Choose the plan that works best for your business</p>
//           </div>
//           <div className="pricing-cards">
//             {pricingPlans.map((plan, index) => (
//               <div className={`pricing-card ${plan.popular ? 'popular' : ''}`} key={index}>
//                 {plan.popular && <div className="popular-badge">Most Popular</div>}
//                 <h3 className="pricing-name">{plan.name}</h3>
//                 <div className="pricing-price">{plan.price}<span className="pricing-period">/month</span></div>
//                 <p className="pricing-description">{plan.description}</p>
//                 <ul className="pricing-features">
//                   {plan.features.map((feature, idx) => (
//                     <li key={idx} className="pricing-feature">
//                       <span className="feature-check">✓</span> {feature}
//                     </li>
//                   ))}
//                 </ul>
//                 <button className={`btn ${plan.popular ? 'btn-primary' : 'btn-outline'} btn-block`}>
//                   {plan.cta}
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* FAQ Section */}
//       <section className="faq">
//         <div className="container">
//           <div className="section-header">
//             <h2 className="section-title">{t('landingNewFAQTitle')}</h2>
//             <p className="section-subtitle">Find answers to common questions</p>
//           </div>
//           <div className="faq-container">
//             {faqs.map((faq, index) => (
//               <div className="faq-item" key={index}>
//                 <div className="faq-question">
//                   <h3>{faq.question}</h3>
//                   <span className="faq-icon">+</span>
//                 </div>
//                 <div className="faq-answer">
//                   <p>{faq.answer}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="cta">
//         <div className="container">
//           <div className="cta-content">
//             <h2 className="cta-title">{t('landingNewCTATitle')}</h2>
//             <p className="cta-description">{t('landingNewCTADesc')}</p>
//             <Link to="/signup" className="btn btn-primary btn-lg">
//               {t('landingNewCTAButton')}
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="footer">
//         <div className="container">
//           <div className="footer-content">
//             <div className="footer-logo">
//               <h2>ServicePay</h2>
//               <p>{t('landingNewSubtitle')}</p>
//             </div>
//             <div className="footer-links">
//               <div className="footer-column">
//                 <h3>{t('landingProduct')}</h3>
//                 <ul>
//                   <li><a href="#">{t('landingFeatures')}</a></li>
//                   <li><a href="#">{t('landingPricing')}</a></li>
//                   <li><a href="#">{t('landingIntegrations')}</a></li>
//                   <li><a href="#">{t('landingApi')}</a></li>
//                 </ul>
//               </div>
//               <div className="footer-column">
//                 <h3>{t('landingCompany')}</h3>
//                 <ul>
//                   <li><a href="#">{t('landingAbout')}</a></li>
//                   <li><a href="#">{t('landingBlog')}</a></li>
//                   <li><a href="#">{t('landingCareers')}</a></li>
//                   <li><a href="#">{t('landingContact')}</a></li>
//                 </ul>
//               </div>
//               <div className="footer-column">
//                 <h3>{t('landingResources')}</h3>
//                 <ul>
//                   <li><a href="#">{t('landingDocumentation')}</a></li>
//                   <li><a href="#">{t('landingSupport')}</a></li>
//                   <li><a href="#">{t('landingStatus')}</a></li>
//                   <li><a href="#">{t('landingPartners')}</a></li>
//                 </ul>
//               </div>
//               <div className="footer-column">
//                 <h3>{t('landingLegal')}</h3>
//                 <ul>
//                   <li><a href="#">{t('landingPrivacy')}</a></li>
//                   <li><a href="#">{t('landingTerms')}</a></li>
//                   <li><a href="#">{t('landingSecurity')}</a></li>
//                   <li><a href="#">{t('landingCompliance')}</a></li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//           <div className="footer-bottom">
//             <p>&copy; {new Date().getFullYear()} ServicePay. {t('landingAllRightsReserved')}</p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default LandingPage;


const LandingPage = () => {
  const { t, language } = useLanguage();
  const { theme, _ } = useTheme();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.pageYOffset > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // FAQ Accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    const toggleFaq = (index) => {
      faqItems.forEach((item, i) => {
        if (i === index) {
          item.classList.toggle('active');
        } else {
          item.classList.remove('active');
        }
      });
    };
    
    faqItems.forEach((item, index) => {
      const question = item.querySelector('.faq-question');
      question.addEventListener('click', () => toggleFaq(index));
    });
    
    // Cleanup event listeners
    return () => {
      faqItems.forEach((item, index) => {
        const question = item.querySelector('.faq-question');
        question.removeEventListener('click', () => toggleFaq(index));
      });
    };
  }, []);

  const testimonials = [
    {
      text: t('landingNewTestimonial1'),
      author: t('landingNewTestimonial1Author')
    },
    {
      text: t('landingNewTestimonial2'),
      author: t('landingNewTestimonial2Author')
    },
    {
      text: t('landingNewTestimonial3'),
      author: t('landingNewTestimonial3Author')
    }
  ];

  const features = [
    {
      icon: '🔒',
      title: t('landingNewFeatureSecurity'),
      description: t('landingNewFeatureSecurityDesc')
    },
    {
      icon: '⚡',
      title: t('landingNewFeatureSpeed'),
      description: t('landingNewFeatureSpeedDesc')
    },
    {
      icon: '📊',
      title: t('landingNewFeatureAnalytics'),
      description: t('landingNewFeatureAnalyticsDesc')
    },
    {
      icon: '🌍',
      title: t('landingNewFeatureGlobal'),
      description: t('landingNewFeatureGlobalDesc')
    },
    {
      icon: '🛠️',
      title: t('landingNewFeatureAPI'),
      description: t('landingNewFeatureAPIDesc')
    },
    {
      icon: '📞',
      title: t('landingNewFeatureSupport'),
      description: t('landingNewFeatureSupportDesc')
    }
  ];

  const steps = [
    {
      step: '01',
      title: t('landingNewStep1'),
      description: t('landingNewStep1Desc')
    },
    {
      step: '02',
      title: t('landingNewStep2'),
      description: t('landingNewStep2Desc')
    },
    {
      step: '03',
      title: t('landingNewStep3'),
      description: t('landingNewStep3Desc')
    }
  ];

  const pricingPlans = [
    {
      name: t('landingNewPricingBasic'),
      price: t('landingNewPricingBasicPrice'),
      description: t('landingNewPricingBasicDesc'),
      features: [
        t('landingNewPricingFeature1'),
        t('landingNewPricingFeature2'),
        t('landingNewPricingFeature3')
      ],
      cta: t('landingNewPricingGetStarted')
    },
    {
      name: t('landingNewPricingPro'),
      price: t('landingNewPricingProPrice'),
      description: t('landingNewPricingProDesc'),
      features: [
        t('landingNewPricingFeature1'),
        t('landingNewPricingFeature2'),
        t('landingNewPricingFeature3'),
        t('landingNewPricingFeature4'),
        t('landingNewPricingFeature5'),
        t('landingNewPricingFeature6')
      ],
      cta: t('landingNewPricingGetStarted'),
      popular: true
    },
    {
      name: t('landingNewPricingEnterprise'),
      price: t('landingNewPricingEnterprisePrice'),
      description: t('landingNewPricingEnterpriseDesc'),
      features: [
        t('landingNewPricingFeature1'),
        t('landingNewPricingFeature2'),
        t('landingNewPricingFeature3'),
        t('landingNewPricingFeature4'),
        t('landingNewPricingFeature5'),
        t('landingNewPricingFeature6'),
        t('landingNewPricingFeature7'),
        t('landingNewPricingFeature8'),
        t('landingNewPricingFeature9')
      ],
      cta: t('landingNewPricingContactUs')
    }
  ];

  const faqs = [
    {
      question: t('landingNewFAQ1'),
      answer: t('landingNewFAQ1Answer')
    },
    {
      question: t('landingNewFAQ2'),
      answer: t('landingNewFAQ2Answer')
    },
    {
      question: t('landingNewFAQ3'),
      answer: t('landingNewFAQ3Answer')
    },
    {
      question: t('landingNewFAQ4'),
      answer: t('landingNewFAQ4Answer')
    }
  ];

  return (
    <div className={`landing-page ${language === 'ar' ? 'rtl' : ''} ${theme}`}>
      {/* Navigation */}
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <div className="navbar-content">
            <div className="navbar-logo">
              <Link to="/" className="logo">
                <span className="logo-text">ServicePay</span>
              </Link>
            </div>
            <div className="navbar-menu">
              <Link to="/login" className="navbar-link">{t('login')}</Link>
              <Link to="/signup" className="navbar-link navbar-signup">{t('landingNewGetStarted')}</Link>
              <ThemeToggle />
              <LanguageToggle />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background">
          <div className="animated-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
          </div>
        </div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <div className="hero-badge">{t('landingNewTagline')}</div>
              <h1 className="hero-title">
                <span className="title-word">{t('landingNewSubtitle').split(' ').slice(0, 3).join(' ')}</span>
                <span className="title-word highlight">{t('landingNewSubtitle').split(' ')[3]}</span>
                <span className="title-word">{t('landingNewSubtitle').split(' ').slice(4).join(' ')}</span>
              </h1>
              <div className="hero-buttons">
                <Link to="/signup" className="btn btn-primary btn-lg">
                  {t('landingNewGetStarted')}
                </Link>
                <button className="btn btn-outline btn-lg">
                  {t('landingNewWatchDemo')}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-waves">
          {/* <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
          </svg> */}
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{t('landingNewFeaturesTitle')}</h2>
            <p className="section-subtitle">Everything you need to streamline your payment process</p>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div className="feature-card" key={index}>
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{t('landingNewHowItWorks')}</h2>
            <p className="section-subtitle">Get started in three simple steps</p>
          </div>
          <div className="steps-container">
            {steps.map((step, index) => (
              <div className="step-card" key={index}>
                <div className="step-number">{step.step}</div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-description">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{t('landingNewTestimonials')}</h2>
            <p className="section-subtitle">Hear from our satisfied customers</p>
          </div>
          <div className="testimonials-container">
            <div className="testimonial-card active">
              <div className="testimonial-content">
                <p>"{testimonials[currentTestimonial].text}"</p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar"></div>
                <div className="author-info">
                  <div className="author-name">{testimonials[currentTestimonial].author}</div>
                </div>
              </div>
            </div>
            <div className="testimonial-dots">
              {testimonials.map((_, index) => (
                <button 
                  key={index} 
                  className={`dot ${currentTestimonial === index ? 'active' : ''}`}
                  onClick={() => setCurrentTestimonial(index)}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="pricing">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{t('landingNewPricingTitle')}</h2>
            <p className="section-subtitle">Choose the plan that works best for your business</p>
          </div>
          <div className="pricing-cards">
            {pricingPlans.map((plan, index) => (
              <div className={`pricing-card ${plan.popular ? 'popular' : ''}`} key={index}>
                {plan.popular && <div className="popular-badge">Most Popular</div>}
                <h3 className="pricing-name">{plan.name}</h3>
                <div className="pricing-price">{plan.price}<span className="pricing-period">/month</span></div>
                <p className="pricing-description">{plan.description}</p>
                <ul className="pricing-features">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="pricing-feature">
                      <span className="feature-check">✓</span> {feature}
                    </li>
                  ))}
                </ul>
                <button className={`btn ${plan.popular ? 'btn-primary' : 'btn-outline'} btn-block`}>
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{t('landingNewFAQTitle')}</h2>
            <p className="section-subtitle">Find answers to common questions</p>
          </div>
          <div className="faq-container">
            {faqs.map((faq, index) => (
              <div className="faq-item" key={index}>
                <div className="faq-question">
                  <h3>{faq.question}</h3>
                  <span className="faq-icon">+</span>
                </div>
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">{t('landingNewCTATitle')}</h2>
            <p className="cta-description">{t('landingNewCTADesc')}</p>
            <Link to="/signup" className="btn btn-primary btn-lg">
              {t('landingNewCTAButton')}
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">
              <h2>ServicePay</h2>
              <p>{t('landingNewSubtitle')}</p>
            </div>
            <div className="footer-links">
              <div className="footer-column">
                <h3>{t('landingProduct')}</h3>
                <ul>
                  <li><a href="#">{t('landingFeatures')}</a></li>
                  <li><a href="#">{t('landingPricing')}</a></li>
                  <li><a href="#">{t('landingIntegrations')}</a></li>
                  <li><a href="#">{t('landingApi')}</a></li>
                </ul>
              </div>
              <div className="footer-column">
                <h3>{t('landingCompany')}</h3>
                <ul>
                  <li><a href="#">{t('landingAbout')}</a></li>
                  <li><a href="#">{t('landingBlog')}</a></li>
                  <li><a href="#">{t('landingCareers')}</a></li>
                  <li><a href="#">{t('landingContact')}</a></li>
                </ul>
              </div>
              <div className="footer-column">
                <h3>{t('landingResources')}</h3>
                <ul>
                  <li><a href="#">{t('landingDocumentation')}</a></li>
                  <li><a href="#">{t('landingSupport')}</a></li>
                  <li><a href="#">{t('landingStatus')}</a></li>
                  <li><a href="#">{t('landingPartners')}</a></li>
                </ul>
              </div>
              <div className="footer-column">
                <h3>{t('landingLegal')}</h3>
                <ul>
                  <li><a href="#">{t('landingPrivacy')}</a></li>
                  <li><a href="#">{t('landingTerms')}</a></li>
                  <li><a href="#">{t('landingSecurity')}</a></li>
                  <li><a href="#">{t('landingCompliance')}</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} ServicePay. {t('landingAllRightsReserved')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;