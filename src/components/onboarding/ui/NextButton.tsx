import { Text, TouchableOpacity, View } from "react-native";

interface NextButtonProps {
  onNext?: () => void;
  buttonColor?: string;
  textColor?: string;
  text?: string;
}

export const NextButton: React.FC<NextButtonProps> = ({
  onNext,
  buttonColor = "#2563EB", // デフォルトのブルー色
  textColor = "#FFFFFF", // デフォルトの白色
  text = "次へ",
}) => {
  const handleNext = () => {
    if (onNext) {
      onNext();
    }
  };

  return (
    <View className="opacity-100">
      <TouchableOpacity
        className="px-8 py-4 rounded-full"
        style={{ backgroundColor: buttonColor }}
        onPress={handleNext}
        accessibilityRole="button"
        accessibilityLabel={text}
      >
        <Text className="text-lg font-semibold" style={{ color: textColor }}>
          {text}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
