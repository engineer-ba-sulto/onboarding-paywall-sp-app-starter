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

  return {
    offering,
    selectedPackage,
    isLoading,
    error,
    selectPackage,
  };
};
