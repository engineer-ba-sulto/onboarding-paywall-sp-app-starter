### 基本情報

**タイトル**: RevenueCat SDK の初期化（デバッグモード）

### 概要

アプリケーションの起動時に RevenueCat SDK を初期化し、サンドボックス環境でのデバッグおよびテスト購入ができる状態にします。

### 要件

- [ ] iOS と Android それぞれのプラットフォーム用の **テスト（サンドボックス）API キー** を用いて SDK を初期化する
- [ ] 開発中はデバッグログを有効にする

### 技術仕様

**技術スタック**: React Native, Expo, RevenueCat
**ファイル**: `src/app/_layout.tsx` (または同等のエントリーポイントファイル)
**API**: `Purchases.configure()`, `Purchases.setLogLevel()`

### 実装手順

1.  アプリケーションのルートコンポーネント（例: `_layout.tsx`）を開く。
2.  `useEffect`フックを使用し、コンポーネントのマウント時に一度だけ実行されるロジックを記述する。
3.  `Purchases.setLogLevel(Purchases.LOG_LEVEL.DEBUG)` を呼び出し、デバッグログを有効化する。これにより、コンソールで SDK の動作状況を詳細に確認できる。
4.  `Platform.OS` を判定し、`src/config/revenuecat.ts` から読み込んだ **テスト用 API キー** を使って `Purchases.configure()` を呼び出す。

    ```typescript
    // App.tsx や ルートの _layout.tsx など
    import { Platform } from "react-native";
    import Purchases from "react-native-purchases";
    import { useEffect } from "react";
    import { REVENUECAT_CONFIG } from "../config";

    const RootLayout = () => {
      useEffect(() => {
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
      }, []);

      // ... ここにナビゲーションなどのコンポーネントが続く
      return <Stack />;
    };
    ```

5.  **注意**: API キーはハードコーディングせず、必ず設定ファイル (`src/config/revenuecat.ts`) から読み込むようにします（関連チケット: P7-001）。

### テスト項目

- [ ] アプリ起動時に「RevenueCat API キーが設定されていません。」という警告が表示されないこと
- [ ] コンソールに RevenueCat のデバッグログが出力されること
- [ ] SDK の初期化に関するエラーが発生しないこと

### 完了条件

- [ ] アプリ起動時に、プラットフォームに応じたテスト API キーで RevenueCat SDK が初期化され、デバッグモードで動作すること

### 注意事項

API キーは機密情報です。**このボイラープレートを公開リポジトリにする場合は、絶対に実際のキーをコミットしないでください。**

### 関連チケット

- P1-002-product-setup
- P7-001-config-abstraction
