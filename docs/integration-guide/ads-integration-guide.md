# AdMob 広告機能 移植マニュアル

このドキュメントは、このスタータープロジェクトに含まれる AdMob 広告機能を、既存の React Native プロジェクトに移植するための手順を説明します。

## ✨ 機能概要

- **AdMob SDK の初期化管理**: アプリ起動時に一度だけ SDK を安全に初期化するサービスを提供。
- **バナー広告コンポーネント**: 画面下部などに簡単に配置できる汎用的なバナー広告。
- **インタースティシャル広告フック**: 画面遷移時などに全画面広告を表示するためのカスタムフック。
- **環境の自動切り替え**: 開発中(`__DEV__ === true`)は自動的にテスト広告を表示し、本番ビルドでは本番用広告 ID を使用します。

## 前提条件

- **React Native / Expo**
- **TypeScript**

## ステップ 1: 依存関係のインストール

AdMob 広告を表示するために必要なパッケージをインストールします。

```bash
bun add react-native-google-mobile-ads
```

## ステップ 2: Expo プラグインの設定

`app.json`または`app.config.js`に、`react-native-google-mobile-ads`プラグインを追加し、AdMob で発行したご自身のアプリ ID を設定します。

> **Warning**
> ここで設定するのは**広告ユニット ID**ではなく、**アプリ ID**です。ID の先頭が`ca-app-pub-`で、`~`が含まれる形式のものです。

```json:app.json
{
  "expo": {
    "plugins": [
      [
        "react-native-google-mobile-ads",
        {
          "androidAppId": "ca-app-pub-XXXXXXXXXXXXXXXX~XXXXXXXXXX",
          "iosAppId": "ca-app-pub-XXXXXXXXXXXXXXXX~XXXXXXXXXX"
        }
      ]
    ]
  }
}
```

## ステップ 3: ファイルのコピー

このプロジェクトから、以下のディレクトリとファイルをあなたのプロジェクトの`src`ディレクトリにコピーします。

- `src/components/ads/` (ディレクトリ全体)
- `src/config/ads.ts`
- `src/hooks/ads/` (ディレクトリ全体)
- `src/services/ads.ts`
- `src/services/index.ts` (または`ads.ts`を export するように既存の`index.ts`を修正)

## ステップ 4: AdMob SDK の初期化

アプリのルートレイアウト（Expo Router を使用している場合は`src/app/_layout.tsx`）で、AdMob SDK を初期化します。コピーした`adsService`は初期化が一度しか実行されないように設計されているため、`useEffect`内で安全に呼び出すことができます。

```tsx:src/app/_layout.tsx
import { adsService } from "@/services"; // services/index.ts経由でインポート
import { useEffect } from "react";
// ... 他のimport

export default function RootLayout() {
  useEffect(() => {
    // AdMob SDKの初期化
    adsService
      .initialize()
      .then(() => {
        console.log("AdMob initialized successfully");
      })
      .catch((error) => {
        console.error("Failed to initialize AdMob:", error);
      });
  }, []);

  // ... レイアウトの残りの部分
  return (
    // ...
  );
}
```

## ステップ 5: 広告の実装方法

### バナー広告の実装

バナー広告を表示したい画面で、`AdBanner`コンポーネントをインポートして配置します。通常は画面の最下部に配置します。

```tsx:src/app/index.tsx
import { AdBanner } from "@/components/ads";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {/* メインコンテンツ */}
      </View>

      {/* バナー広告 */}
      <AdBanner />
    </SafeAreaView>
  );
}
```

### インタースティシャル広告の実装

`useAdInterstitialUI`フックを使用して、インタースティシャル広告の読み込みと表示を制御します。

- **`isLoaded`**: 広告が読み込み完了しているかを示す boolean。
- **`showAd`**: 広告を表示する関数。
- **`isLoading`**: 広告が現在読み込み中かを示す boolean。
- **`error`**: 広告の読み込みまたは表示でエラーが発生した場合のエラーオブジェクト。

```tsx:src/app/someScreen.tsx
import { useAdInterstitialUI } from "@/hooks";
import { useEffect } from "react";
import { Button, View } from "react-native";

export default function SomeScreen() {
  const { isLoaded, showAd, handleReloadAd } = useAdInterstitialUI();

  // 画面が表示されたときに広告を読み込む
  useEffect(() => {
    handleReloadAd();
  }, []);

  const onButtonPress = async () => {
    // 広告が表示されたかどうかに関わらず、次のアクションを実行する
    console.log("Button pressed, attempting to show ad...");
    await showAd();
    console.log("Proceeding with next action after ad attempt.");
    // 例: 次のレベルに進む、報酬を付与するなどのロジック
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button
        title="全画面広告を表示"
        onPress={onButtonPress}
        disabled={!isLoaded}
      />
    </View>
  );
}
```

## ステップ 6: 本番用広告ユニット ID の設定

テストが完了したら、`src/config/ads.ts`ファイルに、AdMob で発行した本番用の**広告ユニット ID**を設定します。

> **Warning**
> ここで設定するのは**広告ユニット ID**です。`ca-app-pub-`で始まり、`/`が含まれる形式のものです。

```typescript:src/config/ads.ts
// ...
export const ADMOB_CONFIG = {
  // ... testAdUnitIds

  // 本番用広告ユニットID（ご自身のIDに書き換えてください）
  productionAdUnitIds: {
    banner: "ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX",
    interstitial: "ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX",
    rewarded: "ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX", // 必要に応じて設定
  },
};
// ...
```

`getAdUnitId`関数が自動的に開発環境と本番環境を判定するため、この設定ファイルを変更するだけで本番広告に切り替わります。

## 完了とテスト

以上で広告機能の移植は完了です。アプリをビルドして、以下の点を確認してください。

1.  開発ビルドで、バナー広告とインタースティシャル広告が「Test Ad」として正しく表示されること。
2.  広告の表示・非表示でアプリがクラッシュしないこと。
3.  本番用の広告ユニット ID を設定した後、本番ビルド（または`__DEV__`が`false`になる環境）で実際の広告が表示されること。

Happy Coding! 🎉
