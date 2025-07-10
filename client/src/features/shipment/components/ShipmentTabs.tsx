import React, { memo, useEffect, useState } from 'react'
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
} from 'react-native-reanimated'
import { ShipmentTab } from './ShipmentTab'
import { View } from 'react-native'

export type TabType = 'shipments' | 'appointments' | 'prescriptions'

interface ShipmentTabsProps {
    activeTab: TabType
    setActiveTab: (tab: TabType) => void
    tabs: { title: string; value: TabType }[]
}

export const ShipmentTabs = memo(
    ({ activeTab, setActiveTab, tabs }: ShipmentTabsProps) => {
        const [tabWidth, setTabWidth] = useState(0)
        const indicatorPosition = useSharedValue(0)

        // Calculate the active tab index
        const activeIndex = tabs.findIndex((tab) => tab.value === activeTab)

        // Animate the indicator position when active tab changes
        useEffect(() => {
            if (tabWidth > 0) {
                indicatorPosition.value = withTiming(activeIndex * tabWidth, {
                    duration: 300,
                })
            }
        }, [activeIndex, tabWidth, indicatorPosition])

        // Handle container layout to calculate tab width
        const handleLayout = (event: any) => {
            const containerWidth = event.nativeEvent.layout.width
            // Calculate width of each tab (container width - padding) / number of tabs
            const calculatedTabWidth = (containerWidth - 16) / tabs.length // 16 is total padding (8px * 2)
            setTabWidth(calculatedTabWidth)
        }

        // Animated style for the sliding indicator
        const indicatorStyle = useAnimatedStyle(() => ({
            transform: [{ translateX: indicatorPosition.value }],
        }))

        return (
            <View
                className="h-16 bg-gray-100 py-2 px-2 rounded-full flex-row items-center relative"
                onLayout={handleLayout}
            >
                {/* Animated White Indicator */}
                <Animated.View
                    className="bg-white rounded-full border border-gray-200"
                    style={[
                        indicatorStyle,
                        {
                            width: tabWidth,
                            height: '100%',
                            position: 'absolute',
                            top: 8,
                            left: 8,
                        },
                    ]}
                />

                {/* Tab Buttons */}
                {tabs.map((tab) => {
                    return (
                        <ShipmentTab
                            key={tab.value}
                            title={tab.title}
                            value={tab.value}
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                        />
                    )
                })}
            </View>
        )
    }
)

ShipmentTabs.displayName = 'ShipmentTabs'
