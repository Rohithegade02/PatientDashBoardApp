import React from 'react'
import { Text, View } from 'react-native'

interface ShipmentFooterProps {
    lastUpdated?: string | null
}

export const ShipmentFooter: React.FC<ShipmentFooterProps> = ({
    lastUpdated,
}) => {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        })
    }

    return (
        <View className="bg-gray-50 px-5 py-6 items-center">
            <Text className="text-gray-500 font-lato text-sm">
                {lastUpdated
                    ? `Last updated: ${formatDate(lastUpdated)}`
                    : 'No recent updates'}
            </Text>
        </View>
    )
}
