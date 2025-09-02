import React, { useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface MockPaywallScreenProps {
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

// モックデータ用の商品情報
const mockPackages = [
  {
    id: "weekly_package",
    title: "週間プラン",
    price: "¥120",
    popular: false,
  },
  {
    id: "monthly_package",
    title: "月間プラン",
    price: "¥360",
    popular: true,
  },
  {
    id: "yearly_package",
    title: "年間プラン",
    price: "¥2,400",
    popular: false,
  },
  {
    id: "lifetime_package",
    title: "ライフタイム",
    price: "¥6,000",
    popular: false,
  },
];

export const MockPaywallScreen: React.FC<MockPaywallScreenProps> = ({
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
    {
      title: "無制限アクセス",
      description: "利用制限がなくなります",
    },
  ],
  primaryButtonTitle = "今すぐ購入",
  secondaryButtonTitle = "購入を復元",
  onPrimaryPress,
  onSecondaryPress,
  loading = false,
  termsUrl,
  privacyUrl,
  onTermsPress,
  onPrivacyPress,
}) => {
  const [selectedPackage, setSelectedPackage] = useState(mockPackages[1]); // デフォルトで月間プランを選択

  const handlePrimaryPress = () => {
    if (onPrimaryPress) {
      onPrimaryPress();
    } else {
      console.log("モック購入処理:", selectedPackage.title);
    }
  };

  const handleSecondaryPress = () => {
    if (onSecondaryPress) {
      onSecondaryPress();
    } else {
      console.log("モック復元処理");
    }
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#0000ff" />
          <Text className="mt-4 text-gray-600">プラン情報を読み込み中...</Text>
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
          {mockPackages.map((pkg, index) => (
            <View
              key={pkg.id}
              className={`p-4 border-2 rounded-lg mb-3 ${
                selectedPackage?.id === pkg.id
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200"
              } ${pkg.popular ? "border-orange-500 bg-orange-50" : ""}`}
            >
              {/* 人気プランラベル */}
              {pkg.popular && (
                <View className="absolute -top-2 left-4 bg-orange-500 px-3 py-1 rounded-full">
                  <Text className="text-white text-xs font-semibold">人気</Text>
                </View>
              )}

              <View className="flex-row justify-between items-center">
                <View className="flex-1">
                  <Text className="text-lg font-semibold text-gray-900">
                    {pkg.title}
                  </Text>
                </View>
                <View className="items-end">
                  <Text className="text-xl font-bold text-gray-900">
                    {pkg.price}
                  </Text>
                </View>
              </View>

              <View className="mt-3">
                <TouchableOpacity
                  className={`px-4 py-2 rounded-lg ${
                    selectedPackage?.id === pkg.id
                      ? "bg-blue-500"
                      : "bg-gray-200"
                  }`}
                  onPress={() => setSelectedPackage(pkg)}
                  disabled={selectedPackage?.id === pkg.id}
                >
                  <Text
                    className={`text-center font-semibold ${
                      selectedPackage?.id === pkg.id
                        ? "text-white"
                        : "text-gray-700"
                    }`}
                  >
                    {selectedPackage?.id === pkg.id ? "選択中" : "選択する"}
                  </Text>
                </TouchableOpacity>
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
            <View key={index} className="flex-row items-start mb-3">
              <View className="w-6 h-6 bg-green-100 rounded-full items-center justify-center mr-3 mt-0.5">
                <Text className="text-green-600 text-sm">✓</Text>
              </View>
              <View className="flex-1">
                <Text className="text-base font-semibold text-gray-900">
                  {feature.title}
                </Text>
                {feature.description && (
                  <Text className="text-sm text-gray-600 mt-1">
                    {feature.description}
                  </Text>
                )}
              </View>
            </View>
          ))}
        </View>

        {/* CTA ボタンセクション */}
        <View className="mb-6">
          <TouchableOpacity
            className={`w-full py-4 rounded-lg mb-3 ${
              selectedPackage ? "bg-blue-500" : "bg-gray-300"
            }`}
            onPress={handlePrimaryPress}
            disabled={!selectedPackage}
          >
            <Text className="text-white font-semibold text-center text-lg">
              {selectedPackage
                ? `${selectedPackage.price}で${primaryButtonTitle}`
                : primaryButtonTitle}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="w-full py-3 border border-gray-300 rounded-lg"
            onPress={handleSecondaryPress}
          >
            <Text className="text-gray-700 font-semibold text-center">
              {secondaryButtonTitle}
            </Text>
          </TouchableOpacity>
        </View>

        {/* 利用規約・プライバシーポリシーリンク */}
        <View className="items-center">
          <Text className="text-xs text-gray-500 text-center">
            購入することで、利用規約とプライバシーポリシーに同意したことになります
          </Text>
          <View className="flex-row gap-4 mt-2">
            {termsUrl && (
              <TouchableOpacity onPress={onTermsPress}>
                <Text className="text-blue-500 text-sm">利用規約</Text>
              </TouchableOpacity>
            )}
            {privacyUrl && (
              <TouchableOpacity onPress={onPrivacyPress}>
                <Text className="text-blue-500 text-sm">
                  プライバシーポリシー
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
