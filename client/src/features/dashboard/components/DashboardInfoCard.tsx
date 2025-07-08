import clsx from 'clsx'
import React, { HTMLProps } from 'react'
import { Text, View } from 'react-native'

interface DashboardInfoCardProps {
    fullName: string
    DashboardId: string
    currentPlan: string
    title: string
    items: {
        label: string
        value: string
        valueStyle?: HTMLProps<HTMLElement>['className']
        labelStyle?: HTMLProps<HTMLElement>['className']
    }[]
    containerStyle: string
}

export const DashboardInfoCard: React.FC<DashboardInfoCardProps> = ({
    title,
    fullName,
    DashboardId,
    currentPlan,
    items,
}) => {
    return (
        <View className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mx-6 mb-4">
            <Text className="text-xl font-lato-bold text-gray-900 mb-4">
                {title}
            </Text>

            <View className="gap-y-1.5">
                {items.map((item, index) => (
                    <View
                        key={index}
                        className="flex-row justify-between items-center"
                    >
                        <Text
                            className={clsx(
                                'text-gray-600 font-lato-bold',
                                item.labelStyle
                            )}
                        >
                            {item.label}
                        </Text>
                        <Text
                            className={clsx(
                                'text-gray-900 font-lato',
                                item.valueStyle
                            )}
                        >
                            {item.value}
                        </Text>
                    </View>
                ))}
            </View>
        </View>
    )
}
