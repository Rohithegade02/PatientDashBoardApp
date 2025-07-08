import { useAuthStore } from '@/features/auth/stores/authStore';
import { PAGINATION } from '@/src/shared/constants';
import { Shipment, ShipmentState } from '@/src/shared/types';
import { create } from 'zustand';

interface ShipmentStore extends ShipmentState {
  // Actions
  loadShipments: (refresh?: boolean) => Promise<void>;
  loadMoreShipments: () => Promise<void>;
  refreshShipments: () => Promise<void>;
  clearError: () => void;
  setLoading: (loading: boolean) => void;
}

// Mock shipment data generator
const generateMockShipments = (patientId: string, page: number = 1): Shipment[] => {
  const statuses: ('delivered' | 'shipped' | 'pending' | 'cancelled')[] = ['delivered', 'shipped', 'pending', 'cancelled'];
  const medications = ['Metformin 500mg', 'Lisinopril 10mg', 'Atorvastatin 20mg', 'Amlodipine 5mg'];
  
  return Array.from({ length: PAGINATION.PAGE_SIZE }, (_, index) => {
    const shipmentIndex = (page - 1) * PAGINATION.PAGE_SIZE + index;
    const date = new Date();
    date.setDate(date.getDate() - shipmentIndex * 7); // Weekly shipments
    
    return {
      id: `shipment_${shipmentIndex + 1}`,
      patientId,
      date: date.toISOString(),
      status: statuses[shipmentIndex % statuses.length],
      quantity: Math.floor(Math.random() * 30) + 30, // 30-60 doses
      medication: medications[shipmentIndex % medications.length],
      trackingNumber: `TRK${(shipmentIndex + 1).toString().padStart(6, '0')}`,
      deliveryAddress: '123 Main St, City, State 12345',
      createdAt: date.toISOString(),
      updatedAt: date.toISOString(),
    };
  });
};

export const useShipmentStore = create<ShipmentStore>()((set, get) => ({
  // Initial state
  shipments: [],
  loading: false,
  error: null,
  hasMore: true,
  page: PAGINATION.INITIAL_PAGE,

  // Actions
  loadShipments: async (refresh = false) => {
    const state = get();
    
    if (state.loading && !refresh) return;
    
    set({ loading: true, error: null });
    
    try {
      const authState = useAuthStore.getState();
      
      if (!authState.isAuthenticated || !authState.user) {
        throw new Error('User not authenticated');
      }

      // Mock API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newShipments = generateMockShipments(authState.user.patientId, 1);
      
      set({
        shipments: newShipments,
        loading: false,
        error: null,
        hasMore: newShipments.length === PAGINATION.PAGE_SIZE,
        page: 1,
      });
    } catch (error) {
      set({
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to load shipments',
      });
      throw error;
    }
  },

  loadMoreShipments: async () => {
    const state = get();
    
    if (state.loading || !state.hasMore) return;
    
    set({ loading: true, error: null });
    
    try {
      const authState = useAuthStore.getState();
      
      if (!authState.isAuthenticated || !authState.user) {
        throw new Error('User not authenticated');
      }

      // Mock API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const nextPage = state.page + 1;
      const newShipments = generateMockShipments(authState.user.patientId, nextPage);
      
      set({
        shipments: [...state.shipments, ...newShipments],
        loading: false,
        error: null,
        hasMore: newShipments.length === PAGINATION.PAGE_SIZE,
        page: nextPage,
      });
    } catch (error) {
      set({
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to load more shipments',
      });
      throw error;
    }
  },

  refreshShipments: async () => {
    await get().loadShipments(true);
  },

  clearError: () => {
    set({ error: null });
  },

  setLoading: (loading: boolean) => {
    set({ loading });
  },
})); 