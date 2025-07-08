# Patient Dashboard App

A cross-platform mobile application built with React Native and Expo for managing patient medication deliveries and tracking shipment history.

## 🚀 Features

### Core Features
- **Authentication System**: Secure login with email/password validation
- **Dashboard**: Display patient information, medication status, and delivery schedules
- **Shipment History**: Track past and current deliveries with FlashList for optimal performance
- **State Management**: Zustand for client state + TanStack Query for server state
- **Navigation**: Expo Router with authentication flow and bottom tab navigation
- **Styling**: NativeWind (Tailwind CSS for React Native) for consistent, responsive design

### Bonus Features
- **Local Persistence**: MMKV for fast, secure local storage
- **Form Validation**: React Hook Form + Zod for robust form handling
- **Type Safety**: Full TypeScript implementation with strict type checking
- **Error Handling**: Comprehensive error states and user feedback
- **Loading States**: Smooth loading indicators and skeleton screens

## 🏗️ Architecture

### Feature-Based Organization
```
src/
├── features/
│   ├── auth/
│   │   ├── components/
│   │   ├── screens/
│   │   ├── services/
│   │   └── stores/
│   ├── dashboard/
│   │   ├── components/
│   │   ├── screens/
│   │   └── stores/
│   └── shipment/
│       ├── components/
│       ├── screens/
│       └── stores/
├── shared/
│   ├── components/
│   ├── constants/
│   ├── hooks/
│   ├── services/
│   ├── stores/
│   ├── types/
│   └── utils/
└── navigation/
```

### Technology Stack
- **Framework**: React Native with Expo
- **Language**: TypeScript
- **State Management**: Zustand + TanStack Query
- **Styling**: NativeWind (Tailwind CSS)
- **Navigation**: Expo Router
- **Forms**: React Hook Form + Zod
- **Storage**: MMKV
- **UI Components**: Custom components with native feel
- **Animations**: React Native Reanimated

## 📱 Screens

### 1. Login Screen
- Email/password authentication
- Form validation with real-time feedback
- Demo credentials display
- Error handling and loading states

### 2. Dashboard Screen
- Patient information display
- Medication status and delivery dates
- Status indicators (active/inactive, billing status)
- Quick actions and navigation

### 3. Shipment History Screen
- FlashList for performance with large datasets
- Infinite scrolling with pagination
- Pull-to-refresh functionality
- Status badges and tracking information

### 4. Settings Screen
- Profile management
- Notification preferences
- App information and logout

## 🔧 Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator or Android Emulator (optional)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd PatientDashBoardApp
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm start
```

4. **Run on device/simulator**
```bash
# iOS
npm run ios

# Android
npm run android

