import { Box, Text } from "@gluestack-ui/themed";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HumidityHistory() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F8FEFF" }}>
      <Box p="$4">
        <Text>Menampilkan data history kelembapan tanah di sini...</Text>
      </Box>
    </SafeAreaView>
  );
}
