import React, { memo } from 'react'
import { Text, Pressable } from 'react-native'
import clsx from 'clsx'
import { TabType } from './ShipmentTabs'

interface ShipmentTabProps {
    title: string
    value: TabType
    activeTab: TabType
    setActiveTab: (tab: TabType) => void
}

export const ShipmentTab = memo(
    ({ title, value, activeTab, setActiveTab }: ShipmentTabProps) => {
        const isActive = activeTab === value

        return (
            <Pressable
                className="flex-1 flex-row items-center justify-center rounded-full p-2 z-10"
                onPress={() => setActiveTab(value)}
                style={{ zIndex: 10 }}
            >
                <Text
                    className={clsx(
                        'text-base font-lato',
                        isActive
                            ? 'text-gray-900 font-lato-bold'
                            : 'text-gray-500 font-lato'
                    )}
                >
                    {title}
                </Text>
            </Pressable>
        )
    }
)

ShipmentTab.displayName = 'ShipmentTab'
