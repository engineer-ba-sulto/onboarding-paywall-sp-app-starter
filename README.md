# オンボーディング・ペイウォール・広告機能 スターターアプリ

このプロジェクトは、React Native でオンボーディング、ペイウォール（課金）、広告機能を実装するための包括的なスターターアプリケーションです。Expo Router、NativeWind、RevenueCat、AdMob を使用して構築されています。

## 🚀 主要機能

### ✨ オンボーディング機能

- 初回起動時のオンボーディング画面
- カスタマイズ可能なスクリーン設定
- スキップ・完了機能
- 状態の永続化

### 💰 ペイウォール・課金機能

- RevenueCat による課金基盤
- サブスクリプション（週額・月額・年額）
- 買い切りプロダクト（ライフタイム）
- 購入・復元フロー
- プレミアム機能の制御

### 📱 広告機能

- AdMob バナー広告
- インタースティシャル広告
- テスト/本番環境の自動切り替え
- 広告表示の制御

### 🎯 その他の機能

- プレミアム機能の制御
- 利用制限の実装
- モック画面（開発・テスト用）
- EAS Build 対応

## 🛠️ 技術スタック

- **フレームワーク**: React Native 0.79.5
- **ルーティング**: Expo Router 5.1.5
- **スタイリング**: NativeWind 4.0.1 + Tailwind CSS
- **課金**: RevenueCat (react-native-purchases 9.2.3)
- **広告**: AdMob (react-native-google-mobile-ads 15.6.0)
- **状態管理**: React Hooks
- **ビルド**: Expo Development Build
- **言語**: TypeScript

## 📱 対応プラットフォーム

- iOS (Expo Development Build)
- Android (Expo Development Build)
- Web (Expo Web)

## 🚀 クイックスタート

### 前提条件

- Node.js 18+ または Bun
- Expo CLI
- iOS 開発: Xcode 15+
- Android 開発: Android Studio + Android SDK

### インストール

```bash
# 依存関係のインストール
bun install

# Expo 開発サーバーの起動
bun start
```

### 環境設定

#### 1. RevenueCat 設定

`.env` ファイルを作成し、RevenueCat API キーを設定：

```bash
# .env
EXPO_PUBLIC_REVENUECAT_IOS_API_KEY=your_ios_api_key_here
EXPO_PUBLIC_REVENUECAT_ANDROID_API_KEY=your_android_api_key_here
```

#### 2. AdMob 設定

`app.json` で AdMob アプリ ID を設定（現在はテスト用 ID）：

```json
{
  "expo": {
    "plugins": [
      [
        "react-native-google-mobile-ads",
        {
          "androidAppId": "ca-app-pub-3940256099942544~3347511713",
          "iosAppId": "ca-app-pub-3940256099942544~1458002511"
        }
      ]
    ]
  }
}
```

本番環境では、実際の AdMob アプリ ID に変更してください。

## 🏗️ プロジェクト構造

```
src/
├── app/                    # Expo Router 画面
│   ├── _layout.tsx        # ルートレイアウト
│   ├── index.tsx          # メイン画面
│   ├── paywall.tsx        # ペイウォール画面
│   ├── premium-feature.tsx # プレミアム機能画面
│   ├── usage-limit.tsx    # 利用制限画面
│   └── mock-paywall.tsx   # モックペイウォール
├── components/             # UI コンポーネント
│   ├── onboarding/        # オンボーディング関連
│   ├── paywall/           # ペイウォール関連
│   └── ads/               # 広告関連
├── config/                 # 設定ファイル
│   ├── revenuecat.ts      # RevenueCat 設定
│   ├── ads.ts             # AdMob 設定
│   └── onboarding.ts      # オンボーディング設定
├── hooks/                  # カスタムフック
│   ├── onboarding/        # オンボーディング関連
│   ├── paywall/           # ペイウォール関連
│   └── ads/               # 広告関連
├── services/               # サービス層
│   └── ads.ts             # 広告サービス
└── utils/                  # ユーティリティ
    ├── onboardingStorage.ts # オンボーディング状態管理
    └── usageLimits.ts      # 利用制限管理
```

## 📚 機能詳細

### オンボーディング機能

初回起動時に表示されるオンボーディング画面を管理します。

