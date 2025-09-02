import { useCallback } from "react";
import { Alert } from "react-native";
import { useAdInterstitial } from "./useAdInterstitial";

/**
 * インタースティシャル広告のUI操作を行うカスタムフック
 * 汎用的なuseAdInterstitialフックを拡張してUI固有の機能を提供
 */
export const useAdInterstitialUI = () => {
  const {
    isLoaded,
    isLoading,
    isShowing,
    error,
    loadAd,
    showAd,
    clearError,
    reset,
    isAdReady,
    getAdStatus,
  } = useAdInterstitial();

  /**
   * 広告表示のハンドラー（UI用）
   */
  const handleShowAd = useCallback(async (): Promise<void> => {
    const success = await showAd();
    if (!success) {
      Alert.alert(
        "広告表示失敗",
        "広告が準備できていません。再度お試しください。",
        [{ text: "OK" }]
      );
    }
  }, [showAd]);

  /**
   * 広告再読み込みのハンドラー（UI用）
   */
  const handleReloadAd = useCallback(async (): Promise<void> => {
    const success = await loadAd();
    if (success) {
      Alert.alert("成功", "広告を再読み込みしました");
    }
  }, [loadAd]);

  /**
   * レベルクリアシミュレーションのハンドラー（UI用）
   */
  const handleLevelClearSimulation = useCallback(() => {
    Alert.alert("レベルクリア！", "次のレベルに進みます", [
      {
        text: "キャンセル",
        style: "cancel",
      },
      {
        text: "広告を見て進む",
        onPress: async () => {
          const success = await showAd();
          if (success) {
            Alert.alert("次のレベルへ！");
          } else {
            Alert.alert("次のレベルへ！", "（広告なし）");
          }
        },
      },
    ]);
  }, [showAd]);

  /**
   * ゲーム進行時の広告表示ハンドラー
   * @param onProceed 進行時のコールバック
   * @param onSkip スキップ時のコールバック
   */
  const handleGameProgression = useCallback(
    async (onProceed?: () => void, onSkip?: () => void): Promise<boolean> => {
      if (!isAdReady()) {
        // 広告が準備できていない場合は直接進行
        onSkip?.();
        return false;
      }

      Alert.alert("次のステージへ", "広告を見て進みますか？", [
        {
          text: "スキップ",
          style: "cancel",
          onPress: () => onSkip?.(),
        },
        {
          text: "広告を見る",
          onPress: async () => {
            const success = await showAd();
            if (success) {
              onProceed?.();
            } else {
              onSkip?.();
            }
          },
        },
      ]);

      return true;
    },
    [isAdReady, showAd]
  );

  /**
   * エラー表示のハンドラー（UI用）
   */
  const handleError = useCallback(() => {
    if (error) {
      Alert.alert("広告エラー", error, [{ text: "OK", onPress: clearError }]);
    }
  }, [error, clearError]);

  return {
    // 基本状態（useAdInterstitialから継承）
    isLoaded,
    isLoading,
    isShowing,
    error,
    isAdReady: isAdReady(),
    getAdStatus,

    // 基本メソッド（useAdInterstitialから継承）
    loadAd,
    showAd,
    clearError,
    reset,

    // UI用ハンドラー
    handleShowAd,
    handleReloadAd,
    handleLevelClearSimulation,
    handleGameProgression,
    handleError,
  };
};

export default useAdInterstitialUI;
