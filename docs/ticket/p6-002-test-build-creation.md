### 基本情報

**タイトル**: サンドボックス テスト用ビルドの作成

### 概要

`docs/sandbox-testing-guide.md` に従ってサンドボックス課金テストを行うため、EAS を使用して TestFlight (iOS) および内部テストトラック (Android) に配布可能なビルドを作成します。

### 要件

- [ ] iOS TestFlight 配布用のビルドを作成する
- [ ] Android 内部テストトラック配布用のビルドを作成する

### 技術仕様

**技術スタック**: Expo, EAS
**ファイル**: `eas.json`
**API**: -

### 実装手順

1.  `eas.json` を開き、ビルドプロファイルを確認・設定する。`production` プロファイル（またはテスト専用のプロファイル）が、ストアにアップロード可能な設定になっていることを確認します。
2.  **iOS ビルドの作成と TestFlight へのアップロード**:
    - `eas build --profile production --platform ios` を実行します。
    - EAS が Apple Developer アカウントに接続し、ビルドと署名、App Store Connect へのアップロードを自動的に行います。
    - アップロード完了後、App Store Connect の TestFlight セクションでビルドを有効化し、テストユーザーに配布します。
3.  **Android ビルドの作成と内部テストトラックへのアップロード**:
    - `eas build --profile production --platform android` を実行します。
    - EAS が Google Play Console の認証情報（サービスアカウントキー）を使用して、ビルドと署名、内部テストトラックへのアップロードを自動的に行います。
    - アップロード完了後、Google Play Console の内部テストページでリリースを有効化し、テストユーザーに配布します。
4.  ビルド完了後、各ストアのコンソールからテストユーザーにアプリを配布し、インストールできることを確認します。

### テスト項目

- [ ] EAS のビルドプロセスがエラーなく完了すること
- [ ] ビルドされたアプリが App Store Connect および Google Play Console に正しくアップロードされること
- [ ] TestFlight / 内部テストトラック経由で、アプリがテストデバイスにインストールできること
- [ ] インストールしたアプリが正常に起動し、課金画面が表示されること

### 完了条件

- [ ] iOS と Android のテストビルドが作成され、各ストアのテスト用プラットフォーム経由でデバイスに配布・実行できること

### 注意事項

- EAS によるストアへの自動アップロードには、事前の設定（Apple Developer Program の API キーや Google Play のサービスアカウント設定など）が必要です。
- `eas.json` の設定は、お使いのビルド環境に合わせて調整してください。

### 関連チケット

- P1-002-product-setup
- P6-001-eas-cli-setup
- docs/sandbox-testing-guide.md
