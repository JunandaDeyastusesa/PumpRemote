import { Header } from "../../components/header";
import { Box, Image, HStack, Heading, Text, Center } from "@gluestack-ui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";

const HistoryTanah = () => {
    return (
        <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
            <Center flex={1}>
                <Heading>Halaman History Kelembapan Tanah</Heading>
            </Center>
        </SafeAreaView>
    )
}

export default HistoryTanah;
