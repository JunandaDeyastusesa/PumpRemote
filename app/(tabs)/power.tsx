import React, { useState } from 'react';
import { Header } from "../../components/header";
import {
    Box,
    HStack,
    Heading,
    Text,
    Center,
    VStack,
    ScrollView,
    Pressable
} from "@gluestack-ui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from 'expo-router';

// Component untuk Info Card
const InfoCard = ({ title, value }) => (
    <Box bg="$blue50" p="$4" borderRadius="$lg" flex={1} mx="$1">
        <Text fontSize="$sm" color="$textLight600">{title}</Text>
        <Text fontSize="$xl" fontWeight="$bold" mt="$1">{value}</Text>
    </Box>
);

// Component untuk Power Button
const PowerButton = ({ isPowerOn, onPress, startTime }) => (
    <Box bg="$blue50" borderRadius="$2xl" p="$6" alignItems="center" my="$4">
        <Heading size="xl" mb="$2">
            {isPowerOn ? 'Power ON' : 'Power OFF'}
        </Heading>
        <Text fontSize="$sm" color="$textLight600" mb="$4">
            {startTime ? `Start ${startTime}` : 'Tidak Aktif'}
        </Text>

        <Pressable onPress={onPress}>
            <Center
                w={80}
                h={80}
                borderRadius="$xl"
                bg={isPowerOn ? "$green600" : "$red600"}
            >
                <Ionicons
                    name="power"
                    size={40}
                    color="white"
                />
            </Center>
        </Pressable>
    </Box>
);

// Component untuk Pump History Card
const PumpHistoryCard = ({ item }) => (
    <Box bg="$blue100" borderRadius="$xl" p="$3">
        <HStack space="md">
            <VStack
                borderRightWidth={2}
                borderRightColor="$blue300"
                borderStyle="dashed"
                pr="$4"
                justifyContent="center"
                alignItems="center"
                minWidth={60}
            >
                <Text fontSize="$2xl" fontWeight="$bold">{item.sumTime}</Text>
                <Text fontSize="$sm">Jam</Text>
            </VStack>

            <VStack flex={1} justifyContent="space-between" pl="$2">
                <HStack justifyContent="center" alignItems="center">
                    <VStack flex={1} justifyContent="center">
                        <Text fontSize="$md" fontWeight="$bold" mb="$1">
                            {item.title}
                        </Text>
                        <Text fontSize="$sm" color="$textLight600">
                            {item.time} WIB
                        </Text>
                    </VStack>
                    <Text fontSize="$md" fontWeight="$semibold">
                        {item.sumEnergy} Kwh
                    </Text>
                </HStack>
            </VStack>
        </HStack>
    </Box>
);

const Power = () => {
    const router = useRouter();

    // State Management
    const [isPowerOn, setIsPowerOn] = useState(true);
    const [infoItems] = useState([
        { title: 'Level Drum', value: '30' },
        { title: 'Pompa Nyala', value: '30' },
        { title: 'Energi terpakai', value: '350' }
    ]);

    const [pumpHistory] = useState([
        { title: 'Pompa Inoto A', time: '13.00 - 20.00', sumTime: '5', sumEnergy: '320' },
        { title: 'Pompa Inoto B', time: '14.00 - 18.00', sumTime: '4', sumEnergy: '256' },
        { title: 'Pompa Inoto C', time: '08.00 - 15.00', sumTime: '7', sumEnergy: '448' },
        { title: 'Pompa Inoto A', time: '09.00 - 12.00', sumTime: '3', sumEnergy: '192' },
        { title: 'Pompa Inoto B', time: '15.00 - 21.00', sumTime: '6', sumEnergy: '384' },
        { title: 'Pompa Inoto C', time: '10.00 - 16.00', sumTime: '6', sumEnergy: '384' }
    ]);

    const [daftarPompa] = useState([
        { title: 'Pompa Inoto A', value: '3KWH, 4HP, 380V' },
        { title: 'Pompa Inoto B', value: '3KWH, 4HP, 380V' },
        { title: 'Pompa Inoto C', value: '3KWH, 4HP, 380V' },
        { title: 'Pompa Inoto D', value: '3KWH, 4HP, 380V' },
        { title: 'Pompa Inoto E', value: '3KWH, 4HP, 380V' },
        { title: 'Pompa Inoto F', value: '3KWH, 4HP, 380V' },
        { title: 'Pompa Inoto G', value: '3KWH, 4HP, 380V' },
    ]);

    // Handlers
    const handlePowerToggle = () => {
        setIsPowerOn(!isPowerOn);
    };

    const handleNotification = () => {
        router.push('/notification');
    };

    const handlePompaPress = (pompa) => {
        console.log('Pompa dipilih:', pompa.title);
        // Tambahkan navigasi atau action lainnya
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#F8FEFF' }}>
            <Header title="Monitoring Pompa" />

            <ScrollView showsVerticalScrollIndicator={false}>
                <Box px="$5" py="$4">
                    {/* Power Control */}
                    <PowerButton
                        isPowerOn={isPowerOn}
                        onPress={handlePowerToggle}
                        startTime="12 Jan 2025 | 12.00 WIB"
                    />

                    {/* Pump History Section */}
                    <VStack space="md" mt="$6">
                        <Heading size="lg">Riwayat Pompa</Heading>
                        <Text fontSize="$sm" color="$textLight600">12 Jan 2025</Text>

                        {pumpHistory.map((item, index) => (
                            <PumpHistoryCard key={index} item={item} />
                        ))}
                    </VStack>
                </Box>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Power;