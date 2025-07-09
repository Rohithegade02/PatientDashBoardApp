import CustomAppointmentCard from '@/src/shared/components/CustomAppointmentCard'
import { CustomHeader } from '@/src/shared/components/CustomHeader'
import { IMAGES } from '@/src/shared/constants'
import { formatDate } from '@/src/shared/hooks'
import React from 'react'
import { View } from 'react-native'

interface DeliveryInfoCardProps {
    nextDeliveryDate: string
    remainingMedication: number
}

export const DeliveryInfoCard: React.FC<DeliveryInfoCardProps> = ({
    nextDeliveryDate,
    remainingMedication,
}) => {
    console.log('nextDeliveryDate', remainingMedication)
    return (
        <View className="bg-white mx-6 my-4 gap-4">
            <CustomHeader
                leftText="Delivery Information"
                leftTextStyle="text-2xl font-lato-bold text-gray-900 "
                rightText="View All"
                rightTextStyle="text-base font-lato-bold text-blue-600"
            />
            <CustomAppointmentCard
                title="Next Delivery"
                date={formatDate(nextDeliveryDate)}
                time="10:00 AM"
                doctorName="Dr. John Doe"
                doctorImage={IMAGES.DOCTOR_SECOND}
                doctorSpecialization="Cardiologist"
                status={false}
                remainingMedication={remainingMedication}
                onPress={() => {}}
            />
        </View>
    )
}
