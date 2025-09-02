### 基本情報

**タイトル**: 機能へのアクセス制御（機能ガード）

### 概要

ユーザーの購読状態（エンタイトルメント）に基づいて、プレミアム機能へのアクセスを制御（ガード）します。

### 要件

- [ ] プレミアム機能コンポーネントの表示前にエンタイトルメントをチェックする
- [ ] エンタイトルメントが有効な場合は、機能を表示する
- [ ] エンタイトルメントが無効な場合は、ペイウォールへ誘導する

### 技術仕様

**技術スタック**: React Native, RevenueCat
**ファイル**: `src/app/premium-feature.tsx`, `src/components/auth/ProtectedScreen.tsx` (HOC or wrapper)
**API**: `customerInfo.entitlements.active`

### 実装手順

1. プレミアム機能へのアクセスを保護するための高階コンポーネント（HOC）やラッパーコンポーネントを作成する（例: `ProtectedScreen`）。

   ```typescript
   // src/components/auth/withSubscription.tsx
   import React from "react";
   import { useAuthStore } from "../../store/auth";
   import PaywallScreen from "../../components/paywall/PaywallScreen"; // 仮

   export const withSubscription = (WrappedComponent) => {
     return (props) => {
       const { isSubscriptionActive } = useAuthStore();

       if (!isSubscriptionActive) {
         // 未購読の場合はペイウォールを表示
         return <PaywallScreen />;
       }

       // 購読済みの場合は本来のコンポーネントを表示
       return <WrappedComponent {...props} />;
     };
   };
   ```

   ```typescript
   // src/app/premium-feature.tsx
   import { withSubscription } from "../components/auth/withSubscription";

   const PremiumFeatureScreen = () => {
     // ... プレミアム機能のコンテンツ
     return <Text>This is a premium feature!</Text>;
   };

   export default withSubscription(PremiumFeatureScreen);
   ```

2. このコンポーネント内で、グローバルに管理されている購読状態、または`Purchases.getCustomerInfo()`で取得した`customerInfo`オブジェクトをチェックする。
3. `customerInfo.entitlements.active['premium']` のような形で、特定のエンタイトルメントが有効かどうかを判定する。
4. **有効な場合**: ラップされた子コンポーネント（本来のプレミアム機能画面）をレンダリングする。
5. **無効な場合**: 子コンポーネントをレンダリングせず、代わりにペイウォール画面にリダイレクトするか、モーダルで表示する。

### テスト項目

- [ ] プレミアム購読済みのアカウントで、プレミアム機能にアクセスできること
- [ ] 未購読のアカウントでプレミアム機能にアクセスしようとすると、ペイウォールが表示されること
- [ ] 購読期間が終了したアカウントで、プレミアム機能にアクセスできなくなること

### 完了条件

- [ ] 未購読ユーザーがプレミアム機能を利用できないように正しく制限されていること

### 注意事項

エンタイトルメント ID（例: `'premium'`）は、RevenueCat ダッシュボードで設定したものと正確に一致している必要があります。設定ファイルに定数として定義することが望ましいです（関連チケット: P7-001）。

### 関連チケット

- P3-001-display-trigger
- P5-001-status-monitoring
- P7-001-config-abstraction
