import { View, Text, SafeAreaView, Image, TextInput } from 'react-native';
import React, { useLayoutEffect } from 'react';
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';
import { UserIcon, MagnifyingGlassIcon, ChevronDownIcon, AdjustmentsVerticalIcon } from 'react-native-heroicons/solid';


const HomeScreen = () => {

    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    })
    return (
        <SafeAreaView style={tw`bg-white pt-5`}>
            {/* Header */}
            <View style={tw`flex-row pb-3 items-center mx-4 pt-1`}>
                <Image
                    source={{
                        uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
                    }}
                    style={tw`h-7 w-7 bg-gray-300 p-4 rounded-full`}
                />
                <View style={tw`mx-3 flex-1`}>
                    <Text style={tw`font-bold text-gray-500 text-xs`}>
                        Deliver now!</Text>
                    <Text style={tw`font-bold text-xl`}>
                        Current Location
                        <ChevronDownIcon size={20} color="#00CCBB" />
                    </Text>
                </View>
                <UserIcon size={35} color="#00CCBB" />
            </View>

            {/* Search Box */}
            <View style={tw`flex-row items-center pb-2 mx-4`}>
                <View style={tw`flex-row bg-gray-200 p-3 flex-1 mr-2`}>
                    <MagnifyingGlassIcon
                        color="gray"
                        size={20}
                    />
                    <TextInput
                        style={tw`mx-5`}
                        placeholder='Restraunts and cuisines'
                        keyboardType='default' />
                </View>
                <AdjustmentsVerticalIcon color="#00CCBB" style={tw`ml-2`} />

            </View>
        </SafeAreaView>
    )
}

export default HomeScreen