import React from 'react'
import { Text, View } from 'react-native'
import clsx from 'clsx'

interface Appointment {
    id: string
    doctorName: string
    specialty: string
    date: string
    time: string
    status: 'completed' | 'upcoming' | 'cancelled'
    type: 'consultation' | 'follow-up' | 'check-up'
}

interface AppointmentCardProps {
    appointment: Appointment
}

export const AppointmentCard: React.FC<AppointmentCardProps> = ({
    appointment,
}) => {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        })
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed':
                return 'bg-green-100 text-green-800'
            case 'upcoming':
                return 'bg-blue-100 text-blue-800'
            case 'cancelled':
                return 'bg-red-100 text-red-800'
            default:
                return 'bg-gray-100 text-gray-800'
        }
    }

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'consultation':
                return 'bg-purple-100 text-purple-800'
            case 'follow-up':
                return 'bg-orange-100 text-orange-800'
            case 'check-up':
                return 'bg-teal-100 text-teal-800'
            default:
                return 'bg-gray-100 text-gray-800'
        }
    }

    return (
        <View className="bg-white mx-5 mb-4 rounded-lg shadow-sm border border-gray-200 p-4">
            <View className="flex-row justify-between items-start mb-3">
                <View className="flex-1">
                    <Text className="font-lato-bold text-lg text-gray-900">
                        Dr. {appointment.doctorName}
                    </Text>
                    <Text className="font-lato text-sm text-gray-600 mt-1">
                        {appointment.specialty}
                    </Text>
                </View>
                <View className="flex-row gap-2">
                    <View
                        className={clsx(
                            'px-2 py-1 rounded-full',
                            getTypeColor(appointment.type)
                        )}
                    >
                        <Text className="font-lato-bold text-xs capitalize">
                            {appointment.type}
                        </Text>
                    </View>
                    <View
                        className={clsx(
                            'px-2 py-1 rounded-full',
                            getStatusColor(appointment.status)
                        )}
                    >
                        <Text className="font-lato-bold text-xs capitalize">
                            {appointment.status}
                        </Text>
                    </View>
                </View>
            </View>

            <View className="border-t border-gray-100 pt-3">
                <View className="flex-row justify-between">
                    <Text className="font-lato text-sm text-gray-600">
                        Date: {formatDate(appointment.date)}
                    </Text>
                    <Text className="font-lato text-sm text-gray-600">
                        Time: {appointment.time}
                    </Text>
                </View>
            </View>
        </View>
    )
}

// Mock data for appointments
export const mockAppointments: Appointment[] = [
    {
        id: '1',
        doctorName: 'Sarah Johnson',
        specialty: 'Cardiology',
        date: '2024-01-15',
        time: '10:30 AM',
        status: 'completed',
        type: 'consultation',
    },
    {
        id: '2',
        doctorName: 'Michael Chen',
        specialty: 'General Medicine',
        date: '2024-01-22',
        time: '2:00 PM',
        status: 'upcoming',
        type: 'follow-up',
    },
    {
        id: '3',
        doctorName: 'Emily Rodriguez',
        specialty: 'Endocrinology',
        date: '2024-01-08',
        time: '9:15 AM',
        status: 'completed',
        type: 'check-up',
    },
    {
        id: '4',
        doctorName: 'David Kim',
        specialty: 'Neurology',
        date: '2024-01-30',
        time: '11:45 AM',
        status: 'upcoming',
        type: 'consultation',
    },
]
