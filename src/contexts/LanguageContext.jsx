import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('language');
    console.log(savedLanguage || 'en')
    return savedLanguage || 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ar' : 'en');
  };

  const t = (key) => {
    const translations = {
      en: {
        // Navigation
        home: 'Home',
        dashboard: 'Dashboard',
        services: 'Services',
        wallet: 'Wallet',
        reports: 'Reports',
        login: 'Login',
        signup: 'Signup',
        logout: 'Logout',
        
        // Common
        loading: 'Loading...',
        error: 'Error',
        success: 'Success',
        save: 'Save',
        cancel: 'Cancel',
        delete: 'Delete',
        edit: 'Edit',
        view: 'View',
        
        // User Dashboard
        balance: 'Balance',
        subscriptions: 'Active Subscriptions',
        noSubscriptions: 'No active subscriptions',
        subscribeNow: 'Subscribe Now',
        premiumNotification: 'To ensure better service subscribe to the premium plan',
        
        // Services
        price: 'Price',
        subscribe: 'Subscribe',
        subscribed: 'Subscribed',
        insufficientBalance: 'Insufficient balance',
        
        // Wallet
        walletRecharge: 'Wallet Recharge',
        phoneNumber: 'Phone Number',
        amount: 'Amount',
        uploadScreenshot: 'Upload Payment Screenshot',
        submit: 'Submit',
        
        // Marketing Dashboard
        totalReferred: 'Total Referred Users',
        availableEarnings: 'Available Earnings',
        referralLink: 'Referral Link',
        paidReferrals: 'Paid Referrals',
        
        // Admin Dashboard
        totalUsers: 'Total Users',
        payingUsers: 'Paying Users',
        marketingUsers: 'Marketing Users',
        totalPaid: 'Total Paid Amount',
        marketingBudget: 'Marketing Budget',
        
        // Auth
        email: 'Email',
        password: 'Password',
        confirmPassword: 'Confirm Password',
        rememberMe: 'Remember Me',
        forgotPassword: 'Forgot Password?',
        alreadyHaveAccount: 'Already have an account?',
        dontHaveAccount: "Don't have an account?",
        
        // Landing
        welcome: 'Welcome to AI Platform',
        subtitle: 'Experience the future of AI-powered services',
        getStarted: 'Get Started',
        features: 'Features',
        about: 'About',
        contact: 'Contact'
      },
      ar: {
        // Navigation
        home: 'الرئيسية',
        dashboard: 'لوحة التحكم',
        services: 'الخدمات',
        wallet: 'المحفظة',
        reports: 'التقارير',
        login: 'تسجيل الدخول',
        signup: 'إنشاء حساب',
        logout: 'تسجيل الخروج',
        
        // Common
        loading: 'جاري التحميل...',
        error: 'خطأ',
        success: 'نجاح',
        save: 'حفظ',
        cancel: 'إلغاء',
        delete: 'حذف',
        edit: 'تعديل',
        view: 'عرض',
        
        // User Dashboard
        balance: 'الرصيد',
        subscriptions: 'الاشتراكات النشطة',
        noSubscriptions: 'لا توجد اشتراكات نشطة',
        subscribeNow: 'اشترك الآن',
        premiumNotification: 'لضمان خدمة أفضل اشترك في الخطة المميزة',
        
        // Services
        price: 'السعر',
        subscribe: 'اشترك',
        subscribed: 'مشترك',
        insufficientBalance: 'رصيد غير كافٍ',
        
        // Wallet
        walletRecharge: 'شحن المحفظة',
        phoneNumber: 'رقم الهاتف',
        amount: 'المبلغ',
        uploadScreenshot: 'رفع لقطة الشاشة الدفع',
        submit: 'إرسال',
        
        // Marketing Dashboard
        totalReferred: 'إجمالي المستخدمين المُحالين',
        availableEarnings: 'الأرباح المتاحة',
        referralLink: 'رابط الإحالة',
        paidReferrals: 'الإحالات المدفوعة',
        
        // Admin Dashboard
        totalUsers: 'إجمالي المستخدمين',
        payingUsers: 'المستخدمون الدافعون',
        marketingUsers: 'مستخدمو التسويق',
        totalPaid: 'إجمالي المبلغ المدفوع',
        marketingBudget: 'ميزانية التسويق',
        
        // Auth
        email: 'البريد الإلكتروني',
        password: 'كلمة المرور',
        confirmPassword: 'تأكيد كلمة المرور',
        rememberMe: 'تذكرني',
        forgotPassword: 'نسيت كلمة المرور؟',
        alreadyHaveAccount: 'لديك حساب بالفعل؟',
        dontHaveAccount: 'ليس لديك حساب؟',
        
        // Landing
        welcome: 'مرحباً بك في منصة الذكاء الاصطناعي',
        subtitle: 'اختبر مستقبل الخدمات المدعومة بالذكاء الاصطناعي',
        getStarted: 'ابدأ الآن',
        features: 'المميزات',
        about: 'حول',
        contact: 'اتصل بنا'
      }
    };
    
    const safeLanguage = language && translations[language] ? language : 'en';
    return translations[safeLanguage][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};