import { AdBanner } from "@/components/ads";
import { OnboardingContainer } from "@/components/onboarding";
import { onboardingScreens } from "@/config";
import { useAdInterstitialUI } from "@/hooks";
import { useOnboarding } from "@/hooks/onboarding";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Page() {
  const {
    isLoaded,
    isLoading,
    error,
    handleShowAd,
    handleReloadAd,
    handleLevelClearSimulation,
    handleError,
  } = useAdInterstitialUI();

  const { resetOnboarding } = useOnboarding();
  const [showOnboarding, setShowOnboarding] = useState(false);

  // 画面表示時に広告を読み込む
  useEffect(() => {
    // 初期化時に広告を読み込む
    handleReloadAd();
  }, []);

  // エラーが発生した場合のアラート表示
  useEffect(() => {
    if (error) {
      handleError();
    }
  }, [error, handleError]);

  // オンボーディングを表示する処理
  const handleShowOnboarding = async () => {
    try {
      // オンボーディング状態をリセットしてから表示
      await resetOnboarding();
      setShowOnboarding(true);
    } catch (error) {
      console.error("Failed to show onboarding:", error);
    }
  };

  // オンボーディングを閉じる処理
  const handleCloseOnboarding = () => {
    setShowOnboarding(false);
  };

  // オンボーディングが表示されている場合はオンボーディング画面を表示
  if (showOnboarding) {
    return (
      <OnboardingContainer
        onComplete={handleCloseOnboarding}
        onSkip={handleCloseOnboarding}
        screens={onboardingScreens}
      />
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 justify-center items-center px-6">
        <View className="items-center gap-6">
          <Text className="text-2xl font-bold text-center text-gray-900">
            AdMob 広告サンプル
          </Text>
          <Text className="text-base text-center text-gray-600 max-w-[280px]">
            このアプリはAdMob広告の実装サンプルです
          </Text>
        </View>

        {/* オンボーディング確認ボタン */}
        <View className="items-center gap-4 w-full max-w-[300px] mb-6">
          <Text className="text-lg font-semibold text-gray-800">
            オンボーディング
          </Text>

          <TouchableOpacity
            className="bg-orange-500 px-6 py-3 rounded-lg w-full items-center"
            onPress={handleShowOnboarding}
          >
            <Text className="text-white font-semibold">
              オンボーディングを確認
            </Text>
          </TouchableOpacity>
        </View>

        {/* ペイウォール表示トリガーのテストボタン */}
        <View className="items-center gap-4 w-full max-w-[300px] mb-6">
          <Text className="text-lg font-semibold text-gray-800">
            ペイウォール表示トリガー
          </Text>

          <TouchableOpacity
            className="bg-red-500 px-6 py-3 rounded-lg w-full items-center"
            onPress={() => router.push("/premium-feature")}
          >
            <Text className="text-white font-semibold">
              プレミアム機能アクセス（ペイウォール表示）
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-purple-500 px-6 py-3 rounded-lg w-full items-center"
            onPress={() => router.push("/usage-limit")}
          >
            <Text className="text-white font-semibold">
              利用制限テスト（ペイウォール表示）
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-indigo-500 px-6 py-3 rounded-lg w-full items-center"
            onPress={() => router.push("/paywall")}
          >
            <Text className="text-white font-semibold">
              ペイウォール画面を直接表示
            </Text>
          </TouchableOpacity>
        </View>

        {/* インタースティシャル広告コントロール */}
        <View className="items-center gap-4 w-full max-w-[300px]">
          <Text className="text-lg font-semibold text-gray-800">
            インタースティシャル広告
          </Text>

          <View className="items-center gap-2">
            <Text className="text-sm text-gray-600">
              状態:{" "}
              {isLoading ? "読み込み中..." : isLoaded ? "準備完了" : "未準備"}
            </Text>

            <TouchableOpacity
              className="bg-blue-500 px-6 py-3 rounded-lg w-full items-center"
              onPress={handleShowAd}
              disabled={!isLoaded || isLoading}
            >
              <Text className="text-white font-semibold">
                {isLoading ? "読み込み中..." : "広告を表示"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-green-500 px-6 py-3 rounded-lg w-full items-center"
              onPress={handleReloadAd}
              disabled={isLoading}
            >
              <Text className="text-white font-semibold">広告を再読み込み</Text>
            </TouchableOpacity>
          </View>

          {/* シミュレーション例 */}
          <View className="items-center gap-2 mt-4">
            <Text className="text-sm font-semibold text-gray-700">
              シミュレーション例
            </Text>

            <TouchableOpacity
              className="bg-purple-500 px-6 py-3 rounded-lg w-full items-center"
              onPress={handleLevelClearSimulation}
            >
              <Text className="text-white font-semibold">
                レベルクリアをシミュレート
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* バナー広告 */}
        <View className="flex-1 justify-end items-center w-full max-w-[320px] mb-4">
          <AdBanner />
        </View>
      </View>
    </SafeAreaView>
  );
}
