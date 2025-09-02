export const REVENUECAT_CONFIG = {
  // RevenueCat API Key (本番環境と開発環境で異なる)
  apiKey: {
    // RevenueCat ダッシュボードから取得
    ios: process.env.EXPO_PUBLIC_REVENUECAT_IOS_API_KEY as string,
    android: process.env.EXPO_PUBLIC_REVENUECAT_ANDROID_API_KEY as string,
  },

  // プロダクトID (App Store Connect と Google Play Console で設定)
  products: {
    // サブスクリプション
    weekly: "weekly_premium_subscription_demo",
    monthly: "monthly_premium_subscription_demo",
    yearly: "yearly_premium_subscription_demo",

    // 買い切りプロダクト
    lifetime: "lifetime_premium_access_demo",
  },

  // Entitlements (アクセス権)
  entitlements: {
    premium: "premium_access",
  },

  // Offerings (オファリング)
  offerings: {
    default: "default_offering",
  },

  // Packages (パッケージ)
  packages: {
    weekly: "weekly_package",
    monthly: "monthly_package",
    yearly: "yearly_package",
    lifetime: "lifetime_package",
  },
} as const;

export type ProductId =
  (typeof REVENUECAT_CONFIG.products)[keyof typeof REVENUECAT_CONFIG.products];
export type EntitlementId =
  (typeof REVENUECAT_CONFIG.entitlements)[keyof typeof REVENUECAT_CONFIG.entitlements];
export type OfferingId =
  (typeof REVENUECAT_CONFIG.offerings)[keyof typeof REVENUECAT_CONFIG.offerings];
export type PackageId =
  (typeof REVENUECAT_CONFIG.packages)[keyof typeof REVENUECAT_CONFIG.packages];
