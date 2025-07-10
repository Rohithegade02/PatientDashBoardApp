import { useAuthStore } from '@/src/features/auth/stores/authStore'
import { Shipment, ShipmentState } from '@/src/shared/types'
import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import { shipmentService } from '../services/shipment'

interface ShipmentStore extends ShipmentState {
    // Actions
    fetchShipments: () => Promise<void>
    refreshShipments: () => Promise<void>
    clearError: () => void
    setLoading: (loading: boolean) => void
}

export const useShipmentStore = create<ShipmentStore>()(
    subscribeWithSelector((set, get) => ({
        // Initial state
        shipments: [],
        loading: false,
        error: null,
        hasMore: true,
        page: 1,

        // Actions
        fetchShipments: async () => {
            const state = get()
            if (state.loading) return

            set({ loading: true, error: null })

            try {
                const authState = useAuthStore.getState()
                if (!authState.isAuthenticated) {
                    throw new Error('User not authenticated')
                }

                const response = await shipmentService.getShipments()

                if (!response.success || !response.data) {
                    throw new Error(
                        response.message || 'Failed to fetch shipments'
                    )
                }

                set({
                    shipments: response.data,
                    loading: false,
                    error: null,
                    hasMore: false, // Since we're not implementing pagination yet
                })
            } catch (error) {
                console.error('Shipment fetch error:', error)
                set({
                    loading: false,
                    error:
                        error instanceof Error
                            ? error.message
                            : 'Failed to fetch shipments',
                })
                throw error
            }
        },

        refreshShipments: async () => {
            await get().fetchShipments()
        },

        clearError: () => {
            set({ error: null })
        },

        setLoading: (loading: boolean) => {
            set({ loading })
        },
    }))
)

// Subscribe to auth state changes
useAuthStore.subscribe(
    (state) => state.isAuthenticated,
    (isAuthenticated) => {
        if (isAuthenticated) {
            useShipmentStore
                .getState()
                .fetchShipments()
                .catch(() => {
                    // Handle error silently or log
                })
        } else {
            useShipmentStore.setState({
                shipments: [],
                loading: false,
                error: null,
                hasMore: true,
                page: 1,
            })
        }
    }
)
