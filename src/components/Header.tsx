import React, {useEffect, useState} from "react";
import {
    StyleSheet,
    Text,
    Image,
    View,
    StatusBar
} from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import colors from "../styles/colors";

import userImg from '../assets/user.png';
import fonts from "../styles/fonts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {ifIphoneX} from "react-native-iphone-x-helper";

export function Header(){
    const [userName, setUserName] = useState<string>();

    useEffect(()=> {
        async function loadStorageUserName(){
            const user = await AsyncStorage.getItem('@plantmanager:user');
            setUserName(user || '');
        }
        loadStorageUserName();
    },[]);
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.greeting}>Olá,</Text>
                <Text style={styles.userName}>{ userName }</Text>
            </View>
            
            <Image source={userImg} style={styles.image}/>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        ...ifIphoneX({
            marginTop: getStatusBarHeight()
        },{
            marginTop: StatusBar.currentHeight,
        })
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 40
    },
    greeting: {
        fontSize: 32,
        color: colors.heading,
        fontFamily: fonts.heading
    },
    userName: {
        fontSize: 32,
        fontFamily: fonts.heading,
        color: colors.heading,
        lineHeight: 40
    }
})