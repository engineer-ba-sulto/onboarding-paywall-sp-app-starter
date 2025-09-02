import { PaywallScreen } from "@/components/paywall";
import { useUsageLimits } from "@/utils/usageLimits";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";

export default function UsageLimitScreen() {
  const { isLimitReached, isLoading, usage, performAction, resetLimits } =
    useUsageLimits();
  const [showPaywall, setShowPaywall] = useState(false);

  useEffect(() => {
    // 利用制限に達している場合はペイウォールを表示
    if (isLimitReached && !isLoading) {
      setShowPaywall(true);
    }
  }, [isLimitReached, isLoading]);

  const handlePaywallClose = () => {
    setShowPaywall(false);
  };

  const handlePaywallSuccess = () => {
    setShowPaywall(false);
    // 購入成功後、利用制限をリセット
    resetLimits();
  };

  const handleTestAction = async () => {
    const result = await performAction();
    if (!result.canPerform) {
      // 制限に達した場合はペイウォールを表示
      setShowPaywall(true);
    }
  };

  const handleResetLimits = () => {
    resetLimits();
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
        title="利用制限に達しました"
        subtitle="プレミアムプランにご加入いただくと、制限なくご利用いただけます"
        features={[
          {
            title: "無制限アクセス",
            description: "1日、週、月の制限がなくなります",
          },
          {
            title: "広告なし体験",
            description: "すべての広告が表示されません",
          },
          {
            title: "プレミアムサポート",
            description: "優先的なサポートを受けられます",
          },
        ]}
        onPrimaryPress={handlePaywallSuccess}
        onSecondaryPress={handlePaywallClose}
      />
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 justify-center items-center px-6">
        <View className="items-center gap-6">
          <Text className="text-2xl font-bold text-center text-gray-900">
            利用制限テスト
          </Text>
          <Text className="text-base text-center text-gray-600 max-w-[280px]">
            利用制限の動作をテストできます
          </Text>
        </View>

        {/* 現在の利用状況表示 */}
        {usage && (
          <View className="bg-gray-100 p-4 rounded-lg w-full max-w-[300px]">
            <Text className="text-lg font-semibold text-gray-800 mb-3 text-center">
              現在の利用状況
            </Text>

            <View className="space-y-2">
              <View className="flex-row justify-between">
                <Text className="text-gray-600">今日のアクション:</Text>
                <Text className="font-semibold">
                  {usage.counts.daily} / {usage.limits.dailyActions}
                </Text>
              </View>

              <View className="flex-row justify-between">
                <Text className="text-gray-600">今週のアクション:</Text>
                <Text className="font-semibold">
                  {usage.counts.weekly} / {usage.limits.weeklyActions}
                </Text>
              </View>

              <View className="flex-row justify-between">
                <Text className="text-gray-600">今月のアクション:</Text>
                <Text className="font-semibold">
                  {usage.counts.monthly} / {usage.limits.monthlyActions}
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* テストアクションボタン */}
        <View className="items-center gap-4 w-full max-w-[300px]">
          <TouchableOpacity
            className="bg-blue-500 px-6 py-3 rounded-lg w-full items-center"
            onPress={handleTestAction}
          >
            <Text className="text-white font-semibold">
              アクションを実行（制限チェック）
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-green-500 px-6 py-3 rounded-lg w-full items-center"
            onPress={handleResetLimits}
          >
            <Text className="text-white font-semibold">利用制限をリセット</Text>
          </TouchableOpacity>
        </View>

        {/* 戻るボタン */}
        <View className="mt-8">
          <TouchableOpacity
            className="bg-gray-500 px-6 py-3 rounded-lg"
            onPress={() => router.back()}
          >
            <Text className="text-white font-semibold">戻る</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