```typescript
// オンボーディング画面の設定
export const onboardingScreens = [
  {
    title: "アプリへようこそ",
    subtitle: "簡単に記録を始めましょう",
    description: "このアプリで、あなたの日常を簡単に記録できます。",
    iconName: "add-circle",
    iconColor: "#2563eb",
    backgroundColor: "#ffffff",
    textColor: "#1f2937",
  },
  // ... 他の画面
];
```

### ペイウォール機能

RevenueCat を使用した課金機能を提供します。

```typescript
// プロダクト設定
export const REVENUECAT_CONFIG = {
  products: {
    weekly: "weekly_premium_subscription_demo",
    monthly: "monthly_premium_subscription_demo",
    yearly: "yearly_premium_subscription_demo",
    lifetime: "lifetime_premium_access_demo",
  },
  entitlements: {
    premium: "premium_access",
  },
};
```

### 広告機能

AdMob による広告表示機能を提供します。

```typescript
// 広告設定
export const ADMOB_CONFIG = {
  testAdUnitIds: {
    banner: TestIds.BANNER,
    interstitial: TestIds.INTERSTITIAL,
    rewarded: TestIds.REWARDED,
  },
  productionAdUnitIds: {
    banner: "", // 本番用IDを設定
    interstitial: "", // 本番用IDを設定
    rewarded: "", // 本番用IDを設定
  },
};
```

## 🧪 テスト

### 開発環境でのテスト

```bash
# iOS シミュレータでテスト
bun run ios

# Android エミュレータでテスト
bun run android

# Web ブラウザでテスト
bun run web
```

### EAS Development Build でのテスト

課金機能のテストには EAS Development Build が必要です：

```bash
# EAS CLI のインストール
bun install -g eas-cli

# ログイン
eas login

# 開発ビルドの作成
eas build --profile development --platform ios
eas build --profile development --platform android
```

## 📖 ドキュメント

詳細な実装ガイドは `docs/` ディレクトリを参照してください：

- [ペイウォール実装ガイド](docs/paywall-implements.md)
- [RevenueCat 設定ガイド](docs/revenuecat-setup-guide.md)
- [サンドボックステストガイド](docs/sandbox-testing-guide.md)
- [チケット別実装詳細](docs/ticket/)

## 🔧 カスタマイズ

### オンボーディング画面のカスタマイズ

`src/config/onboarding.ts` で画面の内容を変更できます。

### ペイウォールのカスタマイズ

`src/config/revenuecat.ts` でプロダクト設定を変更できます。

### 広告のカスタマイズ

`src/config/ads.ts` で広告ユニット ID を設定できます。

## 🚀 本番環境への展開

### 1. 環境変数の設定

本番用の API キーと広告ユニット ID を設定してください。

### 2. EAS Build での本番ビルド

```bash
# 本番ビルド
eas build --profile production --platform ios
eas build --profile production --platform android
```

### 3. ストアへの提出

```bash
# App Store への提出
eas submit --platform ios

# Google Play への提出
eas submit --platform android
```

## ⚠️ 注意事項

### 開発環境

- 課金機能のテストには EAS Development Build が必要です
- Expo Go では課金機能は動作しません
- テスト用の広告 ID が設定されています

### 本番環境

- 必ず本番用の API キーと広告ユニット ID を設定してください
- アプリストアの審査ガイドラインに従ってください
- プライバシーポリシーと利用規約を適切に設定してください

## 🤝 コントリビューション

このプロジェクトへの貢献を歓迎します。以下の手順で貢献してください：

1. このリポジトリをフォーク
2. 機能ブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add some amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## 📄 ライセンス

このプロジェクトは MIT ライセンスの下で公開されています。詳細は [LICENSE](LICENSE) ファイルを参照してください。

## 🙏 謝辞

このプロジェクトは以下の素晴らしいライブラリとツールを使用しています：

- [Expo](https://expo.dev/) - React Native 開発プラットフォーム
- [RevenueCat](https://www.revenuecat.com/) - モバイル課金プラットフォーム
- [AdMob](https://admob.google.com/) - モバイル広告プラットフォーム
- [NativeWind](https://www.nativewind.dev/) - React Native 用 Tailwind CSS
