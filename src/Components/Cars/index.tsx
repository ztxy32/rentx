import React from "react";
import { TouchableOpacityProps } from "react-native";
import EnergyIcon from "../../assets/energy.svg";
import { Container,Details,Brand,CarName,About,Rent,Period,Price,Type,CarImage, } from "./style";

interface CarData{
    brand: string;
    carName: string;
    rent: { period: string; price: number; },
    thumbnail: string;
}
interface Props extends TouchableOpacityProps{
    CarDataProps: CarData;
}

export function Cars({CarDataProps, ...rest} : Props){
    return(
        <Container {...rest} activeOpacity={.6}>
            <Details>
                <Brand>{CarDataProps.brand}</Brand>
                <CarName>{CarDataProps.carName}</CarName>

                <About>
                    <Rent>
                        <Period>{CarDataProps.rent.period}</Period>
                        <Price>{`R$ ${CarDataProps.rent.price}`}</Price>
                    </Rent>

                    <Type>
                        <EnergyIcon/>
                    </Type>
                </About>
            </Details>

            <CarImage source={{uri: CarDataProps.thumbnail}} resizeMode="contain"/>
        </Container>
    );
}