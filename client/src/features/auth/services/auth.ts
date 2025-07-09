import { AUTH_API } from '@/src/shared/api'
import { useAuthStore } from '../stores/authStore'

// Login API
export const login = async (email: string, password: string) => {
    console.log('email service', email)
    console.log('password service', password)
    console.log('AUTH_API.LOGIN', AUTH_API.LOGIN)
    try {
        const response = await fetch(AUTH_API.LOGIN, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })

        if (!response.ok) {
            throw new Error('Login failed')
        }

        const data = await response.json()
        useAuthStore.getState().login(data) // Update the store with the response data
        return data
    } catch (error) {
        console.error('Login error:', error)
        throw new Error('Network or server error during login')
    }
}

// Register API
export const register = async (email: string, password: string) => {
    try {
        const response = await fetch(AUTH_API.REGISTER, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })

        if (!response.ok) {
            throw new Error('Registration failed')
        }

        return response.json()
    } catch (error) {
        console.error('Registration error:', error)
        throw new Error('Network or server error during registration')
    }
}
