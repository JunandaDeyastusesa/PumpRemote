import { Box, Button, ButtonText, HStack, Input, InputField, InputIcon, InputSlot, Pressable, Text, VStack, } from "@gluestack-ui/themed";
import { useRouter } from "expo-router";
import { Lock, Mail } from "lucide-react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

// Input Component dengan Props
const InputCustom = ({ icon, placeholder, value, onChangeText, secureTextEntry, autoCapitalize,}) => (
  <Input
    variant="outline"
    size="lg"
    borderColor="transparent"
    borderRadius="$lg"
    h="$12"
    backgroundColor="#CAD5FF80"
  >
    <InputSlot pl="$4">
      <InputIcon as={icon} color="#34427C" size="sm" />
    </InputSlot>

    <InputField
      placeholder={placeholder}
      placeholderTextColor="#34427C"
      color="#34427C"
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      autoCapitalize={autoCapitalize}
      fontFamily="Poppins-Regular"
    />
  </Input>
);

// Login Screen dengan State dan Navigation
const LoginScreen = () => {
  const router = useRouter();

  // State Management
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Handler untuk Login
  const handleLogin = () => {
    if (!email || !password) return;

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      // Navigate ke Screen Home
      router.replace("/(tabs)/home");
    }, 1000);
  };

  // Handler untuk navigasi ke Register
  const handleNavigateToRegister = () => {
    router.push("/(auth)/register");
  };

  const handleForgotPassword = () => {
    alert("Fitur Lupa Password akan segera hadir!");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <Box flex={1} bg="$white" px="$6" pt="$16">
        <VStack space="4xl">
          {/* Header */}
          <VStack space="xs">
            {["Hey,", "Welcome", "Back"].map((text, index) => (
              <Text
                key={index}
                fontSize="$4xl"
                color="$black"
                fontWeight="$bold"
                lineHeight="$4xl"
                fontFamily="Poppins-Bold"
              >
                {text}
              </Text>
            ))}
          </VStack>

          {/* Form dengan State */}
          <VStack space="md">
            <InputCustom
              icon={Mail}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
            />

            <InputCustom
              icon={Lock}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            {/* Links dengan Navigation */}
            <HStack justifyContent="space-between" mt="$1">
              <Pressable onPress={handleNavigateToRegister}>
                <Text
                  fontSize="$xs"
                  color="$trueGray500"
                  fontFamily="Poppins-Regular"
                >
                  Belum Punya Akun?
                </Text>
              </Pressable>
              <Pressable onPress={handleForgotPassword}>
                <Text
                  fontSize="$xs"
                  color="$trueGray500"
                  fontFamily="Poppins-Regular"
                >
                  Lupa Password?
                </Text>
              </Pressable>
            </HStack>
          </VStack>

          {/* Login Button dengan Interaction */}
          <Button
            size="lg"
            bg="#4A6EFF"
            borderRadius="$lg"
            h="$12"
            onPress={handleLogin}
            isDisabled={isLoading || !email || !password}
          >
            <ButtonText
              fontWeight="$semibold"
              fontSize="$md"
              fontFamily="Poppins-SemiBold"
            >
              {isLoading ? "Loading..." : "→ Masuk"}
            </ButtonText>
          </Button>
        </VStack>
      </Box>
    </SafeAreaView>
  );
};

export default LoginScreen;
