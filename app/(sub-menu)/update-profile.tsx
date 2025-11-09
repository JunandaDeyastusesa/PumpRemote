import { useState } from "react";
import { Header } from "../../components/header";
import {
  Box,
  Image,
  HStack,
  Heading,
  Text,
  Center,
  VStack,
  Input,
  InputField,
  InputSlot,
  InputIcon,
  Button,
  ButtonText,
  Pressable,
} from "@gluestack-ui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";

interface ProfileInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  icon: keyof typeof Ionicons.glyphMap;
  placeholder?: string;
  secureTextEntry?: boolean;
}

const ProfileInput = ({
  label,
  value,
  onChangeText,
  icon,
  placeholder,
  secureTextEntry = false,
}: ProfileInputProps) => {
  return (
    <VStack space="xs" w="$full">
      <Text fontSize="$sm" color="$textLight600">
        {label}
      </Text>
      <Input
        variant="outline"
        size="lg"
        bg="$blue50"
        borderWidth={0}
        borderRadius="$xl"
      >
        <InputSlot pl="$3">
          <InputIcon as={Ionicons} name={icon} size={20} color="#6B7280" />
        </InputSlot>
        <InputField
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          color="$textLight800"
        />
      </Input>
    </VStack>
  );
};

const UpdateProfile = () => {
  const [namaLengkap, setNamaLengkap] = useState("Junanda Deyastusesa");
  const [username, setUsername] = useState("Juna");
  const [email, setEmail] = useState("junanda@gmail.com");
  const [password, setPassword] = useState("••••••••••");

  const handleSave = () => {
    // Logic untuk menyimpan data profile
    console.log({
      namaLengkap,
      username,
      email,
      password,
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }} edges={["bottom"]}>
      <VStack flex={1} px="$5" pt="$4">
        {/* Header */}
        <HStack justifyContent="space-between" alignItems="center" mb="$6">
          <VStack>
            <Heading size="xl" color="$textLight900">
              Update Profile
            </Heading>
            <Text fontSize="$sm" color="$textLight600">
              Monitoring Pompa
            </Text>
          </VStack>
          <Pressable>
            <Ionicons name="notifications-outline" size={24} color="#000" />
          </Pressable>
        </HStack>

        {/* Profile Avatar */}
        <Center mb="$8">
          <Box
            w={120}
            h={120}
            borderRadius="$3xl"
            bg="$blue500"
            justifyContent="center"
            alignItems="center"
          >
            <Ionicons name="person" size={60} color="#FFFFFF" />
          </Box>
        </Center>

        {/* Form Inputs */}
        <VStack space="lg" flex={1}>
          <ProfileInput
            label="Nama Lengkap"
            value={namaLengkap}
            onChangeText={setNamaLengkap}
            icon="person"
            placeholder="Masukkan nama lengkap"
          />

          <ProfileInput
            label="Username"
            value={username}
            onChangeText={setUsername}
            icon="person-circle-outline"
            placeholder="Masukkan username"
          />

          <ProfileInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            icon="mail"
            placeholder="Masukkan email"
          />

          <ProfileInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            icon="lock-closed"
            placeholder="Masukkan password"
            secureTextEntry={true}
          />
        </VStack>

        {/* Save Button */}
        <Button
          size="lg"
          bg="$blue500"
          borderRadius="$xl"
          mb="$4"
          mt="$6"
          onPress={handleSave}
          $active-bg="$blue600"
        >
          <ButtonText fontSize="$md" fontWeight="$semibold">
            Simpan
          </ButtonText>
        </Button>
      </VStack>
    </SafeAreaView>
  );
};

export default UpdateProfile;