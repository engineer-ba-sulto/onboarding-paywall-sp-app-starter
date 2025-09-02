import { PaywallScreen } from "@/components/paywall";
import { router } from "expo-router";
import React from "react";

export default function PaywallPage() {
  const handlePaywallSuccess = () => {
    // 購入成功後、メイン画面に遷移
    router.replace("/");
  };

  const handlePaywallClose = () => {
    // ペイウォールを閉じた後、メイン画面に遷移
    router.replace("/");
  };

  return (
    <PaywallScreen
      title="プレミアムプランにご加入ください"
      subtitle="オンボーディング完了おめでとうございます！プレミアムプランでより良い体験をお楽しみください"
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
        {
          title: "無制限アクセス",
          description: "利用制限がなくなります",
        },
      ]}
      onPrimaryPress={handlePaywallSuccess}
      onSecondaryPress={handlePaywallClose}
    />
  );
}
