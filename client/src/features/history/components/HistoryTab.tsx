import React, { memo } from 'react'
import { Text, Pressable } from 'react-native'
import clsx from 'clsx'

interface HistoryTabProps {
    title: string
    activeTab: 'past' | 'upcoming'
    setActiveTab: (tab: 'past' | 'upcoming') => void
}

export const HistoryTab = memo(
    ({ title, activeTab, setActiveTab }: HistoryTabProps) => {
        const isActive = activeTab === title.toLowerCase()

        return (
            <Pressable
                className="flex-1 flex-row items-center justify-center rounded-full p-2 z-10"
                onPress={() =>
                    setActiveTab(title.toLowerCase() as 'past' | 'upcoming')
                }
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

HistoryTab.displayName = 'HistoryTab'
