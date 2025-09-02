### 基本情報

**タイトル**: RevenueCat のプロダクト設定（サンドボックス環境）

### 概要

サンドボックス（テスト）環境でアプリ内課金をテストできるように、App Store Connect と Google Play Console でアプリ内課金プロダクトを設定し、RevenueCat ダッシュボードで構成します。

### 要件

- [ ] App Store Connect でサンドボックス用のプロダクトを設定する
- [ ] Google Play Console でテスト用のプロダクトを設定する
- [ ] RevenueCat ダッシュボードで Entitlements, Offerings, Packages を構成する
- [ ] サンドボックス環境でテスト購入を行うための設定を完了する

### 技術仕様

**技術スタック**: App Store Connect, Google Play Console, RevenueCat
**ファイル**: `src/config/revenuecat.ts`, `docs/revenuecat-setup-guide.md`, `docs/sandbox-testing-guide.md`
**API**: -

### 実装手順

1. `docs/revenuecat-setup-guide.md` に従って、各プラットフォームでプロダクトを作成する。
2. `docs/sandbox-testing-guide.md` に従って、サンドボックス環境のテスト設定を行う。
3. RevenueCat プロジェクトのダッシュボードで、プロダクト情報が正しく同期されていることを確認する。
4. `Entitlements`, `Offerings`, `Packages` の構成を行う。
5. テストビルドを作成し、サンドボックスユーザーでテスト購入が実行できることを確認する。

### テスト項目

- [ ] RevenueCat のデバッグログで、プロダクト情報が正しく取得できていること
- [ ] サンドボックスユーザーでテスト購入が成功すること
- [ ] 購入後、`premium_access` の Entitlement が付与されること

### 完了条件

- [ ] App Store Connect と Google Play Console のプロダクト設定が、サンドボックスでのテスト向けに完了していること
- [ ] RevenueCat での Entitlements, Offerings, Packages の構成が完了していること
- [ ] サンドボックス環境でテスト購入ができる状態になっていること

### 注意事項

- このチケットはアプリのリリースを前提としません。あくまで開発およびテスト環境の構築を目的とします。
- 実際の API キーは `src/config/revenuecat.ts` に設定する必要がありますが、このリポジトリにはコミットしないでください。

### 関連チケット

- P1-003-sdk-initialization
- P4-001-purchase-flow
