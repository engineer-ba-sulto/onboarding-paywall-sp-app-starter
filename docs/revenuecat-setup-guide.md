# RevenueCat プロダクト設定ガイド

## 概要

このドキュメントは、チケット P1-002 の要件に従って、App Store Connect、Google Play Console、RevenueCat でのプロダクト設定手順を説明します。

## 1. App Store Connect での設定

### 1.1 サブスクリプションの設定

1. [App Store Connect](https://appstoreconnect.apple.com/) にサインイン
2. 対象アプリ「onboarding-paywall-sp-app-starter」を選択
3. 「App 内課金」セクションに移動
4. 「+」ボタンをクリックして新しいサブスクリプションを作成

#### 週額サブスクリプション

- **参照名**: Weekly Premium Subscription
- **プロダクト ID**: `weekly_premium_subscription`
- **サブスクリプション期間**: 1 週間
- **価格**: 設定に応じて決定

#### 月額サブスクリプション

- **参照名**: Monthly Premium Subscription
- **プロダクト ID**: `monthly_premium_subscription`
- **サブスクリプション期間**: 1 ヶ月
- **価格**: 設定に応じて決定

#### 年額サブスクリプション

- **参照名**: Yearly Premium Subscription
- **プロダクト ID**: `yearly_premium_subscription`
- **サブスクリプション期間**: 1 年
- **価格**: 設定に応じて決定

### 1.2 買い切りプロダクトの設定

#### ライフタイムアクセス

- **参照名**: Lifetime Premium Access
- **プロダクト ID**: `lifetime_premium_access`
- **タイプ**: 非消耗型
- **価格**: 設定に応じて決定

## 2. Google Play Console での設定

### 2.1 サブスクリプションの設定

1. [Google Play Console](https://play.google.com/console/) にサインイン
2. 対象アプリ「onboarding-paywall-sp-app-starter」を選択
3. 「商品」→「サブスクリプション」セクションに移動
4. 「サブスクリプションを作成」をクリック

#### 週額サブスクリプション

- **商品名**: Weekly Premium Subscription
- **商品 ID**: `weekly_premium_subscription`
- **請求期間**: 1 週間
- **価格**: 設定に応じて決定

#### 月額サブスクリプション

- **商品名**: Monthly Premium Subscription
- **商品 ID**: `monthly_premium_subscription`
- **請求期間**: 1 ヶ月
- **価格**: 設定に応じて決定

#### 年額サブスクリプション

- **商品名**: Yearly Premium Subscription
- **商品 ID**: `yearly_premium_subscription`
- **請求期間**: 1 年
- **価格**: 設定に応じて決定

### 2.2 アプリ内プロダクトの設定

#### ライフタイムアクセス

- **商品名**: Lifetime Premium Access
- **商品 ID**: `lifetime_premium_access`
- **商品タイプ**: アプリ内プロダクト
- **価格**: 設定に応じて決定

## 3. RevenueCat ダッシュボードでの設定

### 3.1 プロダクトの同期

1. [RevenueCat ダッシュボード](https://app.revenuecat.com/) にサインイン
2. 対象プロジェクトを選択
3. 「Products」メニューに移動
4. 「Add Product」をクリックして各プロダクトを追加

#### 追加するプロダクト

- `weekly_premium_subscription`
- `monthly_premium_subscription`
- `yearly_premium_subscription`
- `lifetime_premium_access`

### 3.2 Entitlements の設定

1. 「Entitlements」メニューに移動
2. 「Add Entitlement」をクリック
3. 以下の設定で Entitlement を作成

#### Premium Access Entitlement

- **Entitlement ID**: `premium_access`
- **Display Name**: Premium Access
- **Description**: プレミアム機能へのアクセス権

### 3.3 Offerings と Packages の設定

1. 「Offerings」メニューに移動
2. 「Add Offering」をクリック
3. 以下の設定で Offering を作成

#### Default Offering

- **Offering ID**: `default_offering`
- **Display Name**: Premium Plans
- **Description**: 利用可能なプレミアムプラン

#### Packages の追加

1. 作成した Offering を選択
2. 「Add Package」をクリックして各パッケージを追加

##### 週額パッケージ

- **Package ID**: `weekly_package`
- **Display Name**: Weekly
- **Product**: `weekly_premium_subscription`
- **Entitlement**: `premium_access`

##### 月額パッケージ

- **Package ID**: `monthly_package`
- **Display Name**: Monthly
- **Product**: `monthly_premium_subscription`
- **Entitlement**: `premium_access`

##### 年額パッケージ

- **Package ID**: `yearly_package`
- **Display Name**: Yearly
- **Product**: `yearly_premium_subscription`
- **Entitlement**: `premium_access`

##### ライフタイムパッケージ

- **Package ID**: `lifetime_package`
- **Display Name**: Lifetime
- **Product**: `lifetime_premium_access`
- **Entitlement**: `premium_access`

## 4. 設定完了後の確認事項

### 4.1 RevenueCat ダッシュボードでの確認

- [ ] 全てのプロダクトが正しく表示されている
- [ ] Entitlement がプロダクトに紐づいている
- [ ] Offering と Package が正しく構成されている

### 4.2 プロダクト ID の統一性確認

- [ ] App Store Connect と Google Play Console のプロダクト ID が一致している
- [ ] RevenueCat でのマッピングが正しく設定されている

## 5. 次のステップ

設定完了後は、以下のチケットに進みます：

- P1-003: SDK 初期化
- P2-002: 動的プラン表示

## 注意事項

- プロダクト ID はプラットフォーム間で統一するか、RevenueCat 側で正しくマッピングする必要があります
- 価格設定は各プラットフォームのガイドラインに従って設定してください
- サブスクリプションの詳細設定（無料期間、紹介価格など）は必要に応じて追加してください
