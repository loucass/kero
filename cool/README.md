# AI Platform - Modern React Website

A modern, AI-inspired responsive website built with React, featuring multi-user roles, internationalization, and a clean, extensible architecture.

## Features

### 🌟 Core Features
- **Multi-User Roles**: Normal Users, Marketing Users, and Admin
- **Responsive Design**: Mobile-first approach with Bootstrap
- **Dark/Light Themes**: Theme switching with persistence
- **Internationalization**: Arabic/English language support
- **Modern UI**: AI-inspired design with animations and transitions

### 👥 User Roles

#### Normal Users
- Landing page with modern AI-inspired design
- User authentication (login/signup)
- Dashboard with balance and subscriptions
- Services page with subscription management
- Wallet recharge functionality
- Referral system support

#### Marketing Users
- Dedicated landing page with company policies
- Separate authentication flow
- Dashboard with referral statistics
- Reports page with detailed analytics
- Commission tracking

#### Admin
- Comprehensive dashboard with platform statistics
- User management and reports
- Marketing partner management
- System status monitoring
- Revenue and budget tracking

### 🎨 Design Features
- **Offcanvas Navigation**: Works on both mobile and desktop
- **Bootstrap Integration**: Clean, consistent styling
- **Custom CSS**: Separate CSS files for each page
- **Animations**: Smooth transitions and hover effects
- **Accessibility**: Semantic HTML and ARIA support

## Project Structure

```
src/
├── components/           # Reusable components
│   ├── Navigation.js    # Offcanvas navigation
│   └── Footer.js        # Footer component
├── contexts/           # React contexts
│   ├── ThemeContext.js # Theme management
│   └── LanguageContext.js # Internationalization
├── pages/              # Page components
│   ├── NormalUserLanding.js
│   ├── MarketingUserLanding.js
│   ├── auth/           # Authentication pages
│   │   ├── NormalLogin.js
│   │   ├── NormalSignup.js
│   │   ├── MarketingLogin.js
│   │   └── MarketingSignup.js
│   ├── user/          # User pages
│   │   ├── UserDashboard.js
│   │   ├── Services.js
│   │   └── WalletRecharge.js
│   ├── marketing/     # Marketing pages
│   │   ├── MarketingDashboard.js
│   │   └── MarketingReports.js
│   └── admin/         # Admin pages
│       ├── AdminDashboard.js
│       ├── UserReports.js
│       └── MarketingReports.js
├── styles/             # CSS files
│   ├── global.css     # Global styles
│   ├── navigation.css
│   ├── footer.css
│   ├── auth.css
│   ├── normal-user-landing.css
│   ├── marketing-user-landing.css
│   ├── user-dashboard.css
│   ├── services.css
│   ├── wallet-recharge.css
│   ├── marketing-dashboard.css
│   ├── marketing-reports.css
│   ├── admin-dashboard.css
│   └── admin-reports.css
├── utils/              # Utility functions
├── App.js             # Main app component
└── index.js           # Entry point
```

## Technologies Used

### Core Technologies
- **React 18.2.0** - Frontend framework
- **React Router 6.8.0** - Routing
- **React Bootstrap 2.9.0** - UI components
- **Bootstrap 5.3.0** - CSS framework
- **React Icons 4.12.0** - Icon library

### Development Tools
- **React Scripts 5.0.1** - Build tooling
- **TypeScript 5.0.0** - Type safety (types included)
- **Axios 1.6.0** - HTTP client (for future API integration)

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ai-platform
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser and navigate to `http://localhost:3000`

### Available Scripts

- `npm start` - Start the development server
- `npm run build` - Build the project for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

## Key Components

### Navigation
- Offcanvas navigation that works on mobile and desktop
- Dynamic menu items based on current route
- Theme and language switchers
- Responsive design with proper RTL support

### Theme System
- Light and dark theme support
- Theme persistence using localStorage
- Smooth transitions between themes
- CSS custom properties for easy theming

### Internationalization
- Arabic and English language support
- RTL layout support for Arabic
- Translation context with easy extensibility
- Language persistence using localStorage

### Authentication
- Separate authentication flows for different user types
- Form validation and error handling
- Referral code support for normal users
- Placeholder for backend integration

### User Dashboard
- Balance display and management
- Active subscriptions overview
- Premium upgrade notifications
- Quick access to services and wallet

### Services Page
- Service catalog with pricing
- Subscription management
- Balance validation
- Confirmation modals

### Wallet Recharge
- Multiple payment methods
- File upload for payment proof
- Form validation
- Image preview functionality

### Marketing Dashboard
- Referral statistics
- Commission tracking
- Referral link management
- Recent activity feed

### Admin Dashboard
- Platform overview statistics
- User management
- Marketing partner management
- System status monitoring

## Backend Integration

The project includes placeholder logic for future backend integration:

### API Endpoints (Placeholder)
- User authentication
- Service subscriptions
- Wallet management
- Referral tracking
- Admin reporting

### Data Flow
- Context-based state management
- Axios integration for HTTP requests
- Error handling and loading states
- Form validation and submission

## Customization

### Adding New Pages
1. Create page component in `src/pages/`
2. Add corresponding CSS file in `src/styles/`
3. Add route in `App.js`
4. Update navigation if needed

### Styling
- Each page has its own CSS file
- Global styles in `global.css`
- Bootstrap components with custom overrides
- CSS custom properties for theming

### Internationalization
- Add translations in `LanguageContext.js`
- Use `t()` function for translated text
- RTL support automatically handled

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Performance

- Lazy loading for components
- Optimized bundle size
- Efficient state management
- Smooth animations and transitions

## Security

- Input validation
- XSS prevention
- CSRF protection (placeholder)
- Secure authentication flow (placeholder)

## Future Enhancements

- Real backend integration
- Advanced analytics dashboard
- User profile management
- Notification system
- Advanced reporting features
- Payment gateway integration
- Real-time updates with WebSockets

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue in the repository.