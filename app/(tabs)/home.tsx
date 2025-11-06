import { Header } from "../../components/header";
import { Box, Image, HStack, Heading, Text, Center } from "@gluestack-ui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";

const Home = () => {
    return (
        <>
            <Header title="Monitoring Pompa" />

            <Center flex={1}>
                <Heading>Halaman Home</Heading>
            </Center>
        </>
    );
};

export default Home;