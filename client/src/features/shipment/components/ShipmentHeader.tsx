import { CustomHeader } from '@/src/shared/components/CustomHeader'
import React from 'react'
import { View, Text } from 'react-native'

interface ShipmentHeaderProps {
    totalShipments: number
}

export const ShipmentHeader: React.FC<ShipmentHeaderProps> = ({
    totalShipments,
}) => {
    return (
        <View className="bg-white px-5 py-4 border-b border-gray-200">
            <CustomHeader
                leftText="Shipment History"
                leftTextStyle="font-lato-bold text-2xl text-gray-900"
            />
            <Text className="text-gray-600 font-lato text-sm mt-1">
                {totalShipments} shipments found
            </Text>
        </View>
    )
}
