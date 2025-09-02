### 基本情報

**タイトル**: RevenueCat SDK の初期化

### 概要

アプリケーションの起動時に RevenueCat SDK を初期化し、アプリが課金機能を利用できる状態にします。

### 要件

- [ ] iOS プラットフォーム用の API キーを用いて SDK を初期化する
- [ ] Android プラットフォーム用の API キーを用いて SDK を初期化する

### 技術仕様

**技術スタック**: React Native, Expo, RevenueCat
**ファイル**: `src/app/_layout.tsx` (または同等のエントリーポイントファイル)
**API**: `Purchases.configure()`

### 実装手順

1. アプリケーションのルートコンポーネント（例: `_layout.tsx`）を開く。
2. `useEffect`フックなどを使用して、コンポーネントのマウント時に一度だけ実行されるロジックを記述する。
3. `Platform.OS`を判定し、iOS と Android それぞれに対応する RevenueCat API キーを使って`Purchases.configure()`を呼び出す。

   ```typescript
   import { Platform } from "react-native";
   import Purchases from "react-native-purchases";
   import { useEffect } from "react";

   // ... コンポーネント内
   useEffect(() => {
     if (Platform.OS === "ios") {
       Purchases.configure({ apiKey: "YOUR_APPLE_API_KEY" });
     } else if (Platform.OS === "android") {
       Purchases.configure({ apiKey: "YOUR_GOOGLE_API_KEY" });
     }
   }, []);
   ```

4. API キーはハードコーディングせず、設定ファイルや環境変数から読み込むようにする（関連チケット: P2-016）。

### テスト項目

- [ ] アプリ起動時にエラーが発生しないこと
- [ ] `Purchases.configure()`が正しく呼び出されること（デバッグログ等で確認）

### 完了条件

- [ ] アプリ起動時にプラットフォームに応じた API キーで RevenueCat SDK が初期化されること

### 注意事項

API キーは機密情報のため、バージョン管理システムに直接コミットしないでください。

### 関連チケット

- P1-001-sdk-install
- P2-016-config-abstraction