# Web
npm run web
```

### Demo Credentials
- **Email**: admin@example.com
- **Password**: password123

## 🎨 Styling System

### NativeWind Configuration
The app uses NativeWind for styling, which provides:
- Tailwind CSS classes for React Native
- Consistent design system
- Responsive utilities
- Dark mode support (ready for implementation)

### Color Palette
- **Primary**: Blue (#0ea5e9)
- **Success**: Green (#22c55e)
- **Warning**: Yellow (#f59e0b)
- **Error**: Red (#ef4444)
- **Background**: Light gray (#f8fafc)

## 🔐 Authentication Flow

### Login Process
1. User enters email/password
2. Form validation (React Hook Form + Zod)
3. Mock API authentication
4. Store JWT token and user data (MMKV)
5. Navigate to dashboard

### Protected Routes
- All tab screens require authentication
- Automatic redirect to login if not authenticated
- Token persistence across app launches

## 📊 State Management

### Zustand Stores
- **Auth Store**: User authentication state
- **Dashboard Store**: Patient dashboard data
- **Shipment Store**: Shipment history and pagination

### TanStack Query
- Server state management
- Caching and synchronization
- Background refetching
- Error handling and retry logic

## 🗄️ Data Models

### User Interface
```typescript
interface User {
  id: string;
  email: string;
  fullName: string;
  patientId: string;
  currentPlan: string;
  nextDeliveryDate: string;
  remainingMedication: number;
  status: 'active' | 'inactive';
  billingStatus: 'ok' | 'issues' | 'pending';
  createdAt: string;
  updatedAt: string;
}
```

### Shipment Interface
```typescript
interface Shipment {
  id: string;
  patientId: string;
  date: string;
  status: 'delivered' | 'shipped' | 'pending' | 'cancelled';
  quantity: number;
  medication: string;
  trackingNumber?: string;
  deliveryAddress: string;
  createdAt: string;
  updatedAt: string;
}
```

## 🚀 Performance Optimizations

### FlashList Implementation
- **Why FlashList**: Superior performance for large lists compared to FlatList
- **Estimated Item Size**: Optimized for consistent item heights
- **Pagination**: Efficient loading of large datasets
- **Memory Management**: Automatic recycling of list items

### State Optimization
- **Selective Re-renders**: Zustand selectors prevent unnecessary re-renders
- **Memoization**: React.memo and useMemo for expensive calculations
- **Lazy Loading**: Components and data loaded on demand

## 🔧 Development Tools

### Code Quality
- **ESLint**: Code linting with Expo rules
- **TypeScript**: Strict type checking
- **Absolute Imports**: Clean import paths with path mapping

### Testing (Ready for Implementation)
- **Jest**: Unit testing framework
- **React Native Testing Library**: Component testing
- **Detox**: E2E testing (configurable)

## 📚 API Integration

### Mock API Implementation
Currently using mock data with simulated API delays:
- **Login**: Mock authentication with demo credentials
- **Dashboard**: Patient data with refresh capability
- **Shipments**: Paginated shipment history

### Real API Integration (Future)
The app is designed to easily integrate with a real backend:
- **MongoDB**: Database integration ready
- **Express.js**: Server integration points defined
- **JWT**: Token-based authentication structure

## 🔄 State Persistence

### MMKV Storage
- **Why MMKV**: Fast, secure, and efficient storage
- **Use Cases**: 
  - Authentication tokens
  - User preferences
  - Cached data
  - Theme settings

### Storage Services
- **StorageService**: Singleton pattern for consistent access
- **Type Safety**: Generic methods for type-safe storage
- **Error Handling**: Graceful fallbacks for storage failures

## 🎯 Future Enhancements

### Planned Features
1. **Push Notifications**: Delivery updates and reminders
2. **Offline Support**: Cached data and sync capabilities
3. **Dark Mode**: Complete theme system
4. **Biometric Authentication**: Fingerprint/Face ID
5. **Multi-language Support**: i18n implementation
6. **Advanced Analytics**: User behavior tracking
7. **Health Integration**: Apple Health/Google Fit integration

### Performance Improvements
1. **Code Splitting**: Dynamic imports for better loading
2. **Image Optimization**: Lazy loading and caching
3. **Bundle Analysis**: Size optimization
4. **Native Modules**: Custom native functionality

## 🐛 Known Issues

### Current Limitations
1. **TypeScript Configuration**: Some React Native type conflicts (in progress)
2. **Animation System**: Reanimated integration pending
3. **Testing Suite**: Test implementation pending
4. **EAS Build**: Build configuration pending

### Troubleshooting
1. **Metro Bundle Issues**: Clear cache with `npx expo start --clear`
2. **TypeScript Errors**: Check tsconfig.json path mappings
3. **Storage Issues**: Clear app data on device/simulator

## 📄 Scripts

```bash
# Development
npm start          # Start Expo development server
npm run android    # Run on Android
npm run ios        # Run on iOS
npm run web        # Run on Web

# Code Quality
npm run lint       # Run ESLint
npm run type-check # Run TypeScript compiler

# Utilities
npm run reset-project # Reset to clean state
```

## 🤝 Contributing

### Development Guidelines
1. Follow TypeScript strict mode
2. Use feature-based organization
3. Write self-documenting code
4. Add JSDoc comments for complex functions
5. Test on both iOS and Android

### Code Style
- Use NativeWind for styling
- Implement proper TypeScript interfaces
- Follow React hooks best practices
- Use absolute imports for cleaner code

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Expo Team**: For the excellent development platform
- **NativeWind**: For Tailwind CSS in React Native
- **Zustand**: For simple state management
- **TanStack Query**: For server state management
- **React Hook Form**: For form handling
- **MMKV**: For efficient storage

---

**Built with ❤️ using React Native and Expo**
