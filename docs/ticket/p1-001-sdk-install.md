### 基本情報

**タイトル**: RevenueCat SDK のインストール

### 概要

課金基盤として RevenueCat SDK をプロジェクトに導入します。UI コンポーネントライブラリも同時にインストールします。

### 要件

- [ ] `react-native-purchases`をインストールする
- [ ] `react-native-purchases-ui`をインストールする

### 技術仕様

**技術スタック**: Expo, RevenueCat
**ファイル**: `package.json`
**API**: -

### 実装手順

1. ターミナルで以下のコマンドを実行する:
   ```bash
   bunx expo install react-native-purchases react-native-purchases-ui
   ```
2. `package.json` にライブラリが追加されたことを確認する。

### テスト項目

- [ ] コマンド実行後、エラーが発生しないこと
- [ ] `package.json` に `react-native-purchases` と `react-native-purchases-ui` が記載されていること

### 完了条件

- [ ] `react-native-purchases` と `react-native-purchases-ui` のインストールが完了していること

### 注意事項

Expo プロジェクトのため、`expo install` を使用することが推奨されます。

### 関連チケット

- P1-003-sdk-initialization
