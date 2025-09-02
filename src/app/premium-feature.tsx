import { PaywallScreen } from "@/components/paywall";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import Purchases from "react-native-purchases";

export default function PremiumFeatureScreen() {
  const [showPaywall, setShowPaywall] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkSubscriptionStatus();
  }, []);

  const checkSubscriptionStatus = async () => {
    try {
      setIsLoading(true);
      const customerInfo = await Purchases.getCustomerInfo();

      // プレミアムエンタイトルメントがアクティブかチェック
      const hasActivePremium = Object.keys(customerInfo.entitlements.all).some(
        (key) => customerInfo.entitlements.all[key].isActive
      );

      setIsPremium(hasActivePremium);

      // プレミアムでない場合はペイウォールを表示
      if (!hasActivePremium) {
        setShowPaywall(true);
      }
    } catch (error) {
      console.error("購読状態の確認に失敗しました:", error);
      // エラーの場合もペイウォールを表示
      setShowPaywall(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaywallClose = () => {
    setShowPaywall(false);
    // ペイウォールを閉じた後、再度購読状態をチェック
    checkSubscriptionStatus();
  };

  const handlePaywallSuccess = () => {
    setShowPaywall(false);
    setIsPremium(true);
  };

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 justify-center items-center">
          <Text className="text-gray-600">読み込み中...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // ペイウォールが表示されている場合
  if (showPaywall) {
    return (
      <PaywallScreen
        title="プレミアム機能をアンロック"
        subtitle="この機能を利用するにはプレミアムプランが必要です"
        features={[
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
        ]}
        onPrimaryPress={handlePaywallSuccess}
        onSecondaryPress={handlePaywallClose}
      />
    );
  }

  // プレミアムユーザー向けのコンテンツ
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 justify-center items-center px-6">
        <View className="items-center gap-6">
          <Text className="text-2xl font-bold text-center text-gray-900">
            プレミアム機能
          </Text>
          <Text className="text-base text-center text-gray-600 max-w-[280px]">
            プレミアムプランにご加入いただき、ありがとうございます！
          </Text>

          <View className="bg-green-100 p-4 rounded-lg">
            <Text className="text-green-800 font-semibold text-center">
              🎉 プレミアム特典が利用可能です
            </Text>
          </View>
        </View>

        <View className="mt-8">
          <TouchableOpacity
            className="bg-blue-500 px-6 py-3 rounded-lg"
            onPress={() => router.back()}
          >
            <Text className="text-white font-semibold">戻る</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
