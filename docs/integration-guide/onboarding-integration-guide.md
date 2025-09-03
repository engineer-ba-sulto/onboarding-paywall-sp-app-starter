# オンボーディング機能 移植マニュアル

このドキュメントは、このスタータープロジェクトに含まれるオンボーディング機能を、既存の React Native プロジェクトに移植するための手順を説明します。

## ✨ 機能概要

- **初回起動判定**: アプリの初回起動時のみオンボーディング画面を表示します。
- **スワイプ可能な画面**: `ScrollView` を使用したスワイプ可能なページャー。
- **カスタマイズ性**: 画面の数や内容は設定ファイルで簡単に変更できます。
- **状態管理**: `AsyncStorage` を使用して、オンボーディングの表示状態を永続化します。

## 前提条件

このマニュアルは、移植先のプロジェクトが以下の技術スタックを使用していることを前提としています。

- **React Native / Expo**
- **NativeWind (Tailwind CSS)**
- **Expo Router** (ナビゲーション用)
- **TypeScript**

> **Note**
> Expo Router 以外のナビゲーションライブラリ（例: React Navigation）を使用している場合は、ステップ 5 でナビゲーションに関するコードを適宜読み替えて実装してください。

## ステップ 1: 依存関係のインストール

オンボーディング機能に必要なパッケージをインストールします。

```bash
bun add @react-native-async-storage/async-storage
```

`package.json` を確認し、以下のパッケージが含まれていることを確認してください。もしなければ、追加でインストールしてください。

- `nativewind`
- `tailwindcss`
- `expo-router`

## ステップ 2: ファイルのコピー

このプロジェクトから、以下のディレクトリとファイルをあなたのプロジェクトの `src` ディレクトリにコピーします。

- `src/components/onboarding/` (ディレクトリ全体)
- `src/config/onboarding.ts`
- `src/hooks/onboarding/` (ディレクトリ全体)
- `src/utils/onboardingStorage.ts`
- `src/utils/navigationHelpers.ts`

## ステップ 3: NativeWind とグローバルスタイルの設定

`NativeWind` を使用するために、必要な設定を行います。

### 1. `tailwind.config.js` の設定

プロジェクトルートの `tailwind.config.js` に、コピーしたコンポーネントが Tailwind CSS のクラスを正しく解釈できるように設定を追加します。

```js:tailwind.config.js
// ...
content: [
  "./src/**/*.{js,jsx,ts,tsx}", // 既存の設定
  "./src/components/onboarding/**/*.{js,jsx,ts,tsx}", // この行を追加
],
// ...
```

### 2. グローバル CSS の適用

`src/global.css` に Tailwind CSS のディレクティブを追加します。ファイルがない場合は新規作成してください。

```css:src/global.css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

このグローバル CSS をアプリのエントリーポイント（例: `_layout.tsx`）でインポートします。

```typescript:src/app/_layout.tsx
import "../global.css";
// ...
```

## ステップ 4: オンボーディングロジックの統合

アプリのルートレイアウト（Expo Router を使用している場合は `src/app/_layout.tsx`）で、初回起動時にオンボーディング画面を表示するためのロジックを実装します。

`useOnboarding` フックを利用して、読み込み状態とオンボーディング表示済みかどうかを判定し、表示する画面を切り替えます。

```tsx:src/app/_layout.tsx
import { OnboardingContainer } from "@/components/onboarding";
import { onboardingScreens } from "@/config";
import { useOnboarding } from "@/hooks/onboarding";
import { Stack } from "expo-router";
import { Text, View } from "react-native";
import "../global.css"; // グローバルCSSのインポート

export default function RootLayout() {
  const { isLoading, hasSeenOnboarding } = useOnboarding();

  // 初回起動判定中はローディング表示
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>読み込み中...</Text>
      </View>
    );
  }

  // 初回起動時はオンボーディング画面に遷移
  if (!hasSeenOnboarding) {
    return <OnboardingContainer screens={onboardingScreens} />;
  }

  // 2回目以降の起動時は通常のアプリ画面
  return (
    <Stack>
      <Stack.Screen name="index" />
      {/* 他の画面設定... */}
    </Stack>
  );
}
```

## ステップ 5: ナビゲーションの設定

オンボーディングが完了またはスキップされた後、メインのアプリ画面に遷移するよう設定します。

コピーした `src/utils/navigationHelpers.ts` は `expo-router` を使用しています。

```typescript:src/utils/navigationHelpers.ts
import { router } from "expo-router";

export const navigateToAuth = (): void => {
  try {
    // 遷移先をあなたのアプリのメイン画面に変更してください
    router.replace("/"); // or "/home", "/(tabs)", etc.
  } catch (error) {
    console.error("メイン画面への遷移に失敗しました:", error);
  }
};
// ...
```

`navigateToAuth` 関数内の `router.replace("/auth")` を、あなたのアプリのオンボーディング完了後の遷移先（例: ホーム画面 `router.replace("/")`）に書き換えてください。

> **Note**
> React Navigation を使用している場合は、`navigationHelpers.ts` の内容を `useNavigation` フックなどを使った実装に書き換える必要があります。

## ステップ 6: カスタマイズ

オンボーディング画面の内容は、`src/config/onboarding.ts` で自由にカスタマイズできます。

```typescript:src/config/onboarding.ts
export const onboardingScreens = [
  {
    title: "新しいタイトル",
    subtitle: "新しいサブタイトル",
    description: "新しい説明文。",
    iconName: "favorite", // Material Icons のアイコン名
    // ...
  },
  // 画面を追加・削除できます
];
```

## 完了とテスト

以上で移植は完了です。アプリを起動して、以下の点を確認してください。

1.  初回起動時にオンボーディング画面が表示されること。
2.  スワイプで画面を切り替えられること。
3.  「次へ」「スキップ」「完了」ボタンが正しく動作し、メイン画面に遷移すること。
4.  一度オンボーディングを完了したら、次回の起動時からは表示されないこと。

以上でオンボーディング機能の移植は完了です。 Happy Coding! 🎉
