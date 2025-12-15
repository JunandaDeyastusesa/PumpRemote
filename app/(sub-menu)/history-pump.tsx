import {Box, HStack, Heading, Pressable, ScrollView, Text, VStack
} from "@gluestack-ui/themed";
import { Stack, useRouter } from 'expo-router';
import { ChevronLeft } from "lucide-react-native";
import React, { useState } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";

// Component Pump History Card
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

const HistoryPump = () => {
    const router = useRouter();

    const [pumpHistory] = useState([
        { title: 'Pompa Inoto A', time: '13.00 - 20.00', sumTime: '5', sumEnergy: '320' },
        { title: 'Pompa Inoto B', time: '14.00 - 18.00', sumTime: '4', sumEnergy: '256' },
        { title: 'Pompa Inoto C', time: '08.00 - 15.00', sumTime: '7', sumEnergy: '448' },
        { title: 'Pompa Inoto D', time: '09.00 - 12.00', sumTime: '3', sumEnergy: '192' },
        { title: 'Pompa Inoto E', time: '15.00 - 21.00', sumTime: '6', sumEnergy: '384' },
        { title: 'Pompa Inoto F', time: '10.00 - 16.00', sumTime: '6', sumEnergy: '384' },
        { title: 'Pompa Inoto G', time: '11.00 - 12.00', sumTime: '1', sumEnergy: '192' },
        { title: 'Pompa Inoto H', time: '11.00 - 13.00', sumTime: '2', sumEnergy: '384' },
        { title: 'Pompa Inoto I', time: '11.00 - 16.00', sumTime: '7', sumEnergy: '384' },
    ]);

    // Handler untuk kembali
    const handleGoBack = () => {
        router.back();
    };

    return (
        <>
            <Stack.Screen 
                options={{
                    headerShown: false,
                    title: "Pump History"
                }}
            />
            <SafeAreaView style={{ flex: 1, backgroundColor: '#F8FEFF' }}>
                {/* Header dengan Back Button */}
                <HStack 
                    px="$5" 
                    py="$3" 
                    alignItems="center" 
                    space="md"
                    borderBottomColor="$gray200"
                >
                    <Pressable onPress={handleGoBack}>
                        <ChevronLeft size={24} color="#000000" />
                    </Pressable>
                    <Heading size="lg">Pump History</Heading>
                </HStack>

                <ScrollView showsVerticalScrollIndicator={false}>
                    <Box px="$5" pt="$4" pb="$4">
                        {/* Pump History Section */}
                        <VStack space="md">
                            <Text fontSize="$sm" color="$textLight600">12 Jan 2025</Text>

                            {pumpHistory.map((item, index) => (
                                <PumpHistoryCard key={index} item={item} />
                            ))}
                        </VStack>
                    </Box>
                </ScrollView>
            </SafeAreaView>
        </>
    );
};

export default HistoryPump;