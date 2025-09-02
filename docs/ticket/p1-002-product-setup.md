### 基本情報

**タイトル**: RevenueCat のプロダクト設定

### 概要

App Store Connect と Google Play Console でアプリ内課金プロダクトを設定し、RevenueCat ダッシュボードでそれらを Entitlements, Offerings, Packages として構成します。

### 要件

- [ ] App Store Connect で週額・月額・年額のサブスクリプションを設定する
- [ ] App Store Connect で買い切りプロダクトを設定する
- [ ] Google Play Console で週額・月額・年額のサブスクリプションを設定する
- [ ] Google Play Console で買い切りプロダクトを設定する
- [ ] RevenueCat ダッシュボードで Entitlements を設定する
- [ ] RevenueCat ダッシュボードで Offerings と Packages を設定する

### 技術仕様

**技術スタック**: App Store Connect, Google Play Console, RevenueCat
**ファイル**: -
**API**: -

### 実装手順

1. Apple Developer アカウントで App Store Connect にサインインする。
2. 対象アプリの「App 内課金」セクションで、サブスクリプションと非消耗型プロダクトを作成する。
3. Google Play Console にサインインする。
4. 対象アプリの「商品」セクションで、サブスクリプションとアプリ内プロダクトを作成する。
5. RevenueCat プロジェクトのダッシュボードを開く。
6. `Products`メニューで App Store と Play Store のプロダクト情報を同期または手動で追加する。
7. `Entitlements`メニューで、プレミアムアクセス権などを定義する（例: `premium`）。
8. `Offerings`メニューで、デフォルトのオファリング内に各プロダクトを`Packages`として割り当てる（週額、月額、年額、買い切り）。

### テスト項目

- [ ] RevenueCat のダッシュボードで全てのプロダクトが正しく表示されること
- [ ] Entitlement がプロダクトに紐づいていること
- [ ] Offering と Package が正しく構成されていること

### 完了条件

- [ ] App Store Connect と Google Play Console のプロダクト設定が完了していること
- [ ] RevenueCat での Entitlements, Offerings, Packages の構成が完了していること

### 注意事項

プロダクト ID はプラットフォーム間で統一するか、RevenueCat 側で正しくマッピングする必要があります。

### 関連チケット

- P1-003-sdk-initialization
- P1-006-dynamic-plan-display
