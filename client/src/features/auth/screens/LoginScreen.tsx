import { useAuthStore } from '@/features/auth/stores/authStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { z } from 'zod';

// Validation schema
const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    ),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const { login, loading, error } = useAuthStore();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data);
      router.replace('/(tabs)');
    } catch (error) {
      Alert.alert('Login Failed', error instanceof Error ? error.message : 'Please try again');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-white"
    >
      <View className="flex-1 justify-center px-6">
        {/* Header */}
        <View className="mb-8">
          <Text className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</Text>
          <Text className="text-gray-600">Please sign in to your account</Text>
        </View>

        {/* Error Message */}
        {error && (
          <View className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <Text className="text-red-800 text-sm">{error}</Text>
          </View>
        )}

        {/* Demo Credentials */}
        <View className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <Text className="text-blue-800 text-sm font-semibold mb-1">Demo Credentials:</Text>
          <Text className="text-blue-700 text-sm">Email: admin@example.com</Text>
          <Text className="text-blue-700 text-sm">Password: password123</Text>
        </View>

        {/* Email Input */}
        <View className="mb-4">
          <Text className="text-gray-700 text-sm font-medium mb-2">Email Address</Text>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className={`w-full px-4 py-3 border rounded-lg text-gray-900 ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your email"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                editable={!loading}
              />
            )}
          />
          {errors.email && (
            <Text className="text-red-500 text-sm mt-1">{errors.email.message}</Text>
          )}
        </View>

        {/* Password Input */}
        <View className="mb-6">
          <Text className="text-gray-700 text-sm font-medium mb-2">Password</Text>
          <View className="relative">
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className={`w-full px-4 py-3 border rounded-lg text-gray-900 pr-12 ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your password"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  secureTextEntry={!showPassword}
                  editable={!loading}
                />
              )}
            />
            <TouchableOpacity
              className="absolute right-3 top-3"
              onPress={() => setShowPassword(!showPassword)}
            >
              <Text className="text-gray-500 text-sm">
                {showPassword ? 'Hide' : 'Show'}
              </Text>
            </TouchableOpacity>
          </View>
          {errors.password && (
            <Text className="text-red-500 text-sm mt-1">{errors.password.message}</Text>
          )}
        </View>

        {/* Login Button */}
        <TouchableOpacity
          className={`w-full py-3 rounded-lg mb-4 ${
            isValid && !loading
              ? 'bg-blue-600 active:bg-blue-700'
              : 'bg-gray-300'
          }`}
          onPress={handleSubmit(onSubmit)}
          disabled={!isValid || loading}
        >
          <Text className="text-white text-center font-semibold text-lg">
            {loading ? 'Signing In...' : 'Sign In'}
          </Text>
        </TouchableOpacity>

        {/* Footer */}
        <View className="mt-6">
          <Text className="text-center text-gray-500 text-sm">
            Don&apos;t have an account?{' '}
            <Text className="text-blue-600 font-semibold">Contact Support</Text>
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
} 