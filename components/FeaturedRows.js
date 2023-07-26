import { View, Text, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { ArrowRightIcon } from 'react-native-heroicons/solid'
import tw from 'tailwind-react-native-classnames'
import RestrauntCard from './RestrauntCard';
import sanityClient from '../sanity';

const FeaturedRows = ({ id, title, description }) => {
    const [restraunts, setRestraunts] = useState([]);
    useEffect(() => {
        sanityClient.fetch(`
            *[_type == "featured" && _id==$id] {
                ...,
                restraunts[]->{
                ...,
                dishes[]->,
                type->{
                    name
                }
                }
            }[0]
        `, { id: id })
            .then(data => {
                setRestraunts(data?.restraunts);
            })
    }, [])
    // console.log(restraunts);
    return (
        <View>
            <View style={tw`mt-4 flex-row items-center justify-between px-4`}>
                <Text style={tw`font-bold text-lg`}>
                    {title}
                </Text>
                <ArrowRightIcon color="#00CCBB" />
            </View>
            <Text style={tw`text-xs text-gray-500 px-4`}>
                {description}
            </Text>
            <ScrollView
                horizontal
                contentContainerStyle={{
                    paddingHorizontal: 15
                }}
                showsHorizontalScrollIndicator={false}
                style={tw`pt-4`}
            >
                {/* Restraunt Cards */}
                {restraunts?.map(restraunt => (
                    <RestrauntCard
                        key={restraunt._id}
                        id={restraunt._id}
                        imgUrl={restraunt.image}
                        title={restraunt.name}
                        rating={restraunt.rating}
                        genre={restraunt.type?.name}
                        address={restraunt.address}
                        short_description={restraunt.short_description}
                        dishes={restraunt.dishes}
                        lat={restraunt.lat}
                        long={restraunt.long}
                    />
                ))}
            </ScrollView>
        </View>
    )
}

export default FeaturedRows