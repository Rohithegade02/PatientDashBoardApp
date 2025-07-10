import { useQuery } from '@tanstack/react-query'
import { shipmentService } from '../services/shipment'
import { queryKeys } from '@/src/shared/services/queryClient'
import { useAuthStore } from '@/src/features/auth/stores/authStore'

export const useShipments = () => {
    const { isAuthenticated } = useAuthStore()

    return useQuery({
        queryKey: queryKeys.shipmentsList(),
        queryFn: shipmentService.getShipments,
        enabled: isAuthenticated,
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 10 * 60 * 1000, // 10 minutes
        retry: 3,
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    })
}
