import { Linking, Text, TouchableOpacity, View } from "react-native";

interface LegalLinksProps {
  termsUrl?: string;
  privacyUrl?: string;
  onTermsPress?: () => void;
  onPrivacyPress?: () => void;
}

export const LegalLinks: React.FC<LegalLinksProps> = ({
  termsUrl,
  privacyUrl,
  onTermsPress,
  onPrivacyPress,
}) => {
  const handleTermsPress = () => {
    if (onTermsPress) {
      onTermsPress();
    } else if (termsUrl) {
      Linking.openURL(termsUrl);
    }
  };

  const handlePrivacyPress = () => {
    if (onPrivacyPress) {
      onPrivacyPress();
    } else if (privacyUrl) {
      Linking.openURL(privacyUrl);
    }
  };

  return (
    <View className="flex-row justify-center items-center mt-6">
      <Text className="text-xs text-gray-500">利用することで</Text>
      <TouchableOpacity onPress={handleTermsPress}>
        <Text className="text-xs text-blue-600 ml-1">利用規約</Text>
      </TouchableOpacity>
      <Text className="text-xs text-gray-500">と</Text>
      <TouchableOpacity onPress={handlePrivacyPress}>
        <Text className="text-xs text-blue-600 ml-1">プライバシーポリシー</Text>
      </TouchableOpacity>
      <Text className="text-xs text-gray-500">に同意したことになります</Text>
    </View>
  );
};
