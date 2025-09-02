### 基本情報

**タイトル**: EAS CLI のインストールと設定

### 概要

Expo の課金機能をテストするために必要な EAS (Expo Application Services) CLI をセットアップします。

### 要件

- [ ] EAS CLI をグローバルにインストールする
- [ ] Expo アカウントにログインする
- [ ] プロジェクトの EAS ビルドを設定する

### 技術仕様

**技術スタック**: Expo, EAS
**ファイル**: `eas.json`
**API**: -

### 実装手順

1. ターミナルで `bun install -g eas-cli` を実行し、EAS CLI をインストールする。
2. `eas login` を実行し、Expo アカウントの認証情報を入力してログインする。
3. `eas build:configure` を実行し、プロジェクトの `eas.json` ファイルを生成・設定する。このプロセスで、iOS のバンドル ID や Android のパッケージ名などが設定される。

### テスト項目

- [ ] `eas --version` でバージョンが表示されること
- [ ] `eas whoami` で自分の Expo アカウント名が表示されること
- [ ] プロジェクトルートに `eas.json` ファイルが作成されていること

### 完了条件

- [ ] EAS CLI がインストールされ、プロジェクトが EAS ビルドを実行できる状態になっていること

### 注意事項

EAS の利用には Expo アカウントが必要です。未作成の場合は、[Expo の公式サイト](https://expo.dev/)でサインアップしてください。

### 関連チケット

- P6-002-test-build-creation
