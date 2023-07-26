import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect, useEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { urlFor } from '../sanity';
import tw from 'tailwind-react-native-classnames';
import { ArrowLeftIcon, ArrowRightIcon, QuestionMarkCircleIcon } from 'react-native-heroicons/outline';
import { StarIcon, MapPinIcon } from 'react-native-heroicons/solid'
import DishRow from '../components/DishRow';
import BasketIcon from '../components/BasketIcon';
import { useDispatch, useSelector } from 'react-redux';
import { selectBasketItems } from '../features/basketSlice';
import { setRestaurant } from '../features/restaurantSlice';
const RestrauntScreen = () => {
    const navigation = useNavigation();
    const items = useSelector(selectBasketItems);
    const dispatch = useDispatch();
    const { params: {
        id,
        imgUrl,
        title,
        rating,
        genre,
        address,
        short_description,
        dishes,
        lat,
        long
    } } = useRoute();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])

    useEffect(() => {
        dispatch(setRestaurant({
            id,
            imgUrl,
            title,
            rating,
            genre,
            address,
            short_description,
            dishes,
            lat,
            long
        }))
    }, [dispatch])


    return (
        <>
            {items && <BasketIcon />}
            <ScrollView>
                <View>
                    <Image
                        source={{
                            uri: urlFor(imgUrl).url()
                        }}
                        style={tw`w-full h-56 bg-gray-300 p-4`}
                    />
                    <TouchableOpacity
                        onPress={navigation.goBack}
                        style={tw`absolute top-14 left-5 p-2 bg-gray-100 rounded-full`}>
                        <ArrowLeftIcon size={20} color="#00CCBB" />
                    </TouchableOpacity>
                </View>
                <View style={tw`bg-white`}>
                    <View style={tw`px-4 pt-4`}>
                        <Text style={tw`text-3xl font-bold`}>{title}</Text>
                        <View style={tw`flex-row my-1`}>
                            {/* Icons view */}
                            <View style={tw`flex-row items-center`}>
                                <StarIcon color="green" opacity={0.5} size={22} />
                                <Text style={tw`text-xs text-gray-500 px-2`}>
                                    <Text style={tw`text-green-500`}>{rating}</Text>  ·  {genre}
                                </Text>
                            </View>
                            {/* Icons view 2 */}
                            <View style={tw`flex-row items-center px-2`}>
                                <MapPinIcon color="gray" opacity={0.4} size={22} />
                                <Text style={tw`text-xs text-gray-500 px-2`}>
                                    <Text style={tw`text-gray-500`}>{address}</Text>
                                </Text>
                            </View>
                        </View>

                        <Text style={tw`text-gray-500 mt-2 pb-4`}>{short_description}</Text>
                    </View>

                    <TouchableOpacity style={tw`flex-row items-center p-4 border border-gray-200`}>
                        <QuestionMarkCircleIcon color="gray" opacity={0.6} size={25} />
                        <Text style={tw`pl-2 flex-1 text-xs font-bold px-3`}>
                            Have a food allergy?
                        </Text>
                        <ArrowRightIcon color="#00CCBB" />
                    </TouchableOpacity>

                </View>
                <View style={tw`pb-36`}>
                    <Text style={tw`px-4 pt-6 mb-3 font-bold text-xl`}>
                        Menu
                    </Text>
                    {/* Dishes Rows */}
                    {dishes?.map((dish) => (
                        <DishRow
                            key={dish._id}
                            id={dish._id}
                            name={dish.name}
                            description={dish.short_description}
                            price={dish.price}
                            image={dish.image}
                        />
                    ))}
                </View>
            </ScrollView>
        </>
    )
}

export default RestrauntScreen