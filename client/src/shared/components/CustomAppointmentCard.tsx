import { Colors } from '@/constants/Colors'
import { Icon } from '@/src/shared/components/CustomIcon'
import clsx from 'clsx'
import React from 'react'
import { Image, Pressable, Text, View } from 'react-native'

interface CustomAppointmentCardProps {
    title: string
    date: string
    time: string
    doctorName: string
    doctorImage: string
    doctorSpecialization: string
    status: boolean
    onPress: () => void
}
const CustomAppointmentCard = ({
    title,
    date,
    time,
    doctorName,
    doctorImage,
    doctorSpecialization,
    status,
    onPress,
}: CustomAppointmentCardProps) => {
    return (
        <Pressable
            onPress={onPress}
            className="bg-white rounded-lg gap-1 shadow-lg p-6 relative"
        >
            <View className="h-[130%] bg-blue-600 w-[4px] absolute top-0 left-0 rounded-l-lg" />
            <View className="flex-row items-center justify-between">
                <View className="gap-1">
                    <Text className="text-base font-lato text-gray-500">
                        {title}
                    </Text>
                    <View className="flex-row items-center gap-2 ">
                        <Icon
                            name="calendar"
                            library="Entypo"
                            color={Colors.black}
                            size={15}
                        />
                        <Text className="text-sm font-lato-bold ">
                            {date.split(',')[0]} | {date.split(',')[1]} | {time}
                        </Text>
                    </View>
                </View>
                <Icon
                    name="dots-three-vertical"
                    library="Entypo"
                    color={Colors.gray}
                    size={16}
                />
            </View>
            <View className="h-[1px] bg-gray-200 w-full my-2" />
            <View className="flex-row items-center gap-4">
                <Image
                    source={doctorImage}
                    className="w-10 h-10 rounded-full"
                />
                <View>
                    <Text className="text-xl font-lato-bold ">
                        {doctorName}
                    </Text>
                    <Text className="text-base font-lato-bold text-gray-400">
                        {doctorSpecialization}
                    </Text>
                    <Text
                        className={clsx(
                            'text-base font-lato-bold mt-1 px-2 py-1 rounded-lg',
                            status
                                ? 'text-white bg-green-600'
                                : 'text-white bg-red-600 '
                        )}
                    >
                        {status ? 'Payment Completed' : 'Payment Pending'}
                    </Text>
                </View>
            </View>
        </Pressable>
    )
}

export default CustomAppointmentCard
