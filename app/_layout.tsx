import { Stack } from "expo-router";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";

const noHead = { headerShown: false };

const StackLayout = () => {
  return (
    <GluestackUIProvider config={config}>
      <Stack>
        <Stack.Screen name="(tabs)" options={noHead} />
        <Stack.Screen name="modal" options={noHead} />
        <Stack.Screen name="(sub-menu)/history-cuaca" options={{ title: "Riwayat Cuaca" }} />
      </Stack>
    </GluestackUIProvider>
  );
};

export default StackLayout;
