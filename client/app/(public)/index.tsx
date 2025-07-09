import React from 'react'
import { Redirect } from 'expo-router'
import { ROUTES } from '@/src/shared/routes'

const Index = () => {
    return <Redirect href={ROUTES.AUTH.LOGIN} />
}

export default Index
