import { Header } from "../../components/header";
import { Box, Image, HStack, Heading, Text, Center } from "@gluestack-ui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";

const Power = () => {
    return (
        <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
            <Header title="Power" />

            <Center flex={1}>
                <Heading>Halaman Power</Heading>
            </Center>
        </SafeAreaView>
    )
}

export default Power;