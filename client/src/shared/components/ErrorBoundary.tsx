import React from 'react'
import { View, Text } from 'react-native'
import * as Sentry from '@sentry/react-native'

interface ErrorBoundaryState {
    hasError: boolean
    error?: Error
}

interface ErrorBoundaryProps {
    children: React.ReactNode
    fallback?: React.ComponentType<{ error: Error }>
}

class ErrorBoundary extends React.Component<
    ErrorBoundaryProps,
    ErrorBoundaryState
> {
    constructor(props: ErrorBoundaryProps) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error }
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo)

        Sentry.withScope((scope) => {
            scope.setTag('errorBoundary', true)
            scope.setContext('errorInfo', errorInfo)
            Sentry.captureException(error)
        })
    }

    render() {
        if (this.state.hasError) {
            const FallbackComponent =
                this.props.fallback || DefaultErrorFallback
            return <FallbackComponent error={this.state.error!} />
        }

        return this.props.children
    }
}

const DefaultErrorFallback = ({ error }: { error: Error }) => (
    <View className="flex-1 justify-center items-center bg-gray-50 px-4">
        <Text className="text-red-600 text-xl font-lato-bold mb-4">
            Something went wrong
        </Text>
        <Text className="text-gray-600 text-center mb-4">
            We're sorry for the inconvenience. The error has been reported.
        </Text>
        <Text className="text-gray-400 text-sm text-center">
            {error.message}
        </Text>
    </View>
)

export default Sentry.withErrorBoundary(ErrorBoundary, {
    fallback: DefaultErrorFallback,
})
