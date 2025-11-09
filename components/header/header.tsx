import { Box, Image, HStack, Heading, Text, View } from "@gluestack-ui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "expo-router";

type HeaderProps = {
    title: string;
};

const Header = ({ title }: HeaderProps) => {
    const navigation = useNavigation();
    return (
        <Box bg="#F8FEFF" px="$4" py="$2">
            <HStack justifyContent="space-between" alignItems="center">
                <View>
                    <Heading size="md" mb="$0">{title}</Heading>
                    <Text size="sm" mt="$0">Monitoring Pompa</Text>
                </View>

                <HStack>
                    <Ionicons name="notifications-outline" size={24} color="black" />
                </HStack>
            </HStack>
        </Box>
    )
}

export default Header;