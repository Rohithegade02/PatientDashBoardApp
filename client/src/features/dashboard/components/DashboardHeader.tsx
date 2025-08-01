import { Colors } from '@/constants/Colors'
import { Icon } from '@/src/shared/components'
import { CustomButton } from '@/src/shared/components/CustomButton'
import { IMAGES } from '@/src/shared/constants'
import FastImage from '@d11/react-native-fast-image'
import clsx from 'clsx'
import React from 'react'
import { Text, View } from 'react-native'

interface DashboardHeaderProps {
    fullName: string
    plan: 'PRO' | 'BASIC'
}
// TODO: add the name fetched from the backend
export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
    fullName,
    plan,
}) => {
    return (
        <React.Fragment>
            {/* Header */}
            <View className="bg-blue-600 h-52 ">
                <View className="flex-row items-center  justify-between p-6">
                    <FastImage
                        source={IMAGES.DOCTOR_SECOND}
                        style={{
                            width: 48,
                            height: 48,
                            borderRadius: 100,
                            resizeMode: 'contain',
                        }}
                    />
                    <Text
                        className={clsx(
                            'font-lato px-3 py-1 rounded-full text-sm',
                            {
                                'bg-green-100 text-green-800 border border-green-300':
                                    plan === 'PRO',
                                'bg-red-100 text-red-400 border border-red-300':
                                    plan === 'BASIC',
                            }
                        )}
                    >
                        {plan}
                    </Text>
                </View>
            </View>
            <View className="top-[50%] left-[10%] right-0  absolute justify-between flex bg-white rounded-2xl p-6 h-60 z-10  w-[80%]">
                <View>
                    <Text className="text-xl text-gray-500 font-lato uppercase text-center">
                        Welcome back !
                    </Text>
                    <Text className="text-3xl  font-lato-bold text-uppercase mt-1 text-center">
                        {fullName}
                    </Text>
                </View>
                <Text className="text-gray-500 font-lato-bold mt-16 text-center">
                    Need instant treatment ?
                </Text>
                <CustomButton
                    buttonText="Urgent Care"
                    iconPosition="left"
                    icon={
                        <Icon
                            name="grooveshark"
                            className=""
                            library="Entypo"
                            color={Colors.white}
                            size={16}
                        />
                    }
                    buttonStyle="bg-red-600 flex-row items-center justify-center -bottom-8 left-[25%]  h-16 w-[50%] rounded-[40px]"
                    buttonTextStyle="text-white font-lato-bold text-lg text-center ml-1 my-4"
                />
            </View>
        </React.Fragment>
    )
}
