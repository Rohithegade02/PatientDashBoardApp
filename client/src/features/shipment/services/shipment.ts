import { SHIPMENT_API } from '@/src/shared/api'
import { storage } from '@/src/shared/services/storage'
import { ApiResponse, Shipment } from '@/src/shared/types'

export const shipmentService = {
    getShipments: async (): Promise<ApiResponse<Shipment[]>> => {
        try {
            const token = storage.getAuthToken()
            if (!token) {
                throw new Error('No authentication token found')
            }

            const response = await fetch(SHIPMENT_API.GET_SHIPMENTS, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(
                    errorData.message || 'Failed to fetch shipments'
                )
            }

            const data = await response.json()
            return data
        } catch (error) {
            console.error('Shipment service error:', error)
            throw error instanceof Error
                ? error
                : new Error('Failed to fetch shipments')
        }
    },
}
