import { useState } from "react";
import {
  Box,
  HStack,
  Heading,
  Text,
  VStack,
  Input,
  InputField,
  Button,
  ButtonText,
  Pressable,
} from "@gluestack-ui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";

interface FormInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  keyboardType?: "default" | "numeric" | "decimal-pad";
}

const FormInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = "default",
}: FormInputProps) => {
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
        <InputField
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          color="$textLight700"
          keyboardType={keyboardType}
        />
      </Input>
    </VStack>
  );
};

const TambahDataPompa = () => {
  const [namaPompa, setNamaPompa] = useState("");
  const [powerKw, setPowerKw] = useState("");
  const [powerHp, setPowerHp] = useState("");
  const [voltage, setVoltage] = useState("");

  const handleSimpan = () => {
    // Logic untuk menyimpan data pompa
    const dataPompa = {
      namaPompa,
      powerKw: parseFloat(powerKw),
      powerHp: parseFloat(powerHp),
      voltage: parseFloat(voltage),
    };
    
    console.log("Data Pompa:", dataPompa);
    
    // Reset form setelah simpan
    setNamaPompa("");
    setPowerKw("");
    setPowerHp("");
    setVoltage("");
  };

  const isFormValid = () => {
    return (
      namaPompa.trim() !== "" &&
      powerKw.trim() !== "" &&
      powerHp.trim() !== "" &&
      voltage.trim() !== ""
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }} edges={["bottom"]}>
      <VStack flex={1} px="$5" pt="$4">

        <VStack space="lg" flex={1}>
          <FormInput
            label="Nama Pompa"
            value={namaPompa}
            onChangeText={setNamaPompa}
            placeholder="Nama Pompa..."
          />

          <FormInput
            label="Power (Kw)"
            value={powerKw}
            onChangeText={setPowerKw}
            placeholder="Jumlah Power Kw..."
            keyboardType="decimal-pad"
          />

          <FormInput
            label="Power (Hp)"
            value={powerHp}
            onChangeText={setPowerHp}
            placeholder="Jumlah Power Hp..."
            keyboardType="decimal-pad"
          />

          <FormInput
            label="Voltage"
            value={voltage}
            onChangeText={setVoltage}
            placeholder="Jumlah Voltage..."
            keyboardType="decimal-pad"
          />
        </VStack>

        {/* Save Button */}
        <Button
          size="lg"
          bg="$blue500"
          borderRadius="$xl"
          mb="$4"
          mt="$6"
          onPress={handleSimpan}
          isDisabled={!isFormValid()}
          $active-bg="$blue600"
          opacity={isFormValid() ? 1 : 0.5}
        >
          <ButtonText fontSize="$md" fontWeight="$semibold">
            Simpan
          </ButtonText>
        </Button>
      </VStack>
    </SafeAreaView>
  );
};

export default TambahDataPompa;