import { Text, TouchableOpacity } from "react-native";

interface SkipButtonProps {
  onSkip?: () => void;
  textColor?: string;
}

export const SkipButton: React.FC<SkipButtonProps> = ({
  onSkip,
  textColor = "#6B7280", // デフォルトのグレー色
}) => {
  const handleSkip = () => {
    if (onSkip) {
      onSkip();
    }
  };

  return (
    <TouchableOpacity
      className="absolute top-16 right-6 z-10"
      onPress={handleSkip}
      accessibilityRole="button"
      accessibilityLabel="スキップ"
    >
      <Text className="text-base font-medium" style={{ color: textColor }}>
        スキップ
      </Text>
    </TouchableOpacity>
  );
};
