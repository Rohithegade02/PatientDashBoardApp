import React from 'react'
import { Text, View } from 'react-native'
import clsx from 'clsx'

interface Prescription {
    id: string
    medicationName: string
    dosage: string
    frequency: string
    duration: string
    prescribedBy: string
    prescribedDate: string
    status: 'active' | 'completed' | 'discontinued'
}

interface PrescriptionCardProps {
    prescription: Prescription
}

export const PrescriptionCard: React.FC<PrescriptionCardProps> = ({
    prescription,
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
            case 'active':
                return 'bg-green-100 text-green-800'
            case 'completed':
                return 'bg-blue-100 text-blue-800'
            case 'discontinued':
                return 'bg-red-100 text-red-800'
            default:
                return 'bg-gray-100 text-gray-800'
        }
    }

    return (
        <View className="bg-white mx-5 mb-4 rounded-lg shadow-sm border border-gray-200 p-4">
            <View className="flex-row justify-between items-start mb-3">
                <View className="flex-1">
                    <Text className="font-lato-bold text-lg text-gray-900">
                        {prescription.medicationName}
                    </Text>
                    <Text className="font-lato text-sm text-gray-600 mt-1">
                        {prescription.dosage} • {prescription.frequency}
                    </Text>
                    <Text className="font-lato text-sm text-gray-500 mt-1">
                        Duration: {prescription.duration}
                    </Text>
                </View>
                <View
                    className={clsx(
                        'px-3 py-1 rounded-full',
                        getStatusColor(prescription.status)
                    )}
                >
                    <Text className="font-lato-bold text-xs capitalize">
                        {prescription.status}
                    </Text>
                </View>
            </View>

            <View className="border-t border-gray-100 pt-3">
                <View className="flex-row justify-between">
                    <Text className="font-lato text-sm text-gray-600">
                        Prescribed by: Dr. {prescription.prescribedBy}
                    </Text>
                    <Text className="font-lato text-sm text-gray-600">
                        Date: {formatDate(prescription.prescribedDate)}
                    </Text>
                </View>
            </View>
        </View>
    )
}

// Mock data for prescriptions
export const mockPrescriptions: Prescription[] = [
    {
        id: '1',
        medicationName: 'Metformin',
        dosage: '500mg',
        frequency: 'Twice daily',
        duration: '3 months',
        prescribedBy: 'Sarah Johnson',
        prescribedDate: '2024-01-15',
        status: 'active',
    },
    {
        id: '2',
        medicationName: 'Lisinopril',
        dosage: '10mg',
        frequency: 'Once daily',
        duration: '6 months',
        prescribedBy: 'Michael Chen',
        prescribedDate: '2024-01-10',
        status: 'active',
    },
    {
        id: '3',
        medicationName: 'Atorvastatin',
        dosage: '20mg',
        frequency: 'Once daily',
        duration: '12 months',
        prescribedBy: 'Emily Rodriguez',
        prescribedDate: '2023-12-20',
        status: 'completed',
    },
    {
        id: '4',
        medicationName: 'Aspirin',
        dosage: '81mg',
        frequency: 'Once daily',
        duration: 'Ongoing',
        prescribedBy: 'David Kim',
        prescribedDate: '2024-01-05',
        status: 'discontinued',
    },
]
