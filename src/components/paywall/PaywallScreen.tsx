import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import { usePaywall } from "../../hooks/paywall";
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
  const { offering, selectedPackage, isLoading, error, selectPackage } =
    usePaywall();

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#0000ff" />
          <Text className="mt-4 text-gray-600">プラン情報を読み込み中...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 justify-center items-center px-6">
          <Text className="text-lg text-red-600 text-center mb-4">{error}</Text>
          <Text className="text-gray-600 text-center">
            しばらく時間をおいて再度お試しください
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!offering || offering.availablePackages.length === 0) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 justify-center items-center px-6">
          <Text className="text-lg text-gray-600 text-center">
            現在利用可能なプランがありません
          </Text>
        </View>
      </SafeAreaView>
    );
  }

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

        {/* プラン選択セクション */}
        <View className="mb-8">
          <Text className="text-lg font-semibold text-gray-900 mb-4">
            プランを選択
          </Text>
          {offering.availablePackages.map((pkg, index) => (
            <View
              key={index}
              className={`p-4 border-2 rounded-lg mb-3 ${
                selectedPackage?.identifier === pkg.identifier
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200"
              }`}
            >
              <View className="flex-row justify-between items-center">
                <View className="flex-1">
                  <Text className="text-lg font-semibold text-gray-900">
                    {pkg.product.title}
                  </Text>
                  <Text className="text-sm text-gray-600">
                    {pkg.packageType}
                  </Text>
                </View>
                <View className="items-end">
                  <Text className="text-xl font-bold text-gray-900">
                    {pkg.product.priceString}
                  </Text>
                </View>
              </View>
              <View className="mt-3">
                <ActionButton
                  title={
                    selectedPackage?.identifier === pkg.identifier
                      ? "選択中"
                      : "選択する"
                  }
                  onPress={() => selectPackage(pkg)}
                  variant={
                    selectedPackage?.identifier === pkg.identifier
                      ? "secondary"
                      : "secondary"
                  }
                  disabled={selectedPackage?.identifier === pkg.identifier}
                />
              </View>
            </View>
          ))}
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
            title={
              selectedPackage
                ? `${selectedPackage.product.priceString}で${primaryButtonTitle}`
                : primaryButtonTitle
            }
            onPress={onPrimaryPress || (() => {})}
            variant="primary"
            loading={loading}
            disabled={!onPrimaryPress || !selectedPackage}
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
