import { OnboardingContainer } from "@/components/onboarding";
import { onboardingScreens, REVENUECAT_CONFIG } from "@/config";
import "@/global.css";
import { useOnboarding } from "@/hooks/onboarding";
import { adsService } from "@/services";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { Platform, Text, View } from "react-native";
import Purchases from "react-native-purchases";

export default function Layout() {
  const { isLoading, hasSeenOnboarding } = useOnboarding();

  useEffect(() => {
    // RevenueCat SDKの初期化
    // 開発中はデバッグログを有効化
    Purchases.setLogLevel(Purchases.LOG_LEVEL.DEBUG);

    const apiKey = Platform.select({
      ios: REVENUECAT_CONFIG.apiKey.ios,
      android: REVENUECAT_CONFIG.apiKey.android,
    });

    if (apiKey && apiKey.includes("YOUR_")) {
      console.warn("RevenueCat APIキーが設定されていません。");
    } else if (apiKey) {
      Purchases.configure({ apiKey });
    }

    // AdsServiceを使用してAdMobを初期化
    adsService
      .initialize()
      .then(() => {
        console.log("AdMob initialized successfully");
      })
      .catch((error) => {
        console.error("Failed to initialize AdMob:", error);
      });
  }, []);

  // 初回起動判定中はローディング表示
  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text className="text-gray-600">読み込み中...</Text>
      </View>
    );
  }

  // 初回起動時はオンボーディング画面に遷移
  if (!hasSeenOnboarding) {
    return (
      <OnboardingContainer
        screens={onboardingScreens}
        // 完了/スキップ時のコールバックはnavigationHelpersで処理されるため不要
      />
    );
  }

  // 2回目以降の起動時は通常のタブナビゲーション
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
