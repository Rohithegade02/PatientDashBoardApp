import { useAuthStore } from '@/src/features/auth/stores/authStore'
import { useDashboardStore } from '@/src/features/dashboard/stores/dashboardStore'
import { FlashList } from '@shopify/flash-list'
import React, { useEffect, useMemo } from 'react'
import { Text, View } from 'react-native'
import {
    DashboardFooter,
    DashboardHeader,
    DashboardInfoCard,
    DashboardServices,
    DeliveryInfoCard,
    StatusSummaryCard,
} from '../components'

interface DashboardItem {
    id: string
    type: 'patient-info' | 'services' | 'delivery-info' | 'status-summary'
}

const DashboardScreen = () => {
    const { user, loading, refreshDashboard } = useDashboardStore()

    console.log('user', user)

    const { isAuthenticated } = useAuthStore()

    useEffect(() => {
        if (isAuthenticated && user) {
            refreshDashboard().catch(() => {})
        }
    }, [])

    // Create data array for FlashList
    const dashboardData: DashboardItem[] = useMemo(
        () => [
            { id: 'services', type: 'services' },
            { id: 'delivery-info', type: 'delivery-info' },
            { id: 'status-summary', type: 'status-summary' },
        ],
        []
    )

    const renderItem = ({ item }: { item: DashboardItem }) => {
        if (!user) return null

        switch (item.type) {
            case 'services':
                return <DashboardServices />
            case 'delivery-info':
                return (
                    <DeliveryInfoCard
                        nextDeliveryDate={user.nextDeliveryDate}
                        remainingMedication={user.remainingMedication}
                    />
                )

            default:
                return null
        }
    }

    const ListHeaderComponent = () => {
        if (!user) return null
        return <DashboardHeader userData={user} />
    }

    const ListFooterComponent = () => {
        if (!user) return null
        return <DashboardFooter lastUpdated={user.updatedAt} />
    }

    if (!isAuthenticated || !user) {
        return (
            <View className="flex-1 justify-center items-center bg-gray-50">
                <Text className="text-gray-600 text-lg">
                    Please log in to view your dashboard
                </Text>
            </View>
        )
    }

    return (
        <View className="flex-1 bg-white">
            <FlashList
                data={dashboardData}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                estimatedItemSize={200}
                ListHeaderComponent={ListHeaderComponent}
                ListFooterComponent={ListFooterComponent}
                className=""
            />
        </View>
    )
}

export default DashboardScreen
