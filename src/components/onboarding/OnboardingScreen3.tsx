import { MaterialIcons } from "@expo/vector-icons";

import { Text, View } from "react-native";
import { NextButton, SkipButton } from "./ui";

interface OnboardingScreen3Props {
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  iconColor: string;
  backgroundColor: string;
  textColor: string;
  onComplete?: () => void;
  onSkip?: () => void;
}

export const OnboardingScreen3: React.FC<OnboardingScreen3Props> = ({
  title,
  subtitle,
  description,
  iconName,
  iconColor,
  backgroundColor,
  textColor,
  onComplete,
  onSkip,
}) => {
  return (
    <View
      className="flex-1 justify-center items-center px-8"
      style={{ backgroundColor }}
      accessibilityRole="tab"
      accessibilityLabel="オンボーディング画面3"
    >
      {/* スキップボタン */}
      <SkipButton onSkip={onSkip} textColor={textColor} />

      {/* メインコンテンツ */}
      <View className="flex-1 justify-center items-center">
        {/* アイコン */}
        <View className="mb-8">
          <MaterialIcons
            name={iconName as any}
            size={120}
            color={iconColor}
            accessibilityLabel="完了アイコン"
          />
        </View>

        {/* タイトル */}
        <View className="mb-4">
          <Text
            className="text-3xl font-bold text-center"
            style={{ color: textColor }}
            accessibilityRole="header"
          >
            {title}
          </Text>
        </View>

        {/* サブタイトル */}
        <View className="mb-6">
          <Text
            className="text-xl font-semibold text-center"
            style={{ color: textColor }}
          >
            {subtitle}
          </Text>
        </View>

        {/* 説明文 */}
        <View className="mb-12">
          <Text
            className="text-base text-center leading-6 px-4"
            style={{ color: textColor }}
          >
            {description}
          </Text>
        </View>

        {/* 完了ボタン */}
        <NextButton onNext={onComplete} buttonColor="#F97316" text="完了" />
      </View>
    </View>
  );
};
