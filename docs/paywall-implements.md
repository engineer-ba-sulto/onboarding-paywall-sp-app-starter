# ペイウォール実装（Expo 汎用テンプレート）

このドキュメントは、Expo で開発された React Native アプリに適用可能な、RevenueCat を用いたペイウォールの汎用実装計画です。**課金機能のテストには EAS による Development Build が必須です。**

- **ステップ：1. RevenueCat SDK 導入と設定**: 課金基盤として RevenueCat を採用し、セットアップを行います。

  - **1-1. SDK インストール**: `bunx expo install react-native-purchases` を実行します。RevenueCat が提供する UI コンポーネントを利用する場合は `react-native-purchases-ui` も同時に追加します。
  - **1-2. プロダクト設定**: App Store Connect と Google Play Console で、**週額・月額・年額のサブスクリプション**および**買い切り（1 回払い）**のプロダクトを定義します。その後、RevenueCat ダッシュボードでこれらのプロダクトを Entitlements, Offerings, Packages として構成します。
  - **1-3. SDK 初期化**: アプリケーションのルート（`App.tsx`など）で、プラットフォームごとに異なる API キーを用いて SDK を初期化します。

    ```typescript
    import { Platform } from "react-native";
    import Purchases from "react-native-purchases";

    // ... アプリコンポーネント内
    if (Platform.OS === "ios") {
      Purchases.configure({ apiKey: "YOUR_APPLE_API_KEY" });
    } else if (Platform.OS === "android") {
      Purchases.configure({ apiKey: "YOUR_GOOGLE_API_KEY" });
    }
    ```

  - **1-4. ネイティブ設定**: Expo の Development Build プロセスでは、`react-native-purchases`が必要とするネイティブ設定（iOS の In-App Purchase ケーパビリティや Android の BILLING 権限など）が自動的に構成されるため、**手動での Xcode や AndroidManifest.xml の編集は原則不要**です。

- **ステップ：2. 汎用ペイウォール UI の作成**: 再利用性を重視したコンポーネントを設計します。

  - **2-1. コンポーネント設計**: タイトル、特典リスト、CTA ボタン（購入・復元）、利用規約・プライバシーポリシーへのリンクを含む UI コンポーネントを作成します。
  - **2-2. 動的プラン表示**: RevenueCat の`Offerings`から取得したパッケージ（**週額・月額・年額・買い切り**）を動的にリスト表示し、価格や割引情報をユーザーに提示します。
  - **2-3. ロジック分離**: UI コンポーネント（`src/components/paywall/*`）と状態管理・購入ロジック（`src/hooks/paywall/*`）を分離し、保守性を高めます。（※ `react-native-purchases-ui`を利用する場合はこの限りではありません）

- **ステップ：3. 表示ロジックの実装**: アプリのフローに応じてペイウォールを適切なタイミングで表示します。

  - **3-1. 表示トリガー**: オンボーディング完了後、プレミアム機能へのアクセス時、または利用制限に達した際など、ビジネスロジックに応じたトリガーを設定します。
  - **3-2. 表示制御**: ユーザーが既にプレミアムプランに加入済みの場合、ペイウォールが表示されないように制御します。

- **ステップ：4. 購入・復元フローの実装**: `react-native-purchases`が提供するメソッドを用いて課金処理を実装します。

  - `Purchases.purchasePackage()`と`Purchases.restorePurchases()`を実装し、購入・復元処理を行います。
  - 処理の成功、失敗（ユーザーによるキャンセル含む）、待機中といった各状態をハンドリングし、UI にフィードバックします。

- **ステップ：5. アクセス制御（エンタイトルメント管理）**: ユーザーの購読状態に基づいてアプリの機能へのアクセスを制御します。

  - **5-1. 状態監視**: `Purchases.addCustomerInfoUpdateListener` を用いて`CustomerInfo`オブジェクトの変更をリッスンし、常に最新の購読状態をアプリに反映させます。
  - **5-2. 機能ガード**: `customerInfo.entitlements.active`（例: `'premium'`など、プロジェクトに応じて定義）をチェックし、プレミアム機能へのアクセス可否を判定します。未購読者にはペイウォールを提示します。

- **ステップ：6. EAS Development Build によるテスト**: Expo Go では課金テストができないため、EAS を使用してテストビルドを作成します。

  - **6-1. EAS CLI のインストールと設定**: `bun install -g eas-cli` で CLI をインストールし、`eas login`、`eas build:configure` コマンドでプロジェクトをセットアップします。
  - **6-2. テストビルドの作成**: `eas build --profile development --platform ios` (または `android`) を実行して、シミュレータや実機でテスト可能な開発ビルドを作成します。

- **ステップ：7. 設定の抽象化**: ボイラープレートとして再利用しやすくするため、プロジェクト固有の設定を分離します。

  - API キーやエンタイトルメント ID などの設定値は、`src/config/revenuecat.ts`のような設定ファイルや環境変数（`.env`）に集約し、ハードコーディングを避けます。

- **8. サーバー連携（任意）**: RevenueCat Webhooks とサーバーサイドロジックを連携させます。
  - 購入・更新・解約などのイベントを Webhook 経由でサーバー（例: Supabase Edge Functions）に送信し、ユーザーの購読情報を自社データベースで管理します。
