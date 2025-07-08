import React from 'react';
import { Text, View } from 'react-native';

interface StatusSummaryCardProps {
  status: 'active' | 'inactive';
  billingStatus: 'ok' | 'issues' | 'pending';
}

export const StatusSummaryCard: React.FC<StatusSummaryCardProps> = ({
  status,
  billingStatus,
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'inactive': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getBillingStatusColor = (billingStatus: string) => {
    switch (billingStatus) {
      case 'ok': return 'text-green-600 bg-green-100';
      case 'issues': return 'text-red-600 bg-red-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <View className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mx-6 mb-4">
      <Text className="text-lg font-bold text-gray-900 mb-4">Status Summary</Text>
      
      <View className="space-y-3">
        <View className="flex-row justify-between items-center">
          <Text className="text-gray-600 font-medium">Account Status:</Text>
          <View className={`px-3 py-1 rounded-full ${getStatusColor(status)}`}>
            <Text className={`text-sm font-medium capitalize ${getStatusColor(status).split(' ')[0]}`}>
              {status}
            </Text>
          </View>
        </View>
        
        <View className="flex-row justify-between items-center">
          <Text className="text-gray-600 font-medium">Billing Status:</Text>
          <View className={`px-3 py-1 rounded-full ${getBillingStatusColor(billingStatus)}`}>
            <Text className={`text-sm font-medium capitalize ${getBillingStatusColor(billingStatus).split(' ')[0]}`}>
              {billingStatus === 'ok' ? 'OK' : billingStatus}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
