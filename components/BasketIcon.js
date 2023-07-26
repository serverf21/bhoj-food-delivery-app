import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectBasketItems, selectBasketTotal } from '../features/basketSlice';
import { useNavigation } from '@react-navigation/native';
import tw from 'tailwind-react-native-classnames';

const BasketIcon = () => {

    const items = useSelector(selectBasketItems);
    const navigation = useNavigation();
    const basketTotal = useSelector(selectBasketTotal);

    if (items.length == 0) {
        return null;
    }

    return (
        <View style={tw`absolute bottom-10 w-full z-50`}>
            <TouchableOpacity
                onPress={() =>
                    navigation.navigate("Basket")
                }
                style={{ ...tw`mx-5 p-4 rounded-lg flex-row items-center`, backgroundColor: "#00CCBB" }}>
                <Text style={{ ...tw`text-white font-extrabold text-lg py-1 px-2 mx-2`, backgroundColor: "#01A296" }}>{items.length}</Text>
                <Text style={tw`flex-1 text-white font-extrabold text-lg text-center`}>View Basket</Text>
                <Text style={tw`text-xl text-white font-extrabold`}>&#8377; {basketTotal}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default BasketIcon