import { View, Text, SafeAreaView, Image } from 'react-native'
import React, { useEffect } from 'react'
import tw from 'tailwind-react-native-classnames'
import * as Animatable from 'react-native-animatable';
import * as Progress from 'react-native-progress'
import { useNavigation } from '@react-navigation/native';

const PreparingOrderScreen = () => {

    const navigation = useNavigation();

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate("Delivery")
        }, 4000);
    })

    return (
        <SafeAreaView style={{ ...tw`flex-1 justify-center items-center`, backgroundColor: "#00CCBB" }}>
            <Animatable.Image
                source={require("../assets/basketLoading.gif")}
                animation="slideInUp"
                iterationCount={1}
                style={tw`h-96 w-96`}
            />
            <Animatable.Text
                animation="slideInUp"
                iterationCount={1}
                style={tw`text-lg my-10 text-white font-bold text-center px-10`}
            >
                Waiting for restaurant to accept your order!
            </Animatable.Text>
            <Progress.Circle size={60} indeterminate={true} color="white" />
        </SafeAreaView>
    )
}

export default PreparingOrderScreen