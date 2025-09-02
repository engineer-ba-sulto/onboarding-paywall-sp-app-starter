### 基本情報

**タイトル**: 動的なプラン表示の実装

### 概要

RevenueCat の Offerings から取得した購入パッケージ（プラン）をペイウォール UI に動的に表示します。

### 要件

- [ ] RevenueCat SDK から現在利用可能な Offerings を取得する
- [ ] Offerings に含まれる Packages（週額、月額、年額、買い切り）をリスト表示する
- [ ] 各 Package の価格、期間、割引情報などを UI に表示する
- [ ] ユーザーがプランを選択できる UI を提供する

### 技術仕様

**技術スタック**: React Native, RevenueCat
**ファイル**: `src/components/paywall/PaywallScreen.tsx`, `src/hooks/paywall/usePaywall.ts`
**API**: `Purchases.getOfferings()`

### 実装手順

1. `Purchases.getOfferings()`を呼び出して、現在の Offerings を取得するロジックを実装する（カスタムフックに分離推奨）。

   ```typescript
   import Purchases, { PurchasesOffering } from "react-native-purchases";
   import { useEffect, useState } from "react";

   // usePaywall.ts内
   const [offering, setOffering] = useState<PurchasesOffering | null>(null);

   useEffect(() => {
     const getOfferings = async () => {
       try {
         const offerings = await Purchases.getOfferings();
         if (offerings.current !== null) {
           setOffering(offerings.current);
         }
       } catch (e) {
         console.error(e);
       }
     };
     getOfferings();
   }, []);
   ```

2. 取得した`offering.availablePackages`をループ処理する。
3. 各`Package`オブジェクトから`product.priceString`, `product.title`, `packageType`などの情報を抽出し、UI コンポーネントに渡して表示する。
4. ユーザーがプランを選択した際に、選択された`Package`を State で管理する。

### テスト項目

- [ ] RevenueCat で設定した全てのプランが正しく表示されること
- [ ] 各プランの価格が正しく表示されること
- [ ] プランを選択できること

### 完了条件

- [ ] RevenueCat から取得したプラン情報がペイウォール上に動的に表示されること

### 注意事項

Offerings や Packages が取得できない場合のローディング状態やエラーステートを考慮する必要があります。

### 関連チケット

- P1-002-product-setup
- P2-001-paywall-ui-design
- P4-001-purchase-flow
