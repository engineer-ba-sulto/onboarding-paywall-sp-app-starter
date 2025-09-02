### 基本情報

**タイトル**: サーバー連携（Webhook）の実装

### 概要

（任意）RevenueCat Webhooks を利用して、購読イベントを自社サーバーに送信し、ユーザーの購読情報をデータベースで管理します。

### 要件

- [ ] 購読イベントを受け取るためのサーバーサイドエンドポイントを作成する (例: Supabase Edge Functions)
- [ ] RevenueCat ダッシュボードで Webhook を設定し、作成したエンドポイントの URL を指定する
- [ ] エンドポイントで受信したイベントデータを検証し、自社データベースを更新する

### 技術仕様

**技術スタック**: Supabase Edge Functions, RevenueCat Webhooks
**ファイル**: `supabase/functions/revenuecat-webhooks/index.ts`
**API**: -

### 実装手順

1. Supabase プロジェクト内に `revenuecat-webhooks` という名前の Edge Function を作成する。
2. Function 内で、RevenueCat から POST されるリクエストボディをパースするロジックを実装する。
3. （推奨）リクエストヘッダの Authorization トークンを検証し、正当なリクエストであることを確認する。
4. イベントタイプ（`INITIAL_PURCHASE`, `RENEWAL`, `CANCELLATION`など）に応じて、Supabase データベースのユーザーテーブルなどを更新する。
5. Function をデプロイし、取得した URL を RevenueCat ダッシュボードの Webhook 設定ページに入力する。

### テスト項目

- [ ] RevenueCat のダッシュボードからテストイベントを送信し、サーバーで受信できること
- [ ] テスト購入を行い、対応するイベントがサーバーに送信され、データベースが更新されること

### 完了条件

- [ ] RevenueCat からの Webhook イベントに応じて、サーバーサイドのデータベースが更新されること

### 注意事項

このタスクは任意であり、サーバーサイドでの購読管理が不要な場合はスキップできます。セキュリティのため、Webhook エンドポイントの保護は重要です。

### 関連チケット

- -
