import { useAuthStore } from '@/features/auth/stores/authStore';
import { DashboardState, User } from '@/src/shared/types';
import { create } from 'zustand';

interface DashboardStore extends DashboardState {
  // Actions
  refreshDashboard: () => Promise<void>;
  updatePatientInfo: (updates: Partial<User>) => void;
  clearError: () => void;
  setLoading: (loading: boolean) => void;
}

export const useDashboardStore = create<DashboardStore>()((set, get) => ({
  // Initial state
  user: null,
  loading: false,
  error: null,
  lastUpdated: null,

  // Actions
  refreshDashboard: async () => {
    set({ loading: true, error: null });
    
    try {
      const authState = useAuthStore.getState();
      
      if (!authState.isAuthenticated || !authState.user) {
        throw new Error('User not authenticated');
      }

      // Mock API call to refresh dashboard data
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Simulate updated user data
      const updatedUser: User = {
        ...authState.user,
        nextDeliveryDate: '2024-02-20', // Updated delivery date
        remainingMedication: authState.user.remainingMedication - 1, // Simulate medication usage
        updatedAt: new Date().toISOString(),
      };

      // Update auth store with new user data
      useAuthStore.getState().updateUser(updatedUser);

      set({
        user: updatedUser,
        loading: false,
        error: null,
        lastUpdated: new Date().toISOString(),
      });
    } catch (error) {
      set({
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to refresh dashboard',
      });
      throw error;
    }
  },

  updatePatientInfo: (updates: Partial<User>) => {
    const currentUser = get().user;
    if (!currentUser) {
      set({ error: 'No user data available' });
      return;
    }

    const updatedUser: User = {
      ...currentUser,
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    // Update auth store with new user data
    useAuthStore.getState().updateUser(updatedUser);

    set({
      user: updatedUser,
      lastUpdated: new Date().toISOString(),
    });
  },

  clearError: () => {
    set({ error: null });
  },

  setLoading: (loading: boolean) => {
    set({ loading });
  },
}));

// Subscribe to auth state changes to sync dashboard data
useAuthStore.subscribe(
  (state) => state.user,
  (user) => {
    useDashboardStore.getState().user !== user && useDashboardStore.setState({ user });
  }
); 