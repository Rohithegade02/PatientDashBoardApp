import { CustomHeader } from '@/src/shared/components/CustomHeader'
import { IMAGES } from '@/src/shared/constants'
import clsx from 'clsx'
import React, { HTMLProps, memo } from 'react'
import { Image, Text, View } from 'react-native'

interface DashboardServiceCardProps {
    title: string
    icon: React.ReactNode
    titleStyle?: HTMLProps<HTMLElement>['className']
    iconStyle?: HTMLProps<HTMLElement>['className']
}

export const DashboardServices = memo(() => {
    return (
        <View className="bg-white mx-5">
            <CustomHeader
                leftText="Explore Services"
                leftTextStyle="font-lato-bold text-2xl"
            />
            <View className="flex-row justify-between px-2 py-4">
                <DashboardServiceCard
                    title="Consultation"
                    icon={IMAGES.MEDICAL_RECORD}
                    titleStyle="font-lato-bold text-base"
                    iconStyle="w-10 h-10"
                />
                <DashboardServiceCard
                    title="Medicines"
                    icon={IMAGES.DRUGS}
                    titleStyle="font-lato-bold text-base"
                    iconStyle="w-10 h-10"
                />
                <DashboardServiceCard
                    title="Ambulance"
                    icon={IMAGES.AMBULANCE}
                    titleStyle="font-lato-bold text-base"
                    iconStyle="w-10 h-10"
                />
            </View>
        </View>
    )
})

DashboardServices.displayName = 'DashboardServices'

export const DashboardServiceCard = memo(
    ({ title, icon, titleStyle, iconStyle }: DashboardServiceCardProps) => {
        return (
            <View className="bg-white mx-5">
                <View className="bg-white border border-gray-200 rounded-full w-20 h-20 items-center justify-center">
                    <Image
                        source={icon}
                        className={clsx(iconStyle)}
                        resizeMode="contain"
                    />
                </View>
                <Text className={clsx(titleStyle)}>{title}</Text>
            </View>
        )
    }
)

DashboardServiceCard.displayName = 'DashboardServiceCard'
