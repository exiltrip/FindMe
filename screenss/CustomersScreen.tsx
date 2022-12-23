import { View, Text, SafeAreaView, ScrollView, ActivityIndicator} from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useTailwind } from 'tailwind-rn/dist';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { TabStackParamList } from '../navigator/TabNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigator/RootNavigator';
import { Image } from '@rneui/themed/dist/Image';
import { Input } from '@rneui/themed';
import MapView from "react-native-maps";
import Marker from "react-native-maps";
import axios from "axios";
import {useEffect} from "react";

export type CustomersScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList, 'Customers'>,
  NativeStackNavigationProp<RootStackParamList>
>;
const CustomersScreen = () => {
  const tailWind = useTailwind();
  const navigation = useNavigation<CustomersScreenNavigationProp>();
  const [input, setInput] = useState<string>("");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
      headerTitle: 'Customers',
      headerTitleStyle: tailWind('text-white'),
      headerStyle: tailWind('bg-blue-500')
    });
  }, [navigation]);

    const [friendsLocation, setFriendsLocation] = useState([]);
    const requireFriendsLocation = () => axios.get(`https://api.com/api/friendslocation`)
        .then(res => {
            setFriendsLocation(res.data);
            setTimeout(() => requireFriendsLocation(), 2000)
        })

    useEffect(() => {
        requireFriendsLocation();
    }, []);

  return (
    <ScrollView style={{backgroundColor: "#59c1cc"}} >
      <MapView
      initialRegion={{latitude: 37.78825, longitude: -122.4324, latitudeDelta: 0.0922, longitudeDelta: 0.0421}}>
      friendsLocation.map(friendsLocation => {<Marker coordinate={friendsLocation.coordinate}/>})
      </MapView>

    </ScrollView>
  );
};

export default CustomersScreen
