import React, { useState } from 'react';
import { Header } from "../../components/header";
import { TouchableOpacity } from "react-native";
import {
    Box,
    HStack,
    Heading,
    Text,
    Center,
    VStack,
    ScrollView,
    Pressable,
} from "@gluestack-ui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from 'expo-router';

// Component untuk Profile Card
const ProfileCard = ({ userName, pumpName, infoPump }) => (
    <Box bg="$blue500" borderRadius="$2xl" p="$5" mb="$4">
        <HStack space="md" alignItems="flex-start">
            <Center
                w={60}
                h={60}
                borderRadius="$full"
                bg="$blue400"
            >
                <Ionicons name="person" size={32} color="white" />
            </Center>

            <VStack flex={1}>
                <Text fontSize="$lg" fontWeight="$bold" color="$white" mb="$1">
                    {userName}
                </Text>
                <Text fontSize="$sm" color="$white" mb="$4" lineHeight="$sm">
                    {pumpName}
                </Text>

                <HStack space="sm" justifyContent="space-between">
                    {infoPump.map((item, index) => (
                        <VStack key={index} flex={1}>
                            <Text fontSize="$xs" color="$white">
                                {item.title}
                            </Text>
                            <Text fontSize="$md" fontWeight="$bold" color="$white">
                                {item.value}
                            </Text>
                        </VStack>
                    ))}
                </HStack>
            </VStack>
        </HStack>
    </Box>
);

// Component untuk Pump List Item dengan Toggle
const PumpListItem = ({ item, isActive, onToggle, onPress }) => (
    <Pressable onPress={onPress}>
        <Box
            bg="$blue100"
            borderRadius="$lg"
            p="$4"
        >
            <HStack justifyContent="space-between" alignItems="center">
                <VStack flex={1}>
                    <Text fontSize="$md" fontWeight="$semibold" mb="$1">
                        {item.title}
                    </Text>
                    <Text fontSize="$sm" color="$textLight600">
                        {item.value}
                    </Text>
                </VStack>

                <Pressable 
                    onPress={(e) => {
                        e.stopPropagation();
                        onToggle();
                    }}
                >
                    <Center w={40} h={40}>
                        <Ionicons
                            name={isActive ? "toggle" : "toggle-outline"}
                            size={32}
                            color={isActive ? "#2CB810" : "#666"}
                        />
                    </Center>
                </Pressable>
            </HStack>
        </Box>
    </Pressable>
);


