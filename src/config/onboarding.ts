/**
 * オンボーディング画面の設定
 */
export const onboardingScreens = [
  {
    title: "アプリへようこそ",
    subtitle: "簡単に記録を始めましょう",
    description: "このアプリで、あなたの日常を簡単に記録できます。",
    iconName: "add-circle",
    iconColor: "#2563eb",
    backgroundColor: "#ffffff",
    textColor: "#1f2937",
  },
  {
    title: "簡単操作",
    subtitle: "直感的なインターフェース",
    description: "シンプルで分かりやすい操作で、誰でも簡単に使えます。",
    iconName: "touch-app",
    iconColor: "#10b981",
    backgroundColor: "#ffffff",
    textColor: "#1f2937",
  },
  {
    title: "準備完了",
    subtitle: "さあ、始めましょう",
    description: "これで準備は完了です。あなたの記録を始めてみましょう。",
    iconName: "check-circle",
    iconColor: "#f59e0b",
    backgroundColor: "#ffffff",
    textColor: "#1f2937",
  },
];

/**
 * オンボーディング画面の型定義
 */
export interface OnboardingScreen {
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  iconColor: string;
  backgroundColor: string;
  textColor: string;
}
