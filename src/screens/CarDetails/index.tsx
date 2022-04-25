import React from "react";
import { StyleSheet } from "react-native";
import { Acessory } from "../../Components/Acessory";
import { BackButton } from "../../Components/BackButton";
import { ImageSlider } from "../../Components/ImageSlider";
import { Container, Header, CarImages, Details, Description, Brand, CarName, Rent, Period, Price, About, Acessories, Footer} from "./style";
import { Button } from "../../Components/Button";
import { useNavigation, useRoute } from "@react-navigation/native";
import { CarDTO } from "../../dtos/CarDTO";
import { getAccessoriesIcon } from "../../utils/getAccessoriesIcon";
import Animated, { Extrapolate, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { useTheme } from "styled-components";


interface paramentros {
    car: CarDTO;
}

export function CarDetails(){
    const theme = useTheme();
    const navigation = useNavigation();
    const route = useRoute();
    const { car } = route.params as paramentros;
    const scrollY = useSharedValue(0);
    const scrollHandler = useAnimatedScrollHandler(event => {
        scrollY.value = event.contentOffset.y
    })
    const headerStyleAnimation = useAnimatedStyle(() => {
        return{
            height: interpolate(
                scrollY.value,
                [0, 200], [200, 70],
                Extrapolate.CLAMP
            )
        }
    });
    const carsSliderStyleAnimation = useAnimatedStyle(() => {
        return{
            opacity: interpolate(
                scrollY.value,
                [0, 150], [1, 0],
                Extrapolate.CLAMP
            )
        }
    })

    function handleConfirmRent(){
        navigation.navigate("Scheduling", {car});
    }
    function handleGoBack(){
        navigation.goBack();
    }

    return(
        <Container>
            <Animated.View style={[headerStyleAnimation, style.header, {backgroundColor: theme.colors.background_secondary}]}>
                <Header>
                    <BackButton onPress={handleGoBack} />
                </Header>
                <Animated.View style={carsSliderStyleAnimation}>
                    <CarImages>
                        <ImageSlider imageUrl={car.photos}/>
                    </CarImages>
                </Animated.View>
            </Animated.View>
            <Animated.ScrollView 
                contentContainerStyle={{
                    paddingHorizontal: 24,
                    paddingTop: getStatusBarHeight()+160,
                    
                }} 
                showsVerticalScrollIndicator={false}
                onScroll={scrollHandler}
                scrollEventThrottle={17}
            >
                <Details>
                    <Description>
                        <Brand>{car.brand}</Brand>
                        <CarName>{car.name}</CarName>
                    </Description>

                    <Rent>
                        <Period>{car.rent.period}</Period>
                        <Price>R$ {car.rent.price}</Price>
                    </Rent>
                </Details>
                <Acessories>
                    {
                        car.accessories.map(acessory => (
                            <Acessory
                                key={acessory.type}
                                name={acessory.name}
                                icon={getAccessoriesIcon(acessory.type)}
                            />
                        ))
                    }
                </Acessories>
                <About>{car.about}</About>
                
                </Animated.ScrollView>
            <Footer>
                <Button title="Escolher período do aluguel" onPress={handleConfirmRent} />
            </Footer>

        </Container>
    );
}


const style = StyleSheet.create({
    header: {
        position: "absolute",
        overflow: "hidden",
        zIndex: 1,
    },
})