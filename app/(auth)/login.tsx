import React, { useState, useEffect } from "react";
import { Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import {
  Box,
  Button,
  ButtonText,
  HStack,
  Input,
  InputField,
  InputIcon,
  InputSlot,
  Pressable,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { Lock, Mail } from "lucide-react-native";

// API Configuration
const API_BASE_URL = "http://100.64.57.66:9876";

/* =====================
   Input Custom
===================== */
const InputCustom = ({
  icon,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  autoCapitalize,
}) => (
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
    />
  </Input>
);

/* =====================
   Login Screen
===================== */
const LoginScreen = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  /* =====================
     Check existing token on mount
  ===================== */
  useEffect(() => {
    checkExistingToken();
  }, []);

  const checkExistingToken = async () => {
    try {
      const token = await AsyncStorage.getItem("Authorization");
      console.log("🔍 Checking existing token:", token ? "Found" : "Not found");

      if (token) {
        // Optional: verify token with server
        try {
          const res = await fetch(`${API_BASE_URL}/memberships/me`, {
            headers: { Authorization: token },
          });

          if (res.ok) {
            console.log("✅ Token valid, navigating to home...");
            router.replace("/(tabs)/home");
            return;
          } else {
            console.log("❌ Token invalid, removing...");
            await AsyncStorage.removeItem("Authorization");
          }
        } catch (err) {
          console.warn("⚠️ Could not verify token:", err.message);
        }
      }

      setIsCheckingAuth(false);
    } catch (error) {
      console.error("❌ Error checking token:", error);
      setIsCheckingAuth(false);
    }
  };

  /* =====================
     Handler Login
  ===================== */
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Email dan password wajib diisi");
      return;
    }

    setIsLoading(true);

    try {
      console.log("=".repeat(50));
      console.log("LOGIN START");
      console.log("API URL:", `${API_BASE_URL}/memberships/login`);
      console.log("Email:", email);
      console.log("=".repeat(50));

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);

      const response = await fetch(`${API_BASE_URL}/memberships/login`, {
        method: "POST",
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      clearTimeout(timeoutId);

      const data = await response.json();

      if (!response.ok) {
        Alert.alert(
          "Login Gagal",
          data.message || data.error || "Email atau password salah"
        );
        return;
      }

      if (!data.accessToken) {
        Alert.alert("Error", "Token tidak ditemukan dalam response");
        return;
      }

      console.log("✅ ACCESS TOKEN:", data.accessToken.substring(0, 20) + "...");
      await AsyncStorage.setItem("Authorization", data.accessToken);
      console.log("TOKEN SAVED TO ASYNC STORAGE");

      router.replace("/(tabs)/home");
    } catch (error: any) {
      console.log("=".repeat(50));
      console.log("LOGIN ERROR", error.message);
      console.log("=".repeat(50));

      if (error.name === "AbortError") {
        Alert.alert(
          "Request Timeout",
          "Server tidak merespons dalam 30 detik.\nPastikan server berjalan dan bisa diakses."
        );
      } else if (error.message?.includes("Network request failed")) {
        Alert.alert(
          "Koneksi Gagal",
          `Tidak dapat terhubung ke server.\nPastikan server berjalan, Tailscale terkoneksi, dan device bisa mengakses ${API_BASE_URL}`
        );
      } else if (error.message?.includes("JSON")) {
        Alert.alert("Error", "Response dari server tidak valid (bukan JSON)");
      } else {
        Alert.alert("Error", error.message || "Terjadi kesalahan tidak diketahui");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleNavigateToRegister = () => router.push("/(auth)/register");
  const handleForgotPassword = () => Alert.alert("Info", "Fitur Lupa Password segera hadir!");

  /* =====================
     Loading Screen saat cek token
  ===================== */
  if (isCheckingAuth) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
        <Box flex={1} justifyContent="center" alignItems="center">
          <Text fontSize="$lg" color="#4A6EFF">
            Memeriksa autentikasi...
          </Text>
        </Box>
      </SafeAreaView>
    );
  }

  /* =====================
     Render Login Form
  ===================== */
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <Box flex={1} px="$6" pt="$16">
        <VStack space="4xl">
          <VStack space="xs">
            <Text fontSize="$4xl" fontWeight="$bold">Hey,</Text>
            <Text fontSize="$4xl" fontWeight="$bold">Welcome</Text>
            <Text fontSize="$4xl" fontWeight="$bold">Back</Text>
          </VStack>

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

            <HStack justifyContent="space-between">
              <Pressable onPress={handleNavigateToRegister}>
                <Text fontSize="$xs">Belum Punya Akun?</Text>
              </Pressable>
              <Pressable onPress={handleForgotPassword}>
                <Text fontSize="$xs">Lupa Password?</Text>
              </Pressable>
            </HStack>
          </VStack>

          <Button
            size="lg"
            bg="#4A6EFF"
            h="$12"
            borderRadius="$lg"
            mt="$250"
            onPress={handleLogin}
            isDisabled={isLoading || !email || !password}
          >
            <ButtonText>
              {isLoading ? "Loading..." : "Masuk"}
            </ButtonText>
          </Button>
        </VStack>
      </Box>
    </SafeAreaView>
  );
};

export default LoginScreen;