const Profile = () => {
    const router = useRouter();

    // State Management
    const [userProfile] = useState({
        name: 'Junanda Deyastusesa',
        activePump: 'Pompa Inoto A'
    });

    const [selectedPump, setSelectedPump] = useState(null);

    const [infoItems] = useState([
        { title: 'Level Drum', value: '30' },
        { title: 'Pompa Nyala', value: '30' },
        { title: 'Energi terpakai', value: '350' }
    ]);

    const [infoPump] = useState([
        { title: 'Power(kwh)', value: '3' },
        { title: 'Power(hp)', value: '4' },
        { title: 'Voltage(V)', value: '380' },
    ]);

    const [daftarPompa, setDaftarPompa] = useState([
        { id: 1, title: 'Pompa Inoto A', value: '3KWH, 4HP, 380V', isActive: true },
        { id: 2, title: 'Pompa Inoto B', value: '3KWH, 4HP, 380V', isActive: false },
        // { id: 3, title: 'Pompa Inoto C', value: '3KWH, 4HP, 380V', isActive: false },
        // { id: 4, title: 'Pompa Inoto D', value: '3KWH, 4HP, 380V', isActive: true },
        // { id: 5, title: 'Pompa Inoto E', value: '3KWH, 4HP, 380V', isActive: false },
        // { id: 6, title: 'Pompa Inoto F', value: '3KWH, 4HP, 380V', isActive: false },
        // { id: 7, title: 'Pompa Inoto G', value: '3KWH, 4HP, 380V', isActive: true },
    ]);

    const handleOpenUpdatePompa = (pump) => {
        // Navigasi ke halaman update dengan membawa data pompa
        router.push({
            pathname: '/(sub-menu)/update-pompa',
            params: {
                pumpId: pump.id,
                pumpName: pump.title,
                pumpValue: pump.value,
            }
        });
    };

    //

    // Handlers
    const handleNotification = () => {
        router.push('/notification');
    };

    const handleTogglePump = (pumpId) => {
        setDaftarPompa(prevPompa =>
            prevPompa.map(pump =>
                pump.id === pumpId
                    ? { ...pump, isActive: !pump.isActive }
                    : pump
            )
        );
    };

    const handlePumpPress = (pump) => {
        console.log('Pompa dipilih:', pump.title);
        // Bisa ditambahkan navigasi ke detail pompa
        // router.push(`/pump-detail/${pump.id}`);
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#F8FEFF' }}>
            <Header title="Profil" />

            <ScrollView showsVerticalScrollIndicator={false}>
                <Box px="$5" py="$4">
                    {/* Profile Card */}
                    <ProfileCard
                        userName={userProfile.name}
                        pumpName={userProfile.activePump}
                        infoPump={infoPump}
                    />

                    {/* Daftar Pompa Section */}
                    <VStack space="sm" mb="$4">
                        <Heading size="lg">Daftar Pompa</Heading>

                        {daftarPompa.map((item) => (
                            <PumpListItem
                                key={item.id}
                                item={item}
                                isActive={item.isActive}
                                onToggle={() => handleTogglePump(item.id)}
                                onPress={() => handleOpenUpdatePompa(item)}
                            />
                        ))}
                        ))}
                    </VStack>

                    {/* Tombol Logout atau Settings - Optional */}
                    <Box mt="$4" mb="$6">
                        <TouchableOpacity
                            onPress={() => router.push('/(sub-menu)/add-pompa')}
                            activeOpacity={0.7}
                        >
                            <Box
                                bg="$green100"
                                borderRadius="$lg"
                                p="$3"
                                borderWidth={1}
                                borderColor="$green200"
                            >
                                <HStack justifyContent="space-between" alignItems="center">
                                    <HStack space="md" alignItems="center">
                                        <Ionicons name="add-circle-outline" size={24}/>
                                        <Text fontSize="$md" fontWeight="$semibold">
                                            Tambah Pompa
                                        </Text>
                                    </HStack>
                                </HStack>
                            </Box>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => router.push('/(sub-menu)/update-profile')}
                            activeOpacity={0.7}
                                                >
                            <Box
                                bg="$white"
                                borderRadius="$lg"
                                mt="$3"
                                p="$3"
                                borderWidth={1}
                                borderColor="$blue200"
                            >
                                <HStack justifyContent="space-between" alignItems="center">
                                    <HStack space="md" alignItems="center">
                                        <Ionicons name="settings-outline" size={24} color="#4A6EFF" />
                                        <Text fontSize="$md" fontWeight="$semibold">
                                            Pengaturan
                                        </Text>
                                    </HStack>
                                    <Ionicons name="chevron-forward" size={24} color="#666" />
                                </HStack>
                            </Box>
                        </TouchableOpacity>

                        <Pressable
                            onPress={() => console.log('Logout pressed')}
                        >
                            <Box
                                bg="$white"
                                borderRadius="$lg"
                                p="$3"
                                mt="$6"
                                borderWidth={1}
                                borderColor="$red200"
                            >
                                <HStack justifyContent="space-between" alignItems="center">
                                    <HStack space="md" alignItems="center">
                                        <Ionicons name="log-out-outline" size={24} color="#DC2626" />
                                        <Text fontSize="$md" fontWeight="$semibold" color="$red600">
                                            Keluar
                                        </Text>
                                    </HStack>
                                    <Ionicons name="chevron-forward" size={24} color="#DC2626" />
                                </HStack>
                            </Box>
                        </Pressable>
                    </Box>
                </Box>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Profile;