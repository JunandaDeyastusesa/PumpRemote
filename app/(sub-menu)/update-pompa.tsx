import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import {
    Box,
    VStack,
    Text,
    Input,
    InputField,
    Button,
    ButtonText,
    ScrollView,
} from '@gluestack-ui/themed';
import { Header } from '../../components/header';

interface FormData {
    nama: string;
    powerKw: string;
    powerHp: string;
    voltage: string;
}

interface RouteParams {
    pumpId?: string;
    pumpName?: string;
    pumpValue?: string;
}

const UpdatePompa: React.FC = () => {
    const router = useRouter();
    const params = useLocalSearchParams<RouteParams>();

    const [formData, setFormData] = useState<FormData>({
        nama: params.pumpName || '',
        powerKw: '',
        powerHp: '',
        voltage: '',
    });

    const handleUpdate = (): void => {
        console.log('Update pompa:', formData);
        // Implementasi update ke backend
        router.back();
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#F8FEFF' }}>
            <Header title="Update Data Pompa" showBackButton />
            
            <ScrollView>
                <Box px="$5" py="$4">
                    <VStack space="lg">
                        <VStack space="sm">
                            <Text fontWeight="$medium">Nama Pompa</Text>
                            <Input>
                                <InputField
                                    value={formData.nama}
                                    onChangeText={(text: string) => 
                                        setFormData({...formData, nama: text})
                                    }
                                    placeholder="Pompa A"
                                />
                            </Input>
                        </VStack>

                        <VStack space="sm">
                            <Text fontWeight="$medium">Power (Kw)</Text>
                            <Input>
                                <InputField
                                    value={formData.powerKw}
                                    onChangeText={(text: string) => 
                                        setFormData({...formData, powerKw: text})
                                    }
                                    placeholder="3"
                                    keyboardType="numeric"
                                />
                            </Input>
                        </VStack>

                        <VStack space="sm">
                            <Text fontWeight="$medium">Power (Hp)</Text>
                            <Input>
                                <InputField
                                    value={formData.powerHp}
                                    onChangeText={(text: string) => 
                                        setFormData({...formData, powerHp: text})
                                    }
                                    placeholder="4"
                                    keyboardType="numeric"
                                />
                            </Input>
                        </VStack>

                        <VStack space="sm">
                            <Text fontWeight="$medium">Voltage</Text>
                            <Input>
                                <InputField
                                    value={formData.voltage}
                                    onChangeText={(text: string) => 
                                        setFormData({...formData, voltage: text})
                                    }
                                    placeholder="350"
                                    keyboardType="numeric"
                                />
                            </Input>
                        </VStack>

                        <Button
                            bg="$blue500"
                            onPress={handleUpdate}
                            mt="$4"
                        >
                            <ButtonText>Simpan</ButtonText>
                        </Button>
                    </VStack>
                </Box>
            </ScrollView>
        </SafeAreaView>
    );
};

export default UpdatePompa;