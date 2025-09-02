### 基本情報

**タイトル**: UI とロジックの分離

### 概要

ペイウォール機能の保守性と再利用性を高めるため、UI コンポーネントと状態管理・購入ロジックを分離します。

### 要件

- [ ] UI コンポーネントを`src/components/paywall/`に配置する
- [ ] 状態管理・購入ロジックをカスタムフックとして`src/hooks/paywall/`に抽出する
- [ ] UI コンポーネントはロジックを意識せず、props を受け取って表示することに専念する

### 技術仕様

**技術スタック**: React Native, React Hooks
**ファイル**: `src/components/paywall/*`, `src/hooks/paywall/*`
**API**: -

### 実装手順

1. `src/hooks/paywall/` ディレクトリを作成する。
2. `usePaywall.ts` などのカスタムフックを作成する。
3. `PaywallScreen.tsx` 内にある、RevenueCat との通信（Offerings 取得、購入処理など）や状態管理（選択プラン、ロード状態など）のロジックを `usePaywall.ts` に移動する。
4. `PaywallScreen.tsx` は `usePaywall` フックを呼び出し、返り値（プラン一覧、購入関数、状態など）を UI の表示に利用する。
5. この分離は `react-native-purchases-ui` を利用しない場合に特に重要です。

### テスト項目

- [ ] ロジック分離後もペイウォールが正常に機能すること
- [ ] UI コンポーネントがステートレスに近くなっていること

### 完了条件

- [ ] ペイウォールの UI とビジネスロジックが明確に分離されていること

### 注意事項

カスタムフックは、ペイウォールに関連する状態と、その状態を更新するための関数を返すように設計します。

### 関連チケット

- P2-001-paywall-ui-design
- P2-002-dynamic-plan-display
