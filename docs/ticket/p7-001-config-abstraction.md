### 基本情報

**タイトル**: 設定の抽象化

### 概要

プロジェクト固有の設定値（API キーやエンタイトルメント ID など）をコードから分離し、設定ファイルや環境変数に集約します。

### 要件

- [ ] RevenueCat の API キー（iOS/Android）を設定ファイルに定義する
- [ ] RevenueCat のエンタイトルメント ID を設定ファイルに定義する
- [ ] コード内のハードコーディングされた設定値を、設定ファイルからの読み込みに置き換える

### 技術仕様

**技術スタック**: TypeScript
**ファイル**: `src/config/revenuecat.ts`, `.env`
**API**: -

### 実装手順

1. `src/config/` ディレクトリに `revenuecat.ts` ファイルを作成する。
2. このファイルに、RevenueCat 関連の設定値をエクスポートするオブジェクトや定数を定義する。
   ```typescript
   export const revenuecatConfig = {
     apiKey: {
       ios: "YOUR_APPLE_API_KEY",
       android: "YOUR_GOOGLE_API_KEY",
     },
     entitlements: {
       premium: "premium",
     },
   };
   ```
3. （推奨）API キーなどの機密情報は、`.env` ファイルに記述し、`expo-constants` などを利用して読み込むようにする。`.env` ファイルは `.gitignore` に追加する。
4. `P1-003-sdk-initialization` や `P5-002-feature-guard` など、設定値をハードコーディングしている箇所を、`revenuecatConfig` から値を参照するように修正する。

### テスト項目

- [ ] 設定ファイルから読み込んだ値を使って SDK が正しく初期化されること
- [ ] 設定ファイルから読み込んだエンタイトルメント ID でアクセス制御が正しく機能すること

### 完了条件

- [ ] プロジェクト固有の設定値がコードベースから分離・集約されていること

### 注意事項

機密情報をバージョン管理に含めないように、`.env` ファイルの取り扱いには注意してください。

### 関連チケット

- P1-003-sdk-initialization
- P5-002-feature-guard
