import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';

interface QuickActionsCardProps {
  onRefresh: () => void;
  loading: boolean;
  onContactSupport?: () => void;
}

export const QuickActionsCard: React.FC<QuickActionsCardProps> = ({
  onRefresh,
  loading,
  onContactSupport,
}) => {
  return (
    <View className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mx-6 mb-4">
      <Text className="text-lg font-bold text-gray-900 mb-4">Quick Actions</Text>
      
      <View className="space-y-3">
        <TouchableOpacity 
          className="flex-row items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg"
          onPress={onRefresh}
          disabled={loading}
        >
          <Text className="text-blue-700 font-medium">Refresh Dashboard</Text>
          {loading ? (
            <ActivityIndicator size="small" color="#2563eb" />
          ) : (
            <Text className="text-blue-600 text-xl">↻</Text>
          )}
        </TouchableOpacity>
        
        <TouchableOpacity 
          className="flex-row items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg"
          onPress={onContactSupport}
        >
          <Text className="text-green-700 font-medium">Contact Support</Text>
          <Text className="text-green-600 text-xl">📞</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};