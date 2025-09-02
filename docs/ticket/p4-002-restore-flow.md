### 基本情報

**タイトル**: 復元フローの実装

### 概要

ユーザーが過去に購入した非消耗アイテムやサブスクリプションを復元する機能を実装します。

### 要件

- [ ] 「購入を復元」ボタンを実装する
- [ ] ボタンタップ時に復元処理を開始する
- [ ] 復元処理中の待機状態を UI にフィードバックする
- [ ] 復元成功・失敗のハンドリングを行う

### 技術仕様

**技術スタック**: React Native, RevenueCat
**ファイル**: `src/hooks/paywall/usePaywall.ts`
**API**: `Purchases.restorePurchases()`

### 実装手順

1. `usePaywall`フック内に、復元処理を行う関数を定義する。
2. 関数の内部で`Purchases.restorePurchases()`を呼び出す。

   ```typescript
   import Purchases from "react-native-purchases";
   import { useState } from "react";

   // usePaywall.ts内
   const [isLoading, setIsLoading] = useState(false);

   const restorePurchases = async () => {
     try {
       setIsLoading(true);
       const customerInfo = await Purchases.restorePurchases();

       // 復元されたユーザー情報でエンタイトルメントをチェック
       if (typeof customerInfo.entitlements.active["premium"] !== "undefined") {
         // ペイウォールを閉じるなどの処理
         alert("購入が復元されました。");
       } else {
         alert("復元対象の購入が見つかりませんでした。");
       }
     } catch (e) {
       console.error(e);
       alert("復元に失敗しました。");
     } finally {
       setIsLoading(false);
     }
   };
   ```

3. `try...catch`ブロックを使用して、成功と失敗のケースをハンドリングする。
   - **成功時**: `restorePurchases`は最新の`CustomerInfo`を返す。エンタイトルメントが有効になっているかを確認し、有効であればペイウォールを閉じる。復元対象の購入がない場合も成功として扱われるが、エンタイトルメントは有効にならない。
   - **失敗時**: エラーをキャッチし、ユーザーにエラーメッセージを表示する。
4. 処理中はローディングインジケーターを表示する。
5. 復元が成功しエンタイトルメントが有効になった場合、または復元対象がなかった場合、それぞれに応じたメッセージをユーザーに表示する。

### テスト項目

- [ ] 「購入を復元」ボタンをタップして、エラーなく処理が完了すること
- [ ] 過去に購入済みのテストアカウントで、エンタイトルメントが正しく復元されること
- [ ] 購入履歴のないアカウントで、復元対象がない旨のメッセージが表示されること

### 完了条件

- [ ] ユーザーが過去の購入を復元し、プレミアム機能へのアクセス権を再度得られること

### 注意事項

iOS では「購入の復元」機能の実装が必須とされています。

### 関連チケット

- P4-001-purchase-flow
