import { useEffect, useState } from "react";
import Purchases, {
  PurchasesOffering,
  PurchasesPackage,
} from "react-native-purchases";

export const usePaywall = () => {
  const [offering, setOffering] = useState<PurchasesOffering | null>(null);
  const [selectedPackage, setSelectedPackage] =
    useState<PurchasesPackage | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getOfferings = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const offerings = await Purchases.getOfferings();
        if (offerings.current !== null) {
          setOffering(offerings.current);
          // デフォルトで最初のパッケージを選択
          if (offerings.current.availablePackages.length > 0) {
            setSelectedPackage(offerings.current.availablePackages[0]);
          }
        }
      } catch (e) {
        console.error(e);
        setError("プラン情報の取得に失敗しました");
      } finally {
        setIsLoading(false);
      }
    };
    getOfferings();
  }, []);

  const selectPackage = (pkg: PurchasesPackage) => {
    setSelectedPackage(pkg);
  };

  const purchasePackage = async (pkg: PurchasesPackage) => {
    try {
      setIsPurchasing(true);
      setError(null);

      const { customerInfo } = await Purchases.purchasePackage(pkg);

      // 購入成功の判定
      const hasActiveEntitlements = Object.keys(
        (customerInfo as any).entitlements.all
      ).some(
        (key: string) => (customerInfo as any).entitlements.all[key].isActive
      );

      if (hasActiveEntitlements) {
        // 購入成功
        return { success: true, customerInfo };
      } else {
        throw new Error("購入が完了しませんでした");
      }
    } catch (e: any) {
      console.error("Purchase error:", e);
      if (e.userCancelled) {
        setError("購入がキャンセルされました");
      } else {
        setError("購入に失敗しました。しばらく時間をおいて再度お試しください");
      }
      return { success: false, error: e };
    } finally {
      setIsPurchasing(false);
    }
  };

  const restorePurchases = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const customerInfo = await Purchases.restorePurchases();

      // 復元成功の判定
      const hasActiveEntitlements = Object.keys(
        (customerInfo as any).entitlements.all
      ).some(
        (key: string) => (customerInfo as any).entitlements.all[key].isActive
      );

      if (hasActiveEntitlements) {
        // 復元成功
        return { success: true, customerInfo };
      } else {
        setError("復元可能な購入が見つかりませんでした");
        return {
          success: false,
          error: "復元可能な購入が見つかりませんでした",
        };
      }
    } catch (e: any) {
      console.error("Restore error:", e);
      setError("購入の復元に失敗しました");
      return { success: false, error: e };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    offering,
    selectedPackage,
    isLoading,
    isPurchasing,
    error,
    selectPackage,
    purchasePackage,
    restorePurchases,
  };
};
