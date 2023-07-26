import { View, Text, Image } from 'react-native'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import tw from 'tailwind-react-native-classnames'
import { urlFor } from '../sanity'
import { MinusCircleIcon, PlusCircleIcon } from 'react-native-heroicons/solid'
import { useDispatch, useSelector } from 'react-redux'
import { addToBasket, removeFromBasket, selectBasketItemsWithId } from '../features/basketSlice'

const DishRow = ({
    key,
    id,
    name,
    description,
    price,
    image,
}) => {

    const [isPressed, setIsPressed] = useState(false);
    const dispatch = useDispatch();
    const items = useSelector(state => selectBasketItemsWithId(state, id));

    const addItemToBasket = () => {
        dispatch(addToBasket({ id, name, description, price, image }));
    }

    const removeItemFromBasket = () => {
        if (items.length <= 0)
            return;
        dispatch(removeFromBasket({ id }));
    }

    return (
        <>
            <TouchableOpacity
                onPress={() => setIsPressed(!isPressed)}
                style={{
                    ...tw`bg-white p-4 border border-gray-200 ${isPressed && 'border-b-0'
                        }`
                }}>
                <View style={tw`flex-row`}>
                    <View style={tw`flex-1 pr-2`}>
                        <Text style={tw`text-xl mb-1`}>{name}</Text>
                        <Text style={tw`text-gray-400`}>{description}</Text>
                        <Text style={tw`text-gray-400 mt-2`}>&#8377; {price}</Text>
                    </View>

                    <View>
                        <Image
                            source={{
                                uri: urlFor(image).url()
                            }}
                            style={{
                                ...tw`h-20 w-20 bg-gray-300 p-4`,
                                borderWidth: 1,
                                borderColor: "#F3F3F4"
                            }}
                        />
                    </View>
                </View>
            </TouchableOpacity>

            {/* Show next part only if isPressed is true */}
            {isPressed && (
                <View style={tw`bg-white p-4`}>
                    <View style={tw`flex-row items-center pb-3`}>
                        <TouchableOpacity
                            onPress={removeItemFromBasket}
                            disabled={!items.length}
                        >
                            <MinusCircleIcon
                                color={items.length > 0 ? "#00CCBB" : "gray"}
                                size={40}
                                style={tw`mx-1`}
                            />
                        </TouchableOpacity>
                        <Text style={tw`mx-1`}>{items.length}</Text>
                        <TouchableOpacity onPress={addItemToBasket}>
                            <PlusCircleIcon
                                color="#00CCBB"
                                size={40}
                                style={tw`mx-1`}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </>
    )
}

export default DishRow