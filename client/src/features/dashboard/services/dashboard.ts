import { DASHBOARD_API } from '@/src/shared/api'
import { storage } from '@/src/shared/services/storage'
import { ApiResponse } from '@/src/shared/types'

export interface DashboardData {
    userId: string
    patientId: string
    currentPlan: string
    nextDeliveryDate: string
    remainingMedication: number
    createdAt: string
    updatedAt: string
}

export const dashboardService = {
    getDashboard: async (): Promise<ApiResponse<DashboardData>> => {
        try {
            const token = storage.getAuthToken()
            if (!token) {
                throw new Error('No authentication token found')
            }

            const response = await fetch(DASHBOARD_API.GET_DASHBOARD, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(
                    errorData.message || 'Failed to fetch dashboard data'
                )
            }

            const data = await response.json()
            return data
        } catch (error) {
            console.error('Dashboard service error:', error)
            throw error instanceof Error
                ? error
                : new Error('Failed to fetch dashboard data')
        }
    },
}
