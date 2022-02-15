import React from "react";
import { StatusBar } from "react-native";
import Logo from "../../assets/logo.svg";
import {RFValue} from "react-native-responsive-fontsize"
import { Container, Header, HeaderContent, TotalCars, CarsList } from "./style";
import { Cars } from "../../Components/Cars";
import { useNavigation } from "@react-navigation/native";

const car = {
    brand: "tesla",
    carName: "model s",
    rent: { period: "ao dia", price: 120, },
    thumbnail: "https://www.pngmart.com/files/21/Red-Tesla-Car-PNG-Photos.png",
}

export function Home(){
    const navigation = useNavigation();
    function handleCarDetails(){
        navigation.navigate("CarDetails");
    }
    return(
        <Container>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent/>
            <Header>
                <HeaderContent>
                    <Logo width={RFValue(108)} height={RFValue(12)}/>
                    <TotalCars>
                        Total de 12 carros
                    </TotalCars>
                </HeaderContent>
            </Header>

            <CarsList 
                data={[1,2,3,4,5,6,7,8,9,10]} 
                keyExtractor={item => String(item)} 
                renderItem={
                    ({item}) => <Cars CarDataProps={car} onPress={handleCarDetails} /> 
                }
            />
            
        </Container>
    );
}