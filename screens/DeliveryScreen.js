import { View, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux';
import { selectRestaurant } from '../features/restaurantSlice';
import tw from 'tailwind-react-native-classnames';
import { XCircleIcon } from 'react-native-heroicons/outline';
import { PhoneIcon } from 'react-native-heroicons/solid'
import * as Progress from 'react-native-progress';
import MapView, { Marker } from 'react-native-maps';

const DeliveryScreen = () => {
    const navigation = useNavigation();
    const restraunt = useSelector(selectRestaurant);
    return (
        <View style={{ ...tw`flex-1`, backgroundColor: "#00CCBB" }}>
            <SafeAreaView style={tw`z-50`}>
                <View style={tw`flex-row justify-between items-center p-5`}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Home")}
                    >
                        <XCircleIcon color="white" size={40} />
                    </TouchableOpacity>
                    <Text style={tw`font-light text-white text-lg`}>
                        Order Help
                    </Text>
                </View>

                <View style={tw`bg-white mx-5 my-2 rounded-md p-6 z-50 shadow-md`}>
                    <View style={tw`flex-row justify-between`}>
                        <View>
                            <Text style={tw`text-lg text-gray-400`}>Estimated Arrival </Text>
                            <Text style={tw`text-4xl font-bold`}>45-55 min</Text>
                        </View>
                        <Image
                            source={{
                                uri: "https://cdn-icons-png.flaticon.com/512/2264/2264406.png"
                            }}
                            style={tw`h-20 w-20`}
                        />
                    </View>
                    <Progress.Bar size={30} color="#00CCBB" indeterminate={true} />
                    <Text style={tw`mt-3 text-gray-500`}>
                        Your order at {restraunt.title} is being prepared
                    </Text>
                </View>
            </SafeAreaView>
            <MapView
                initialRegion={{
                    lattitude: restraunt.lat,
                    longitude: restraunt.long,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                }}
                style={tw`flex-1 -mt-10 z-0`}
                mapType='mutedStandard'
            >

                <Marker
                    coordinate={{
                        lattitude: restraunt.lat,
                        longitude: restraunt.long,
                    }}
                    title={restraunt.title}
                    description={restraunt.short_description}
                    identifier="origin"
                    pinColor='#00CCBB'
                />

            </MapView>
            <SafeAreaView style={tw`bg-white flex-row items-center p-5`}>
                <Image
                    source={{
                        uri: "https://cdn-icons-png.flaticon.com/128/869/869034.png"
                    }}
                    style={tw`h-12 w-12 p-4 ml-5 m-4`}
                />
                <View style={tw`flex-1`}>
                    <Text style={tw`text-lg`}>Sarvagya Saxena</Text>
                    <Text style={tw`text-gray-400`}>Your rider</Text>
                </View>
                <TouchableOpacity>
                    <PhoneIcon color="#00CCBB" size={30} style={tw`m-5`} />
                </TouchableOpacity>
            </SafeAreaView>
        </View>
    )
}

export default DeliveryScreen