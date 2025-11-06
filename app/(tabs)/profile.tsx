import { Header } from "../../components/header";
import { Box, Image, HStack, Heading, Text, Center } from "@gluestack-ui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";

const Profile = () => {
    return (
        <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
            <Header title="Profile" />

            <Center flex={1}>
                <Heading>Halaman Profile</Heading>
            </Center>
        </SafeAreaView>
    )
}

export default Profile;