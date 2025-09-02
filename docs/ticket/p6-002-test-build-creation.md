### 基本情報

**タイトル**: EAS Development Build の作成

### 概要

課金機能のテストを実機やシミュレータで行うため、EAS を使用して開発ビルド（Development Build）を作成します。

### 要件

- [ ] iOS プラットフォーム用の開発ビルドを作成する
- [ ] Android プラットフォーム用の開発ビルドを作成する

### 技術仕様

**技術スタック**: Expo, EAS
**ファイル**: `eas.json`
**API**: -

### 実装手順

1. `eas.json` を開き、`development` プロファイルが正しく設定されていることを確認する。
   - `developmentClient: true` になっている必要がある。
   - `ios.simulator: true` を設定すると、iOS シミュレータ用のビルドが作成できる。
2. iOS の開発ビルドを作成するために、`eas build --profile development --platform ios` を実行する。
3. Android の開発ビルドを作成するために、`eas build --profile development --platform android` を実行する。
4. ビルドが完了すると、EAS のダッシュボードに QR コードが表示される。これを Expo Go アプリやカメラでスキャンすることで、ビルドされたアプリをデバイスにインストールできる。

### テスト項目

- [ ] EAS のビルドプロセスがエラーなく完了すること
- [ ] ビルドされたアプリが実機またはシミュレータにインストールできること
- [ ] インストールした開発ビルドでアプリが正常に起動すること

### 完了条件

- [ ] iOS と Android の開発ビルドが作成され、デバイスで実行できること

### 注意事項

EAS ビルドはクラウド上で行われるため、完了までに時間がかかる場合があります。ビルドプロセス中に Apple Developer Program の認証情報が必要になることがあります。

### 関連チケット

- P1-004-native-setup
- P6-001-eas-cli-setup
