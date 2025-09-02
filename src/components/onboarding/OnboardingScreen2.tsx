import { MaterialIcons } from "@expo/vector-icons";

import { Text, View } from "react-native";
import { NextButton, SkipButton } from "./ui";

interface OnboardingScreen2Props {
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  iconColor: string;
  backgroundColor: string;
  textColor: string;
  onNext?: () => void;
  onSkip?: () => void;
}

export const OnboardingScreen2: React.FC<OnboardingScreen2Props> = ({
  title,
  subtitle,
  description,
  iconName,
  iconColor,
  backgroundColor,
  textColor,
  onNext,
  onSkip,
}) => {
  return (
    <View
      className="flex-1 justify-center items-center px-8"
      style={{ backgroundColor }}
      accessibilityRole="tab"
      accessibilityLabel="オンボーディング画面2"
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
            accessibilityLabel="操作アイコン"
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

        {/* 次へボタン */}
        <NextButton onNext={onNext} buttonColor="#16A34A" />
      </View>
    </View>
  );
};
