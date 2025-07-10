import { useAuthStore } from '@/src/features/auth/stores/authStore'
import { FlashList } from '@shopify/flash-list'
import React, { useMemo, useState } from 'react'
import { Text, View, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useShipments } from '../hooks/useShipments'
import {
    ShipmentCard,
    ShipmentHeader,
    ShipmentFooter,
    ShipmentTabs,
    AppointmentCard,
    PrescriptionCard,
    mockAppointments,
    mockPrescriptions,
    TabType,
} from '../components'
import { Shipment } from '@/src/shared/types'
import { CustomHeader } from '@/src/shared/components/CustomHeader'

const ShipmentScreen = () => {
    const { data, isLoading, error } = useShipments()
    const { isAuthenticated } = useAuthStore()
    const [activeTab, setActiveTab] = useState<TabType>('shipments')

    const tabs = [
        { title: 'Shipments', value: 'shipments' as TabType },
        { title: 'Appointments', value: 'appointments' as TabType },
        { title: 'Prescriptions', value: 'prescriptions' as TabType },
    ]

    const shipments = useMemo(() => {
        return data?.data || []
    }, [data])

    const renderShipmentItem = ({ item }: { item: Shipment }) => (
        <ShipmentCard shipment={item} />
    )

    const renderAppointmentItem = ({ item }: { item: any }) => (
        <AppointmentCard appointment={item} />
    )

    const renderPrescriptionItem = ({ item }: { item: any }) => (
        <PrescriptionCard prescription={item} />
    )

    const getTabData = () => {
        switch (activeTab) {
            case 'shipments':
                return shipments
            case 'appointments':
                return mockAppointments
            case 'prescriptions':
                return mockPrescriptions
            default:
                return []
        }
    }

    const getRenderItem = () => {
        switch (activeTab) {
            case 'shipments':
                return renderShipmentItem
            case 'appointments':
                return renderAppointmentItem
            case 'prescriptions':
                return renderPrescriptionItem
            default:
                return renderShipmentItem
        }
    }

    const getHeaderTitle = () => {
        switch (activeTab) {
            case 'shipments':
                return 'Shipment History'
            case 'appointments':
                return 'Appointment History'
            case 'prescriptions':
                return 'Prescription History'
            default:
                return 'History'
        }
    }

    const ListHeaderComponent = () => (
        <View className="bg-white px-5 py-4 border-b border-gray-200">
            <Text className="font-lato-bold text-2xl text-gray-900">
                {getHeaderTitle()}
            </Text>
            <Text className="text-gray-600 font-lato text-sm mt-1">
                {getTabData().length} {activeTab.slice(0, -1)}(s) found
            </Text>
        </View>
    )

    const ListFooterComponent = () => (
        <View className="bg-gray-50 px-5 py-6 items-center">
            <Text className="text-gray-500 font-lato text-sm">
                Last updated:{' '}
                {new Date().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                })}
            </Text>
        </View>
    )

    const ListEmptyComponent = () => (
        <View className="flex-1 justify-center items-center py-20">
            <Text className="text-gray-500 font-lato text-lg">
                No {activeTab} found
            </Text>
            <Text className="text-gray-400 font-lato text-sm mt-2">
                Your {activeTab} history will appear here
            </Text>
        </View>
    )

    if (!isAuthenticated) {
        return (
            <SafeAreaView className="flex-1 justify-center items-center bg-gray-50">
                <Text className="text-gray-600 text-lg font-lato">
                    Please log in to view your history
                </Text>
            </SafeAreaView>
        )
    }

    if (isLoading && activeTab === 'shipments') {
        return (
            <SafeAreaView className="flex-1 justify-center items-center bg-gray-50">
                <ActivityIndicator size="large" color="#3B82F6" />
                <Text className="text-gray-600 font-lato text-lg mt-4">
                    Loading {activeTab}...
                </Text>
            </SafeAreaView>
        )
    }

    if (error && activeTab === 'shipments') {
        return (
            <SafeAreaView className="flex-1 justify-center items-center bg-gray-50">
                <Text className="text-red-600 font-lato text-lg">
                    Error loading {activeTab}
                </Text>
                <Text className="text-gray-600 font-lato text-sm mt-2">
                    {error instanceof Error ? error.message : 'Unknown error'}
                </Text>
            </SafeAreaView>
        )
    }

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <View className="bg-white px-4 py-4">
                <CustomHeader
                    leftText="History"
                    leftTextStyle="text-4xl font-lato-bold text-gray-900"
                />
            </View>

            <View className="px-4 py-4 bg-white">
                <ShipmentTabs
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    tabs={tabs}
                />
            </View>

            <FlashList
                data={getTabData()}
                renderItem={getRenderItem()}
                keyExtractor={(item) => item.id || item._id}
                estimatedItemSize={120}
                ListHeaderComponent={ListHeaderComponent}
                ListFooterComponent={ListFooterComponent}
                ListEmptyComponent={ListEmptyComponent}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    )
}

export default ShipmentScreen
