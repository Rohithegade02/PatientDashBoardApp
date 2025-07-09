import { useMutation } from '@tanstack/react-query'
import { login } from '../services/auth'

export const useLogin = () => {
    return useMutation({
        mutationFn: (credentials: { email: string; password: string }) => {
            console.log('credentials', credentials)
            return login(credentials.email, credentials.password)
        },
        onSuccess: (data) => {
            console.log(data)
        },
        onError: (error) => {
            console.log(error)
        },
    })
}
