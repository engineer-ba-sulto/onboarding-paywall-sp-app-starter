import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { ActionButton, FeatureListItem, LegalLinks } from "./ui";

interface PaywallScreenProps {
  title?: string;
  subtitle?: string;
  features?: Array<{
    title: string;
    description?: string;
    icon?: React.ReactNode;
  }>;
  primaryButtonTitle?: string;
  secondaryButtonTitle?: string;
  onPrimaryPress?: () => void;
  onSecondaryPress?: () => void;
  loading?: boolean;
  termsUrl?: string;
  privacyUrl?: string;
  onTermsPress?: () => void;
  onPrivacyPress?: () => void;
}

export const PaywallScreen: React.FC<PaywallScreenProps> = ({
  title = "プレミアム機能をアンロック",
  subtitle = "すべての機能を無制限でお楽しみください",
  features = [
    {
      title: "広告なし体験",
      description: "すべての広告が表示されません",
    },
    {
      title: "プレミアムコンテンツ",
      description: "限定コンテンツにアクセスできます",
    },
    {
      title: "優先サポート",
      description: "24時間以内のサポート対応",
    },
  ],
  primaryButtonTitle = "今すぐ購入",
  secondaryButtonTitle = "復元",
  onPrimaryPress,
  onSecondaryPress,
  loading = false,
  termsUrl,
  privacyUrl,
  onTermsPress,
  onPrivacyPress,
}) => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-6 py-8">
        {/* タイトルセクション */}
        <View className="items-center mb-8">
          <Text className="text-2xl font-bold text-gray-900 text-center mb-2">
            {title}
          </Text>
          <Text className="text-base text-gray-600 text-center">
            {subtitle}
          </Text>
        </View>

        {/* 特典リストセクション */}
        <View className="mb-8">
          <Text className="text-lg font-semibold text-gray-900 mb-4">
            含まれる特典
          </Text>
          {features.map((feature, index) => (
            <FeatureListItem
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
            />
          ))}
        </View>

        {/* CTA ボタンセクション */}
        <View className="mb-6">
          <ActionButton
            title={primaryButtonTitle}
            onPress={onPrimaryPress || (() => {})}
            variant="primary"
            loading={loading}
            disabled={!onPrimaryPress}
          />
          {onSecondaryPress && (
            <View className="mt-3">
              <ActionButton
                title={secondaryButtonTitle}
                onPress={onSecondaryPress}
                variant="secondary"
              />
            </View>
          )}
        </View>

        {/* 利用規約・プライバシーポリシーリンク */}
        <LegalLinks
          termsUrl={termsUrl}
          privacyUrl={privacyUrl}
          onTermsPress={onTermsPress}
          onPrivacyPress={onPrivacyPress}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
