import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useMemo, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { selectRestaurant } from '../features/restaurantSlice'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromBasket, selectBasketItems, selectBasketTotal } from '../features/basketSlice'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from 'tailwind-react-native-classnames'
import { XCircleIcon } from 'react-native-heroicons/solid'
import { urlFor } from '../sanity'

const BasketScreen = () => {
    const restaurant = useSelector(selectRestaurant);
    const items = useSelector(selectBasketItems);
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [groupedItemsInBasket, setGroupedItemsInBasket] = useState();
    const basketTotal = useSelector(selectBasketTotal);

    // If item already present, push it to existing array
    useMemo(() => {
        const groupedItems = items.reduce((results, item) => {
            (results[item.id] = results[item.id] || []).push(item);
            return results;
        }, {})
        setGroupedItemsInBasket(groupedItems);
    }, [items])

    // console.log(groupedItemsInBasket);

    return (
        <SafeAreaView style={tw`flex-1 bg-white`}>
            <View style={tw`flex-1 bg-gray-100`}>
                <View style={{ ...tw`p-5 bg-white shadow`, borderBottomColor: "#00CCBB" }}>
                    <View>
                        <Text style={tw`text-lg font-bold text-center`}>Basket</Text>
                        <Text style={tw`text-center text-gray-400`}>
                            {restaurant.title}
                        </Text>
                    </View>
                    <TouchableOpacity
                        onPress={navigation.goBack}
                        style={tw`rounded-full bg-gray-100 absolute top-3 right-5`}
                    >
                        <XCircleIcon color="#00CCBB" height={50} width={50} />
                    </TouchableOpacity>
                </View>
                <View style={tw`flex-row items-center px-4 py-3 bg-white my-5`}>
                    <Image
                        source={{
                            uri: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                        }}
                        style={tw`h-7 w-7 bg-gray-300 rounded-full`}
                    />
                    <Text style={tw`flex-1 mx-3`}>Deliver in 50-75 min</Text>
                    <TouchableOpacity>
                        <Text style={{ color: "#00CCBB" }}>Change</Text>
                    </TouchableOpacity>
                </View>

                {/* Items List */}
                <ScrollView>
                    {
                        groupedItemsInBasket &&
                        Object.entries(groupedItemsInBasket).map(([key, item]) => (
                            <View key={key} style={{ ...tw`flex-row items-center bg-white py-2 border-b-2 border-gray-300 px-3`, gap: "30px" }}>
                                <Text style={{ color: "#00CCBB" }}>{item.length} X</Text>
                                <Image
                                    source={{
                                        uri: urlFor(item[0]?.image).url()
                                    }}
                                    style={tw`h-12 w-12 rounded-full`}
                                />
                                <Text style={tw`flex-1`}>{item[0]?.name}</Text>
                                <Text style={tw`text-gray-600`}>&#8377; {item[0]?.price}</Text>
                                <TouchableOpacity>
                                    <Text
                                        style={{ ...tw`text-xs`, color: "#00CCBB" }}
                                        onPress={() => dispatch(removeFromBasket({ id: key }))}
                                    >
                                        Remove
                                    </Text>
                                </TouchableOpacity>

                            </View>
                        ))
                    }
                </ScrollView>

                {/* Total and stuff */}
                <View style={tw`bg-white mt-5 px-4`}>
                    <View style={tw`flex-row justify-between py-4`}>
                        <Text style={tw`text-gray-400`}>
                            Subtotal:
                        </Text>
                        <Text style={tw`text-gray-400`}>
                            &#8377; {basketTotal}
                        </Text>
                    </View>
                    <View style={tw`flex-row justify-between py-4`}>
                        <Text style={tw`text-gray-400`}>
                            Delivery Fees:
                        </Text>
                        <Text style={tw`text-gray-400`}>
                            &#8377; 50
                        </Text>
                    </View>
                    <View style={tw`flex-row justify-between py-4 pb-8`}>
                        <Text>
                            Order Total:
                        </Text>
                        <Text style={tw`font-extrabold`}>
                            &#8377; {basketTotal + 50}
                        </Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("PreparingOrderScreen")}
                        style={{ ...tw`rounded-lg p-4`, backgroundColor: "#00CCBB" }}>
                        <Text style={tw`text-center text-white text-lg font-bold`}>Place Order</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default BasketScreen;