import { ImageSourcePropType } from 'react-native'

export const IMAGES = {
    DOCTOR_FIRST:
        require('../../../assets/images/doctor-1.png') as ImageSourcePropType,
    DOCTOR_SECOND:
        require('../../../assets/images/doctor-2.png') as ImageSourcePropType,
    DOCTOR_THIRD:
        require('../../../assets/images/doctor-3.png') as ImageSourcePropType,
    DRUGS: require('../../../assets/images/drugs.png') as ImageSourcePropType,
    MEDICAL_RECORD:
        require('../../../assets/images/medical-team.png') as ImageSourcePropType,
    HOSPITAL:
        require('../../../assets/images/hospital.png') as ImageSourcePropType,
    AMBULANCE:
        require('../../../assets/images/ambulance.png') as ImageSourcePropType,
} as const
