import { useQuery } from '@tanstack/react-query'
import { dashboardService } from '../services/dashboard'
import { queryKeys } from '@/src/shared/services/queryClient'
import { useAuthStore } from '@/src/features/auth/stores/authStore'

export const useDashboard = () => {
    const { isAuthenticated } = useAuthStore()

    return useQuery({
        queryKey: queryKeys.dashboardUser(),
        queryFn: dashboardService.getDashboard,
        enabled: isAuthenticated,
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 10 * 60 * 1000, // 10 minutes
        retry: 3,
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    })
}
