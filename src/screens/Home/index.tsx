import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { StatusBar } from "react-native";
import Logo from "../../assets/logo.svg";
import {RFValue} from "react-native-responsive-fontsize"
import { Container, Header, HeaderContent, TotalCars, CarsList } from "./style";
import { Cars } from "../../Components/Cars";
import { useNavigation } from "@react-navigation/native";
import api from "../../services/api";
import { CarDTO } from "../../dtos/CarDTO";
import {Load} from "../../Components/Load";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "styled-components";
import { PanGestureHandler } from "react-native-gesture-handler";

import Animated, { useAnimatedStyle, useSharedValue, useAnimatedGestureHandler } from "react-native-reanimated";
const AnimatedButton = Animated.createAnimatedComponent(TouchableOpacity);

export function Home(){
    const [cars, setCars] = useState<CarDTO[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const positionY = useSharedValue(0);
    const positionX = useSharedValue(0);
    const myCarsButtonStyle = useAnimatedStyle(() => {
        return{
            transform: [
                {translateX: positionX.value},
                {translateY:  positionY.value},
            ]
        }
    });
    const onGestureEvent = useAnimatedGestureHandler({
        onStart(_, ctx: any){
            ctx.positionX = positionX.value;
            ctx.positionY = positionY.value;
        },
        onActive(event, ctx: any){
            positionX.value = ctx.postionX + event.translationX;
            positionY.value = ctx.positionY + event.translationY;
        }
    });

    const navigation = useNavigation();
    const theme = useTheme();

    function handleCarDetails(car: CarDTO){
        navigation.navigate("CarDetails", { car });
    }
    function handleOpenMyCars(){
        navigation.navigate("MyCars");
    }

    useEffect(() => {
        async function fetchCars(){
            try{ 
                const response = await api.get("/cars"); 
                setCars(response.data);
            }catch (error){ 
                console.log(error) 
            }finally{
                setIsLoading(false);
            }
        }
        fetchCars();
    }, [])
    
    return(
        
        <Container>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent/>
            <Header>
                <HeaderContent>
                    <Logo width={RFValue(108)} height={RFValue(12)}/>
                    <TotalCars>
                        Total de {cars.length} carros
                    </TotalCars>
                </HeaderContent>
            </Header>
            {isLoading ? <Load/> : 
                <CarsList 
                    data={cars} 
                    keyExtractor={item => String(item.id)} 
                    renderItem={
                        ({item}) => 
                        <Cars 
                            CarDataProps={item} 
                            onPress={() => handleCarDetails(item)} 
                        /> 
                    }
                />
            }
            
            <PanGestureHandler onGestureEvent={onGestureEvent}>
                <Animated.View style={[
                    myCarsButtonStyle, {
                        position: "absolute",
                        bottom: 13,
                        right: 22,
                    }
            ]}>
                <AnimatedButton 
                    onPress={handleOpenMyCars} 
                    activeOpacity={0.6} 
                    style={[
                        styles.myCarsButton, 
                        {backgroundColor: theme.colors.main}
                ]}>
                    <Ionicons 
                        name="ios-car-sport" 
                        size={32}
                        color={theme.colors.shape}
                    />
                </AnimatedButton>
            </Animated.View>
            </PanGestureHandler>               
            
        </Container>
        
    );
}

const styles = StyleSheet.create({
    myCarsButton:{
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
    }
})