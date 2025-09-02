### 基本情報

**タイトル**: 購読状態の監視

### 概要

`CustomerInfo`オブジェクトの変更をリッスンし、ユーザーの購読状態（開始、更新、失効など）の変更をリアルタイムでアプリに反映させます。

### 要件

- [ ] `CustomerInfo`の更新リスナーを登録する
- [ ] リスナーコールバックで受け取った最新の`CustomerInfo`でアプリの状態を更新する
- [ ] コンポーネントのアンマウント時にリスナーをクリーンアップする

### 技術仕様

**技術スタック**: React Native, RevenueCat
**ファイル**: `src/providers/AuthProvider.tsx` (仮) or `src/app/_layout.tsx`
**API**: `Purchases.addCustomerInfoUpdateListener()`, `Purchases.removeCustomerInfoUpdateListener()`

### 実装手順

1. アプリ全体でユーザー情報を管理するコンポーネントやプロバイダー（例: `AuthProvider`）を用意する。
2. `useEffect`フック内で`Purchases.addCustomerInfoUpdateListener()`を呼び出してリスナーを登録する。
3. リスナーのコールバック関数では、引数として渡される`customerInfo`オブジェクトを使用して、グローバルな購読状態を更新する。
4. `useEffect`のクリーンアップ関数内で`Purchases.removeCustomerInfoUpdateListener()`を呼び出し、メモリリークを防ぐ。

   ```typescript
   // AuthProvider.tsx など、アプリのライフサイクルで常にマウントされている場所
   import { useEffect } from "react";
   import Purchases, { CustomerInfo } from "react-native-purchases";
   import { useAuthStore } from "../store/auth"; // ZustandやContextなど

   const AuthProvider = ({ children }) => {
     const { setSubscriptionActive } = useAuthStore();

     useEffect(() => {
       const customerInfoUpdateListener = (customerInfo: CustomerInfo) => {
         const isPremium =
           typeof customerInfo.entitlements.active["premium"] !== "undefined";
         setSubscriptionActive(isPremium);
       };

       Purchases.addCustomerInfoUpdateListener(customerInfoUpdateListener);

       // 初期状態も取得しておく
       const checkInitialStatus = async () => {
         const customerInfo = await Purchases.getCustomerInfo();
         const isPremium =
           typeof customerInfo.entitlements.active["premium"] !== "undefined";
         setSubscriptionActive(isPremium);
       };
       checkInitialStatus();

       return () => {
         Purchases.removeCustomerInfoUpdateListener(customerInfoUpdateListener);
       };
     }, []);

     return <>{children}</>;
   };
   ```

### テスト項目

- [ ] サンドボックス環境でサブスクリプションの自動更新（期間経過）が起こった際に、アプリの購読状態が正しく反映されること
- [ ] サブスクリプションをキャンセルした場合に、期間終了後にエンタイトルメントが失効することがアプリ側で検知できること

### 完了条件

- [ ] ユーザーの購読状態の変更が、アプリを再起動することなくリアルタイムに反映されること

### 注意事項

このリスナーはアプリがフォアグラウンドにある間に発生した変更を検知します。バックグラウンドでの変更は、次にアプリが起動した際に`getCustomerInfo()`で取得します。

### 関連チケット

- P3-002-display-control
- P5-002-feature-guard
