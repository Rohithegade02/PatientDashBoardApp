import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomHeader from '@/shared/components/CustomHeader'
import { View } from 'react-native'
import { HistoryTabs } from '../components/HistoryTabs'

interface HistoryScreenProps {
    activeTab: 'past' | 'upcoming'
    setActiveTab: (tab: 'past' | 'upcoming') => void
    tabs: { title: string; value: 'past' | 'upcoming' }[]
}

const HistoryScreen = () => {
    const [activeTab, setActiveTab] =
        useState<HistoryScreenProps['activeTab']>('upcoming')

    const handleTabChange = (tab: 'past' | 'upcoming') => {
        setActiveTab(tab)
    }
    const tabs: HistoryScreenProps['tabs'] = [
        { title: 'Past', value: 'past' },
        { title: 'Upcoming', value: 'upcoming' },
    ]

    return (
        <SafeAreaView className="flex-1 bg-white px-4 gap-4 pt-4">
            <CustomHeader
                leftText="History"
                leftTextStyle="text-4xl font-lato-bold"
            />
            <HistoryTabs
                activeTab={activeTab}
                setActiveTab={handleTabChange}
                tabs={tabs}
            />
        </SafeAreaView>
    )
}

export default HistoryScreen
