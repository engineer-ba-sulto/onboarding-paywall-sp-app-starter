import { Text, View } from "react-native";

interface FeatureListItemProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
}

export const FeatureListItem: React.FC<FeatureListItemProps> = ({
  title,
  description,
  icon,
}) => {
  return (
    <View className="flex-row items-center mb-4">
      {icon && <View className="mr-3">{icon}</View>}
      <View className="flex-1">
        <Text className="text-base font-semibold text-gray-900 mb-1">
          {title}
        </Text>
        {description && (
          <Text className="text-sm text-gray-600">{description}</Text>
        )}
      </View>
    </View>
  );
};
