import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import 'react-native-reanimated'
import '../global.css'

import { useAuthStore } from '@/src/features/auth/stores/authStore'
import { queryClient } from '@/src/shared/services/queryClient'
import { initializeSentry } from '@/src/shared/services/sentry'
import { QueryClientProvider } from '@tanstack/react-query'
import { useEffect } from 'react'
import * as Sentry from '@sentry/react-native'

// Initialize Sentry
initializeSentry()

function RootLayout() {
    const [loaded] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
        'Lato-Thin': require('../assets/fonts/Lato-Thin.ttf'),
        'Lato-ThinItalic': require('../assets/fonts/Lato-ThinItalic.ttf'),
        'Lato-Light': require('../assets/fonts/Lato-Light.ttf'),
        'Lato-LightItalic': require('../assets/fonts/Lato-LightItalic.ttf'),
        'Lato-Regular': require('../assets/fonts/Lato-Regular.ttf'),
        'Lato-Italic': require('../assets/fonts/Lato-Italic.ttf'),
        'Lato-Bold': require('../assets/fonts/Lato-Bold.ttf'),
        'Lato-BoldItalic': require('../assets/fonts/Lato-BoldItalic.ttf'),
        'Lato-Black': require('../assets/fonts/Lato-Black.ttf'),
        'Lato-BlackItalic': require('../assets/fonts/Lato-BlackItalic.ttf'),
    })

    // Initialize auth state
    const { isAuthenticated, checkAuthStatus } = useAuthStore()

    console.log('isAuthenticated', isAuthenticated)
    useEffect(() => {
        checkAuthStatus()
    }, [checkAuthStatus])

    if (!loaded) {
        return null
    }

    return (
        <QueryClientProvider client={queryClient}>
            <Stack>
                {/* Protected routes - only accessible when authenticated */}
                <Stack.Protected guard={isAuthenticated}>
                    <Stack.Screen
                        name="(tabs)"
                        options={{ headerShown: false }}
                    />
                </Stack.Protected>

                {/* Public routes - only accessible when NOT authenticated */}
                <Stack.Protected guard={!isAuthenticated}>
                    <Stack.Screen
                        name="(public)"
                        options={{ headerShown: false }}
                    />
                </Stack.Protected>
            </Stack>
            <StatusBar style="auto" />
        </QueryClientProvider>
    )
}

// Export the component wrapped with Sentry
export default Sentry.wrap(RootLayout)
