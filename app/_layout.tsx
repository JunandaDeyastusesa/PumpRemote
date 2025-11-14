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
          <Stack.Screen name="(sub-menu)/add-pompa" options={{ title: "Tambah Data Pompa" }} />
          <Stack.Screen name="(sub-menu)/update-profile" options={{ title: "Update Profile" }} />
          <Stack.Screen name="(sub-menu)/update-pompa" options={{ title: "Update Pompa" }} />
        </Stack>
    </GluestackUIProvider>
  );
};

export default StackLayout;