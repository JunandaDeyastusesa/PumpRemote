import React, { useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { Header } from "../../components/header";
import { Box, Card, Text, Icon, Center, HStack, VStack } from "@gluestack-ui/themed";
import { useRouter } from "expo-router";
import { ToggleRight, Thermometer, Droplets, Waves, Zap, ArrowUpNarrowWide } from "lucide-react-native";

const Home = ({ infoItemsProp = [], infoPumpProp = [], pumpHistoryProp = [] }) => {
    const router = useRouter();

    const [pumpOn, setPumpOn] = useState(true);
    const [temperature, setTemperature] = useState(40);
    const [humidity, setHumidity] = useState(40);

    const infoItems =
        infoItemsProp.length > 0
            ? infoItemsProp
            : [
                { title: "Level Drum", value: "30", icon: ArrowUpNarrowWide, satuan: "%" },
                { title: "Pompa Nyala", value: "30", icon: Waves, satuan: "%" },
                { title: "Energi terpakai", value: "350", icon: Zap, satuan: "kwh" },
            ];

    const infoPump =
        infoPumpProp.length > 0
            ? infoPumpProp
            : [
                { title: "Power(kwh)", value: "30" },
                { title: "Power(hp)", value: "30" },
                { title: "Voltage(V)", value: "380" },
            ];

    const pumpHistory =
        pumpHistoryProp.length > 0
            ? pumpHistoryProp
            : [
                { title: "Pompa Inoto A", time: "13.00 - 20.00", sumTime: "5", sumEnergy: "320" },
                { title: "Pompa Inoto B", time: "08.00 - 12.00", sumTime: "4", sumEnergy: "280" },
                { title: "Pompa Inoto B", time: "08.00 - 12.00", sumTime: "4", sumEnergy: "280" },
                { title: "Pompa Inoto B", time: "08.00 - 12.00", sumTime: "4", sumEnergy: "280" },
                { title: "Pompa Inoto B", time: "08.00 - 12.00", sumTime: "4", sumEnergy: "280" },
                { title: "Pompa Inoto B", time: "08.00 - 12.00", sumTime: "4", sumEnergy: "280" },
                { title: "Pompa Inoto B", time: "08.00 - 12.00", sumTime: "4", sumEnergy: "280" },
                { title: "Pompa Inoto B", time: "08.00 - 12.00", sumTime: "4", sumEnergy: "280" },
                { title: "Pompa Inoto B", time: "08.00 - 12.00", sumTime: "4", sumEnergy: "280" },
            ];

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#F8FEFF" }}>
            <Header title="Monitoring Pompa" />

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Saklar Pompa + Sensor */}
                <HStack mt="$4" px="$4" space="md">
                    {/* Saklar Pompa */}
                    <Card backgroundColor="$blue500" borderRadius="$2xl" flex={1} p="$4" variant="filled">
                        <VStack space="sm">
                            <Center backgroundColor="$blue700" w="$8" h="$8" borderRadius="$full">
                                <Icon as={ToggleRight} size="md" color="$white" />
                            </Center>
                            <Text color="$white" fontSize="$lg" fontWeight="$semibold">
                                Saklar Pompa Air
                            </Text>
                            <Text color="$white" fontSize="$5xl" fontWeight="$bold">
                                {pumpOn ? "On" : "Off"}
                            </Text>
                            <Text color="$white" fontSize="$sm">
                                1 hari, 19 Jam
                            </Text>
                        </VStack>
                    </Card>

                    {/* Sensor */}
                    <VStack flex={1} space="sm">
                        <TouchableOpacity
                            onPress={() => router.push('/(sub-menu)/history-tanah')}
                            activeOpacity={0.7}
                        >
                            <Card backgroundColor="$blue200" borderRadius="$2xl" p="$3" variant="filled">
                                <VStack space="xs">
                                    <HStack justifyContent="space-between" alignItems="center">
                                        <Center backgroundColor="$blue400" w="$6" h="$6" borderRadius="$full">
                                            <Icon as={Thermometer} size="sm" color="$white" />
                                        </Center>
                                        <Text fontWeight="$bold" fontSize="$3xl" color="$blue900">
                                            {temperature}°C
                                        </Text>
                                    </HStack>
                                    <Text fontSize="$md" color="$blue900" fontWeight="$medium">
                                        Suhu Udara
                                    </Text>
                                </VStack>
                            </Card>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => router.push('/(sub-menu)/history-tanah')}
                            activeOpacity={0.7}
                        >
                            <Card backgroundColor="$blue200" borderRadius="$2xl" p="$3" variant="filled">
                                <VStack space="xs">
                                    <HStack justifyContent="space-between" alignItems="center">
                                        <Center backgroundColor="$blue500" w="$6" h="$6" borderRadius="$full">
                                            <Icon as={Droplets} size="sm" color="$white" />
                                        </Center>
                                        <Text fontWeight="$bold" fontSize="$3xl" color="$blue900">
                                            {humidity}%
                                        </Text>
                                    </HStack>
                                    <Text fontSize="$md" color="$blue900" fontWeight="$medium">
                                        Kelembapan Tanah
                                    </Text>
                                </VStack>
                            </Card>
                        </TouchableOpacity>
                    </VStack>
                </HStack>

                {/* Info Pemakaian */}
                <HStack px="$4" mt="$5" flexWrap="wrap" justifyContent="space-between">
                    {infoItems.map((item, i) => (
                        <Card variant="ghost" key={i} mb="$3" p="$2">
                            <VStack space="xs">
                                <Text fontSize="$sm">{item.title}</Text>
                                <HStack alignItems="flex-end" space="xs">
                                    <Center backgroundColor="$blue500" w="$5" h="$5" borderRadius="$full">
                                        <Icon as={item.icon} size="sm" color="$white" />
                                    </Center>
                                    <HStack alignItems="flex-end">
                                        <Text fontSize="$lg" fontWeight="$bold">
                                            {item.value}
                                        </Text>
                                        <Text fontSize="$xs" fontWeight="$regular" ml="$1">
                                            {item.satuan}
                                        </Text>
                                    </HStack>
                                </HStack>
                            </VStack>
                        </Card>
                    ))}
                </HStack>

                {/* Info Pompa */}
                <Box px="$4" mt="$5">
                    <Card backgroundColor="$blue500" borderRadius="$2xl" p="$4" variant="filled">
                        <HStack space="md">
                            <Center w="$11" h="$11">
                                <Icon as={Waves} color="$white" size="lg" />
                            </Center>
                            <VStack flex={1} space="sm">
                                <Text fontWeight="$bold" fontSize="$md" color="$white">
                                    Pompa Inoto A
                                </Text>
                                <HStack justifyContent="space-between">
                                    {infoPump.map((item, i) => (
                                        <VStack key={i} flex={1}>
                                            <Text color="$white" fontSize="$xs">
                                                {item.title}
                                            </Text>
                                            <Text fontWeight="$bold" color="$white">
                                                {item.value}
                                            </Text>
                                        </VStack>
                                    ))}
                                </HStack>
                            </VStack>
                        </HStack>
                    </Card>
                </Box>

                {/* Riwayat Penggunaan */}
                <VStack px="$4" mt="$5" space="sm" mb="$5">
                    <Text fontSize="$md" fontWeight="$semibold">
                        Riwayat Penggunaan
                    </Text>
                    <Text fontSize="$sm" color="$textLight600">
                        12 Jan 2025
                    </Text>

                    {pumpHistory.map((item, i) => (
                        <Card key={i} backgroundColor="$blue100" borderRadius="$xl" p="$4" justifyContent="center" variant="filled">
                            <HStack space="sm">
                                <VStack alignItems="center" justifyContent="center" borderRightWidth={1} borderStyle="dashed" borderColor="$blue300" pr="$3">
                                    <Center>
                                        <Text fontSize="$2xl" fontWeight="$bold">
                                            {item.sumTime}
                                        </Text>
                                        <Text fontSize="$xs">Jam</Text>
                                    </Center>
                                </VStack>
                                <VStack flex={1}>
                                    <HStack justifyContent="space-between">
                                        <VStack alignItems="center" justifyContent="center">
                                            <Text fontWeight="$bold" mb="$1">
                                                {item.title}
                                            </Text>
                                            <Text fontSize="$sm">{item.time} WIB</Text>
                                        </VStack>
                                        <VStack justifyContent="center" alignItems="center">
                                            <Text fontSize="$sm">{item.sumEnergy} Kwh</Text>
                                        </VStack>
                                    </HStack>
                                </VStack>
                            </HStack>
                        </Card>
                    ))}
                </VStack>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Home;