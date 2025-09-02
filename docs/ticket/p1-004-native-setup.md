### 基本情報

**タイトル**: ネイティブ設定の確認

### 概要

Expo の Development Build プロセスにおいて、`react-native-purchases`が必要とするネイティブ設定が自動的に構成されることを確認します。

### 要件

- [ ] EAS Development Build を作成する
- [ ] ビルドされた iOS アプリで In-App Purchase ケーパビリティが有効になっていることを確認する
- [ ] ビルドされた Android アプリで`com.android.vending.BILLING`権限が付与されていることを確認する

### 技術仕様

**技術スタック**: Expo, EAS, Xcode, Android Studio
**ファイル**: `ios/onboardingpaywallspappstarter.xcodeproj`, `android/app/src/main/AndroidManifest.xml` (確認対象)
**API**: -

### 実装手順

1. EAS CLI を使用して Development Build を作成する (`eas build --profile development`)。
2. ビルドされた iOS アプリ（`.ipa`またはシミュレータビルド）を Xcode で開く。
3. プロジェクト設定の `Signing & Capabilities` タブを開き、`In-App Purchase` が追加されていることを確認する。
4. ビルドされた Android アプリ（`.apk`）を Android Studio で開く。
5. `AndroidManifest.xml` を開き、`<uses-permission android:name="com.android.vending.BILLING" />` の記述があることを確認する。

### テスト項目

- [ ] iOS のケーパビリティに`In-App Purchase`が存在する
- [ ] Android のマニフェストに`BILLING`権限が存在する

### 完了条件

- [ ] `react-native-purchases`に必要なネイティブ設定が自動で構成されていることが確認できること

### 注意事項

Expo の自動設定により、原則として手動での Xcode プロジェクトや`AndroidManifest.xml`の編集は不要です。問題が発生した場合のみ、手動での設定を検討します。

### 関連チケット

- P2-015-eas-development-build
