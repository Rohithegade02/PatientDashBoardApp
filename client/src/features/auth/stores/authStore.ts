import { storage } from '@/src/shared/services/storage';
import { AuthState, LoginCredentials, User } from '@/src/shared/types';
import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

interface AuthStore extends AuthState {
  // Actions
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  checkAuthStatus: () => void;
  updateUser: (user: User) => void;
  clearError: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthStore>()(
  subscribeWithSelector((set, get) => ({
    // Initial state
    isAuthenticated: false,
    user: null,
    loading: false,
    error: null,

    // Actions
    login: async (credentials: LoginCredentials) => {
      set({ loading: true, error: null });
      
      try {
        // Mock login logic - replace with actual API call
        const mockUser: User = {
          id: 'user_123',
          email: credentials.email,
          fullName: 'John Doe',
          patientId: 'PAT001',
          currentPlan: 'Standard Plan',
          nextDeliveryDate: '2024-02-15',
          remainingMedication: 15,
          status: 'active',
          billingStatus: 'ok',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Mock authentication check
        if (credentials.email === 'admin@example.com' && credentials.password === 'Password123') {
          const mockToken = 'mock_jwt_token_' + Date.now();
          
          // Store auth data
          storage.setAuthToken(mockToken);
          storage.setUserData(mockUser);
          
          set({
            isAuthenticated: true,
            user: mockUser,
            loading: false,
            error: null,
          });
        } else {
          throw new Error('Invalid email or password');
        }
      } catch (error) {
        set({
          loading: false,
          error: error instanceof Error ? error.message : 'Login failed',
          isAuthenticated: false,
          user: null,
        });
        throw error;
      }
    },

    logout: () => {
      storage.clearAuthData();
      set({
        isAuthenticated: false,
        user: null,
        loading: false,
        error: null,
      });
    },

    checkAuthStatus: () => {
      const token = storage.getAuthToken();
      const userData = storage.getUserData<User>();
      
      if (token && userData) {
        set({
          isAuthenticated: true,
          user: userData,
          loading: false,
          error: null,
        });
      } else {
        set({
          isAuthenticated: false,
          user: null,
          loading: false,
          error: null,
        });
      }
    },

    updateUser: (user: User) => {
      storage.setUserData(user);
      set({ user });
    },

    clearError: () => {
      set({ error: null });
    },

    setLoading: (loading: boolean) => {
      set({ loading });
    },
  }))
);

// Subscribe to auth state changes to sync with storage
useAuthStore.subscribe(
  (state) => state.isAuthenticated,
  (isAuthenticated, previousIsAuthenticated) => {
    if (isAuthenticated !== previousIsAuthenticated) {
      console.log('Auth state changed:', isAuthenticated);
    }
  }
); 