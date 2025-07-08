import React from 'react';
import { Text, View } from 'react-native';

interface DashboardFooterProps {
  lastUpdated?: string | null;
}

export const DashboardFooter: React.FC<DashboardFooterProps> = ({
  lastUpdated,
}) => {
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        weekday: 'short',
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
    } catch {
      return dateString;
    }
  };

  return (
        <View className="items-center py-8 px-6">
      <Text className="text-gray-500 text-sm">Last updated: {lastUpdated ? formatDate(lastUpdated) : 'Never'}
      </Text>
    </View>
  );
};
