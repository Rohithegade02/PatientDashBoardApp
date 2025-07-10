import { Shipment } from '@/src/shared/types'
import clsx from 'clsx'
import React from 'react'
import { Text, View } from 'react-native'

interface ShipmentCardProps {
    shipment: Shipment
}

export const ShipmentCard: React.FC<ShipmentCardProps> = ({ shipment }) => {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        })
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'delivered':
                return 'bg-green-100 text-green-800'
            case 'shipped':
                return 'bg-blue-100 text-blue-800'
            case 'pending':
                return 'bg-yellow-100 text-yellow-800'
            case 'cancelled':
                return 'bg-red-100 text-red-800'
            default:
                return 'bg-gray-100 text-gray-800'
        }
    }

    return (
        <View className="bg-white mx-5 mb-4 rounded-lg shadow-sm border border-gray-200 p-4">
            <View className="flex-row justify-between items-start mb-3">
                <View className="flex-1">
                    <Text className="font-lato-bold text-lg text-gray-900">
                        {shipment.medicationName}
                    </Text>
                    <Text className="font-lato text-sm text-gray-600 mt-1">
                        Quantity: {shipment.quantity} tablets
                    </Text>
                </View>
                <View
                    className={clsx(
                        'px-3 py-1 rounded-full',
                        getStatusColor(shipment.status)
                    )}
                >
                    <Text className="font-lato-bold text-xs capitalize">
                        {shipment.status}
                    </Text>
                </View>
            </View>

            <View className="border-t border-gray-100 pt-3">
                <Text className="font-lato text-sm text-gray-600">
                    Delivery Date: {formatDate(shipment.date)}
                </Text>
            </View>
        </View>
    )
}
