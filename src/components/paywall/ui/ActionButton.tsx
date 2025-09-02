import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

interface ActionButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary";
  loading?: boolean;
  disabled?: boolean;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  title,
  onPress,
  variant = "primary",
  loading = false,
  disabled = false,
}) => {
  const baseClasses = "py-4 px-6 rounded-lg items-center justify-center";
  const variantClasses = {
    primary: "bg-blue-600",
    secondary: "bg-gray-200",
  };
  const textClasses = {
    primary: "text-white font-semibold text-base",
    secondary: "text-gray-800 font-semibold text-base",
  };

  return (
    <TouchableOpacity
      className={`${baseClasses} ${variantClasses[variant]} ${
        disabled ? "opacity-50" : ""
      }`}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === "primary" ? "#ffffff" : "#374151"}
          size="small"
        />
      ) : (
        <Text className={textClasses[variant]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};
