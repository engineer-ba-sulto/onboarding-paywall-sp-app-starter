### 基本情報

**タイトル**: 設定の抽象化と環境管理

### 概要

プロジェクト固有の設定値（API キーなど）をコードから分離し、設定ファイルに集約します。将来的に本番環境と開発（サンドボックス）環境を切り替えられるような設計を目指します。

### 要件

- [ ] RevenueCat の API キー（iOS/Android）を設定ファイルに定義する
- [ ] RevenueCat のエンタイトルメント ID やプロダクト ID を設定ファイルに定義する
- [ ] コード内のハードコーディングされた設定値を、設定ファイルからの読み込みに置き換え、一元管理する
- [ ] 機密情報（API キーなど）がバージョン管理に含まれないようにする

### 技術仕様

**技術スタック**: TypeScript, Expo
**ファイル**: `src/config/revenuecat.ts`, `.env.example`
**API**: -

### 実装手順

1.  `src/config/revenuecat.ts` に、RevenueCat 関連のすべての設定値（API キー、Entitlement ID, Product ID, Offering ID, Package ID）を集約する。
    - このファイルは既に `p1-002-product-setup` で作成済みです。
2.  **機密情報の分離**:
    - API キーなどの機密情報は、直接 `revenuecat.ts` に書き込まず、環境変数から読み込むように設計します。
    - Expo プロジェクトでは、ルートディレクトリに `.env` ファイルを作成し、そこにキーを記述するのが一般的です。
      ```.env
      REVENUECAT_IOS_API_KEY="appl_..."
      REVENUECAT_ANDROID_API_KEY="goog_..."
      ```
    - `app.json` (または `app.config.js`) の `extra` フィールドを使って、ビルド時に環境変数をアプリに埋め込みます。
3.  **サンプル環境変数の提供**:
    - プロジェクトのルートに `.env.example` ファイルを作成し、必要な環境変数を記載します。実際のキーは含めず、プレースホルダーを記述します。
      ```.env.example
      REVENUECAT_IOS_API_KEY="YOUR_IOS_API_KEY"
      REVENUECAT_ANDROID_API_KEY="YOUR_ANDROID_API_KEY"
      ```
4.  `.gitignore` ファイルに `.env` を追加し、機密情報が Git リポジトリにコミットされるのを防ぎます。
5.  `P1-003-sdk-initialization` や `P5-002-feature-guard` など、設定値を使用するすべての箇所で、`src/config` 以下の設定ファイルから値を参照するように徹底します。

### テスト項目

- [ ] `.env` ファイルに設定した API キーを使って SDK が正しく初期化されること
- [ ] 設定ファイルから読み込んだエンタイトルメント ID やプロダクト ID で、機能が正しく動作すること
- [ ] `.env` ファイルが存在しない場合でも、アプリがクラッシュせず、警告などが表示されること

### 完了条件

- [ ] プロジェクト固有の設定値がコードベースから完全に分離され、`src/config` と `.env` ファイルで一元管理されていること
- [ ] 機密情報が安全に取り扱われる仕組みが整っていること

### 注意事項

- `.env` ファイルの管理は慎重に行ってください。チームで開発する場合は、安全な方法で API キーを共有する必要があります。
- このボイラープレートでは、まずサンドボックス用のキーを設定することを前提としています。

### 関連チケット

- P1-003-sdk-initialization
- P5-001-status-monitoring
- P5-002-feature-guard
