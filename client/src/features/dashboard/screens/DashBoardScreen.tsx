import { useAuthStore } from '@/src/features/auth/stores/authStore'
import { useDashboardStore } from '@/src/features/dashboard/stores/dashboardStore'
import { FlashList } from '@shopify/flash-list'
import React, { useEffect, useMemo } from 'react'
import { Alert, Text, View } from 'react-native'
import {
    DashboardFooter,
    DashboardHeader,
    DashboardInfoCard,
    DashboardServices,
    DeliveryInfoCard,
    QuickActionsCard,
    StatusSummaryCard,
} from '../components'

interface DashboardItem {
    id: string
    type:
        | 'patient-info'
        | 'services'
        | 'delivery-info'
        | 'status-summary'
        | 'quick-actions'
}

const DashboardScreen = () => {
    const { user, loading, error, refreshDashboard, clearError } =
        useDashboardStore()
    const { isAuthenticated } = useAuthStore()

    useEffect(() => {
        if (isAuthenticated && user) {
            refreshDashboard().catch(() => {})
        }
    }, [isAuthenticated])

    const handleRefresh = async () => {
        try {
            await refreshDashboard()
        } catch (error) {
            Alert.alert('Error', 'Failed to refresh dashboard data')
        }
    }

    const handleContactSupport = () => {
        Alert.alert('Contact Support', 'Feature coming soon!')
    }

    // Create data array for FlashList
    const dashboardData: DashboardItem[] = useMemo(
        () => [
            { id: 'patient-info', type: 'patient-info' },
            { id: 'services', type: 'services' },
            { id: 'delivery-info', type: 'delivery-info' },
            { id: 'status-summary', type: 'status-summary' },
            { id: 'quick-actions', type: 'quick-actions' },
        ],
        []
    )

    const renderItem = ({ item }: { item: DashboardItem }) => {
        if (!user) return null

        switch (item.type) {
            case 'patient-info':
                return (
                    <DashboardInfoCard
                        title="Patient Details"
                        items={[
                            {
                                label: 'Full Name',
                                value: 'John Doe',
                                valueStyle: 'font-lato-bold',
                            },
                            {
                                label: 'Patient ID',
                                value: 'PID-12345',
                                valueStyle: 'font-mono text-sm',
                            },
                            {
                                label: 'Current Plan',
                                value: 'Premium',
                                valueStyle: 'text-blue-600 font-semibold',
                            },
                        ]}
                        containerStyle={{}}
                    />
                )
            case 'services':
                return <DashboardServices />
            case 'delivery-info':
                return (
                    <DeliveryInfoCard
                        nextDeliveryDate={user.nextDeliveryDate}
                        remainingMedication={user.remainingMedication}
                    />
                )
            case 'status-summary':
                return (
                    <StatusSummaryCard
                        status={user.status}
                        billingStatus={user.billingStatus}
                    />
                )
            case 'quick-actions':
                return (
                    <QuickActionsCard
                        onRefresh={handleRefresh}
                        loading={loading}
                        onContactSupport={handleContactSupport}
                    />
                )
            default:
                return null
        }
    }

    const ListHeaderComponent = () => {
        if (!user) return null
        return <DashboardHeader fullName={user.fullName} plan="PRO" />
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
                refreshing={loading}
                onRefresh={handleRefresh}
                className=""
            />
        </View>
    )
}

export default DashboardScreen
