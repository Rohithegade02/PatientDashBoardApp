import { formatDate } from '@/src/shared/hooks'
import React from 'react'
import { Text, View } from 'react-native'

interface DashboardFooterProps {
    lastUpdated?: string | null
}

export const DashboardFooter: React.FC<DashboardFooterProps> = ({
    lastUpdated,
}) => {
    return (
        <View className="items-center py-8 px-6">
            <Text className="text-gray-500 font-lato text-sm">
                Last updated: {lastUpdated ? formatDate(lastUpdated) : 'Never'}
            </Text>
        </View>
    )
}
