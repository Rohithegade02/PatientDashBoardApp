import * as Sentry from '@sentry/react-native'
import { isRunningInExpoGo } from 'expo'

export const initializeSentry = () => {
    // Don't initialize Sentry in Expo Go
    if (isRunningInExpoGo()) {
        return
    }

    Sentry.init({
        dsn: 'https://8bac8ec3584303659423f81026452959@o4508366860582912.ingest.us.sentry.io/4509639600373760',
        debug: __DEV__,
        environment: __DEV__ ? 'development' : 'production',
        tracesSampleRate: 1.0,
        _experiments: {
            profilesSampleRate: 1.0,
        },
        integrations: [
            Sentry.reactNavigationIntegration({
                enableTimeToInitialDisplay: !isRunningInExpoGo(),
            }),
        ],
        beforeSend: (event, hint) => {
            // Filter out events in development if needed
            if (__DEV__) {
                console.log('Sentry Event:', event)
            }
            return event
        },
    })
}

export const getSentryRoutingInstrumentation = () => {
    return Sentry.reactNavigationIntegration()
}
